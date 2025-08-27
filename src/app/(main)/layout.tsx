"use client"
import Navbar from "@/components/layout/Navbar";
import BrandLogo from "@/components/BrandLogo";
import Topbar from "@/components/layout/Topbar";
import GlobalStatus from "@/components/GlobalStatus";
import useStatusStore from "@/store/useStatusStore";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { loading, error } = useStatusStore();

  return (
    <div className="w-full min-h-screen flex justify-center">
      <BrandLogo className="m-8 hidden md:flex top-0 left-0" />
      <Topbar />
      <GlobalStatus status={{ loading, error }} />
      <div className={`w-full mt-16 md:w-10/12 lg:w-8/12 md:mt-32 ${(loading || error) && "hidden"}`}>
        {children}
      </div>
      <Navbar />
    </div>
  );
}

export default MainLayout;
