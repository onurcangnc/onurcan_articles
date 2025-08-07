(function waitForCMS() {
  if (window.CMS && typeof window.CMS.registerBackend === "function") {
    console.log("✅ CMS bulundu");

    window.CMS.registerBackend("custom", {
      init: () => Promise.resolve(),
      auth: async () => ({ token: "dummy" }),
      entries: async () => [],
      getEntry: async () => null,
      persistEntry: async () => {},
      deleteEntry: async () => {},
    });

    console.log("✅ Custom backend başarıyla register edildi.");

    // 🔥 Backend başarıyla eklendikten sonra CMS başlat!
    window.CMS.init({ config: "/admin/config.yml" });
  } else {
    console.log("⏳ CMS bekleniyor...");
    setTimeout(waitForCMS, 100);
  }
})();
