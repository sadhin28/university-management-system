const LoadingSpiner= ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      <p className="mt-4 text-lg font-medium text-blue-600">{message}</p>
    </div>
  );
};

export default LoadingSpiner;