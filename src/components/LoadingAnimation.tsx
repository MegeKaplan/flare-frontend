const LoadingAnimation = () => {
  return (
    <div className="flex items-center justify-center relative animate-ping">
      <div className="absolute animate-spin rounded-full size-32 border-t-2 border-b-2 border-zinc-800"></div>
      <div className="absolute animate-ping rounded-full size-16 border-2 border-zinc-800"></div>
    </div>
  );
};

export default LoadingAnimation;
