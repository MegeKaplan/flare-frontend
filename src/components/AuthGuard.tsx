"use client";
import { ReactNode, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";

export default function AuthGuard({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    setToken(access_token);
    if (!access_token) {
      toast.error("You must be logged in to view this page.");
    }
  }, []);

  const handleLoginRedirect = () => {
    router.push(`/login?returnUrl=${encodeURIComponent(pathname)}`);
  };

  return token ? (
    <>{children}</>
  ) : (
    <div className="w-full h-full flex items-center justify-center flex-col gap-6">
      <h1 className="text-5xl font-bold">401</h1>
      <p className="text-xl text-center p-4">Please login to view this page. After login, you will be redirected here automatically.</p>
      <Button onClick={handleLoginRedirect} className="w-8/12 lg:w-6/12">Login</Button>
    </div>
  );
}
