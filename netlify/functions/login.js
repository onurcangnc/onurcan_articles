const jwt = require("jsonwebtoken");

const SECRET = "super_secret_key"; // Daha sonra .env dosyasına taşı

exports.handler = async (event) => {
  const { email, password } = JSON.parse(event.body || "{}");

  // Basit kullanıcı kontrolü (dilersen e-mail bazlı rolleri çoğaltabilirsin)
  if (email === "editor@onurcan.com" && password === "123456") {
    const token = jwt.sign({ email, role: "editor" }, SECRET, { expiresIn: "1h" });

    return {
      statusCode: 200,
      body: JSON.stringify({ token }),
    };
  }

  return {
    statusCode: 401,
    body: JSON.stringify({ error: "Unauthorized" }),
  };
};
