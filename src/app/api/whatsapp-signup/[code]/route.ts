export async function GET(
  _req: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  try {
    const r = await fetch(
      `${process.env.FASTAPI_URL}/signup-code/${encodeURIComponent(code)}/status`,
      { headers: { "X-Internal-Key": process.env.INTERNAL_KEY! }, cache: "no-store" }
    );
    return new Response(await r.text(), {
      status: r.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return Response.json({ detail: "service unavailable" }, { status: 502 });
  }
}