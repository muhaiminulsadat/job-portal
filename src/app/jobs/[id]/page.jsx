import {getJobDetails} from "@/actions/job.action";
import JobDetailPage from "./_components/JobDetailPage";
import {getCurrentUser} from "@/lib/auth";
import {checkIfApplied} from "@/actions/application.action";
import ApplicationList from "./_components/ApplicationDetails";

const page = async ({params}) => {
  const {id} = await params;

  const {data} = await getJobDetails(id);
  console.log("Data: ", data);
  const {user} = await getCurrentUser();

  const {hasApplied} = await checkIfApplied(user?.id, data._id);

  return (
    <>
      <JobDetailPage job={data} hasApplied={hasApplied} user={user} />
      <ApplicationList
        applications={data?.applications}
        recruiterId={data?.recruiterId}
        userId={user?.id}
      />
    </>
  );
};
export default page;
