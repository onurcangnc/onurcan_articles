export default async (request) => {
  const config = {
    domain: Deno.env.get("AUTH0_DOMAIN"),
    clientId: Deno.env.get("AUTH0_CLIENT_ID")
  };

  return new Response(
    `export const AUTH0_CONFIG = ${JSON.stringify(config)};`,
    {
      headers: {
        "Content-Type": "application/javascript",
        "Cache-Control": "no-store"
      }
    }
  );
};
