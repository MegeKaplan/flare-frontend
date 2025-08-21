"use client";
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl";
import { useLocaleChanger } from "../../hooks/useLocaleChanger";
import { useThemeChanger } from "../../hooks/useThemeChanger";

export default function Home() {
  const t = useTranslations('Home');
  const { changeLocale } = useLocaleChanger();
  const { changeTheme } = useThemeChanger();

  return (
    <div className="flex items-center justify-center flex-col h-screen">
      <h1>{t("welcome")}</h1>
      <Button>{t("clickMe")}</Button>
      <div className="flex space-x-2 mt-4">
        <Button onClick={() => changeTheme("dark")}>{t("darkMode")}</Button>
        <Button onClick={() => changeTheme("light")}>{t("lightMode")}</Button>
      </div>
      <div className="flex space-x-2 mt-4">
        <Button onClick={() => changeLocale('en')}>{t("english")}</Button>
        <Button onClick={() => changeLocale('tr')}>{t("turkish")}</Button>
      </div>
    </div>
  );
}
