"use client";

import {Button} from "@/components/ui/button";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {MapPin, Heart, ArrowRight, Building2, Clock} from "lucide-react";
import Link from "next/link";
import {motion} from "framer-motion";
import {getSavedJobById, saveAJob} from "@/actions/saved_job.action";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";

export default function JobCard({job, user}) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const saveJob = async () => {
      if (!user?.id) return;
      const res = await getSavedJobById(user?.id, job?._id);
      if (res?.data) {
        setSaved(true);
      }
    };

    saveJob();
  }, [user?.id, job?._id]);

  const handleSavedPost = async () => {
    if (!user) {
      toast.error("Please login to save jobs");
      return;
    }
    setSaved((prev) => !prev);

    if (!saved) {
      toast.success("Saved the post");
    } else {
      toast.error("The post is removed from saved posts.");
    }

    const res = await saveAJob(user?.id, job?._id, saved);

    if (!res.success) {
      setSaved((prev) => !prev);
      toast.error(res.message);
      return;
    }
  };

  console.log(job.jobId?.companyId);

  return (
    <motion.div
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.2, ease: [0.22, 1, 0.36, 1]}}
      whileHover={{y: -3}}
    >
      <Card className="bg-white/[0.03] border border-white/10 hover:border-white/20 transition-colors duration-300 rounded-xl overflow-hidden">
        <CardHeader className="pb-3">
          {/* Company row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center">
                <Building2 className="w-4 h-4 text-indigo-400" />
              </div>
              <span className="text-white/40 text-xs">
                {job?.companyId?.name ?? "Company"}
              </span>
            </div>

            {/* Save button */}
            <motion.button
              whileTap={{scale: 0.85}}
              onClick={handleSavedPost}
              className="cursor-pointer p-1.5 rounded-lg hover:bg-white/5 transition-colors"
            >
              <Heart
                className="w-5 h-5 transition-colors duration-200"
                fill={saved ? "#f43f5e" : "none"}
                stroke={saved ? "#f43f5e" : "rgba(255,255,255,0.3)"}
              />
            </motion.button>
          </div>

          {/* Title */}
          <h3 className="text-white font-semibold text-base leading-snug mt-2">
            {job?.companyId?.title}
          </h3>

          {/* Location + status */}
          <div className="flex items-center gap-3 mt-1">
            <span className="flex items-center gap-1 text-white/35 text-xs">
              <MapPin className="w-3 h-3" />
              {job?.location}
            </span>
            <span
              className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-md font-medium ${
                job.jobId?.isOpen
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  : "bg-red-500/10 text-red-400 border border-red-500/20"
              }`}
            >
              <Clock className="w-3 h-3" />
              {job?.isOpen ? "Open" : "Closed"}
            </span>
          </div>
        </CardHeader>

        <CardContent className="pb-1">
          <p className="text-white/40 text-sm leading-relaxed line-clamp-2">
            {job?.description}
          </p>
        </CardContent>

        <CardFooter className="pt-0 border-t border-white/6">
          <Link href={`/jobs/${job.jobId?._id}`} className="w-full mt-1">
            <Button
              variant="default"
              size="sm"
              className="w-full border-white/10 text-white/60 hover:text-white hover:bg-white/5 rounded-lg gap-2 cursor-pointer group"
            >
              More Details
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
