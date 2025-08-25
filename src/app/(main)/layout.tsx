import Navbar from "@/components/layout/Navbar";
import BrandLogo from "@/components/BrandLogo";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full min-h-screen p-4">
      <BrandLogo className="m-4" />
      {children}
      <Navbar />
    </div>
  );
}

export default MainLayout;
