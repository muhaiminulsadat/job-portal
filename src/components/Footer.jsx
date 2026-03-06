import {Briefcase} from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t  w-full border-white/8 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center group-hover:bg-indigo-500 transition-colors">
            <Briefcase className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-white font-bold tracking-tight">Cakri</span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6 text-white/30 text-sm">
          <Link href="/jobs" className="hover:text-white transition-colors">
            Jobs
          </Link>
          <Link href="/post-job" className="hover:text-white transition-colors">
            Post a Job
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-white/20 text-xs">
          © {new Date().getFullYear()} Cakri. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
