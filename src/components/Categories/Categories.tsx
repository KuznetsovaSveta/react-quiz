import Title from "../Title/Title.tsx";
import Loader from "../Loader/Loader.tsx";
import Error from "../Error/Error.tsx";
import { useData } from "../../hooks/useData.ts";
import { type IQuestion } from "../../hooks/useData.ts";

interface CategoriesProps {
  setCurrentCategoryQuestions: React.Dispatch<
    React.SetStateAction<IQuestion[]>
  >;
}
const Categories: React.FC<CategoriesProps> = ({
  setCurrentCategoryQuestions,
}) => {
  const { categories, questions, error, loading } = useData();

  const handleCategoryClick = (categoryId: number) => {
    // получаем массив объектов, отфильтрованных по category.id
    // cохраняем отфильтрованные вопросы в currentCategoryQuestions
    setCurrentCategoryQuestions(
      questions.filter((question) => question.categoryId === categoryId),
    );
  };

  return (
    <>
      <div className="text-center m-auto">
        <Title>Прежде чем начать, выберите тему викторины:</Title>
        {loading && <Loader />}
        {error && <Error error={error} />}
        {categories.map((category) => (
          <div
            className="flex flex-col align-center text-center max-w-lg mx-auto"
            key={category.id}
          >
            <div
              className="cursor-pointer mb-4 p-2 btn rounded-lg green text-lg"
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.categoryName}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Categories;
