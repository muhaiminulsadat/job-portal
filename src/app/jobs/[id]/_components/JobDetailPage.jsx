"use client";
import {motion} from "framer-motion";
import {
  MapPin,
  Users,
  Clock,
  ArrowLeft,
  Building2,
  CheckCircle,
} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import Link from "next/link";
import dynamic from "next/dynamic";

import Image from "next/image";
import {useGetCurrentUser} from "@/hooks/auth.hook";
import ApplyToJob from "./2_ApplyToJob";
import HiringStatus from "./HiringStatus";
import {useRouter} from "next/navigation";

const MDPreview = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default.Markdown),
  {ssr: false},
);
// ── Animation Variants ───────────────────────────────────────────────
const fadeUp = {
  hidden: {opacity: 0, y: 20},
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1]},
  }),
};

// ── Sample job data (replace with real DB fetch) ─────────────────────
// const job = {
//   _id: "1",
//   title: "Senior Frontend Engineer",
//   description:
//     "We are looking for a highly skilled Senior Frontend Engineer to join our growing product team. You will be responsible for building and maintaining high-quality web applications that serve millions of users. You'll collaborate closely with designers, backend engineers, and product managers to deliver exceptional user experiences.",
//   location: "Dhaka Division",
//   isOpen: true,
//   requirements: `## What You'll Need\n\n- **3+ years** of experience with React and modern JavaScript\n- Strong proficiency in **Next.js** and server-side rendering\n- Experience with **Tailwind CSS** and component libraries\n- Familiarity with **REST APIs** and GraphQL\n- Understanding of web performance optimization\n- Strong problem-solving and communication skills\n\n## Nice to Have\n\n- Experience with TypeScript\n- Knowledge of CI/CD pipelines\n- Contributions to open source projects`,
//   companyId: {
//     name: "Stripe",
//     logo: null,
//   },
//   applications: 24,
//   createdAt: new Date().toISOString(),
// };

export default function JobDetailPage({job, hasApplied, user}) {
  const router = useRouter();

  const onSuccess = () => {
    router.refresh();
  };

  return (
    <div className=" py-12">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        {/* ── Back Button ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          <Link href="/jobs">
            <Button
              variant="ghost"
              size="sm"
              className="text-white/40 hover:text-white hover:bg-white/5 rounded-lg gap-2 cursor-pointer px-0"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Jobs
            </Button>
          </Link>
        </motion.div>

        {/* ── Header — Title + Company Logo ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="flex items-start justify-between gap-4"
        >
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
              {job?.title}
            </h1>
            <p className="text-white/40 text-sm">{job?.companyId?.name}</p>
          </div>

          {/* Company Logo / Fallback */}
          <div className="shrink-0 w-14 h-14 rounded-xl border border-white/10 bg-white/[0.04] flex items-center justify-center overflow-hidden">
            {job?.companyId?.logo ? (
              <Image
                src={job?.companyId?.logo}
                alt={job?.companyId?.name}
                width={10}
                height={10}
                className="w-full h-full object-contain p-2"
              />
            ) : (
              <Building2 className="w-6 h-6 text-white/30" />
            )}
          </div>
        </motion.div>

        {user?.id === job?.recruiterId && (
          <HiringStatus
            job={job}
            fadeUp={fadeUp}
            onSuccess={onSuccess}
            user={user}
          />
        )}

        {/* ── Meta Row — Location | Applications | Status ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="flex items-center justify-between flex-wrap gap-3 border border-white/8 rounded-xl px-5 py-4 bg-white/[0.05] "
        >
          {/* Location */}
          <div className="flex items-center gap-2 text-white/50 text-sm">
            <MapPin className="w-4 h-4 text-indigo-400" />
            {job?.location}
          </div>

          <div className="w-px h-4 bg-white/10 hidden sm:block" />

          {/* Applications */}
          <div className="flex items-center gap-2 text-white/50 text-sm">
            <Users className="w-4 h-4 text-indigo-400" />
            {job?.applications.length} Applicants
          </div>

          <div className="w-px h-4 bg-white/10 hidden sm:block" />

          {/* Status */}
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-400" />
            <Badge
              className={`text-xs font-medium px-3 py-0.5 rounded-md border ${
                job?.isOpen
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                  : "bg-red-500/10 text-red-400 border-red-500/20"
              }`}
            >
              {job?.isOpen ? "Actively Hiring" : "Position Closed"}
            </Badge>
          </div>
        </motion.div>

        {/* ── Description ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
          className="flex flex-col gap-3"
        >
          <h2 className="text-white font-semibold text-base flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-indigo-400" />
            What We're Looking For
          </h2>
          <p className="text-white/50 text-sm leading-relaxed">
            {job?.description}
          </p>
        </motion.div>

        <Separator className="bg-white/8" />

        {/* ── Requirements — MD Editor Preview ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={4}
          className="flex flex-col gap-3"
        >
          <h2 className="text-white font-semibold text-base flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-indigo-400" />
            Requirements
          </h2>
          <div data-color-mode="dark" className="rounded-xl overflow-hidden">
            <MDPreview
              source={job?.requirements}
              style={{
                backgroundColor: "transparent",
                color: "rgba(255,255,255,0.5)",
                fontSize: "0.875rem",
                lineHeight: "1.75",
              }}
            />
          </div>
        </motion.div>

        <Separator className="bg-white/8" />

        {/* ── Apply Button ── */}
        {user?.id !== job?.recruiterId && (
          <ApplyToJob fadeUp={fadeUp} job={job} hasApplied={hasApplied} />
        )}
      </div>
    </div>
  );
}
