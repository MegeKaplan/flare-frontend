"use client";
import { useEffect, useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog";
import { Button } from "./ui/button";

const DevDialog = () => {
  const [showDialog, setShowDialog] = useState(false)
  const [cancelCountdown, setCancelCountdown] = useState(3);

  useEffect(() => {
    const suppressDialog = localStorage.getItem("suppressDevDialog")
    if (!suppressDialog) {
      setShowDialog(true)
    }
  }, [])

  useEffect(() => {
    if (showDialog && cancelCountdown > 0) {
      const interval = setInterval(() => {
        setCancelCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [showDialog, cancelCountdown]);

  return (
    <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
      <AlertDialogContent className="outline-none">
        <AlertDialogHeader className="flex flex-col items-center gap-2">
          <span className="text-5xl mt-2">🛠️</span>
          <AlertDialogTitle>🚧 Platform Under Development</AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            Features may not work as expected. Thanks for your patience! 🚀 Also, Flare is an open-source project with MIT license 🔓 If you want to contribute, you can open an issue or pull request.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="justify-center">
          <AlertDialogCancel asChild>
            <Button variant="link" className="text-zinc-400 hover:text-zinc-300" onClick={() => {
              setShowDialog(false);
              localStorage.setItem("suppressDevDialog", "true")
            }} disabled={cancelCountdown > 0}>
              Don't show again {cancelCountdown > 0 && `(${cancelCountdown})`}
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => setShowDialog(false)}>Got it!</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DevDialog;