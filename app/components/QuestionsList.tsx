"use client";

import React, { useState } from "react";
import Question from "./Question";
import { useQusetionsContext } from "../contexts/QuestionsContext";
import { IQuestion } from "../types/interfaces";
import Stats from "./Stats";

const QuestionsList: React.FC = () => {
  const { questions } = useQusetionsContext();
  const [openedQuestion, setOpenedQuestion] = useState<IQuestion | null>(null);

  //———————————————————————————————— handlers ————————————————————————————————
  const setSelectedQuestion = (question: IQuestion | null) => {
    setOpenedQuestion(question);
  };

  return (
    <>
      {questions.length === 0 ? (
        <div className="flex justify-center items-center lg:min-h-[50vh] text-2xl text-pretty text-center">
          <p>Your questions bank is empty. Start adding a new question!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {/* stats */}
          <Stats />
          {/* questions list */}
          <div className="flex flex-col gap-6">
            {questions.map((item) => (
              <Question
                question={item}
                key={item?.id}
                onSetSelectedQuestion={setSelectedQuestion}
                selectedQuestion={openedQuestion}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default QuestionsList;
