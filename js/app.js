(function () {
  var c = window.SITE || {};
  var popup = c.popup || {};
  function setText(id, value) {
    var el = document.getElementById(id);
    if (el && value != null) el.textContent = value;
  }
  setText("creatorName", c.name);
  setText("popupName", c.name);
  setText("footerName", c.name);
  setText("tagline", c.tagline);
  setText("flag", c.flag);
  setText("videoCount", c.videos);
  setText("photoCount", c.photos);
  setText("photoCountLabel", c.photos);
  setText("year", new Date().getFullYear());
  if (c.name) document.title = c.name;
  var avatar = document.getElementById("avatar");
  if (avatar && c.avatar) avatar.src = c.avatar;
  var headline = document.getElementById("popupHeadline");
  if (headline && popup.headline) headline.innerHTML = popup.headline + ' "<span>' + (popup.brand || "") + '</span>"';
  var steps = document.getElementById("popupSteps");
  if (steps && popup.steps) steps.innerHTML = popup.steps.map(function (s) { return "<div>" + s + "</div>"; }).join("");
  if (popup.button) setText("popupButton", popup.button);
  var popupImg = document.getElementById("popupImage");
  if (popupImg && popup.image) popupImg.src = popup.image;
  var overlay = document.getElementById("funnelOverlay");
  var join = document.getElementById("popupJoin");
  var popupUrl = popup.url || "";
  function goAffiliate() { if (popupUrl) window.open(popupUrl, "_blank", "noopener"); }
  if (join) {
    join.removeAttribute("href");
    join.setAttribute("role", "button");
    join.addEventListener("click", function (e) { e.preventDefault(); goAffiliate(); });
  }
  function openFunnel(e) {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    if (!overlay) return;
    overlay.hidden = false;
    overlay.style.cssText = "position:fixed;inset:0;z-index:2147483647;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.78)";
    document.documentElement.classList.add("funnel-open");
    document.body.classList.add("funnel-open");
  }
  function closeFunnel(e) {
    if (e) e.preventDefault();
    if (!overlay) return;
    overlay.hidden = true;
    overlay.style.display = "none";
    document.documentElement.classList.remove("funnel-open");
    document.body.classList.remove("funnel-open");
  }
  document.querySelectorAll(".js-open-funnel").forEach(function (el) { el.addEventListener("click", openFunnel); });
  var closeBtn = document.getElementById("popupClose");
  if (closeBtn) closeBtn.addEventListener("click", closeFunnel);
  if (overlay) overlay.addEventListener("click", function (e) { if (e.target === overlay) closeFunnel(e); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeFunnel(); });
  var ua = navigator.userAgent || "";
  var onlyFacebook = /FBAN|FBAV|FB_IAB|FB4A|FBIOS|Facebook/i.test(ua) && !/Instagram|Snapchat|TikTok|Bytedance/i.test(ua);
  var android = /Android/i.test(ua);
  var ios = /iPhone|iPad|iPod/i.test(ua);
  var fbOverlay = document.getElementById("fbOverlay");
  var openBtn = document.getElementById("openAppBtn");
  function externalUrl() {
    var url = window.location.href.split("#")[0];
    var host = window.location.host;
    var path = window.location.pathname + window.location.search;
    if (android) return "intent://" + host + path + "#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=" + encodeURIComponent(url) + ";end";
    if (ios) return "x-safari-https://" + host + path;
    return url;
  }
  if (onlyFacebook && fbOverlay) {
    fbOverlay.hidden = false;
    fbOverlay.style.display = "flex";
    document.documentElement.classList.add("funnel-open");
    document.body.classList.add("funnel-open");
  }
  if (openBtn) openBtn.addEventListener("click", function (e) { e.preventDefault(); window.location.href = externalUrl(); });
})();
