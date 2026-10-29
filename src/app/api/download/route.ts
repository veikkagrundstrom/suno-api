import { NextResponse, NextRequest } from "next/server";
import { sunoApi } from "@/lib/SunoApi";
import { corsHeaders } from "@/lib/utils";

export const dynamic = "force-dynamic";

const json = (body: unknown, status = 200) =>
  new NextResponse(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', ...corsHeaders } });

/** GET /api/download?id=CLIP&format=wav|mp3|m4a: one poll of Suno's download preparation (see SunoApi.getDownload). */
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.searchParams.get('id');
  const format = (url.searchParams.get('format') ?? 'wav') as 'wav' | 'mp3' | 'm4a';
  if (!id) return json({ error: 'Missing parameter id' }, 400);
  if (!['wav', 'mp3', 'm4a'].includes(format)) return json({ error: 'format must be wav, mp3 or m4a' }, 400);
  try {
    return json(await (await sunoApi()).getDownload(id, format));
  } catch (error: any) {
    console.error('Error preparing download:', error?.response?.status ?? error?.message);
    return json({ error: 'Internal server error' }, 500);
  }
}

export async function OPTIONS() {
  return new Response(null, { status: 200, headers: corsHeaders });
}
