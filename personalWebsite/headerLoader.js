(function () {
  async function loadSharedHeader() {
    const targets = Array.from(document.querySelectorAll("[data-include-header]"));
    if (!targets.length) {
      document.dispatchEvent(new CustomEvent("headers-loaded"));
      return;
    }

    try {
      await Promise.all(
        targets.map(async (target) => {
          const headerPath = target.getAttribute("data-include-header") || "./shared-header.html";
          try {
            const response = await fetch(headerPath, { cache: "no-cache" });
            if (!response.ok) {
              throw new Error("Cannot load header file: " + headerPath);
            }
            target.innerHTML = await response.text();
          } catch (error) {
            console.error(error);
          }
        })
      );
    } finally {
      document.dispatchEvent(new CustomEvent("headers-loaded"));
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadSharedHeader);
  } else {
    loadSharedHeader();
  }
})();
