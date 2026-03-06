"use client";

import Link from "next/link";
import {Button} from "./ui/button";
import {useState} from "react";
import {Menu, X, Briefcase, PenBox} from "lucide-react";
import {useGetCurrentUser} from "@/hooks/auth.hook";
import {useRouter} from "next/navigation";
import {authClient} from "@/lib/auth-client";
import toast from "react-hot-toast";

const navLinks = [
  {label: "Find Jobs", href: "/jobs"},
  {label: "Companies", href: "/companies"},
  {label: "Post a Job", href: "/post-job"},
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const {user} = useGetCurrentUser();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Signed Out successfully.");
          router.refresh(); // redirect to login page
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      },
    });
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/8 bg-black/60 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center group-hover:bg-indigo-500 transition-colors">
              <Briefcase className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              Chakri
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/50 hover:text-white px-4 py-2 rounded-lg hover:bg-white/5 transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          {user ? (
            <div className="space-x-3 flex items-center">
              {user?.role == "recruiter" ? (
                <Link href={"/post-job"}>
                  <Button>
                    <PenBox /> Post Job
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href={"/jobs"}>
                    <Button>
                      <Briefcase /> Jobs
                    </Button>
                  </Link>
                </>
              )}
              <Button variant="destructive" onClick={handleSignOut}>
                Logout
              </Button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <Link href="/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white/60 hover:text-white hover:bg-white/5 rounded-full px-5 cursor-pointer"
                >
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  size="sm"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-full px-5 cursor-pointer"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-colors"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-white/8 bg-black/80 backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-sm text-white/50 hover:text-white px-4 py-3 rounded-lg hover:bg-white/5 transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-white/8">
              <Link href="/login" onClick={() => setIsOpen(false)}>
                <Button
                  variant="outline"
                  className="w-full rounded-full border-white/15 text-white hover:bg-white/5 cursor-pointer"
                >
                  Login
                </Button>
              </Link>
              <Link href="/sign-up" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white rounded-full cursor-pointer">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
