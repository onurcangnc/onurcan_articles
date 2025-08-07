if (typeof window.CMS !== "undefined") {
  window.CMS.registerBackend("custom", {
    init: () => Promise.resolve(),
    authComponent: null,
    entries: () =>
      Promise.resolve([
        {
          title: "Test İçerik",
          body: "Bu sadece testtir.",
          id: 1,
        },
      ]),
  });
} else {
  console.error("❌ CMS henüz tanımlı değil. Backend register edilemedi.");
}
