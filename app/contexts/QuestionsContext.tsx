"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { IQuestion } from "../types/interfaces";

interface IQuestionsContext {
  questions: IQuestion[];
  setQuestions: React.Dispatch<React.SetStateAction<IQuestion[]>>;
}

const QuestionsContext = createContext<IQuestionsContext>({
  questions: [],
  setQuestions: () => {},
});

const QuestionsContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  //———————————————————————————————— get stored questions ————————————————————————————————
  useEffect(() => {
    if (typeof window !== undefined) {
      const savedQuestions = localStorage.getItem("questions");
      if (savedQuestions) {
        setQuestions(JSON.parse(savedQuestions));
      }
    }
  }, []);

  //———————————————————————————————— store updated questions ————————————————————————————————
  useEffect(() => {
    if (typeof window !== undefined) {
      localStorage.setItem("questions", JSON.stringify(questions));
    }
  }, [questions]);

  return (
    <QuestionsContext.Provider value={{ questions, setQuestions }}>
      {children}
    </QuestionsContext.Provider>
  );
};

export const useQusetionsContext = () => {
  const context = useContext(QuestionsContext);
  if (!context)
    throw new Error(
      "useQuestionsContext must be used within an QuestionsContextProvider"
    );

  return context;
};

export default QuestionsContextProvider;
