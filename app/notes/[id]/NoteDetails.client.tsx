'use client';

import { useQuery } from "@tanstack/react-query";


export default function NoteDetailsClient({ id }: { id: string }) {
  
     const { data, isLoading } = useQuery({
    queryKey: ["note", id],
    queryFn: () => getNote(id),
  });

  return <div>{data.title}</div>;
}


        </>
    )
}


?????????????