import { resolvePTWOption } from "@/app/lib/data/resolveOptions";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const { username, optionid, outcome, secretkey } = await request.json();
    try {
        const result = await resolvePTWOption(username, optionid, outcome, secretkey);
        if(result.success) {
            return new Response(JSON.stringify(result), { status: 201 });
        }
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
}