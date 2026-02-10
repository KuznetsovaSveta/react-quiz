interface ErrorProps {
    error: string
}

const Error = ({error}: ErrorProps) => {
  return (
    <h2 className="flex align-center justify-center text-red-600 text-2xl font-bold">
      {error}
    </h2>
  );
};
export default Error;
