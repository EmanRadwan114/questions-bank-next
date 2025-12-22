import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import "./globals.css";
import QuestionsContextProvider from "./contexts/QuestionsContext";
import { ToastContainer } from "react-toastify";

const oswaldFont = Oswald({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Questions Bank",
  description:
    "A modern questions bank app that allows users to manage a collection of questions and their answers, prioritize important questions, and maintain a clean, organized question list.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${oswaldFont.className} antialiased`}
        suppressHydrationWarning
      >
        <ToastContainer />
        <QuestionsContextProvider>{children}</QuestionsContextProvider>
      </body>
    </html>
  );
}
