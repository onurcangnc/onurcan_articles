const fs = require("fs").promises;
const path = require("path");
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET;

const CONTENT_DIR = path.resolve(__dirname, "../../content/posts");

exports.handler = async (event) => {
  const authHeader = event.headers.authorization || "";
  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, SECRET);
    const { role } = decoded;

    if (!["admin", "editor", "contributor"].includes(role)) {
      return {
        statusCode: 403,
        body: JSON.stringify({ error: "Forbidden: insufficient role" }),
      };
    }

    const method = event.httpMethod;
    const slug = event.queryStringParameters?.slug || null;

    // Dosya yolu için slug + uzantı (md)
    const getFilePath = (slug) => path.join(CONTENT_DIR, `${slug}.md`);

    if (method === "GET") {
      // GET hem list hem de get-entry olabilir
      if (slug) {
        // get-entry: tek dosya oku
        try {
          const content = await fs.readFile(getFilePath(slug), "utf-8");
          return {
            statusCode: 200,
            body: JSON.stringify({ slug, content }),
          };
        } catch {
          return { statusCode: 404, body: JSON.stringify({ error: "Not found" }) };
        }
      } else {
        // list-entries: tüm dosyaları listele (sadece slug döner)
        const files = await fs.readdir(CONTENT_DIR);
        const slugs = files
          .filter((f) => f.endsWith(".md"))
          .map((f) => f.slice(0, -3));
        return {
          statusCode: 200,
          body: JSON.stringify(slugs),
        };
      }
    }

    if (method === "POST") {
      // persist-entry: yeni içerik ekle
      if (!role || role === "viewer") {
        return {
          statusCode: 403,
          body: JSON.stringify({ error: "Forbidden: insufficient role" }),
        };
      }
      const entry = JSON.parse(event.body || "{}");
      const filePath = getFilePath(entry.slug);
      try {
        await fs.writeFile(filePath, entry.content, "utf-8");
        return { statusCode: 200, body: JSON.stringify({ message: "Entry saved" }) };
      } catch (e) {
        return { statusCode: 500, body: JSON.stringify({ error: "Failed to save" }) };
      }
    }

    if (method === "PUT") {
      // update-entry: var olan içerik güncelle (sadece admin ve editor)
      if (!["admin", "editor"].includes(role)) {
        return {
          statusCode: 403,
          body: JSON.stringify({ error: "Forbidden: insufficient role" }),
        };
      }
      const entry = JSON.parse(event.body || "{}");
      const filePath = getFilePath(entry.slug);
      try {
        await fs.writeFile(filePath, entry.content, "utf-8");
        return { statusCode: 200, body: JSON.stringify({ message: "Entry updated" }) };
      } catch (e) {
        return { statusCode: 500, body: JSON.stringify({ error: "Failed to update" }) };
      }
    }

    if (method === "DELETE") {
      // delete-entry: sadece admin
      if (role !== "admin") {
        return {
          statusCode: 403,
          body: JSON.stringify({ error: "Forbidden: only admin can delete" }),
        };
      }
      const slugToDelete = slug;
      if (!slugToDelete) {
        return { statusCode: 400, body: JSON.stringify({ error: "Missing slug" }) };
      }
      try {
        await fs.unlink(getFilePath(slugToDelete));
        return { statusCode: 200, body: JSON.stringify({ message: "Entry deleted" }) };
      } catch (e) {
        return { statusCode: 500, body: JSON.stringify({ error: "Failed to delete" }) };
      }
    }

    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
  } catch (err) {
    return { statusCode: 401, body: JSON.stringify({ error: "Invalid token" }) };
  }
};
