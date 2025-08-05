export default async (request) => {
  const config = {
    domain: import.meta.env.AUTH0_DOMAIN,
    clientId: import.meta.env.AUTH0_CLIENT_ID
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
