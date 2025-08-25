import Link from "next/link";

interface LogoProps {
  className?: string;
  byMegebaseText?: boolean;
}

const BrandLogo = ({ className = "", byMegebaseText = true }: LogoProps) => {
  return (
    <Link
      href="/"
      className={`text-4xl font-bold absolute select-none flex-col flex ${className}`}
    >
      <span>Flare</span>
      {byMegebaseText && (
        <span className="text-sm font-medium ml-2 dark:text-zinc-400 text-zinc-500">by Megebase</span>
      )}
    </Link>
  );
};

export default BrandLogo;
