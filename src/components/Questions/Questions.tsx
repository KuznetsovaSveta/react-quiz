import { useState } from "react";
import type { IQuestion } from "../../hooks/useData";
import AnswerButton from "../AnswerButton/AnswerButton";
import Timer from "../Timer/Timer";
import ProgressBar from "../PropgressBar/ProgressBar";
import closeIcon from "./img/close.svg";

interface QuestionsProps {
  // данные вопросов
  currentQuestion: IQuestion;
  currentQuestionIndex: number;
  currentCategoryQuestions: IQuestion[];

  // состояние игры
  selectedAnswers: number[];
  points: number;

  // фунции изменения состояния
  setSelectedAnswers: React.Dispatch<React.SetStateAction<number[]>>;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;

  finishQuiz: () => void;
  resetQuiz: () => void;
}

const Questions = ({
  currentQuestion,
  currentQuestionIndex,
  currentCategoryQuestions,
  selectedAnswers,
  points,
  setSelectedAnswers,
  setScore,
  setCurrentQuestionIndex,
  finishQuiz,
  resetQuiz,
}: QuestionsProps) => {
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [timerResetTrigger, setTimerResetTrigger] = useState(0); //триггер для сброса таймера
  const handleAnswerSelect = (answerIndex: number) => {
    // Сохраняем выбранный ответ
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newSelectedAnswers);

    // проверяем правильность данного ответа
    const isCorrect = answerIndex === currentQuestion.correctAnswerId;

    // если правильно - добавляем баллы
    if (isCorrect) {
      setScore((prev) => prev + points);
    }

    // Останавливаем таймер после ответа
    setIsTimerActive(false);
  };

  const progressPercentage =
    currentCategoryQuestions.length > 0
      ? (currentQuestionIndex / currentCategoryQuestions.length) * 100
      : 0;
  const toNextQuestion = () => {
    // если есть еще вопросы, переходим к следующему
    if (currentQuestionIndex < currentCategoryQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      // ✅ Сбрасываем таймер для нового вопроса
      setTimerResetTrigger((prev) => prev + 1);
      setIsTimerActive(true);
    } else {
      finishQuiz();
      setTimerResetTrigger((prev) => prev + 1);
    }
  };

  const handleTimeUp = () => {
    console.log("Время вышло! Вопрос не засчитан");
    // Отмечаем, что на вопрос не ответили
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestionIndex] = -1;
    setSelectedAnswers(newSelectedAnswers);

    setTimeout(() => {
      toNextQuestion();
    }, 3000);
  };

  return (
    <>
      <div className="text-center m-auto max-w-3xl">
        <Timer
          onTimeUp={handleTimeUp}
          isActive={isTimerActive}
          resetTrigger={timerResetTrigger}
          initialTime={10}
          key={currentQuestionIndex}
        />
        <div className="guestion__top flex max-w-lg m-auto mb-4 gap-4">
          <div
            className="close rounded-lg p-3 green-border items-center flex cursor-pointer"
            onClick={resetQuiz}
          >
            <img src={closeIcon} alt="close" className="w-6" />
          </div>
          <ProgressBar
            progressPercentage={progressPercentage}
            currentQuestionIndex={currentQuestionIndex}
            currentCategoryQuestions={currentCategoryQuestions}
          />
        </div>

        <h2 className="text-2xl font-bold green">{currentQuestion.question}</h2>

        {/* Варианты ответов - берем из currentQuestion.answers */}
        <div className="flex flex-col align-center text-center max-w-lg mx-auto mt-6">
          {currentQuestion.answers.map((answer, index) => (
            <AnswerButton
              key={index}
              answer={answer}
              index={index}
              currentQuestion={currentQuestion}
              selectedAnswers={selectedAnswers}
              currentQuestionIndex={currentQuestionIndex}
              handleAnswerSelect={handleAnswerSelect}
            />
          ))}
          <button
            className="bg-green text-white py-2 px-4 text-white rounded-lg cursor-pointer disabled:cursor-default next"
            disabled={selectedAnswers[currentQuestionIndex] == null}
            onClick={toNextQuestion}
          >
            {currentQuestionIndex < currentCategoryQuestions.length - 1
              ? "Следующий вопрос"
              : "К результатам"}
          </button>
        </div>
      </div>
    </>
  );
};
export default Questions;
