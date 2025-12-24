import React, { ReactNode } from "react";

interface IProps {
  children: ReactNode;
  handleModalStatus: () => void;
}

const Modal: React.FC<IProps> = ({ children, handleModalStatus }) => {
  return (
    <section
      className="fixed inset-0 min-h-screen bg-black/50 flex items-center justify-center px-4"
      onClick={handleModalStatus}
    >
      <div
        className="bg-background p-4 w-full sm:w-2/3 lg:w-1/2 2xl:w-1/3 mx-auto rounded-sm shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </section>
  );
};

export default Modal;
