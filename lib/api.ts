import axios from 'axios';
import type { Note } from '../types/note'

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export async function fetchNotes(page: number = 1, search: string = "", perPage: number = 10): Promise<NotesResponse> {
  const { data } = await api.get<NotesResponse>("/notes", {
    params: {
      page,
      perPage,
      ...(search && { search }),
    },
  });
  
  return data;
}

export async function createNote(body: Omit<Note, "id" | "createdAt" | "updatedAt"> ) : Promise<Note> { 
  const {data} = await api.post<Note>("/notes", body);
  return data;
}

export async function deleteNote(id: string): Promise <Note> {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
}

export default async function fetchNoteById(id: string): Promise <Note> {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
}