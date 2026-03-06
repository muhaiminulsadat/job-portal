import {getAllJobs} from "@/actions/job.action";
import JobCard from "./_components/JobCard";
import {Briefcase} from "lucide-react";
import {getAllCompanies} from "@/actions/company.action";
import JobSearchForm from "./_components/FilterJobs";
import {getCurrentUser} from "@/lib/auth";

const page = async () => {
  const {data: initialJobs} = await getAllJobs();
  const {data: companies} = await getAllCompanies();

  const {user} = await getCurrentUser();

  return (
    <div className="min-h-screen px-4 py-6">
      <div className="mx-auto flex flex-col gap-10">
        {/* ── Header ── */}
        <div className="flex flex-col items-center text-center gap-3">
          <div className="inline-flex items-center gap-2 border border-white/10 rounded-full px-4 py-1.5 text-xs text-white/50 bg-white/5">
            <Briefcase className="w-3.5 h-3.5" />
            {initialJobs.length} jobs available
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Latest Jobs
          </h1>
          <p className="text-white/40 text-sm max-w-md">
            Browse through the latest job listings and find your next
            opportunity
          </p>
        </div>

        <JobSearchForm
          initialJobs={initialJobs}
          companies={companies}
          user={user}
        />
      </div>
    </div>
  );
};

export default page;
