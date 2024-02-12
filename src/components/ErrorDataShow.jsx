const ErrorDataShow = ({ error }) => {
  return (
    <div className="my-16 flex flex-col items-center justify-center gap-2 p-1">
      <h2 className="text-3xl font-bold">
        Something went <span className="text-red-600">wrong!</span>
      </h2>
      <code>{error}</code>
    </div>
  );
};

export default ErrorDataShow;
