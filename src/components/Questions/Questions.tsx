import type { IQuestion } from "../../hooks/useData";
import AnswerButton from "../AnswerButton/AnswerButton";
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
  };

  const progressPercentage = currentCategoryQuestions.length > 0 
  ? (currentQuestionIndex / currentCategoryQuestions.length) * 100 
  : 0;
  const toNextQuestion = () => {
    // если есть еще вопросы, переходим к следующему
    if (currentQuestionIndex < currentCategoryQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      finishQuiz();
    }
  };

  return (
    <>
      <div className="text-center m-auto max-w-3xl">
        <div className="guestion__top flex max-w-lg m-auto mb-4 gap-4">
          <div className="close rounded-lg p-3 green-border items-center flex cursor-pointer" onClick={resetQuiz}>
            <img src={closeIcon} alt="close" className="w-6" />
          </div>
          <ProgressBar progressPercentage={progressPercentage} currentQuestionIndex={currentQuestionIndex} currentCategoryQuestions={currentCategoryQuestions}/>
        </div>

        <h2 className="text-2xl font-bold green">
          {currentQuestion.question}
        </h2>

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
