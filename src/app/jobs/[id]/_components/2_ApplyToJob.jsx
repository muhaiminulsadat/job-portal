"use client";

import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import {motion} from "framer-motion";
import {Briefcase} from "lucide-react";
import toast from "react-hot-toast";
import {useGetCurrentUser} from "@/hooks/auth.hook";
import {applyToJob, checkIfApplied} from "@/actions/application.action";
import useFetch from "@/hooks/fetch.hook";
import {useRouter} from "next/navigation";

const inputClass =
  "bg-white/[0.04] border-white/10 text-white placeholder:text-white/20 rounded-lg focus-visible:ring-indigo-500";

const ApplyToJob = ({job, fadeUp}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    resume: "",
    skills: "",
    experience: "",
    education: "",
  });

  const [errors, setErrors] = useState({});

  const router = useRouter();

  const {user} = useGetCurrentUser();

  console.log(hasApplied);

  useEffect(() => {
    const func = async () => {
      const res = await checkIfApplied(user?.id, job._id);
      if (res?.hasApplied) {
        setHasApplied(true);
      }
    };
    func();
  }, [user?.id, job?._id]);

  // ── Handlers ───────────────────────────────────────────────────────
  const handleChange = (e) => {
    setFormData((prev) => ({...prev, [e.target.name]: e.target.value}));
    setErrors((prev) => ({...prev, [e.target.name]: ""}));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.resume.trim()) newErrors.resume = "Resume URL is required";
    if (!formData.skills.trim()) newErrors.skills = "Skills are required";
    if (!formData.experience.trim())
      newErrors.experience = "Experience is required";
    if (!formData.education.trim())
      newErrors.education = "Education is required";
    return newErrors;
  };

  const handleSubmit = async () => {
    const values = {
      jobId: job._id,
      candidateId: user.id,
      ...formData,
    };

    setLoading(true);
    const res = await applyToJob(values);
    setLoading(false);

    if (!res.success) {
      toast.error(res.message);
      return;
    }

    toast.success("Application submitted!");
    setDrawerOpen(false);
    setFormData({
      name: "",
      resume: "",
      skills: "",
      experience: "",
      education: "",
    });
    setHasApplied(true);
    console.log(hasApplied);

    router.refresh();
  };

  return (
    <>
      {/* ── Buttons ── */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={5}
        className="flex gap-3"
      >
        <Button
          disabled={!job?.isOpen || hasApplied}
          variant={hasApplied ? "destructive" : "default"}
          onClick={() => setDrawerOpen(true)}
          className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {!job?.isOpen
            ? "Applications Closed"
            : hasApplied
              ? "Applied"
              : "Apply"}
        </Button>
        <Button
          variant="outline"
          className="border-white/10 text-white/60 hover:text-white hover:bg-white/5 rounded-lg cursor-pointer"
        >
          Save Job
        </Button>
      </motion.div>

      {/* ── Application Drawer ── */}
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerContent className="bg-[#0a0a0a] border-t border-white/10 text-white">
          <div className="mx-auto w-full max-w-xl">
            <DrawerHeader className="pb-2">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-white" />
                </div>
                <div>
                  <DrawerTitle className="text-white text-lg font-semibold">
                    Apply for {job?.title}
                  </DrawerTitle>
                  <DrawerDescription className="text-white/40 text-xs">
                    {job?.companyId?.name} • {job?.location}
                  </DrawerDescription>
                </div>
              </div>
            </DrawerHeader>

            {/* ── Form ── */}
            <div className="flex flex-col gap-4 px-4 pb-4 overflow-y-auto max-h-[60vh]">
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <Label className="text-white/60 text-xs">Full Name</Label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                  className={inputClass}
                />
                {errors.name && (
                  <p className="text-red-400 text-xs">{errors.name}</p>
                )}
              </div>

              {/* Resume URL */}
              <div className="flex flex-col gap-1.5">
                <Label className="text-white/60 text-xs">Resume URL</Label>
                <Input
                  name="resume"
                  value={formData.resume}
                  onChange={handleChange}
                  placeholder="https://drive.google.com/your-resume"
                  className={inputClass}
                />
                {errors.resume && (
                  <p className="text-red-400 text-xs">{errors.resume}</p>
                )}
              </div>

              {/* Skills */}
              <div className="flex flex-col gap-1.5">
                <Label className="text-white/60 text-xs">Skills</Label>
                <Input
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="e.g. React, Node.js, MongoDB"
                  className={inputClass}
                />
                {errors.skills && (
                  <p className="text-red-400 text-xs">{errors.skills}</p>
                )}
              </div>

              {/* Experience */}
              <div className="flex flex-col gap-1.5">
                <Label className="text-white/60 text-xs">Experience</Label>
                <Textarea
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="e.g. 3 years at Google as Frontend Engineer..."
                  rows={3}
                  className={`${inputClass} resize-none`}
                />
                {errors.experience && (
                  <p className="text-red-400 text-xs">{errors.experience}</p>
                )}
              </div>

              {/* Education */}
              <div className="flex flex-col gap-1.5">
                <Label className="text-white/60 text-xs">Education</Label>
                <Textarea
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  placeholder="e.g. BSc Computer Science, BUET 2020"
                  rows={2}
                  className={`${inputClass} resize-none`}
                />
                {errors.education && (
                  <p className="text-red-400 text-xs">{errors.education}</p>
                )}
              </div>
            </div>

            {/* ── Footer ── */}
            <DrawerFooter className="flex flex-row gap-2 pt-2">
              <DrawerClose asChild>
                <Button
                  variant="outline"
                  className="flex-1 border-white/10 text-white/60 hover:text-white hover:bg-white/5 rounded-lg cursor-pointer"
                >
                  Cancel
                </Button>
              </DrawerClose>
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg cursor-pointer"
              >
                {loading ? "Submitting..." : "Submit Application"}
              </Button>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ApplyToJob;
