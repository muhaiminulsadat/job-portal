"use client";

import {useState} from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {motion} from "framer-motion";
import {Briefcase} from "lucide-react";
import toast from "react-hot-toast";
import {updateJobStatus} from "@/actions/job.action";

const statusOptions = [
  {value: "true", label: "Actively Hiring", color: "text-emerald-400"},
  {value: "false", label: "Position Closed", color: "text-red-400"},
];

const HiringStatus = ({job, fadeUp, onSuccess, user}) => {
  const [status, setStatus] = useState(job?.isOpen ? "true" : "false");
  const [loading, setLoading] = useState(false);

  const handleChange = async (value) => {
    setStatus(value); // ✅ optimistic update

    setLoading(true);
    const res = await updateJobStatus(job?._id, value === "true", user?.id);
    setLoading(false);
    onSuccess();

    if (!res.success) {
      setStatus(job?.isOpen ? "true" : "false"); // revert on failure
      toast.error(res.message);
      return;
    }

    toast.success(
      `Job status updated to "${value === "true" ? "Actively Hiring" : "Position Closed"}"`,
    );
  };

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={5}
      className="flex flex-col gap-2 p-4 border border-white/8 rounded-xl bg-white/[0.05] "
    >
      {/* Label */}
      <div className="flex items-center gap-2">
        <Briefcase className="w-4 h-4 text-indigo-400" />
        <span className="text-white/60 text-xs font-medium">Hiring Status</span>
        {loading && (
          <span className="text-white/30 text-xs ml-auto">Saving...</span>
        )}
      </div>

      {/* Select */}
      <Select value={status} onValueChange={handleChange} disabled={loading}>
        <SelectTrigger className="bg-white/[0.04] border-white/10 text-white rounded-lg focus:ring-indigo-500">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-[#111] border-white/10 text-white">
          <SelectGroup>
            <SelectLabel className="text-white/30 text-xs">
              Update Status
            </SelectLabel>
            {statusOptions.map(({value, label, color}) => (
              <SelectItem
                key={value}
                value={value}
                className={`focus:bg-white/10 ${color}`}
              >
                {label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </motion.div>
  );
};

export default HiringStatus;
