/*  ********  KENDİ BACKEND’İMİZ  ******** */
CMS.registerBackend("custom", class {
  constructor(config) {
    this.config = config;
    this.url    = config.get("entries_url");   // /.netlify/functions/entry
  }

  auth() {
    const token = localStorage.getItem("auth_token");
    if (!token) throw new Error("Not logged in");
    return { token };
  }

  _req(url, opts = {}) {
    const token = localStorage.getItem("auth_token");
    return fetch(url, {
      ...opts,
      headers: { ...(opts.headers || {}), Authorization: `Bearer ${token}` },
    }).then(r => r.json());
  }

  listEntries()           { return this._req(this.url); }
  getEntry(slug)          { return this._req(`${this.url}?slug=${slug}`); }
  persistEntry(entry)     { return this._req(this.url, {method: "POST", body: JSON.stringify(entry)}); }
  updateEntry(entry)      { return this._req(this.url, {method: "PUT",  body: JSON.stringify(entry)}); }
  deleteEntry(slug)       { return this._req(`${this.url}?slug=${slug}`, {method: "DELETE"}); }
});
