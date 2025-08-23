"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useAuthStore } from "@/store/useAuthStore"
import authService from "@/services/authService"
import { toast } from "sonner"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { REGEXP_ONLY_DIGITS } from "input-otp"
import { useRouter } from "next/navigation"
import Link from "next/link"

const OTPPage = () => {
  const { data, setData } = useAuthStore();
  const router = useRouter();

  const handleOTPChange = (value: string) => {
    setData({ otp: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const registerResponse = await authService.register({
        email: data.email,
        password: data.password,
        otp: data.otp
      });

      localStorage.setItem("access_token", registerResponse.data.data.access_token);

      await authService.createFlareAccount({
        username: data.username,
        email: data.email,
        password: data.password
      }, registerResponse.data.data.user.id);

      toast.success(registerResponse.data.message || "Registered successfully");
      router.push("/");
    } catch (err: any) {
      const message = err?.response?.data?.message || err?.message || "Something went wrong";
      toast.error(message);
    }
  };

  return (
    <div className="w-full flex items-center justify-center p-4">
      <Card className="w-full max-w-xl text-center">
        <CardHeader>
          <CardTitle className="text-xl lg:text-2xl">Enter OTP</CardTitle>
          <CardDescription className="md:text-lg">
            Please enter the OTP sent to your email
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-8 items-center" onSubmit={handleSubmit}>
            <InputOTP
              value={data.otp}
              onChange={handleOTPChange}
              maxLength={6}
              pattern={REGEXP_ONLY_DIGITS}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} className="size-12 text-xl" />
                <InputOTPSlot index={1} className="size-12 text-xl" />
                <InputOTPSlot index={2} className="size-12 text-xl" />
                <InputOTPSlot index={3} className="size-12 text-xl" />
                <InputOTPSlot index={4} className="size-12 text-xl" />
                <InputOTPSlot index={5} className="size-12 text-xl" />
              </InputOTPGroup>
            </InputOTP>
            <Button type="submit" className="w-full">
              Verify OTP
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline underline-offset-4">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default OTPPage
