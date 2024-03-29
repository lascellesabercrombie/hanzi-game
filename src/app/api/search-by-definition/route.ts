import { db } from "@/src/database/connection";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('query')
    const data = await db.query(`SELECT *
    FROM unihan_characters
    WHERE to_tsvector('english', kdefinition) @@ to_tsquery('english', $1) LIMIT 30`, [`%${query}%`])
    return NextResponse.json(data.rows)
}