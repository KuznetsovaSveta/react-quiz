import type { IQuestion } from "../../hooks/useData";

interface AnswerButtonProps {
    index: number;
    answer: string;
    currentQuestion: IQuestion;
    selectedAnswers: (number | null)[];
    currentQuestionIndex: number;
    handleAnswerSelect: (index: number) => void;
  }

  const AnswerButton: React.FC<AnswerButtonProps> = ({
    index,
    answer,
    currentQuestion,
    selectedAnswers,
    currentQuestionIndex,
    handleAnswerSelect,
  }) => {
    const isSelected = selectedAnswers[currentQuestionIndex] === index;
    const isCorrect = index === currentQuestion.correctAnswerId;
    const isAnswered = selectedAnswers[currentQuestionIndex] !== undefined;

    const buttonClasses = `
    cursor-pointer mb-4 p-2 rounded-lg answ answer-button transition-all duration-300 btn
    ${!isAnswered ? "hover:bg-slate-300" : ""}
    ${isSelected && isCorrect ? "right-answer" : ""}
    ${isSelected && !isCorrect ? "wrong-answer" : ""}
    ${!isSelected && isAnswered && isCorrect ? "right-answer" : ""}
    ${isAnswered && !isSelected && !isCorrect ? "opacity-50" : ""}
  `;

    return (
      <button
        onClick={() => !isAnswered && handleAnswerSelect(index)}
        className={buttonClasses}
        disabled={isAnswered}
      >
        {answer}
      </button>
    );
  };

export default AnswerButton;