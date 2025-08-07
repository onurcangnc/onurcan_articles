(function waitForCMS() {
  if (typeof window.CMS !== "undefined") {
    console.log("✅ CMS tanımlı, custom backend kaydediliyor.");
    window.CMS.registerBackend("custom", {
      init: () => Promise.resolve(),
      authComponent: () => null,
      restoreUser: () => Promise.resolve(null),
      logout: () => Promise.resolve(),
      entries: () => Promise.resolve([]),
      getEntry: () => Promise.resolve({ data: {} }),
      persistEntry: () => Promise.resolve(),
      deleteEntry: () => Promise.resolve(),
    });
  } else {
    console.warn("⌛ CMS henüz hazır değil, tekrar denenecek...");
    setTimeout(waitForCMS, 100); // 100ms sonra tekrar dene
  }
})();
