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

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("seeker");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({...prev, [e.target.name]: e.target.value}));
  };

  const handleCreate = async () => {
    const values = {
      role,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      ...(role === "employer" && {companyName: formData.companyName}),
    };

    const {data, error} = await authClient.signUp.email(
      {
        name: `${formData.firstName} ${formData.lastName}`, // ✅ combine into one field
        email: formData.email,
        password: formData.password,
        role,
        ...(role === "employer" && {companyName: formData.companyName}),
        callbackURL: "/",
      },
      {
        onRequest: (ctx) => {
          //show loading
          setLoading(true);
        },
        onSuccess: (ctx) => {
          //redirect to the dashboard or sign in page
          toast.success("Account created successfully");
          setLoading(false);
          router.refresh();
        },
        onError: (ctx) => {
          // display the error message
          toast.error(ctx.error.message);
          setLoading(false);
        },
      },
    );
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
              Create an account
            </CardTitle>
            <CardDescription className="text-white/40 text-center">
              Sign up to get started with Cakri
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-5">
            {/* Role Toggle */}
            <div className="flex rounded-lg border border-white/10 p-1 bg-white/[0.03]">
              <button
                onClick={() => setRole("seeker")}
                className={`flex-1 text-sm py-2 rounded-md transition-all duration-200 cursor-pointer ${
                  role === "seeker"
                    ? "bg-indigo-600 text-white font-medium"
                    : "text-white/40 hover:text-white"
                }`}
              >
                Job Seeker
              </button>
              <button
                onClick={() => setRole("recruiter")}
                className={`flex-1 text-sm py-2 rounded-md transition-all duration-200 cursor-pointer ${
                  role === "employer"
                    ? "bg-indigo-600 text-white font-medium"
                    : "text-white/40 hover:text-white"
                }`}
              >
                Employer
              </button>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <Label className="text-white/60 text-xs">First Name</Label>
                <Input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  className="bg-white/[0.04] border-white/10 text-white placeholder:text-white/20 rounded-lg focus-visible:ring-indigo-500"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label className="text-white/60 text-xs">Last Name</Label>
                <Input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  className="bg-white/[0.04] border-white/10 text-white placeholder:text-white/20 rounded-lg focus-visible:ring-indigo-500"
                />
              </div>
            </div>

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

            {/* Company Name — only for employer */}
            {role === "employer" && (
              <div className="flex flex-col gap-1.5">
                <Label className="text-white/60 text-xs">Company Name</Label>
                <Input
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Acme Inc."
                  className="bg-white/[0.04] border-white/10 text-white placeholder:text-white/20 rounded-lg focus-visible:ring-indigo-500"
                />
              </div>
            )}

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-white/60 text-xs">Password</Label>
              <div className="relative">
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter Password"
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
              onClick={handleCreate}
            >
              {loading ? <Loader className="animate-spin" /> : "Create Account"}
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
            >
              <Chrome className="w-4 h-4" />
              Continue with Google
            </Button>

            {/* Login Link */}
            <p className="text-center text-white/30 text-sm">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
