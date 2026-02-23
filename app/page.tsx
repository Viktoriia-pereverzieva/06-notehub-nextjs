"use client";

import css from "./page.module.css";
import NoteList from "@/components/NoteList/NoteList";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import type { NotesResponse } from "@/lib/api";
import { useState, useEffect } from "react";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import { useDebouncedCallback } from "use-debounce";
import { Toaster } from "react-hot-toast";
import {
  loadingError,
  searchError,
  notFoundError,
} from "@/components/Error/Error";
import { useMemo } from "react";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [inputValue, setInputValue] = useState("");

  const { data, isLoading, isError } = useQuery<NotesResponse>({
    queryKey: ["notes", currentPage, search],
    queryFn: () => fetchNotes(currentPage, search, 12),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (isError) {
      loadingError();
    }
  }, [isError]);

  const notes = useMemo(() => data?.notes ?? [], [data]);
  const totalPages = useMemo(() => data?.totalPages ?? 0, [data]);

  useEffect(() => {
    if (!isLoading && search && notes.length === 0) {
      searchError();
    }
  }, [notes, search, isLoading]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleChange = useDebouncedCallback((value: string) => {
    setSearch(value);
    setCurrentPage(1);
  }, 1000);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox
          value={inputValue}
          onChange={(value) => {
            setInputValue(value);
            handleChange(value);
          }}
        />

        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}

        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>

      {notes.length > 0 && <NoteList notes={notes} />}
      <Toaster />
      {notes.length === 0 && !isLoading && notFoundError()}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}
