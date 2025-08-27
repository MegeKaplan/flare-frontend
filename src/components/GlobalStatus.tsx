"use client";
import LoadingAnimation from "./LoadingAnimation";

const GlobalStatus = ({ status }: { status: { loading: boolean; error: string | null } }) => {
  const { loading, error } = status;

  if (!loading && !error) return null;

  return (
    <div className="flex flex-col items-center justify-center">
      {loading && (
        <LoadingAnimation />
      )}
      {error && (
        <div className="text-red-500 text-2xl font-semibold">
          {error}
        </div>
      )}
    </div>
  );
};

export default GlobalStatus;