function waitForCMS(attempts = 0) {
  if (window.CMS) {
    console.log("✅ CMS bulundu, backend register ediliyor...");
    window.CMS.registerBackend("custom", {
      init: () => Promise.resolve(),
      authComponent: null,
      entriesByFolder: () => Promise.resolve([]),
      getEntry: () => Promise.resolve({}),
      // Diğer gerekli metotları burada tanımlayabilirsin
    });
  } else {
    if (attempts > 20) {
      console.error("❌ CMS hala tanımlı değil. Kayıt başarısız.");
      return;
    }
    console.warn("⏳ CMS yüklenmedi, tekrar denenecek...");
    setTimeout(() => waitForCMS(attempts + 1), 300);
  }
}

waitForCMS();
