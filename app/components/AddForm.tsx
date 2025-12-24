"use client";

import React, { useState } from "react";
import { IQuestion } from "../types/interfaces";
import Form from "./ui/Form";
import { useQusetionsContext } from "../contexts/QuestionsContext";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const AddForm: React.FC = () => {
  const [question, setQuestion] = useState<IQuestion>({
    question: "",
    answer: "",
    hasPriority: 0,
  });

  const { setQuestions } = useQusetionsContext();

  //———————————————————————————————— handlers ————————————————————————————————
  const handleSubmit = () => {
    setQuestions((prev) => [...prev, { ...question, id: uuidv4() }]);
    setQuestion({ question: "", answer: "", hasPriority: 0 });
    toast.success("Question is added successfully!");
  };

  //———————————————————————————————— AddForm handlers ————————————————————————————————
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setQuestion((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="bg-neutral-50 dark:bg-neutral-800 p-5 rounded-sm shadow-lg shadow-neutral-300 dark:shadow-neutral-900">
      <h1 className="font-bold capitalize text-xl md:text-3xl text-center mb-5">
        Write down your questions
      </h1>
      {/* fields */}
      <Form
        question={question}
        type="add"
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
    </div>
  );
};

export default AddForm;
