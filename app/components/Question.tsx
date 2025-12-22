"use client";

import React, { useEffect, useMemo } from "react";
import { IQuestion } from "../types/interfaces";
import Chevron from "./ui/Chevron";
import Button from "./ui/Button";
import { useQusetionsContext } from "../contexts/QuestionsContext";
import { toast } from "react-toastify";

interface IProps {
  question: IQuestion;
  selectedQuestion: IQuestion | null;
  onSetSelectedQuestion: (question: IQuestion | null) => void;
}

const Question: React.FC<IProps> = ({
  question,
  onSetSelectedQuestion,
  selectedQuestion,
}) => {
  const { questions, setQuestions } = useQusetionsContext();

  const isQuestionSelected = useMemo(
    () => selectedQuestion !== null && selectedQuestion?.id === question?.id,
    [selectedQuestion, question?.id]
  );

  useEffect(() => {
    onSetSelectedQuestion(questions.length ? questions[0] : null);
  }, []);

  //———————————————————————————————— handlers ————————————————————————————————
  const editQuestionPriority = (id: string) => {
    const updatedQuestions = questions.map((item) =>
      item.id === id ? { ...item, hasPriority: !item.hasPriority } : item
    );

    setQuestions(updatedQuestions);
    toast.success("Question's priorty is changed successfully!");
  };

  const deleteQuestion = (id: string) => {
    const filteredQuestions = questions.filter((item) => item.id !== id);
    setQuestions(filteredQuestions);
    toast.success("Question is deleted successfully!");
  };

  return (
    <div className="shadow-lg">
      {/* header */}
      <div
        className={`flex justify-between items-center gap-2 px-4 py-2 rounded-t-sm transition-colors cursor-pointer ${
          isQuestionSelected
            ? "rounded-b-none bg-primary text-neutral-50"
            : "rounded-b-sm bg-neutral-200 dark:bg-neutral-800 text-foreground"
        }`}
        onClick={() =>
          onSetSelectedQuestion(isQuestionSelected ? null : question)
        }
      >
        <h2 className="text-lg md:text-xl flex items-center gap-3">
          {question.question}
          <span
            className={`${
              question.hasPriority
                ? "rounded-full w-6 h-1.5 mt-1 bg-red-900 inline-block"
                : ""
            }`}
          ></span>
        </h2>
        <Chevron
          className={`text-foreground size-5 transition-transform duration-300 ${
            isQuestionSelected && "text-neutral-50 rotate-180"
          }`}
        />
      </div>
      {/* content */}
      <div
        className={`grid transition-[grid-template-rows] duration-300 overflow-hidden ${
          isQuestionSelected ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="p-4 bg-neutral-200 dark:bg-neutral-800 rounded-b-sm ">
            {/* answer */}
            <p>{question.answer}</p>

            {/* action */}
            <div className="flex gap-4 ms-auto w-fit">
              <Button
                className="bg-transparent hover:bg-transparent border border-foreground/50 px-4! py-2! text-xs capitalize font-normal text-foreground! hover:text-primary!"
                onClick={() => editQuestionPriority(question.id as string)}
              >
                edit priority
              </Button>
              <Button
                className="bg-transparent hover:bg-transparent p-1! text-xs hover:scale-110 transition-transform duration-300"
                onClick={() => deleteQuestion(question.id as string)}
              >
                ❌
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;
