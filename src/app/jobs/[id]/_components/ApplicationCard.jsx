"use client";

import {useState} from "react";
import {Badge} from "@/components/ui/badge";
import {Separator} from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {motion} from "framer-motion";
import {
  Briefcase,
  FileText,
  GraduationCap,
  Star,
  ExternalLink,
} from "lucide-react";
import {updateApplicationStatus} from "@/actions/application.action";
import toast from "react-hot-toast";
import Link from "next/link";

const statusColors = {
  applied: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  interviewing: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  hired: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  rejected: "bg-red-500/10 text-red-400 border-red-500/20",
};

const statusOptions = [
  {value: "applied", label: "Applied"},
  {value: "interviewing", label: "Interviewing"},
  {value: "hired", label: "Hired"},
  {value: "rejected", label: "Rejected"},
];

const DetailRow = ({icon: Icon, label, children}) => (
  <div className="flex flex-col gap-1.5">
    <div className="flex items-center gap-1.5">
      <Icon className="w-3 h-3 text-indigo-400/60" />
      <span className="text-white/25 text-xs uppercase tracking-wider">
        {label}
      </span>
    </div>
    <div className="text-white/55 text-xs leading-relaxed pl-0.5">
      {children}
    </div>
  </div>
);

const ApplicationCard = ({application, index, fadeUp}) => {
  const [status, setStatus] = useState(application.status ?? "applied");
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (value) => {
    setStatus(value);
    setLoading(true);
    const res = await updateApplicationStatus(application._id, value);
    setLoading(false);

    if (!res.success) {
      setStatus(application.status);
      toast.error(res.message);
      return;
    }

    toast.success(`Status updated to "${value}"`);
  };

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={index}
      className="group relative flex flex-col gap-0 border border-white/8 rounded-2xl bg-white/[0.02] hover:bg-white/[0.035] hover:border-white/12 transition-all duration-300 overflow-hidden"
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

      {/* Header */}
      <div className="flex items-center justify-between gap-3 px-5 pt-5 pb-4">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-indigo-600/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
            <span className="text-indigo-300 text-sm font-bold">
              {application.name?.charAt(0).toUpperCase()}
            </span>
          </div>

          {/* Name + date */}
          <div className="flex flex-col gap-0.5">
            <p className="text-white text-sm font-semibold leading-tight">
              {application.name}
            </p>
            <p className="text-white/25 text-xs">
              {new Date(application.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Status badge */}
        <Badge
          className={`text-xs font-medium px-2.5 py-0.5 rounded-lg border capitalize shrink-0 ${
            statusColors[status] || statusColors.applied
          }`}
        >
          {status}
        </Badge>
      </div>

      <Separator className="bg-white/5 mx-5" />

      {/* Details grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-5 py-4">
        <DetailRow icon={Star} label="Skills">
          {application.skills}
        </DetailRow>

        <DetailRow icon={Briefcase} label="Experience">
          <span className="line-clamp-2">{application.experience}</span>
        </DetailRow>

        <DetailRow icon={GraduationCap} label="Education">
          {application.education}
        </DetailRow>

        <DetailRow icon={FileText} label="Resume">
          <Link
            href={application.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            View Resume
            <ExternalLink className="w-3 h-3" />
          </Link>
        </DetailRow>
      </div>

      <Separator className="bg-white/5 mx-5" />

      {/* ── Status Dropdown ── */}
      <div className="flex items-center gap-3 px-5 py-3">
        <span className="text-white/25 text-xs uppercase tracking-wider shrink-0">
          Update Status
        </span>

        <Select
          value={status}
          onValueChange={handleStatusChange}
          disabled={loading}
        >
          <SelectTrigger
            className={`h-8 text-xs flex-1 border rounded-lg focus:ring-indigo-500 disabled:opacity-50 ${
              statusColors[status] || statusColors.applied
            }`}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-[#111] border-white/10 text-white">
            <SelectGroup>
              {statusOptions.map(({value, label}) => (
                <SelectItem
                  key={value}
                  value={value}
                  className="text-xs focus:bg-white/10"
                >
                  {label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {loading && (
          <span className="text-white/25 text-xs shrink-0">Saving...</span>
        )}
      </div>
    </motion.div>
  );
};

export default ApplicationCard;
