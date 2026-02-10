import type { IQuestion } from "../../hooks/useData";

interface ProgressBarProps{
    progressPercentage: number,
    currentQuestionIndex: number,
    currentCategoryQuestions: IQuestion[];
}

const ProgressBar = ({progressPercentage, currentQuestionIndex, currentCategoryQuestions} : ProgressBarProps) => {
  return (
    <div className="green-border rounded-lg p-3 flex items-center w-full">
      <div className="progressBar h-3 btn rounded-lg mr-4 w-full">
        <div
          className="progressBar__thin bg-green h-3 rounded-lg"
          style={{ width: `${progressPercentage}%`, minWidth: "0.3rem" }}
        ></div>
      </div>
      <span className="text-xl font-bold green whitespace-nowrap">
        {currentQuestionIndex + 1} / {currentCategoryQuestions.length}
      </span>
    </div>
  );
};

export default ProgressBar;
