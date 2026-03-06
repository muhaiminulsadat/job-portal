import {getAllSavedJobs} from "@/actions/saved_job.action";
import {getCurrentUser} from "@/lib/auth";
import JobGrid from "../jobs/_components/JobGrid";

const SavedJobs = async () => {
  const {user} = await getCurrentUser();
  const res = await getAllSavedJobs(user.id);

  console.log(res);

  return (
    <div>
      <h1 className="font-bold text-4xl text-center py-10">Saved Jobs</h1>
      <JobGrid data={res.data} user={user} />
    </div>
  );
};
export default SavedJobs;
