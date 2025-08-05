export default async (request, context) => {
  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return new Response("401 Unauthorized: Missing token", {
      status: 401,
      headers: {
        "WWW-Authenticate": "Bearer",
      },
    });
  }

  const token = authHeader.replace("Bearer ", "");

  const res = await fetch("https://onurcangenc.eu.auth0.com/userinfo", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    return new Response("403 Forbidden: Invalid token", { status: 403 });
  }

  const user = await res.json();

  // Sadece senin erişimine izin ver
  if (user.nickname !== "onurcangnc") {
    return new Response("403 Forbidden: Unauthorized user", { status: 403 });
  }

  return context.next();
};
