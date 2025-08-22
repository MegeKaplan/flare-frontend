import Image from "next/image";
import Link from "next/link";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-screen flex lg:flex-row p-4 flex-col-reverse gap-x-3">
      <Link href={"/"} className="text-4xl font-bold m-4 absolute hidden lg:flex select-none flex-col">
        <span>Flare</span>
        <span className="text-sm font-medium self-start ml-2 text-zinc-400">by Megebase</span>
      </Link>
      <div className="w-full lg:w-2/5 h-full flex lg:items-center justify-center">
        <div className="w-full flex flex-col items-center lg:justify-center my-4">
          {children}
        </div>
        <span className="absolute bottom-4 text-sm text-zinc-400 select-none">
          Made with ❤️ by <a href="https://github.com/MegeKaplan" target="_blank" className="underline underline-offset-4 pointer-events-auto">MegeKaplan</a>
        </span>
      </div>
      <div className="w-full lg:w-3/5 h-1/3 lg:h-full lg:flex relative rounded-2xl overflow-hidden">
        <Image src={"/images/auth-bg.jpg"} alt="Auth Background" width={1500} height={1500} className="absolute size-full object-cover select-none blur-lg lg:blur-2xl hover:blur-none transition duration-700" />
        <div className="absolute inset-0 bg-black/30 lg:bg-black/40 dark:lg:bg-black/50 pointer-events-none"></div>
        <div className="absolute flex flex-col z-10 text-white font-bold p-6 text-shadow text-shadow-zinc-800 pointer-events-none">
          <h1 className="text-3xl lg:text-4xl text-shadow-lg">Welcome to Flare</h1>
          <p className="text-lg lg:text-2xl text-shadow-lg">Your social platform for seamless connections.</p>
        </div>
        <div className="absolute bottom-0 right-0 text-white p-4 text-shadow-lg text-shadow-zinc-800 pointer-events-none">
          <p className="text-sm lg:text-lg">Photo by <a href="https://github.com/MegeKaplan" target="_blank" className="underline underline-offset-4 pointer-events-auto">MegeKaplan</a> via Flare</p>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;