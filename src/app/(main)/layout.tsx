import Navbar from "@/components/layout/Navbar";
import BrandLogo from "@/components/BrandLogo";
import Topbar from "@/components/layout/Topbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full min-h-screen">
      <BrandLogo className="m-8 hidden md:flex" />
      <Topbar />
      {children}
      <Navbar />
    </div>
  );
}

export default MainLayout;
