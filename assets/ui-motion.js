/* ui-motion — button press · pull resistance · rolling digits · drag reorder · card expand
   React-safe: never move/replace nodes React owns; only add attributes/classes/overlays. */
(function () {
  var D = document, H = D.documentElement;
  var RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var FINE = matchMedia('(hover: hover) and (pointer: fine)').matches;
  /* iOS / some Android UAs report fine+coarse; treat any touch device as coarse for pull */
  var COARSE = matchMedia('(pointer: coarse)').matches || (navigator.maxTouchPoints || 0) > 0;
  H.classList.add('ui-motion');
  H.setAttribute('data-ui-roll-own', '1');

  function qsa(s, r) { return [].slice.call((r || D).querySelectorAll(s)) }
  function on(el, ev, fn, opt) { el.addEventListener(ev, fn, opt || false) }

  /* ========================================================================
   * 01 Button press — sink, spring back
   * ======================================================================== */
  var BTN = 'a.button,button.button,.button,.btn,.button-primary,.button-dark,.btn-solid,.btn-ghost,.thesis-cta,.social-link,.nav-availability,.menu-button';

  function wirePress() {
    qsa(BTN).forEach(function (b) {
      if (b.dataset.uiPress) return;
      b.dataset.uiPress = '1';
      b.classList.add('ui-press');
      if (!b.classList.contains('pt-mag')) b.classList.add('ui-press-plain');

      function down(e) {
        if (e.button != null && e.button !== 0) return;
        b.classList.add('ui-down');
      }
      function up() { b.classList.remove('ui-down') }

      on(b, 'pointerdown', down);
      on(b, 'pointerup', up);
      on(b, 'pointercancel', up);
      on(b, 'pointerleave', up);
      on(b, 'blur', up);
    });

    if (FINE && !RM) {
      qsa('.pt-mag.ui-press').forEach(function (b) {
        if (b.dataset.uiMag) return;
        b.dataset.uiMag = '1';
        on(b, 'pointermove', function (e) {
          if (b.classList.contains('ui-down')) return;
          var r = b.getBoundingClientRect();
          b.style.setProperty('--ui-mx', ((e.clientX - r.left) / r.width - 0.5) * 10 + 'px');
          b.style.setProperty('--ui-my', ((e.clientY - r.top) / r.height - 0.5) * 8 + 'px');
          b.style.transform = '';
        });
        on(b, 'pointerleave', function () {
          b.style.removeProperty('--ui-mx');
          b.style.removeProperty('--ui-my');
        });
      });
    }
  }

  /* ========================================================================
   * 02 Pull to refresh — finger 100%, list 35%
   * ======================================================================== */
  var PULL_RATIO = 0.35, PULL_ARM = 88, PULL_MAX = 160;

  function pullRefresh() {
    if (RM || !COARSE || H.dataset.uiPull) return;
    H.dataset.uiPull = '1';
    H.classList.add('ui-pull-root');

    var tip = D.createElement('div');
    tip.className = 'ui-pull-indicator';
    tip.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v10"/><path d="M8 10l4 4 4-4"/><path d="M5 18h14"/></svg>';
    tip.setAttribute('aria-hidden', 'true');
    D.body.appendChild(tip);

    var startY = 0, pulling = false, dy = 0, armed = false, busy = false;
    var shiftTarget = D.body;

    function setShift(y) {
      shiftTarget.classList.add('ui-pull-shift');
      shiftTarget.style.transform = y ? 'translate3d(0,' + y + 'px,0)' : '';
      tip.style.transform = 'translate3d(0,' + Math.max(8, y * 0.55) + 'px,0) scale(' + (0.85 + Math.min(y, PULL_ARM) / PULL_ARM * 0.2) + ')';
      tip.classList.toggle('ui-show', y > 8);
      tip.classList.toggle('ui-armed', armed);
    }

    function atTop() {
      return (window.scrollY || H.scrollTop || D.body.scrollTop || 0) <= 0;
    }

    on(window, 'touchstart', function (e) {
      if (busy || !atTop() || e.touches.length !== 1) return;
      startY = e.touches[0].clientY;
      pulling = true; dy = 0; armed = false;
    }, { passive: true });

    on(window, 'touchmove', function (e) {
      if (!pulling || busy) return;
      var raw = e.touches[0].clientY - startY;
      if (raw <= 0 || !atTop()) {
        if (dy) { dy = 0; setShift(0); tip.classList.remove('ui-show', 'ui-armed') }
        return;
      }
      dy = Math.min(PULL_MAX, raw * PULL_RATIO);
      armed = dy >= PULL_ARM * PULL_RATIO;
      H.classList.add('ui-pulling');
      setShift(dy);
      if (e.cancelable && raw > 10) e.preventDefault();
    }, { passive: false });

    function springBack(done) {
      shiftTarget.style.transition = 'transform 420ms cubic-bezier(.34,1.56,.64,1)';
      tip.style.transition = 'opacity .25s ease, transform .42s cubic-bezier(.34,1.56,.64,1)';
      setShift(0);
      setTimeout(function () {
        shiftTarget.style.transition = '';
        tip.style.transition = '';
        shiftTarget.classList.remove('ui-pull-shift');
        if (done) done();
      }, 440);
    }

    function end() {
      if (!pulling) return;
      pulling = false;
      H.classList.remove('ui-pulling');
      if (armed && !busy) {
        busy = true;
        tip.classList.add('ui-spin', 'ui-show', 'ui-armed');
        setShift(Math.max(dy, 36));
        setTimeout(function () {
          qsa('.ui-roll').forEach(function (el) {
            el.classList.remove('ui-on');
            void el.offsetWidth;
            el.classList.add('ui-on');
          });
          springBack(function () {
            tip.classList.remove('ui-spin', 'ui-show', 'ui-armed');
            busy = false;
          });
        }, 480);
      } else {
        springBack(function () { tip.classList.remove('ui-show', 'ui-armed') });
      }
      dy = 0; armed = false;
    }

    on(window, 'touchend', end, { passive: true });
    on(window, 'touchcancel', end, { passive: true });
  }

  /* ========================================================================
   * 03 Rolling number — solid color overlay (no background-clip:text)
   * ======================================================================== */
  function measureDigitWidth(host, ch) {
    var probe = D.createElement('span');
    probe.textContent = ch;
    probe.setAttribute('data-ptc', '1');
    probe.style.cssText = 'position:absolute;visibility:hidden;pointer-events:none;font:inherit;letter-spacing:inherit;font-variant-numeric:tabular-nums;';
    host.appendChild(probe);
    var w = Math.ceil(probe.getBoundingClientRect().width) || 0;
    host.removeChild(probe);
    return w;
  }

  function figureText(host) {
    /* ignore our overlay when reading the live figure */
    var clone = host.cloneNode(true);
    qsa('.ui-roll', clone).forEach(function (n) { if (n.parentNode) n.parentNode.removeChild(n) });
    return (clone.textContent || '').replace(/\s+/g, '').trim();
  }

  function buildOverlay(host, raw) {
    var cs = getComputedStyle(host);
    if (cs.position === 'static') host.style.position = 'relative';

    var old = host.querySelector(':scope > .ui-roll-overlay');
    if (old) old.parentNode.removeChild(old);

    var overlay = D.createElement('span');
    overlay.className = 'ui-roll ui-roll-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.setAttribute('data-ptc', '1');
    overlay.dataset.uiRaw = raw;

    var digi = 0;
    var widest = Math.max(
      measureDigitWidth(host, '0'),
      measureDigitWidth(host, '8'),
      Math.round(parseFloat(cs.fontSize) * 0.62) || 12
    );

    for (var i = 0; i < raw.length; i++) {
      var ch = raw[i];
      if (/\d/.test(ch)) {
        var cell = D.createElement('span');
        cell.className = 'ui-roll-digit';
        cell.setAttribute('data-ptc', '1');
        cell.style.width = widest + 'px';
        cell.style.minWidth = widest + 'px';
        var strip = D.createElement('i');
        strip.setAttribute('data-ptc', '1');
        for (var n = 0; n <= 9; n++) {
          var b = D.createElement('b');
          b.textContent = String(n);
          b.setAttribute('data-ptc', '1');
          strip.appendChild(b);
        }
        var land = D.createElement('b');
        land.textContent = ch;
        land.setAttribute('data-ptc', '1');
        strip.appendChild(land);
        strip.style.setProperty('--from', '0em');
        strip.style.setProperty('--to', '-10em');
        strip.style.setProperty('--delay', (digi * 100) + 'ms');
        cell.appendChild(strip);
        overlay.appendChild(cell);
        digi++;
      } else {
        var sym = D.createElement('span');
        sym.className = 'ui-roll-sym';
        sym.textContent = ch;
        sym.setAttribute('data-ptc', '1');
        overlay.appendChild(sym);
      }
    }

    host.appendChild(overlay);
    return overlay;
  }

  function rollOverlay(host) {
    if (!host) return;
    var raw = figureText(host);
    if (!/\d/.test(raw)) return;

    host.classList.add('ui-roll-host');
    var existing = host.querySelector(':scope > .ui-roll-overlay');
    /* rebuild if premium-theme rewrote $1.5M+ → $5B+ after first paint */
    if (existing && existing.dataset.uiRaw === raw && host.dataset.uiRoll === '1') {
      if (existing.classList.contains('ui-on')) host.classList.add('ui-roll-ready');
      return;
    }

    host.dataset.uiRoll = '1';
    var overlay = buildOverlay(host, raw);

    function arm() {
      var now = figureText(host);
      if (now && now !== raw) {
        raw = now;
        played = false;
        overlay = buildOverlay(host, raw);
        return false;
      }
      var r = overlay.getBoundingClientRect();
      var parent = host.closest('.proof-stat, .bento-card, .hero-stats') || host;
      var pOp = parseFloat(getComputedStyle(parent).opacity);
      if (r.width < 2 || r.height < 2) return false;
      if (parent.classList.contains('pt-rv') && !parent.classList.contains('pt-in') && pOp < 0.05) {
        return false;
      }
      host.classList.add('ui-roll-ready');
      return true;
    }

    var played = false;
    function play(attempt) {
      attempt = attempt || 0;
      if (played && overlay.classList.contains('ui-on')) {
        host.classList.add('ui-roll-ready');
        return;
      }
      if (!arm()) {
        if (attempt < 50) setTimeout(function () { play(attempt + 1) }, 120);
        return;
      }
      played = true;
      host.classList.add('ui-roll-ready');
      if (RM) { overlay.classList.add('ui-on'); return }
      overlay.classList.remove('ui-on');
      void overlay.offsetWidth;
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          overlay.classList.add('ui-on');
          host.classList.add('ui-roll-ready');
        });
      });
    }

    if ('IntersectionObserver' in window && !RM) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (x) {
          if (x.isIntersecting) play();
        });
      }, { threshold: 0.2, rootMargin: '0px 0px -8% 0px' });
      io.observe(host.closest('.proof-stat, .bento-card, .hero-stats') || host);
      setTimeout(function () {
        var r = host.getBoundingClientRect();
        if (r.top < innerHeight * 0.9 && r.bottom > 0) play();
      }, 500);
    } else {
      play();
    }
  }

  function rollingNumbers() {
    qsa('.proof-stat > strong, .hero-stats strong, .bento-metric > strong, .bento-card.bento-metric strong').forEach(rollOverlay);
  }

  /* ========================================================================
   * 04 Drag to reorder — static grids only (not React-managed lists)
   * ======================================================================== */
  var HANDLE = '<span class="ui-drag-handle" role="button" tabindex="0" aria-label="Drag to reorder" data-ptc="1"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 5h8M4 8h8M4 11h8"/></svg></span>';

  function reorderList(sel, itemSel) {
    qsa(sel).forEach(function (list) {
      if (list.dataset.uiReorder) return;
      var items = qsa(itemSel, list).filter(function (el) { return el.parentNode === list });
      if (items.length < 2) return;
      list.dataset.uiReorder = '1';
      list.classList.add('ui-reorder');

      items.forEach(function (item) {
        item.classList.add('ui-reorder-item');
        if (!item.querySelector(':scope > .ui-drag-handle')) {
          item.insertAdjacentHTML('afterbegin', HANDLE);
        }
        wireItem(list, item);
      });
    });
  }

  function wireItem(list, item) {
    if (item.dataset.uiDrag) return;
    item.dataset.uiDrag = '1';
    var handle = item.querySelector(':scope > .ui-drag-handle');
    if (!handle) return;
    var startY = 0, originTop = 0, originH = 0, active = false, pointerId = null;
    var slots = [], order = [];

    function measure() {
      order = qsa('.ui-reorder-item', list).filter(function (el) { return el.parentNode === list });
      slots = order.map(function (el) {
        var r = el.getBoundingClientRect();
        return { el: el, top: r.top, mid: r.top + r.height / 2, h: r.height };
      });
    }

    function onDown(e) {
      if (RM) return;
      if (e.button != null && e.button !== 0) return;
      e.preventDefault();
      e.stopPropagation();
      active = true;
      pointerId = e.pointerId;
      try { handle.setPointerCapture(pointerId) } catch (err) {}
      measure();
      startY = e.clientY;
      var r = item.getBoundingClientRect();
      originTop = r.top;
      originH = r.height;
      item.classList.add('ui-lifting');
      list.dataset.dragging = '1';
      order.forEach(function (el) { if (el !== item) el.classList.add('ui-sliding') });
    }

    function onMove(e) {
      if (!active || e.pointerId !== pointerId) return;
      e.preventDefault();
      var delta = e.clientY - startY;
      item.style.transform = 'translate3d(0,' + delta + 'px,0)';
      item.style.scale = '1.05';
      item.style.zIndex = '6';

      var center = originTop + originH / 2 + delta;
      var fromIdx = order.indexOf(item);
      var toIdx = fromIdx;
      for (var i = 0; i < slots.length; i++) {
        if (slots[i].el === item) continue;
        if (center < slots[i].mid) { toIdx = i; break }
        toIdx = i;
      }
      order.forEach(function (el, i) {
        if (el === item) return;
        var shift = 0;
        if (fromIdx < toIdx && i > fromIdx && i <= toIdx) shift = -originH;
        else if (fromIdx > toIdx && i >= toIdx && i < fromIdx) shift = originH;
        el.style.transform = shift ? 'translate3d(0,' + shift + 'px,0)' : '';
      });
      item._uiTo = toIdx;
      item._uiFrom = fromIdx;
    }

    function onUp(e) {
      if (!active || (e && e.pointerId !== pointerId)) return;
      active = false;
      try { handle.releasePointerCapture(pointerId) } catch (err) {}
      var toIdx = item._uiTo, fromIdx = item._uiFrom;
      order.forEach(function (el) {
        el.style.transform = '';
        el.style.scale = '';
        el.style.zIndex = '';
        el.classList.remove('ui-lifting', 'ui-sliding');
      });
      list.dataset.dragging = '0';
      if (toIdx != null && fromIdx != null && toIdx !== fromIdx) {
        var ref = order[toIdx];
        if (fromIdx < toIdx) {
          if (ref.nextSibling) list.insertBefore(item, ref.nextSibling);
          else list.appendChild(item);
        } else {
          list.insertBefore(item, ref);
        }
      }
      item._uiTo = item._uiFrom = null;
    }

    on(handle, 'pointerdown', onDown);
    on(handle, 'pointermove', onMove);
    on(handle, 'pointerup', onUp);
    on(handle, 'pointercancel', onUp);
  }

  function dragReorder() {
    reorderList('.proof-grid', '.proof-stat');
    reorderList('.playbook-grid', '.playbook-card');
    reorderList('.capability-grid', '.capability-card');
    reorderList('.grid', 'article.card');
  }

  /* ========================================================================
   * 05 Card expand — ease-out 250ms (class toggle only; no node moves)
   * ======================================================================== */
  function expandCards() {
    var targets = qsa('.capability-card, .playbook-card, .bento-card, article.card, .principle-card, .proof-stat');
    targets.forEach(function (card) {
      if (card.dataset.uiExpand) return;
      if (card.tagName === 'A' || card.classList.contains('project-card')) return;
      card.dataset.uiExpand = '1';
      card.classList.add('ui-expand');

      if (!card.querySelector(':scope > .ui-expand-cue')) {
        var cue = D.createElement('div');
        cue.className = 'ui-expand-cue';
        cue.setAttribute('data-ptc', '1');
        cue.innerHTML = '<span class="ui-cue-open">Expand</span><span class="ui-cue-close">Close</span><i></i>';
        card.appendChild(cue);
      }

      on(card, 'click', function (e) {
        if (e.target.closest('a,button,.ui-drag-handle,input,select,textarea')) return;
        var open = !card.classList.contains('ui-open');
        var parent = card.parentNode;
        if (parent) {
          qsa(':scope > .ui-expand.ui-open', parent).forEach(function (sib) {
            if (sib !== card) sib.classList.remove('ui-open');
          });
        }
        card.classList.toggle('ui-open', open);
      });
    });
  }

  /* ========================================================================
   * Mobile coach — one-time tip so touch gestures are discoverable
   * ======================================================================== */
  function mobileCoach() {
    if (!COARSE || RM || H.dataset.uiCoach) return;
    try { if (sessionStorage.getItem('ui-coach-v12') === '1') return } catch (e) {}
    H.dataset.uiCoach = '1';

    var bar = D.createElement('div');
    bar.className = 'ui-coach';
    bar.setAttribute('data-ptc', '1');
    bar.setAttribute('role', 'status');
    bar.innerHTML = '<p data-ptc="1"><strong data-ptc="1">On this phone:</strong> tap buttons to press, pull down to refresh stats, drag the ☰ handle, tap Expand on a card.</p><button type="button" aria-label="Dismiss" data-ptc="1">×</button>';
    D.body.appendChild(bar);

    function hide() {
      bar.classList.remove('ui-show');
      try { sessionStorage.setItem('ui-coach-v12', '1') } catch (e) {}
      setTimeout(function () { if (bar.parentNode) bar.parentNode.removeChild(bar) }, 500);
    }

    on(bar.querySelector('button'), 'click', hide);
    setTimeout(function () { bar.classList.add('ui-show') }, 900);
    setTimeout(hide, 9000);
  }

  /* ---------- boot (debounced, React-safe) ---------- */
  var scheduled = 0, passes = 0;
  function run() {
    if (passes > 40) return;
    passes++;
    try {
      wirePress();
      rollingNumbers();
      dragReorder();
      expandCards();
    } catch (e) { console.warn('ui-motion', e) }
  }

  function schedule() {
    if (scheduled) return;
    scheduled = 1;
    setTimeout(function () {
      scheduled = 0;
      run();
    }, 180);
  }

  function start() {
    pullRefresh();
    run();
    mobileCoach();
    new MutationObserver(function (muts) {
      for (var i = 0; i < muts.length; i++) {
        var m = muts[i];
        if (m.type === 'attributes') continue;
        var nodes = [].concat(
          [].slice.call(m.addedNodes),
          [].slice.call(m.removedNodes)
        );
        var foreign = nodes.some(function (n) {
          if (n.nodeType !== 1) return n.nodeType === 3;
          return !n.hasAttribute('data-ptc') && !n.classList.contains('ui-roll') &&
            !n.classList.contains('ui-expand-cue') && !n.classList.contains('ui-drag-handle') &&
            !n.classList.contains('ui-pull-indicator') && !n.classList.contains('ui-coach');
        });
        if (foreign) { schedule(); return }
      }
    }).observe(D.body, { childList: true, subtree: true });
    setTimeout(run, 1000);
    setTimeout(run, 2800);
    setTimeout(function () { passes = 0 }, 4000);
  }

  if (D.readyState === 'loading') on(D, 'DOMContentLoaded', start);
  else start();
})();
