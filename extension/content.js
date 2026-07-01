(() => {
  if (window.__slidingCatCursorLoaded) {
    return;
  }
  window.__slidingCatCursorLoaded = true;

  const DEFAULTS = {
    enabled: true,
    height: 150,
    minDownPixels: 3,
    fadeMs: 180,
    offsetX: 18,
    offsetY: 16
  };

  let settings = { ...DEFAULTS };
  let lastX = window.innerWidth / 2;
  let lastY = window.innerHeight / 2;
  let hideTimer = null;
  let cat = null;

  const assetUrl = chrome.runtime.getURL("assets/sliding-cat.png");

  function readSettings() {
    chrome.storage.sync.get(DEFAULTS, (items) => {
      settings = { ...DEFAULTS, ...items };
      if (cat) {
        cat.style.height = `${settings.height}px`;
        if (!settings.enabled) hideCat(true);
      }
    });
  }

  function ensureCat() {
    if (cat) return cat;

    const host = document.createElement("div");
    host.id = "sliding-cat-cursor-root";
    Object.assign(host.style, {
      all: "initial",
      position: "fixed",
      inset: "0",
      width: "0",
      height: "0",
      pointerEvents: "none",
      zIndex: "2147483647"
    });
    document.documentElement.appendChild(host);
    const root = host.attachShadow({ mode: "open" });

    cat = document.createElement("img");
    cat.src = assetUrl;
    cat.alt = "";
    cat.draggable = false;
    cat.setAttribute("aria-hidden", "true");
    Object.assign(cat.style, {
      position: "fixed",
      left: "0",
      top: "0",
      height: `${settings.height}px`,
      width: "auto",
      maxWidth: "220px",
      pointerEvents: "none",
      userSelect: "none",
      zIndex: "2147483647",
      display: "block",
      opacity: "0",
      transformOrigin: "center center",
      willChange: "left, top, transform, opacity",
      transition: `opacity ${settings.fadeMs}ms ease-out`,
      filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.22))"
    });

    root.appendChild(cat);
    return cat;
  }

  function hideCat(immediate = false) {
    if (!cat) return;
    if (immediate) {
      cat.style.transition = "none";
      cat.style.opacity = "0";
      requestAnimationFrame(() => {
        if (cat) cat.style.transition = `opacity ${settings.fadeMs}ms ease-out`;
      });
      return;
    }
    cat.style.opacity = "0";
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function showCat(clientX, clientY, dx) {
    const node = ensureCat();
    const rectHeight = settings.height;
    const estimatedWidth = Math.min(settings.height * 1.25, 220);
    const x = clamp(clientX + settings.offsetX, 0, window.innerWidth - estimatedWidth);
    const y = clamp(clientY + settings.offsetY, 0, window.innerHeight - rectHeight);
    const mirror = dx < 0;

    node.style.height = `${settings.height}px`;
    node.style.left = `${x}px`;
    node.style.top = `${y}px`;
    node.style.opacity = "1";
    node.style.transform = `scaleX(${mirror ? -1 : 1})`;

    window.clearTimeout(hideTimer);
    hideTimer = window.setTimeout(() => hideCat(false), 140);
  }

  function onPointerMove(event) {
    if (!settings.enabled) return;

    const dx = Number.isFinite(event.movementX) && event.movementX !== 0
      ? event.movementX
      : event.clientX - lastX;
    const dy = Number.isFinite(event.movementY) && event.movementY !== 0
      ? event.movementY
      : event.clientY - lastY;
    lastX = event.clientX;
    lastY = event.clientY;

    if (dy >= settings.minDownPixels) {
      showCat(event.clientX, event.clientY, dx);
    } else if (dy < 0) {
      hideCat(false);
    }
  }

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== "sync") return;
    for (const [key, change] of Object.entries(changes)) {
      settings[key] = change.newValue;
    }
    if (cat) cat.style.height = `${settings.height}px`;
    if (!settings.enabled) hideCat(true);
  });

  readSettings();
  ensureCat();
  window.addEventListener("pointermove", onPointerMove, { passive: true, capture: true });
  window.addEventListener("mousemove", onPointerMove, { passive: true, capture: true });
})();
