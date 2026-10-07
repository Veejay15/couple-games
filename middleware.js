// Vercel Routing Middleware: puts the whole site behind a password.
// Set GAME_PASSWORD in Vercel → Project → Settings → Environment Variables, then redeploy.
// The browser asks for a username and password: the username can be anything.

export default function middleware(request) {
  const password = process.env.GAME_PASSWORD;
  if (!password) {
    return new Response("Locked. Set GAME_PASSWORD in Vercel, then redeploy.", { status: 503 });
  }

  const [scheme, encoded] = (request.headers.get("authorization") || "").split(" ");
  if (scheme === "Basic" && encoded) {
    try {
      const decoded = atob(encoded);
      if (decoded.slice(decoded.indexOf(":") + 1) === password) {
        // Same header the @vercel/functions next() helper sets: let the request through.
        return new Response(null, { headers: { "x-middleware-next": "1" } });
      }
    } catch {}
  }

  return new Response("Just the two of us.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Between Us", charset="UTF-8"' },
  });
}
