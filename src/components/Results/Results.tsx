import { useState } from "react";
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
  const [showDetails, setShowDetails] = useState(false);
  
  const isAnswerValid = (answerIndex: number | null | undefined): boolean => {
    return answerIndex !== undefined && answerIndex !== null && answerIndex !== -1;
  };

  const correctAnswersCount = selectedAnswers.reduce((count, answerIndex, index) => {
    if (!isAnswerValid(answerIndex)) return count;
    
    const isCorrect = hashIndex(answerIndex!) === questions[index]?.correctAnswerHash;
    return isCorrect ? count + 1 : count;
  }, 0);

  const totalQuestions = questions.length;
  const percentage = totalQuestions > 0
    ? Math.round((correctAnswersCount / totalQuestions) * 100)
    : 0;

  const getPhrase = (percentage: number): string => {
    const phrases = {
      100: "Вы просто гений! Снимаем шляпу! 🎩",
      90: "Браво! Всего пара вопросов отделяют вас от совершенства! 👏",
      75: "Солидный результат! Есть куда стремиться! 🎯",
      50: "Неплохо! Вы кое-что знаете! 😊",
      25: "Есть куда расти! Не сдавайтесь! 🌱",
      1: "Не расстраивайтесь! В следующий раз будет лучше! 💫",
      0: "Первый блин комом! Зато попробовали! 🥞"
    };

    if (percentage === 100) return phrases[100];
    if (percentage >= 90) return phrases[90];
    if (percentage >= 75) return phrases[75];
    if (percentage >= 50) return phrases[50];
    if (percentage >= 25) return phrases[25];
    if (percentage >= 1) return phrases[1];
    return phrases[0];
  };

  return (
    <div className="text-center max-w-[95%] m-auto p-8 border rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold green mb-4">🎉 Результаты квиза 🎉</h2>

      {/* Круговой прогресс */}
      <div className="relative w-36 h-36 mx-auto my-4">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="8"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={percentage === 100 ? "#004643" : percentage >= 50 ? "#F8C661" : "#E15554"}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 45}`}
            strokeDashoffset={`${2 * Math.PI * 45 * (1 - percentage / 100)}`}
            transform="rotate(-90 50 50)"
            style={{ transition: "stroke-dashoffset 0.5s ease" }}
          />
          <text
            x="50"
            y="50"
            textAnchor="middle"
            dy="0.3em"
            className="text-2xl font-bold fill-current"
          >
            {percentage}%
          </text>
        </svg>
      </div>

      {/* Статистика */}
      <div className="text-xl green space-y-2">
        <div className="flex justify-center gap-2">
          <span>Правильных ответов:</span>
          <span className="font-bold underline">
            {correctAnswersCount} из {totalQuestions}
          </span>
        </div>

        <div className="flex justify-center gap-2">
          <span>Набрано баллов:</span>
          <span className="font-bold">{score}</span>
        </div>
      </div>

      {/* Фраза-результат */}
      <div className="funny-phrase text-xl mt-4 p-4 bg-gray-50 rounded-lg">
        {getPhrase(percentage)}
      </div>

      {/* Кнопка деталей */}
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="text-green underline mt-4 hover:text-green-700"
      >
        {showDetails ? 'Скрыть детали' : 'Показать детали ответов'}
      </button>

      {/* Детальный разбор */}
      {showDetails && (
        <div className="mt-6 text-left border-t max-h-96 overflow-y-auto">
          <h3 className="text-xl font-bold mb-3 sticky top-0 bg-white py-2 pt-4">
            Детальный разбор:
          </h3>
          {questions.map((q, idx) => {
            const userAnswerIndex = selectedAnswers[idx];
            const isAnswered = isAnswerValid(userAnswerIndex);
            const isCorrect = isAnswered && 
              hashIndex(userAnswerIndex!) === q.correctAnswerHash;
            
            // Находим правильный ответ
            let correctIndex = -1;
            for (let i = 0; i < q.answers.length; i++) {
              if (hashIndex(i) === q.correctAnswerHash) {
                correctIndex = i;
                break;
              }
            }
            
            return (
              <div 
                key={idx} 
                className={`mb-4 p-3 rounded-lg ${
                  isCorrect ? 'bg-green-100' : isAnswered ? 'bg-red-100' : 'bg-gray-100'
                }`}
              >
                <p className="font-semibold mb-2">{idx + 1}. {q.question}</p>
                <p className="text-sm">
                  <span className="font-medium">Ваш ответ:</span>{' '}
                  {isAnswered ? q.answers[userAnswerIndex!] : 'Без ответа'}
                  {isAnswered && (isCorrect ? ' ✅' : ' ❌')}
                </p>
                {!isCorrect && correctIndex !== -1 && (
                  <p className="text-sm text-green-700">
                    <span className="font-medium">Правильный ответ:</span>{' '}
                    {q.answers[correctIndex]}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Кнопки действий */}
      <div className="flex gap-4 align-center justify-center mt-6 flex-wrap">
        <button
          onClick={onRestart}
          className="bg-green text-white py-2 px-6 rounded-lg cursor-pointer hover:bg-green-700 transition-colors max-[520px]:w-full"
        >
          Сыграть еще раз
        </button>
        <button
          onClick={toCategories}
          className="bg-green text-white py-2 px-6 rounded-lg cursor-pointer hover:bg-green-700 transition-colors max-[520px]:w-full"
        >
          Другие квизы
        </button>
      </div>
    </div>
  );
};

export default Results;