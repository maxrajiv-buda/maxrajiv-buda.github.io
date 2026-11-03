#!/usr/bin/env python3
"""Static checks for the site and the project notebook."""
import ast
import json
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
errors = []


def fail(msg):
    errors.append(msg)


ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
for loc in ET.parse(ROOT / "sitemap.xml").getroot().findall("sm:url/sm:loc", ns):
    url = loc.text or ""
    path = url.replace("https://rajivbuda.com", "") or "/"
    if path.endswith("/"):
        candidate = ROOT / path.strip("/") / "index.html"
        if path == "/":
            candidate = ROOT / "index.html"
    else:
        candidate = ROOT / path.strip("/")
    if not candidate.exists():
        fail(f"sitemap entry has no file: {url} -> {candidate.relative_to(ROOT)}")

bundle = (ROOT / "assets/index-Cmx--I36.js").read_text(encoding="utf-8")
if "Qwen3-4B" in bundle:
    fail("homepage bundle still says Qwen3-4B")
if 'title:"Ira-Dolphin"' in bundle:
    fail("homepage bundle still titles the model Ira-Dolphin")
if 'href:"/projects/"' not in bundle:
    fail("homepage nav is missing /projects/")
if 'href:"/barsa-re-bhubaneswar/"' not in bundle:
    fail("homepage nav is missing the book")

nb = json.loads((ROOT / "projects/AI-Projects.ipynb").read_text(encoding="utf-8"))
joined = "\n".join("".join(c.get("source", [])) for c in nb["cells"])
if "hireon-lora-checkpoints" in joined:
    fail("Fishing Cat still saves to the HireOnAI checkpoint folder")
if "\u00a0" in joined:
    fail("notebook still contains non-breaking spaces")
if "train_on_responses_only" not in joined.split("# 2. Fishing Cat")[-1].split("# 3. VK")[0]:
    fail("Fishing Cat training does not mask user turns")
if 'DOMAIN = "ru_mash"' not in joined:
    fail("VK utility is missing a configurable public domain")
if "beautifulsoup" in joined.split("# 3. VK")[-1]:
    fail("VK section still installs BeautifulSoup without using it")

for cell in nb["cells"]:
    if cell.get("cell_type") != "code":
        continue
    lines = [
        ln
        for ln in "".join(cell.get("source", [])).splitlines()
        if not ln.startswith("!") and not ln.startswith("%")
    ]
    try:
        ast.parse("\n".join(lines))
    except SyntaxError as exc:
        fail(f"notebook cell does not parse: {exc}")

required = [
    "projects/fishing-cat/index.html",
    "projects/vk-posts/index.html",
    "projects/polar-orca/index.html",
    "projects/account-brief/index.html",
    "barsa-re-bhubaneswar/index.html",
]
for rel in required:
    if not (ROOT / rel).exists():
        fail(f"missing {rel}")

if errors:
    print("\n".join(errors))
    sys.exit(1)
print("site checks passed")
