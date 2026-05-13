(function () {
  var el = document.getElementById("scroll-hint");
  if (!el) return;

  function pageScrollable() {
    var doc = document.documentElement;
    return doc.scrollHeight > window.innerHeight + 48;
  }

  function nearBottom() {
    var doc = document.documentElement;
    return window.scrollY + window.innerHeight >= doc.scrollHeight - 72;
  }

  function update() {
    if (!pageScrollable()) {
      el.classList.add("is-hidden");
      return;
    }
    if (window.scrollY > 56 || nearBottom()) {
      el.classList.add("is-hidden");
    } else {
      el.classList.remove("is-hidden");
    }
  }

  if (!pageScrollable()) {
    el.classList.add("is-hidden");
  }

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  window.addEventListener("load", update);
})();
