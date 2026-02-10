import type { IQuestion } from "../../hooks/useData";

interface ResultsProps {
  selectedAnswers: number[];
  questions: IQuestion[];
  score: number;
  onRestart: () => void;
  toCategories: () => void;
}

const Results: React.FC<ResultsProps> = ({
  selectedAnswers,
  questions,
  score,
  onRestart,
  toCategories,
}) => {
  const correctAnswersCount = selectedAnswers.reduce((count, answer, index) => {
    return answer === questions[index]?.correctAnswerId ? count + 1 : count;
  }, 0);

  const totalQuestions = questions.length;
  const percentage =
    totalQuestions > 0
      ? Math.round((correctAnswersCount / totalQuestions) * 100)
      : 0;

  const getPhrase = (percentage: number) => {
    if (percentage === 100) return "Вы просто гений! Снимаем шляпу! 🎩";
    if (percentage >= 90 && percentage <= 99)
      return "Браво! Всего пара вопросов отделяют вас от совершенства! 👏";
    if (percentage >= 75 && percentage <= 89)
      return "Солидный результат! Есть куда стремиться! 🎯";
    if (percentage >= 50 && percentage <= 74)
      return "Неплохо! Вы кое-что знаете! 😊";
    if (percentage >= 25 && percentage <= 49)
      return "Есть куда расти! Не сдавайтесь! 🌱";
    if (percentage >= 1 && percentage <= 24)
      return "Не расстраивайтесь! В следующий раз будет лучше! 💫";
    if (percentage === 0) return "Первый блин комом! Зато попробовали! 🥞";
  };

  return (
    <>
      <div className="text-center max-w-lg m-auto p-10 border">
        <h2 className="text-2xl font-bold green">🎉 Результаты квиза 🎉</h2>

        <div className="text-xl">
          <div className="mt-2">
            <span className="">Правильных ответов: </span>
            <span className="">
              {correctAnswersCount} из {totalQuestions}
            </span>
          </div>

          <div className="mt-2">
            <span className="">Набрано баллов: </span>
            <span className="">{score}</span>
          </div>
        </div>

        <div className="funny-phrase text-xl mt-2">{getPhrase(percentage)}</div>

<div className="flex gap-6 align-center justify-center mt-4">
        <button onClick={onRestart} className="bg-green text-white py-2 px-4 text-white rounded-lg cursor-pointer">
          Сыграть еще раз
        </button>
        <button onClick={toCategories} className="bg-green text-white py-2 px-4 text-white rounded-lg cursor-pointer">
          Попробовать другие квизы
        </button>
        </div>
      </div>
    </>
  );
};
export default Results;
