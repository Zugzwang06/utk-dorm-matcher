import { useState } from "react";
import "./App.css";
import HomePage from "./Homepage";
import QuizPage from "./Quizpage";

export default function App() {
  const [page, setPage] = useState("home"); // "home" | "quiz"

  return (
    <>
      {page === "home" && <HomePage onStartQuiz={() => setPage("quiz")} />}
      {page === "quiz" && <QuizPage onBack={() => setPage("home")} />}
    </>
  );
}
