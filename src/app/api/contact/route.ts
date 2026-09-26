import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as Record<string, string> | null;
  if (!body?.company || !body?.name || !body?.email || !/^\S+@\S+\.\S+$/.test(body.email)) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  // TODO: 通知先を接続する（Resend / Slack Webhook / CRM など）。
  // CONTACT_WEBHOOK_URL が設定されていれば JSON を転送する。
  const hook = process.env.CONTACT_WEBHOOK_URL;
  if (hook) {
    const res = await fetch(hook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...body, receivedAt: new Date().toISOString() }),
    });
    if (!res.ok) return NextResponse.json({ ok: false }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
