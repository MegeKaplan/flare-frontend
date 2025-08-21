"use client";
import { Button } from "@/components/ui/button"
import { ThemeChanger } from "@/components/ui/ThemeChanger";
import { useTranslations } from "next-intl";
import { useLocaleChanger } from "../../hooks/useLocaleChanger";

export default function Home() {
  const t = useTranslations('Home');
  const { changeLocale } = useLocaleChanger();

  return (
    <div className="flex items-center justify-center flex-col h-screen">
      <h1>{t("welcome")}</h1>
      <Button>Click me</Button>
      <ThemeChanger />
      <div className="flex space-x-2 mt-4">
        <Button onClick={() => changeLocale('en')}>English</Button>
        <Button onClick={() => changeLocale('tr')}>Turkish</Button>
      </div>
    </div>
  );
}
