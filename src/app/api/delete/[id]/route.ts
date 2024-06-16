import { NextRequest, NextResponse } from 'next/server';

import { supabase } from '../../../../../lib/supabase';

type Props = {
  params: { id: string };
};

export async function DELETE(req: NextRequest, { params }: Props) {
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      { error: 'No document ID provided' },
      { status: 400 }
    );
  }

  try {
    const { data: document, error: fetchError } = await supabase
      .from('files')
      .select('filename')
      .eq('id', id)
      .single();

    if (fetchError) {
      return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }

    const { error: storageError } = await supabase.storage
      .from('uploads')
      .remove([document.filename]);

    if (storageError) {
      return NextResponse.json(
        { error: storageError.message },
        { status: 500 }
      );
    }

    const { error: dbError } = await supabase
      .from('files')
      .delete()
      .eq('id', id);

    if (dbError) {
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    const { data: allData } = await supabase.from('files').select('*');

    return NextResponse.json(allData || [], { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
