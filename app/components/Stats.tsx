"use client";

import React from "react";
import Button from "./ui/Button";
import { useQusetionsContext } from "../contexts/QuestionsContext";
import { toast } from "react-toastify";

const Stats: React.FC = () => {
  const { questions, setQuestions } = useQusetionsContext();

  const clearList = () => {
    setQuestions([]);
    toast.success("Questions list is cleared successfully!");
  };
  return (
    <div className="flex flex-col xl:flex-row gap-2 xl:items-center xl:justify-between">
      <p className="text-lg">
        You have {questions.length}{" "}
        {questions.length === 1 ? "question" : "questions"} in your questions
        bank
      </p>
      <Button
        className="bg-red-800/85! hover:bg-red-800! transition-colors"
        onClick={clearList}
      >
        Clear List
      </Button>
    </div>
  );
};

export default Stats;
