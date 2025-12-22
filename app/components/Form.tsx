"use client";

import React, { useState } from "react";
import Button from "./ui/Button";
import { IQuestion } from "../types/interfaces";
import { useQusetionsContext } from "../contexts/QuestionsContext";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

const Form: React.FC = () => {
  const { setQuestions } = useQusetionsContext();

  const [question, setQuestion] = useState<IQuestion>({
    question: "",
    answer: "",
    hasPriority: false,
  });

  //———————————————————————————————— form handlers ————————————————————————————————
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setQuestion((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    setQuestions((prev) => [...prev, { ...question, id: uuidv4() }]);
    setQuestion({ question: "", answer: "", hasPriority: false });
    toast.success("Question is added successfully!");
  };

  return (
    <div className="bg-neutral-50 dark:bg-neutral-800 p-5 rounded-sm shadow-lg shadow-neutral-300 dark:shadow-neutral-900 flex flex-col gap-5">
      <h1 className="font-bold capitalize text-xl md:text-3xl text-center">
        Write down your questions
      </h1>
      {/* fields */}
      <div className="flex flex-col gap-2">
        <label htmlFor="#question" className="text-lg capitalize">
          Enter Your Question
        </label>
        <input
          type="text"
          id="question"
          name="question"
          value={question.question}
          onChange={handleChange}
          className="border border-neutral-500 dark:border-neutral-700 rounded-sm focus-within:outline-primary focus-within:outline-2 px-2 py-2 placeholder:text-foreground/50"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="#answer" className="text-lg capitalize">
          Enter Your Answer
        </label>
        <textarea
          id="answer"
          value={question.answer}
          onChange={handleChange}
          name="answer"
          className="border border-neutral-500 dark:border-neutral-700 rounded-sm focus-within:outline-primary focus-within:outline-2 px-2 py-2 placeholder:text-foreground/50"
        ></textarea>
      </div>
      <Button
        onClick={handleSubmit}
        disabled={question.question === "" || question.answer === ""}
      >
        Add Question
      </Button>
    </div>
  );
};

export default Form;
