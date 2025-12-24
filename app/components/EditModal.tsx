import React from "react";
import Modal from "./ui/Modal";
import Form from "./ui/Form";
import { IQuestion } from "../types/interfaces";
import { useQusetionsContext } from "../contexts/QuestionsContext";
import { toast } from "react-toastify";
import CloseIcon from "./icons/CloseIcon";
import Button from "./ui/Button";

interface IProps {
  currentQuestion: IQuestion;
  setCurrentQuestion: React.Dispatch<React.SetStateAction<IQuestion>>;
  handleEditModalStatus: () => void;
}

const EditModal: React.FC<IProps> = ({
  currentQuestion,
  setCurrentQuestion,
  handleEditModalStatus,
}) => {
  const { questions, setQuestions } = useQusetionsContext();

  //———————————————————————————————— handlers ————————————————————————————————
  const handleSubmit = () => {
    const updatedQuestions = questions.map((item) =>
      item.id === currentQuestion.id
        ? {
            ...currentQuestion,
          }
        : item
    );
    setQuestions(updatedQuestions);
    handleEditModalStatus();
    toast.success("Question is edited successfully!");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCurrentQuestion((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.name === "hasPriority"
          ? +(e.target as HTMLInputElement).checked
          : e.target.value,
    }));
  };

  return (
    <>
      <Modal handleModalStatus={handleEditModalStatus}>
        <header className="relative">
          <h2 className="font-bold text-xl md:text-2xl text-center">
            Edit Your Question
          </h2>
          <Button
            className="bg-transparent hover:bg-transparent p-0.5! hover:scale-110 transition-transform duration-300 absolute end-0 top-0"
            onClick={handleEditModalStatus}
          >
            <CloseIcon className="size-5" />
          </Button>
        </header>
        {/* edit form */}
        <div className="my-5 flex gap-4 items-center">
          <label htmlFor="#priority" className="text-lg">
            Has High Priority?
          </label>
          <input
            type="checkbox"
            name="hasPriority"
            onChange={handleChange}
            className="size-4"
            defaultChecked={currentQuestion.hasPriority === 1}
          />
        </div>
        <Form
          question={currentQuestion}
          type="edit"
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
      </Modal>
    </>
  );
};

export default EditModal;
