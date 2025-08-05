export default async (request, context) => {
  const token = request.headers.get("authorization")?.replace("Bearer ", "");

  if (!token) {
    return new Response("Unauthorized", { status: 401 });
  }

  const response = await fetch(`https://${process.env.AUTH0_DOMAIN}/userinfo`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    return new Response("Forbidden", { status: 403 });
  }

  const user = await response.json();

  // Sadece senin kullanıcı adınla erişim ver
  if (user.nickname !== "onurcangnc") {
    return new Response("Access Denied", { status: 403 });
  }

  return context.next();
};
