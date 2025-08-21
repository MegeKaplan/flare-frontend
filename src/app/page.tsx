import { Button } from "@/components/ui/button"
import { ThemeChanger } from "@/components/ui/ThemeChanger";

export default function Home() {
  return (
    <div className="flex items-center justify-center flex-col h-screen">
      <h1>Hello world!</h1>
      <Button>Click me</Button>
      <ThemeChanger />
    </div>
  );
}
