(function waitForCMS() {
  if (window.CMS && typeof window.CMS.registerBackend === "function") {
    window.CMS.registerBackend("custom", {
      // Zorunlu metotlar (dummy olarak)
      init: () => Promise.resolve(),
      auth: async () => ({ token: "dummy" }),
      entries: async () => [],
      getEntry: async () => null,
      persistEntry: async () => {},
      deleteEntry: async () => {},
    });

    window.__customBackendRegistered = true;
    console.log("✅ Custom backend başarıyla register edildi.");
  } else {
    setTimeout(waitForCMS, 100);
  }
})();
