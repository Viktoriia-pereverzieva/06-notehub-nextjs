import getNote from "@/lib/api";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import NoteDetailsClient from './NoteDetails.client';

interface NotePageProps {
  params: { id: string };
}

export default async function Details({params} : NotePageProps) {

    const { id } = await params;
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['note', id],
        queryFn: () => getNote(id),
    })

    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NoteDetailsClient />
      </HydrationBoundary>
    );
}




??????????