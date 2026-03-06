"use client";

import Link from "next/link";
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {Briefcase, Eye, EyeOff, Chrome, Loader} from "lucide-react";
import {authClient} from "@/lib/auth-client";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({...prev, [e.target.name]: e.target.value}));
  };

  const handleLogin = async () => {
    authClient.signIn.email(formData, {
      onRequest: () => {
        setLoading(true);
      },
      onSuccess: () => {
        toast.success("Yoy are logged in successfully.");
        router.refresh();
      },
      onError: (ctx) => {
        toast.error(ctx.error.message);
        setLoading(false);
      },
    });
  };

  const handleGoogleLogin = async () => {
    console.log("Google login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md flex flex-col gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 justify-center group">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center group-hover:bg-indigo-500 transition-colors">
            <Briefcase className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">
            Cakri
          </span>
        </Link>

        {/* Card */}
        <Card className="bg-white/[0.03] border border-white/10 rounded-xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-white text-2xl font-bold text-center">
              Welcome back
            </CardTitle>
            <CardDescription className="text-white/40 text-center">
              Sign in to your Cakri account
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-5">
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-white/60 text-xs">Email Address</Label>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="bg-white/[0.04] border-white/10 text-white placeholder:text-white/20 rounded-lg focus-visible:ring-indigo-500"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <Label className="text-white/60 text-xs">Password</Label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="bg-white/[0.04] border-white/10 text-white placeholder:text-white/20 rounded-lg focus-visible:ring-indigo-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <Button
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg mt-1 cursor-pointer"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-white/8" />
              <span className="text-white/25 text-xs">or continue with</span>
              <div className="flex-1 h-px bg-white/8" />
            </div>

            {/* Google OAuth */}
            <Button
              variant="outline"
              className="w-full border-white/10 text-white/60 hover:text-white hover:bg-white/5 rounded-lg cursor-pointer gap-2"
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              <Chrome className="w-4 h-4" />
              Continue with Google
            </Button>

            {/* Register Link */}
            <p className="text-center text-white/30 text-sm">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                {loading ? (
                  <>
                    <Loader className="animate-spin" />
                  </>
                ) : (
                  "Sign up"
                )}
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
