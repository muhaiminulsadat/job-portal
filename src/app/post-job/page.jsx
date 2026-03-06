"use client";

import {useEffect, useState} from "react";
import {motion} from "framer-motion";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {Briefcase, Plus, X} from "lucide-react";
import Link from "next/link";
import MDEditor from "@uiw/react-md-editor";
import {State} from "country-state-city";
import AddCompanyModal from "./_components/AddCompanyModal";
import {getAllCompanies} from "@/actions/company.action";
import {useRouter} from "next/navigation";
import {useGetCurrentUser} from "@/hooks/auth.hook";
import {createPost} from "@/actions/job.action";
import toast from "react-hot-toast";

// ── Animation Variants ───────────────────────────────────────────────
const fadeUp = {
  hidden: {opacity: 0, y: 24},
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1]},
  }),
};

// Bangladesh states from country-state-city
const bangladeshStates = State.getStatesOfCountry("BD");

// Sample companies (will be fetched from DB later)
const COMPANIES = [
  {id: "1", name: "Google"},
  {id: "2", name: "Meta"},
  {id: "3", name: "Stripe"},
  {id: "4", name: "Vercel"},
  {id: "5", name: "Figma"},
];

// ── Input Class ──────────────────────────────────────────────────────
const inputClass =
  "bg-white/[0.04] border-white/10 text-white placeholder:text-white/20 rounded-lg focus-visible:ring-indigo-500";

