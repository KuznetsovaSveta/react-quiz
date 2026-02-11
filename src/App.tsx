import { useState } from "react";
import Header from "./components/Header/Header.tsx";
import Categories from "./components/Categories/Categories.tsx";
import Questions from "./components/Questions/Questions.tsx";
import Results from "./components/Results/Results.tsx";
import { type IQuestion } from "./hooks/useData.ts";

import "./App.css";

function App() {
  const [currentCategoryQuestions, setCurrentCategoryQuestions] = useState<
    IQuestion[]
  >([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  // const [isQuizActive, setIsQuizActive] = useState(false);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  // const [timer, setTimer] = useState(600); // 10 минут в секундах
  const points = 10;

  // Получаем текущий вопрос
  const currentQuestion = currentCategoryQuestions[currentQuestionIndex];

  // начинаем квиз с начала
  const restartQuiz = () => {
    setIsQuizFinished(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setScore(0);
  };

  // возвращаемся к выбору категорий
  const resetQuiz = () => {
    restartQuiz();
    setCurrentCategoryQuestions([]);
  };

  // завершаем квиз, смотрим результат
  const finishQuiz = () => {
    setIsQuizFinished(true);
  };

  return (
    <>
      <div className="container min-h-screen m-auto flex flex-col pb-8">
        <Header />

        {/* если категория не выбрана и игра не завершена */}
        {!currentQuestion && !isQuizFinished && (
          <Categories
            setCurrentCategoryQuestions={setCurrentCategoryQuestions}
          />
        )}
        {/* после клика на категорию подгружаем вопросы */}
        {currentQuestion && !isQuizFinished && (
          <>
            <Questions
              currentQuestion={currentQuestion}
              currentQuestionIndex={currentQuestionIndex}
              currentCategoryQuestions={currentCategoryQuestions}
              selectedAnswers={selectedAnswers}
              points={points}
              setSelectedAnswers={setSelectedAnswers}
              setScore={setScore}
              setCurrentQuestionIndex={setCurrentQuestionIndex}
              finishQuiz={finishQuiz}
              resetQuiz={resetQuiz}
            />
          </>
        )}
        {isQuizFinished && (
          <Results
            selectedAnswers={selectedAnswers}
            questions={currentCategoryQuestions}
            score={score}
            onRestart={restartQuiz}
            toCategories={resetQuiz}
          />
        )}
      </div>
    </>
  );
}

export default App;
