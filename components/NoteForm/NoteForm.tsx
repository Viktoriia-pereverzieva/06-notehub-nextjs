import { ErrorMessage, Field, Form, Formik } from "formik";
import css from "./NoteForm.module.css";
import { useId } from "react";
import { createNote } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as Yup from "yup";
import Loader from "../Loader/Loader";

interface NoteFormProps {
  onClose: () => void;
}

interface NoteFormValues {
  title: string;
  content: string;
  tag: string;
}

const initialValues: NoteFormValues = {
  title: "",
  content: "",
  tag: "Todo",
};

const Schema = Yup.object().shape({
  title: Yup.string()
    .min(3, "The note title must have a minimum length of 3 characters")
    .max(50, "The title is too long")
    .required("The title is required!"),
  content: Yup.string().max(500, "Content is so long"),
  tag: Yup.string()
    .oneOf(
      ["Todo", "Work", "Personal", "Meeting", "Shopping"],
      "Invalid tag value!"
    )
    .required("Tag is required"),
});

export default function NoteForm({ onClose }: NoteFormProps) {
  const fieldId = useId();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onClose();
    },
  });

  return (
    <Formik
      validationSchema={Schema}
      initialValues={initialValues}
      onSubmit={(values) => {
        mutation.mutate(values)
      }}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-title`}>Title</label>
          <Field
            type="text"
            name="title"
            className={css.input}
            id={`${fieldId}-title`}
          />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-content`}>Content</label>
          <Field
            as="textarea"
            name="content"
            rows={8}
            className={css.textarea}
            id={`${fieldId}-content`}
          />
          <ErrorMessage name="content" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <Field as="select" id="tag" name="tag" className={css.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onClose}>
            Cancel
          </button>

          <button
            type="submit"
            className={css.submitButton}
            disabled={mutation.isPending}
          >
            Create note
          </button>
          {mutation.isPending && (
            <div className={css.overlay}>
              <Loader />
            </div>
          )}
        </div>
      </Form>
    </Formik>
  );
}
