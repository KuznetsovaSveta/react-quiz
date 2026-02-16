import { useState, useEffect, useRef } from "react";

interface TimerProps {
  initialTime?: number;
  isActive: boolean;
  onTimeUp: () => void;
  resetTrigger: number; //триггер для сброса таймера
}

const Timer = ({
  initialTime = 30,
  onTimeUp,
  isActive,
  resetTrigger,
}: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const timerRef = useRef<NodeJS.Timeout>();
  const timeUpCalledRef = useRef(false); // Флаг для защиты
  const isMountedRef = useRef(true); // Флаг монтирования

  // каждую секунду уменьшаем время
  useEffect(() => {
    // не запускаем таймер, если не активен
    if (!isActive) return;

    // Очищаем предыдущий интервал
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timeUpCalledRef.current = false;
    isMountedRef.current = true;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        // Проверяем, что компонент всё ещё смонтирован
        if (!isMountedRef.current) return prev;

        if (prev <= 1) {
          clearInterval(timerRef.current);

          // ✅ Вызываем ТОЛЬКО ОДИН РАЗ
          if (!timeUpCalledRef.current) {
            timeUpCalledRef.current = true;
            onTimeUp();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      isMountedRef.current = false;
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive, resetTrigger]);

  // Расчет для кругового прогресса
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - timeLeft / initialTime);

  // Определяем цвет в зависимости от оставшегося времени
  const getColor = () => {
    if (timeLeft > 10) return "#004643"; // зеленый
    if (timeLeft > 5) return "#F8C661"; // оранжевый
    return "#E15554"; // красный
  };
  return (
    <div className="relative w-32 h-32 flex items-center justify-center m-auto mb-4">
      {/* SVG круг */}
      <svg className="absolute w-full h-full transform -rotate-90">
        {/* Фоновый круг */}
        <circle
          cx="64"
          cy="64"
          r={radius}
          stroke="#F3F7F4"
          strokeWidth="4"
          fill="none"
        />
        {/* Анимированный круг */}
        <circle
          cx="64"
          cy="64"
          r={radius}
          stroke={getColor()}
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{
            transition: "stroke-dashoffset 1s linear, stroke 0.3s ease",
          }}
        />
      </svg>

      {/* Центр с временем */}
      <div className="absolute flex flex-col items-center justify-center">
        <span
          className={`text-4xl font-bold transition-colors duration-300 ${
            timeLeft <= 5 ? "red" : timeLeft <= 10 ? "yellow" : "green"
          }`}
        >
          {timeLeft}
        </span>
      </div>
    </div>
  );
};

export default Timer;
