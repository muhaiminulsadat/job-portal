import {Briefcase} from "lucide-react";
import JobCard from "./JobCard";

const JobGrid = ({data, user}) => {
  // if (loading) {
  //   return (
  //     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  //       {Array.from({length: 6}).map((_, i) => (
  //         <div
  //           key={i}
  //           className="relative overflow-hidden border border-white/8 rounded-xl p-5 flex flex-col gap-4 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/[0.06] before:to-transparent"
  //         >
  //           <div className="flex justify-between">
  //             <div className="h-8 w-32 rounded-lg bg-white/[0.04]" />
  //             <div className="h-8 w-8 rounded-lg bg-white/[0.04]" />
  //           </div>
  //           <div className="h-5 w-3/4 rounded-lg bg-white/[0.04]" />
  //           <div className="h-3 w-full rounded-lg bg-white/[0.04]" />
  //           <div className="h-3 w-5/6 rounded-lg bg-white/[0.04]" />
  //           <div className="h-8 w-full rounded-lg bg-white/[0.04]" />
  //         </div>
  //       ))}
  //     </div>
  //   );
  // }

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3">
        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
          <Briefcase className="w-5 h-5 text-white/30" />
        </div>
        <p className="text-white/30 text-sm">No jobs found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((job) => (
        <JobCard key={job._id} job={job} user={user} />
      ))}
    </div>
  );
};

export default JobGrid;
