import { NextRequest, NextResponse } from 'next/server';

import { supabase } from '../../../../lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const dbStorageUrl = "https://kppvkcacgsbqvcafzkyv.supabase.co/storage/v1/object/public/uploads/";
    const file = formData.get('file') as File;
    const description = formData.get('description') as string;
    const uploader = formData.get('uploader') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const fileName = `${Date.now()}-${file.name}`;

    const { data: storageRes, error: storageError } = await supabase.storage
      .from('uploads')
      .upload(fileName, file);

      
    if (storageError) {
      return NextResponse.json({ error: storageError.message }, { status: 500 });
    }
    
    const { error: dbError } = await supabase.from('files')
      .insert([
        {
          filename: fileName,
          description, 
          date: new Date().toISOString(),
          filetype: file.type,
          url: dbStorageUrl + storageRes.path,
          uploader,
        },
      ])
      .select(); 

    if (dbError) {
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    const { data: allData, error: fetchError } = await supabase
      .from('files')
      .select('*');

    if (fetchError) {
      return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }

    return NextResponse.json(allData, { status: 200 });
  } catch (error) {
    
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
