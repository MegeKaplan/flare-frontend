import AuthGuard from "@/components/AuthGuard";

const NewContentLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthGuard>
      {children}
    </AuthGuard>
  );
}

export default NewContentLayout;