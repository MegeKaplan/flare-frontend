const LoadingAnimation = ({ size = 16 }: { size?: number }) => {
  return (
    <div className="flex items-center justify-center relative animate-ping">
      <div className={`absolute animate-spin rounded-full size-${size * 2} border-t-2 border-b-2 border-zinc-800`}></div>
      <div className={`absolute animate-ping rounded-full size-${size} border-2 border-zinc-800`}></div>
    </div>
  );
};

export default LoadingAnimation;
