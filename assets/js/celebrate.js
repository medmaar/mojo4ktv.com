/* Mojo 4K: full-screen celebration after a free-trial request or a plan order.
   Pages call window.mojoCelebrate("trial" | "order", email) after a successful submit.
   Preview without submitting: add ?celebrate=trial or ?celebrate=order to a page that loads this file
   (e.g. /free-trial?celebrate=trial, /12-months?celebrate=order). */
(function () {
  var COPY = {
    trial: {
      title: "Your free trial is on its way!",
      lines: [
        "The Mojo crew just launched your login toward <b data-c-email></b> at full 4K speed. 🚀",
        "It usually lands in under 2 minutes. Check your <b>inbox</b> AND your <b>spam</b> folder, because sometimes our email gets stage fright and hides in there.",
        "Your only homework for the next 24 hours: find the remote and claim the comfiest spot on the couch. 🍿"
      ],
      btn: "Got it, warming up the couch"
    },
    order: {
      title: "You did it! Order placed.",
      lines: [
        "Your Mojo is officially back. 😎 Somewhere, your remote just did a little happy dance.",
        "Your invoice is zooming over to <b data-c-email></b> right now. Check your <b>inbox</b> AND your <b>spam</b> folder (emails love a good game of hide and seek).",
        "Pay the invoice and your channels show up faster than you can say “just one more episode.” 📺"
      ],
      btn: "Awesome, let’s go!"
    }
  };

  var CSS =
    ".mc-lock,.mc-lock body{overflow:hidden!important}" +
    ".mc-lock #pp-suc,.mc-lock #op-suc,.mc-lock .pp-success,.mc-lock .op-success{display:none!important}" +
    ".mc{position:fixed;inset:0;z-index:100000;display:flex;padding:max(16px,env(safe-area-inset-top)) max(16px,env(safe-area-inset-right)) max(16px,env(safe-area-inset-bottom)) max(16px,env(safe-area-inset-left));overflow-y:auto;-webkit-overflow-scrolling:touch;overscroll-behavior:contain;font-family:'Plus Jakarta Sans',system-ui,sans-serif;" +
    "background:radial-gradient(circle at 50% 35%,rgba(46,204,113,.22),transparent 60%),rgba(5,12,26,.93);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);animation:mc-in .3s ease both}" +
    "" +
    ".mc-box{position:relative;margin:auto;box-sizing:border-box;width:min(560px,100%);text-align:center;padding:clamp(28px,6vw,48px) clamp(18px,5vw,40px);color:#fff;" +
    "background:rgba(15,32,60,.97);border:1px solid rgba(46,204,113,.45);border-radius:1.5rem;box-shadow:0 0 0 1px rgba(46,204,113,.2),0 40px 120px -30px rgba(46,204,113,.45);" +
    "animation:mc-pop .55s .05s cubic-bezier(.2,.9,.3,1.3) both}" +
    ".mc-mark{display:block;width:clamp(130px,38vw,180px);height:auto;margin:0 auto 22px;fill:none;stroke:#4ade80;stroke-linecap:round;stroke-linejoin:round;filter:drop-shadow(0 0 24px rgba(74,222,128,.5))}" +
    ".mc-mark circle{stroke-width:6;stroke-dasharray:340;stroke-dashoffset:340;fill:rgba(46,204,113,.1);animation:mc-draw .7s .2s ease forwards}" +
    ".mc-mark path{stroke-width:9;stroke-dasharray:80;stroke-dashoffset:80;transform-origin:center;animation:mc-draw .45s .8s ease forwards,mc-bounce .5s 1.2s ease}" +
    ".mc h2{font-size:clamp(28px,6vw,40px);line-height:1.15;font-weight:800;margin:0 0 16px;color:#4ade80}" +
    ".mc p{color:rgba(255,255,255,.8);font-size:clamp(16px,2.2vw,18px);line-height:1.55;margin:0 auto 12px;max-width:460px}" +
    ".mc p b{color:#fff;font-weight:800;word-break:break-word}" +
    ".mc-go{display:block;box-sizing:border-box;text-decoration:none;text-align:center;margin:18px auto 0;width:100%;max-width:360px;min-height:52px;padding:14px 22px;border:0;border-radius:999px;cursor:pointer;font-family:inherit;font-weight:800;font-size:17px;line-height:1.2;color:#fff;" +
    "background:linear-gradient(135deg,#E74F51,#FF7E80);box-shadow:0 12px 30px -10px rgba(231,79,81,.7);transition:transform .15s}" +
    ".mc-go:hover,.mc-go:focus-visible{transform:translateY(-2px)}" +
    ".mc-bits{position:fixed;inset:0;pointer-events:none;overflow:hidden}" +
    ".mc-bits i{position:absolute;top:-40px;left:var(--x);width:10px;height:16px;border-radius:3px;font-style:normal;font-size:22px;line-height:1;background:#E74F51;animation:mc-fall var(--t) var(--d) linear infinite}" +
    ".mc-bits i:nth-child(4n+1){background:#2ecc71}.mc-bits i:nth-child(4n+2){background:#FBBC04}.mc-bits i:nth-child(4n+3){background:#FF7E80}" +
    ".mc-bits i:nth-child(3n+1){width:auto;height:auto;background:none}" +
    "@keyframes mc-in{from{opacity:0}}@keyframes mc-draw{to{stroke-dashoffset:0}}" +
    "@keyframes mc-pop{from{opacity:0;transform:scale(.8) translateY(20px)}}@keyframes mc-bounce{50%{transform:scale(1.15)}}" +
    "@keyframes mc-fall{from{transform:translateY(0) rotate(var(--r))}to{transform:translateY(110vh) rotate(calc(var(--r) + 540deg))}}" +
    "@media (max-width:360px){.mc-box{padding:24px 14px}.mc h2{font-size:24px}.mc p{font-size:15px}.mc-go{font-size:16px}}" +
    "@media (max-height:560px){.mc-box{padding:20px 22px}.mc-mark{width:84px;margin-bottom:10px}.mc h2{font-size:24px;margin-bottom:10px}.mc p{font-size:15px;margin-bottom:8px}.mc-go{margin-top:10px}}" +
    "@media (prefers-reduced-motion:reduce){.mc,.mc-box{animation:none}.mc-bits{display:none}.mc-mark circle,.mc-mark path{animation:none;stroke-dashoffset:0}}";

  function addCss() {
    if (document.getElementById("mc-css")) return;
    var s = document.createElement("style");
    s.id = "mc-css";
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function celebrate(kind, email) {
    var c = COPY[kind === "order" ? "order" : "trial"];
    addCss();
    var old = document.querySelector(".mc");
    if (old) old.remove();
    var el = document.createElement("div");
    el.className = "mc";
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-modal", "true");
    el.setAttribute("aria-labelledby", "mc-title");
    var emo = ["🍿", "⚡", "📺", "🎉"], bits = "";
    for (var i = 0; i < 28; i++) {
      bits += '<i style="--x:' + (i * 37) % 100 + "%;--d:" + (i % 7) * 0.35 + "s;--t:" + (3.2 + (i % 5) * 0.5) + "s;--r:" + (i * 53) % 360 + 'deg">' +
        (i % 3 ? "" : emo[(i / 3) % emo.length | 0]) + "</i>";
    }
    el.innerHTML = '<div class="mc-bits" aria-hidden="true">' + bits + "</div>" +
      '<div class="mc-box">' +
      '<svg class="mc-mark" viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="54"/><path d="M36 62 53 79 86 44"/></svg>' +
      '<h2 id="mc-title">' + c.title + "</h2>" +
      c.lines.map(function (l) { return "<p>" + l + "</p>"; }).join("") +
      '<a class="mc-go" href="/">' + c.btn + "</a></div>";
    var slots = el.querySelectorAll("[data-c-email]");
    for (var j = 0; j < slots.length; j++) slots[j].textContent = email || "your email address";
    var go = el.querySelector(".mc-go");
    // no close button, no Escape, no backdrop click: the only way out is the button, which goes to the homepage.
    document.addEventListener("keydown", function (e) {
      if (e.key === "Tab" && document.body.contains(el)) { e.preventDefault(); go.focus(); }
    });
    document.body.appendChild(el);
    document.documentElement.classList.add("mc-lock");
    try { go.focus({ preventScroll: true }); } catch (e) {}
  }

  window.mojoCelebrate = function (kind, email) {
    try { celebrate(kind, email); } catch (e) { if (window.console) console.error(e); }
  };

  function preview() {
    var q = new URLSearchParams(location.search).get("celebrate");
    if (q) window.mojoCelebrate(q === "order" ? "order" : "trial", "you@example.com");
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", preview);
  else preview();
})();
