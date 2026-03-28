exports.handler = async function() {
  const GHOST_URL = 'https://blog.onurcangenc.com.tr';
  const API_KEY = process.env.GHOST_CONTENT_API_KEY;

  try {
    const res = await fetch(
      `${GHOST_URL}/ghost/api/content/posts/?key=${API_KEY}&limit=6&fields=title,slug,excerpt,published_at&include=tags&filter=tag:-vuln-research`
    );
    const data = await res.json();
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message }),
    };
  }
};
