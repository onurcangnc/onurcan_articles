const jwt = require("jsonwebtoken");

const SECRET = "super_secret_key";

exports.handler = async (event) => {
  const authHeader = event.headers.authorization || "";
  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, SECRET);
    return {
      statusCode: 200,
      body: JSON.stringify({ user: decoded }),
    };
  } catch (err) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: "Invalid token" }),
    };
  }
};
