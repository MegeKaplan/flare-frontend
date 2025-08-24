import Link from "next/link";

interface LogoProps {
  className?: string;
  byMegebaseText?: boolean;
}

const BrandLogo = ({ className = "", byMegebaseText = true }: LogoProps) => {
  return (
    <Link
      href="/"
      className={`text-4xl font-bold absolute hidden lg:flex select-none flex-col ${className}`}
    >
      <span>Flare</span>
      {byMegebaseText && (
        <span className="text-sm font-medium ml-2 text-zinc-400">by Megebase</span>
      )}
    </Link>
  );
};

export default BrandLogo;
