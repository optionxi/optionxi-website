export async function POST(req: Request) {
  const ip =
    req.headers.get("x-real-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "";

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ detail: "bad request" }, { status: 400 });
  }

  try {
    const r = await fetch(`${process.env.FASTAPI_URL}/signup-code`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Real-IP": ip,
        "X-Internal-Key": process.env.INTERNAL_KEY!,
      },
      body: JSON.stringify(body),
    });
    return new Response(await r.text(), {
      status: r.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    // FastAPI down or unreachable
    return Response.json({ detail: "service unavailable" }, { status: 502 });
  }
}