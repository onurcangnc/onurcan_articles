(function waitForCMS(retryCount = 0) {
  if (window.CMS && typeof window.CMS.registerBackend === "function") {
    console.log("✅ CMS bulundu. Custom backend kaydediliyor...");
    window.CMS.registerBackend("custom", {
      // Sadece boş yapılandırma bırakıyoruz; config.yml kullanacak
      init: () => console.log("📦 Custom backend init."),
    });
  } else {
    if (retryCount > 50) {
      console.error("❌ CMS hala tanımlı değil. Kayıt başarısız.");
      return;
    }
    // 100ms sonra tekrar dene
    setTimeout(() => waitForCMS(retryCount + 1), 100);
  }
})();
