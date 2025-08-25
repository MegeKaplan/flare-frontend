import Navbar from "@/components/layout/Navbar";
import BrandLogo from "@/components/BrandLogo";
import Topbar from "@/components/layout/Topbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full min-h-screen flex justify-center">
      <BrandLogo className="m-8 hidden md:flex top-0 left-0" />
      <Topbar />
      <div className="w-full mt-16 md:w-10/12 lg:w-8/12 md:mt-32">
        {children}
      </div>
      <Navbar />
    </div>
  );
}

export default MainLayout;
