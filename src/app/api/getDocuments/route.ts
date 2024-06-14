import { NextResponse } from "next/server";
import { supabase } from "../../../../lib/supabase";

export async function GET() {
    const { data, error } = await supabase
    .from('files')
    .select('*');

    if(error){
        return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
}
