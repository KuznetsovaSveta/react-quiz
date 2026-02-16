import type { IQuestion } from "../../hooks/useData";
import { hashIndex } from "../../utils/hash";

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
  const correctAnswersCount = selectedAnswers.reduce(
    (count, answerIndex, index) => {
      // Если на вопрос не ответили (answerIndex === -1 или undefined)
      if (
        answerIndex === undefined ||
        answerIndex === -1 ||
        answerIndex === null
      ) {
        return count;
      }

      // ✅ Хешируем выбранный индекс и сравниваем с хешем из вопроса
      const isCorrect =
        hashIndex(answerIndex) === questions[index]?.correctAnswerHash;

      return isCorrect ? count + 1 : count;
    },
    0,
  );

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
      <div className="text-center max-w-[95%] m-auto p-8 border rounded-lg">
        <h2 className="text-2xl font-bold green">🎉 Результаты квиза 🎉</h2>

        <div className="text-xl green">
          <div className="mt-2">
            <span className="">Правильных ответов: </span>
            <span className="underline">
              {correctAnswersCount}&nbsp;из&nbsp;{totalQuestions}
            </span>
          </div>

          <div className="mt-2">
            <span className="">Набрано баллов: </span>
            <span className="">{score}</span>
          </div>
        </div>

        <div className="funny-phrase text-xl mt-2">{getPhrase(percentage)}</div>

        <div className="flex gap-4 align-center justify-center mt-4 flex-wrap">
          <button
            onClick={onRestart}
            className="bg-green text-white py-2 px-4 text-white rounded-lg cursor-pointer max-[520px]:w-full"
          >
            Сыграть еще раз
          </button>
          <button
            onClick={toCategories}
            className="bg-green text-white py-2 px-4 text-white rounded-lg cursor-pointer max-[520px]:w-full"
          >
            Попробовать другие квизы
          </button>
        </div>
      </div>
    </>
  );
};
export default Results;



// для достижений
// const getAchievements = () => {
//     const achievements = [];
//     if (percentage === 100) achievements.push({ name: 'Идеально!', icon: '🏆' });
//     if (percentage >= 80) achievements.push({ name: 'Хорошист', icon: '🌟' });
//     if (correctAnswersCount > 0) achievements.push({ name: 'Новичок', icon: '🌱' });
//     if (score > 100) achievements.push({ name: 'Охотник за баллами', icon: '⚡' });
//     return achievements;
//   };

//   const achievements = getAchievements();

//   {/* Достижения */}
//       {achievements.length > 0 && (
//         <div className="flex gap-2 justify-center my-4 flex-wrap">
//           {achievements.map((ach, idx) => (
//             <div key={idx} className="flex items-center gap-1 bg-yellow-100 px-3 py-1 rounded-full">
//               <span>{ach.icon}</span>
//               <span className="text-sm">{ach.name}</span>
//             </div>
//           ))}
//         </div>
//       )}