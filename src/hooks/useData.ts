import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";

export interface ICategory {
  id: number;
  categoryName: string;
}

export interface IQuestion {
  id: number;
  categoryId: number;
  question: string;
  answers: string[];
  correctAnswerId: number;
}

export const useData = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setError("");
      setLoading(true);
      const response = await axios.get(
        `https://fc5db58eb68fdaca.mokky.dev/categories`,
      );
      const data = response.data;
      setCategories(data[0].categories || []);
      setQuestions(data[1].questions || []);
      setLoading(false);
    } catch (e: unknown) {
      const error = e as AxiosError;
      setLoading(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return { getData, categories, questions, setQuestions, error, loading };
};
