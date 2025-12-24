"use client";

import React, { useEffect, useMemo, useState } from "react";
import { IQuestion } from "../types/interfaces";
import Chevron from "./ui/Chevron";
import Button from "./ui/Button";
import { useQusetionsContext } from "../contexts/QuestionsContext";
import { toast } from "react-toastify";
import EditIcon from "./icons/EditIcon";
import DeleteIcon from "./icons/DeleteIcon";
import Modal from "./ui/Modal";
import EditModal from "./EditModal";
import { close } from "node:inspector/promises";

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

  // to switch modal visibility
  const [isModalOpened, setIsModalOpened] = useState(false);
  // save current question to pass to modal
  const [currentQuestion, setCurrentQuestion] = useState<IQuestion>(question);

  // save selected question to style it
  const isQuestionSelected = useMemo(
    () => selectedQuestion !== null && selectedQuestion?.id === question?.id,
    [selectedQuestion, question?.id]
  );

  // open 1st question on mount
  useEffect(() => {
    onSetSelectedQuestion(questions.length ? questions[0] : null);
  }, []);

  //———————————————————————————————— handlers ————————————————————————————————
  const handleEditModalStatus = () => {
    setIsModalOpened((prev) => !prev);
  };

  const deleteQuestion = (id: string) => {
    const filteredQuestions = questions.filter((item) => item.id !== id);
    setQuestions(filteredQuestions);
    toast.success("Question is deleted successfully!");
  };

  return (
    <>
      {/*———————————————————————————————— question content ————————————————————————————————*/}
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
                  ? `rounded-full w-6 h-1.5 mt-1 ${
                      isQuestionSelected ? "bg-red-900" : "bg-red-800"
                    } inline-block`
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
              <div className="flex gap-2 ms-auto w-fit">
                <Button
                  className="bg-transparent hover:bg-transparent p-0.5! hover:scale-110 transition-transform duration-300"
                  onClick={handleEditModalStatus}
                >
                  <EditIcon className="size-5 text-foreground" />
                </Button>
                <Button
                  className="bg-transparent hover:bg-transparent p-0.5! hover:scale-110 transition-transform duration-300"
                  onClick={() => deleteQuestion(question.id as string)}
                >
                  <DeleteIcon className="size-5 text-foreground" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*———————————————————————————————— edit modal ————————————————————————————————*/}
      {isModalOpened && (
        <EditModal
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
          handleEditModalStatus={handleEditModalStatus}
        />
      )}
    </>
  );
};

export default Question;
