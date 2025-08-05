function getCookie(name, cookieHeader) {
  const match = cookieHeader?.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
}

export default async (request, context) => {
  const cookieHeader = request.headers.get("cookie");
  const token = getCookie("auth_token", cookieHeader);

  if (!token) {
    return new Response("401 Unauthorized: Missing token", { status: 401 });
  }

  const domain = process.env.AUTH0_DOMAIN; // ✅ burada değişiklik yaptık

  if (!domain) {
    return new Response("500 Internal Server Error: AUTH0_DOMAIN undefined", { status: 500 });
  }

  const response = await fetch(`https://${domain}/userinfo`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    return new Response("403 Forbidden: Invalid token", { status: 403 });
  }

  const user = await response.json();

  if (user.nickname !== "onurcangnc") {
    return new Response("403 Forbidden: Access denied", { status: 403 });
  }

  return context.next();
};
