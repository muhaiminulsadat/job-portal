"use client";

import {motion} from "framer-motion";
import {Users, FileText, GraduationCap, Briefcase, Star} from "lucide-react";
import ApplicationCard from "./ApplicationCard";

const fadeUp = {
  hidden: {opacity: 0, y: 20},
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1]},
  }),
};

const ApplicationList = ({applications = [], recruiterId, userId}) => {
  // ✅ only recruiter who posted can see this
  if (userId !== recruiterId) return null;

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      custom={0}
      className="flex flex-col gap-5"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-white font-semibold text-base flex items-center gap-2">
          <Users className="w-4 h-4 text-indigo-400" />
          Applications
        </h2>
        <span className="text-white/30 text-xs border border-white/10 rounded-full px-3 py-0.5 bg-white/[0.05] ">
          {applications.length}{" "}
          {applications.length === 1 ? "applicant" : "applicants"}
        </span>
      </div>

      {/* Empty state */}
      {applications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3 border border-white/8 rounded-xl bg-white/[0.05] ">
          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
            <Users className="w-5 h-5 text-white/20" />
          </div>
          <p className="text-white/30 text-sm">No applications yet</p>
          <p className="text-white/20 text-xs">
            Applications will appear here when candidates apply
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {applications.map((application, index) => (
            <ApplicationCard
              key={application?._id}
              application={application}
              index={index}
              fadeUp={fadeUp}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default ApplicationList;
