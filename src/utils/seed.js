import connectDB from "./db";
import Job from "@/models/job.model";

const dummyJobs = [
  {
    recruiterId: "69a81bfae119290867f6de7d",
    companyId: "69a8c4e431c7dac04a55e411",
    title: "Senior Frontend Engineer",
    description: "We are looking for an experienced Frontend Engineer to join our growing team. You will be responsible for building and maintaining high-quality React applications.",
    location: "Dhaka Division",
    requirements: `## Requirements\n- 3+ years of experience with React\n- Strong knowledge of Next.js\n- Experience with Tailwind CSS\n- Familiarity with REST APIs\n- Good communication skills`,
    isOpen: true,
  },
  {
    recruiterId: "69a81bfae119290867f6de7d",
    companyId: "69a8c4e431c7dac04a55e411",
    title: "Backend Developer",
    description: "Join our backend team to build scalable APIs and services using Node.js and MongoDB.",
    location: "Chittagong Division",
    requirements: `## Requirements\n- 2+ years with Node.js\n- Experience with MongoDB and Mongoose\n- Knowledge of REST API design\n- Familiarity with Express.js\n- Understanding of JWT authentication`,
    isOpen: true,
  },
  {
    recruiterId: "69a81bfae119290867f6de7d",
    companyId: "69a8c4e431c7dac04a55e411",
    title: "UI/UX Designer",
    description: "We need a creative UI/UX Designer to design beautiful and intuitive interfaces for our products.",
    location: "Sylhet Division",
    requirements: `## Requirements\n- Proficiency in Figma\n- Strong portfolio of UI/UX work\n- Understanding of user-centered design\n- Experience with design systems\n- Basic HTML/CSS knowledge is a plus`,
    isOpen: false,
  },
  {
    recruiterId: "69a81bfae119290867f6de7d",
    companyId: "69a8c4e431c7dac04a55e411",
    title: "Full Stack Developer",
    description: "Looking for a Full Stack Developer to work on both frontend and backend of our web platform.",
    location: "Rajshahi Division",
    requirements: `## Requirements\n- Experience with React and Node.js\n- Knowledge of MongoDB\n- Familiarity with Next.js\n- Understanding of CI/CD pipelines\n- Strong problem solving skills`,
    isOpen: true,
  },
  {
    recruiterId: "69a81bfae119290867f6de7d",
    companyId: "69a8c4e431c7dac04a55e411",
    title: "DevOps Engineer",
    description: "We are hiring a DevOps Engineer to manage our cloud infrastructure and deployment pipelines.",
    location: "Khulna Division",
    requirements: `## Requirements\n- Experience with AWS or GCP\n- Knowledge of Docker and Kubernetes\n- Familiarity with CI/CD tools like GitHub Actions\n- Strong Linux skills\n- Experience with monitoring tools`,
    isOpen: true,
  },
];

const seed = async () => {
  await connectDB();
  await Job.insertMany(dummyJobs);
};

seed();
