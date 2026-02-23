import toast from "react-hot-toast";

export const loadingError = () =>
  toast.error("Woops! Loading error...", {
    duration: 2000,
    position: "top-center",
  });

export const deleteError = () =>
  toast.error("Failed to delete note", {
    duration: 2000,
    position: "top-center",
  });

export const searchError = () =>
  toast.error("No notes found", {
    duration: 2000,
    position: "top-center",
  });

export const notFoundError = () =>
  toast("The list of notes is empty", {
    duration: 2000,
    position: "top-center",
  });
