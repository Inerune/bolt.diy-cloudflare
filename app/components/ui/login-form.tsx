import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useState } from "react";
import { updateProfile } from "~/lib/stores/profile";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "./input-otp";

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const [isSignup, setIsSignup] = useState(false);
    const [email, setEmail] = useState("");
    const [emailSubmitted, setEmailSubmitted] = useState(false);
    const [otp, setOtp] = useState<string>("");

    const handleToggleMode = () => {
        setIsSignup(!isSignup);
        setEmailSubmitted(false);
        setOtp("");
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isSignup && !emailSubmitted) {
            try {
                // await fetch("https://the-backend-production.up.railway.app/api/auth/email-otp/send-verification-otp", {
                await fetch("http://localhost:3000/api/auth/email-otp/send-verification-otp", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, type: "sign-in" }),
                });
                setEmailSubmitted(true);
            } catch (err) {
                console.error("Failed to send OTP", err);
            }
            return;
        }

        if (isSignup && emailSubmitted) {
            // Verify OTP
            try {
                const res = await fetch("https://the-backend-production.up.railway.app/api/auth/sign-in/email-otp", {
                // const res = await fetch("http://localhost:3000/api/auth/sign-in/email-otp", {
                
                    method: "POST",
                    credentials: 'include',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, otp }),
                });
                const result = await res.json();

                if (result) {
                    console.log(result);
                    updateProfile({
                        username: result.user.email,
                        avatar: result.user.image,
                    });
                    location.reload();
                } else {
                    alert("Invalid Code");
                }
            } catch (err) {
                console.error("OTP verification failed", err);
            }
        }

        // if (!isSignup) {
        //     try {
        //         await fetch("http://localhost:3000/api/auth/email-otp/send-verification-otp", {
        //             method: "POST",
        //             credentials: "include",
        //             headers: { "Content-Type": "application/json" },
        //             body: JSON.stringify({ email, type: "sign-in" }),
        //         });
        //         setEmailSubmitted(true);
        //     } catch (err) {
        //         console.error("Failed to send OTP", err);
        //     }
        // }
    };

    const handleGoogleLogin = async () => {
        try {
            // const response = await fetch('http://localhost:3000/api/auth/sign-in/social',
            const response = await fetch(`https://the-backend-production.up.railway.app/api/auth/sign-in/social`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        provider: "google",
                        redirectUrl: window.location.origin + "/auth/callback",
                    }),
                    credentials: "include",
                }
            );

            const { redirect, url } = await response.json();
            if (redirect) window.location.href = url;
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <form onSubmit={handleFormSubmit} className="dark:text-white">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center gap-0 mt-2">
                        <h1 className="text-lg font-bold tracking-[1px] font-light">
                            {isSignup ? "Create your account" : "Welcome back."}
                        </h1>
                        <div className="text-center text-sm">
                            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
                            <button
                                type="button"
                                className="underline underline-offset-4 bg-transparent"
                                onClick={handleToggleMode}
                            >
                                {isSignup ? "Log in" : "Sign up"}
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="grid gap-3">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        {isSignup && emailSubmitted && (
                            <div className="grid gap-6 flex items-center">
                                <Label htmlFor="otp">Verification Code</Label>
                                <InputOTP maxLength={6}
                                    value={otp}
                                    onChange={(value) => setOtp(value)}
                                >
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                    </InputOTPGroup>
                                    <InputOTPSeparator />
                                    <InputOTPGroup>
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                </InputOTP>
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full dark:bg-[#07ceb9] bg-[#FFD6A7] dark:hover:opacity-80 text-black"
                        >
                            {isSignup
                                ? emailSubmitted
                                    ? "Verify Code"
                                    : "Sign Up"
                                : "Login"}
                        </Button>
                    </div>

                    <div className="flex items-center justify-center w-full text-muted-foreground">
                        <div className="border-t border-gray-400 flex-grow"></div>
                        <span className="px-3 text-sm">Or</span>
                        <div className="border-t border-gray-400 flex-grow"></div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-1">
                        <Button
                            onClick={handleGoogleLogin}
                            variant="outline"
                            type="button"
                            className="w-full flex items-center gap-1"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                    fill="currentColor"
                                />
                            </svg>
                            Continue with Google
                        </Button>
                    </div>
                </div>
            </form>

            <div className="text-black dark:text-white text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                By clicking continue, you agree to our <br />
                <a href="#">Terms of Service</a> and{" "}
                <a href="#">Privacy Policy</a>.
            </div>
        </div>
    );
}