// ── Component ────────────────────────────────────────────────────────
export default function PostJobPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    companyId: "",
    requirements: "",
  });

  const [requirements, setRequirements] = useState(""); // MD editor value
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [companies, setCompanies] = useState([]);

  const router = useRouter();
  const {user} = useGetCurrentUser();

  useEffect(() => {
    const getData = async () => {
      const res = await getAllCompanies();
      setCompanies(res.data);
    };

    getData();
  }, []);

  // ── Handlers ───────────────────────────────────────────────────────
  const handleChange = (e) => {
    setFormData((prev) => ({...prev, [e.target.name]: e.target.value}));
    setErrors((prev) => ({...prev, [e.target.name]: ""}));
  };

  const handleSelect = (name, value) => {
    setFormData((prev) => ({...prev, [name]: value}));
    setErrors((prev) => ({...prev, [name]: ""}));
  };

  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills((prev) => [...prev, trimmed]);
    }
    setSkillInput("");
  };

  const removeSkill = (skill) => {
    setSkills((prev) => prev.filter((s) => s !== skill));
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  const onAdd = (data) => {
    setCompanies((prev) => [...prev, data]);
  };

  // ── Validation ─────────────────────────────────────────────────────
  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.location) newErrors.location = "Please select a location";
    if (!formData.companyId) newErrors.companyId = "Please select a company";
    if (!requirements.trim())
      newErrors.requirements = "Requirements are required";
    return newErrors;
  };

  // ── Submit ─────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const values = {
      recruiterId: user.id,
      ...formData,
    };

    const res = await createPost(values);
    if (!res.success) {
      toast.error(res.message);
      return;
    }

    setFormData({
      title: "",
      description: "",
      location: "",
      companyId: "",
      requirements: "",
    });

    toast.success("Job Created Successfully");
    router.push("/jobs");
  };

  return (
    <div className="min-h-screen px-4 py-16">
      <div className="max-w-2xl mx-auto flex flex-col gap-8">
        {/* ── Header ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="flex flex-col items-center text-center gap-2"
        >
          <Link href="/" className="flex items-center gap-2 group mb-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center group-hover:bg-indigo-500 transition-colors">
              <Briefcase className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              Cakri
            </span>
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Post a Job
          </h1>
          <p className="text-white/40 text-sm">
            Fill in the details below to publish your job listing
          </p>
        </motion.div>

        {/* ── Form Card ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          <Card className="bg-white/[0.03] border border-white/10 rounded-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-lg font-semibold">
                Job Details
              </CardTitle>
              <CardDescription className="text-white/40 text-sm">
                Provide accurate information to attract the right candidates
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Job Title */}
                <motion.div
                  variants={fadeUp}
                  custom={2}
                  className="flex flex-col gap-1.5"
                >
                  <Label className="text-white/60 text-xs">Job Title</Label>
                  <Input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Senior Frontend Engineer"
                    className={inputClass}
                  />
                  {errors.title && (
                    <p className="text-red-400 text-xs">{errors.title}</p>
                  )}
                </motion.div>

                {/* Description */}
                <motion.div
                  variants={fadeUp}
                  custom={3}
                  className="flex flex-col gap-1.5"
                >
                  <Label className="text-white/60 text-xs">
                    Job Description
                  </Label>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe the role, responsibilities and what you're looking for..."
                    rows={4}
                    className={`${inputClass} resize-none`}
                  />
                  {errors.description && (
                    <p className="text-red-400 text-xs">{errors.description}</p>
                  )}
                </motion.div>

                {/* Location + Company */}
                <motion.div
                  variants={fadeUp}
                  custom={4}
                  className="flex items-center justify-between"
                >
                  {/* Location — Bangladesh States */}
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-white/60 text-xs">Location</Label>
                    <Select
                      value={formData.location}
                      onValueChange={(val) => handleSelect("location", val)}
                    >
                      <SelectTrigger className={inputClass}>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#111] border-white/10 text-white max-h-60">
                        <SelectGroup>
                          {bangladeshStates.map(({name}) => (
                            <SelectItem
                              key={name}
                              value={name}
                              className="hover:bg-white/5 focus:bg-white/10"
                            >
                              {name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {errors.location && (
                      <p className="text-red-400 text-xs">{errors.location}</p>
                    )}
                  </div>

                  {/* Company */}
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-white/60 text-xs">Company</Label>
                    <Select
                      value={formData.companyId}
                      onValueChange={(val) => handleSelect("companyId", val)}
                    >
                      <SelectTrigger className={inputClass}>
                        <SelectValue placeholder="Select company" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#111] border-white/10 text-white">
                        <SelectGroup>
                          {companies.map((com) => (
                            <SelectItem
                              key={com?._id}
                              value={com?._id}
                              className="hover:bg-white/5 focus:bg-white/10"
                            >
                              {com.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {errors.companyId && (
                      <p className="text-red-400 text-xs">{errors.companyId}</p>
                    )}
                  </div>

                  <Button variant="destructive" onClick={() => setIsOpen(true)}>
                    Add Company
                  </Button>
                </motion.div>

                {/* Skills Tags */}
                <motion.div
                  variants={fadeUp}
                  custom={5}
                  className="flex flex-col gap-1.5"
                >
                  <Label className="text-white/60 text-xs">Skills</Label>
                  <div className="flex gap-2">
                    <Input
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={handleSkillKeyDown}
                      placeholder="e.g. React — press Enter or click +"
                      className={inputClass}
                    />
                    <Button
                      type="button"
                      onClick={addSkill}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg px-3 cursor-pointer shrink-0"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  {skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-1">
                      {skills.map((skill) => (
                        <span
                          key={skill}
                          className="flex items-center gap-1.5 bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 text-xs px-3 py-1 rounded-md"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => removeSkill(skill)}
                            className="text-indigo-400 hover:text-white transition-colors cursor-pointer"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>

                {/* Requirements — MD Editor */}
                <motion.div
                  variants={fadeUp}
                  custom={6}
                  className="flex flex-col gap-1.5"
                >
                  <Label className="text-white/60 text-xs">Requirements</Label>
                  {/* data-color-mode="dark" forces dark theme on MD editor */}
                  <div data-color-mode="dark">
                    <MDEditor
                      value={requirements}
                      onChange={setRequirements}
                      height={250}
                      // name="requirements"
                    />
                  </div>
                  {errors.requirements && (
                    <p className="text-red-400 text-xs">
                      {errors.requirements}
                    </p>
                  )}
                </motion.div>

                {/* Submit */}
                <motion.div variants={fadeUp} custom={7}>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg mt-1 cursor-pointer"
                  >
                    {loading ? "Publishing..." : "Publish Job"}
                  </Button>
                </motion.div>
              </form>
              <AddCompanyModal
                open={isOpen}
                setOpen={setIsOpen}
                onAdd={onAdd}
              />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
