"use client";
import { useRouter } from "next/navigation";

export const useLocaleChanger = () => {
  const router = useRouter();

  const changeLocale = (newLocale: string) => {
    document.cookie = `locale=${newLocale}; path=/`;
    router.refresh();
  };

  return { changeLocale };
};
