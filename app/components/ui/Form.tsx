import React from "react";
import Button from "./Button";
import { IQuestion } from "@/app/types/interfaces";

interface IProps {
  question: IQuestion;
  type: "add" | "edit";
  handleSubmit: () => void;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const Form: React.FC<IProps> = ({
  question,
  type,
  handleSubmit,
  handleChange,
}) => {
  return (
    <div className="flex flex-col gap-5">
      {/* fields */}
      <div className="flex flex-col gap-2">
        <label htmlFor="#question" className="text-lg capitalize">
          {type === "add" ? "Enter Your Question" : "Edit Question"}
        </label>
        <input
          type="text"
          id="question"
          name="question"
          value={question?.question}
          onChange={handleChange}
          className="border border-neutral-500 dark:border-neutral-700 rounded-sm focus-within:outline-primary focus-within:outline-2 px-2 py-2 placeholder:text-foreground/50"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="#answer" className="text-lg capitalize">
          {type === "add" ? "Enter Your Answer" : "Edit Answer"}
        </label>
        <textarea
          id="answer"
          value={question?.answer}
          onChange={handleChange}
          name="answer"
          className="border border-neutral-500 dark:border-neutral-700 rounded-sm focus-within:outline-primary focus-within:outline-2 px-2 py-2 placeholder:text-foreground/50"
        ></textarea>
      </div>
      <Button
        onClick={handleSubmit}
        disabled={question?.question === "" || question?.answer === ""}
      >
        {type === "add" ? "Add" : "Edit"} Question
      </Button>
    </div>
  );
};

export default Form;
