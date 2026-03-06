"use client";

import {motion} from "framer-motion";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Briefcase,
  Search,
  Building2,
  Users,
  TrendingUp,
  Shield,
  Zap,
  Globe,
  Star,
  CheckCircle,
  ArrowRight,
  MapPin,
  Clock,
} from "lucide-react";

// ── Animation Variants ──────────────────────────────────────────────
const fadeUp = {
  hidden: {opacity: 0, y: 30},
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1]},
  }),
};

const fadeIn = {
  hidden: {opacity: 0},
  visible: (i = 0) => ({
    opacity: 1,
    transition: {duration: 0.5, delay: i * 0.1},
  }),
};

// ── Static Data ──────────────────────────────────────────────────────
const companies = [
  {id: 1, name: "Google", icon: Globe},
  {id: 2, name: "Microsoft", icon: Building2},
  {id: 3, name: "Amazon", icon: Zap},
  {id: 4, name: "Meta", icon: Users},
  {id: 5, name: "Apple", icon: Star},
  {id: 6, name: "Netflix", icon: TrendingUp},
  {id: 7, name: "Stripe", icon: Shield},
  {id: 8, name: "Figma", icon: Briefcase},
];

const stats = [
  {value: "50K+", label: "Active Jobs"},
  {value: "120K+", label: "Companies"},
  {value: "2M+", label: "Job Seekers"},
  {value: "98%", label: "Success Rate"},
];

const featuredJobs = [
  {
    id: 1,
    title: "Senior Frontend Engineer",
    company: "Stripe",
    location: "Remote",
    type: "Full-time",
    salary: "$140k–$180k",
  },
  {
    id: 2,
    title: "Product Designer",
    company: "Figma",
    location: "San Francisco",
    type: "Full-time",
    salary: "$120k–$160k",
  },
  {
    id: 3,
    title: "Backend Engineer",
    company: "Vercel",
    location: "Remote",
    type: "Contract",
    salary: "$100k–$140k",
  },
];

const faqs = [
  {
    question: "How do I create an account?",
    answer:
      "Click 'Get Started' and sign up with your email or Google account. It takes less than a minute.",
  },
  {
    question: "Is it free to search for jobs?",
    answer:
      "Yes, job seekers can browse and apply to all listings completely free of charge.",
  },
  {
    question: "How do I post a job as an employer?",
    answer:
      "Register as an employer, complete your company profile, and use the 'Post a Job' button to create your listing.",
  },
  {
    question: "Can I apply to multiple jobs at once?",
    answer:
      "Absolutely. You can apply to as many jobs as you like and track all your applications from your dashboard.",
  },
  {
    question: "How long does it take for employers to respond?",
    answer:
      "Response times vary, but most employers reply within 3–5 business days. You'll receive email notifications for every update.",
  },
];

// ── Component ────────────────────────────────────────────────────────
export default function LandingPage() {

  return (
    <main className="flex flex-col gap-24 py-16 px-4 max-w-6xl mx-auto">
      {/* ── Hero ── */}
      <section className="flex flex-col items-center text-center gap-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="inline-flex items-center gap-2 border border-white/10 rounded-full px-4 py-1.5 text-xs text-white/50 bg-white/5"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          50,000+ jobs posted this month
        </motion.div>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.05]"
        >
          Find Your
          <br />
          <span className="bg-gradient-to-r from-indigo-400 via-blue-300 to-cyan-400 bg-clip-text text-transparent">
            Dream Job
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="text-white/40 text-lg sm:text-xl max-w-xl"
        >
          Explore thousands of job listings or find the perfect candidate — all
          in one place.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
          className="flex flex-wrap gap-4 justify-center"
        >
          <Link href="/jobs">
            <Button
              size="lg"
              className="bg-indigo-600 hover:bg-indigo-500 text-white rounded px-8 gap-2 cursor-pointer"
            >
              Find Jobs <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/post-job">
            <Button
              size="lg"
              variant="destructive"
              className="rounded px-8 border-white/15 text-white hover:bg-white/5 cursor-pointer"
            >
              Post a Job
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* ── Stats ── */}
      <motion.section
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{once: true}}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            custom={i}
            className="flex flex-col items-center justify-center border border-white/8 rounded-2xl py-8 bg-white/[0.03]"
          >
            <span className="text-3xl sm:text-4xl font-bold text-white">
              {stat.value}
            </span>
            <span className="text-white/40 text-sm mt-1">{stat.label}</span>
          </motion.div>
        ))}
      </motion.section>

      {/* ── Trusted Companies ── */}
      <motion.section
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{once: true}}
        className="flex flex-col items-center gap-6"
      >
        <p className="text-white/25 text-xs uppercase tracking-widest">
          Trusted by teams at
        </p>
        <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
          {companies.map(({id, name, icon: Icon}, i) => (
            <motion.div
              key={id}
              variants={fadeUp}
              custom={i * 0.5}
              className="flex items-center gap-2 text-white/30 hover:text-white/60 transition-colors duration-300"
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{name}</span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── Featured Jobs ── */}
      <motion.section
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{once: true}}
        className="flex flex-col gap-6"
      >
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Featured Jobs
            </h2>
            <p className="text-white/40 text-sm mt-1">
              Handpicked roles from top companies
            </p>
          </div>
          <Link href="/jobs">
            <Button
              variant="ghost"
              size="sm"
              className="text-indigo-400 hover:text-indigo-300 hover:bg-indigo-400/10 gap-1 cursor-pointer"
            >
              View all <ArrowRight className="w-3 h-3" />
            </Button>
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          {featuredJobs.map((job, i) => (
            <motion.div
              key={job.id}
              variants={fadeUp}
              custom={i}
              whileHover={{x: 4}}
              transition={{type: "spring", stiffness: 300}}
              className="flex items-center justify-between border border-white/8 rounded-2xl px-6 py-5 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/15 transition-colors duration-200 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-indigo-400" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm">{job.title}</p>
                  <p className="text-white/40 text-xs mt-0.5">{job.company}</p>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-4 text-xs text-white/30">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {job.location}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {job.type}
                </span>
                <span className="text-emerald-400/80 font-medium">
                  {job.salary}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── For Seekers / Employers ── */}
      <motion.section
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{once: true}}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {[
          {
            icon: Search,
            title: "For Job Seekers",
            description:
              "Search and apply for jobs, track your applications, set job alerts, and get hired faster.",
            perks: [
              "Smart job matching",
              "One-click apply",
              "Application tracking",
            ],
            href: "/jobs",
            cta: "Start Searching",
            color: "indigo",
          },
          {
            icon: Building2,
            title: "For Employers",
            description:
              "Post jobs, manage applications, and discover the best candidates for your team.",
            perks: [
              "Unlimited job posts",
              "Candidate filtering",
              "Analytics dashboard",
            ],
            href: "/post-job",
            cta: "Post a Job",
            color: "cyan",
          },
        ].map(
          ({icon: Icon, title, description, perks, href, cta, color}, i) => (
            <motion.div key={i} variants={fadeUp} custom={i}>
              <Card className="bg-white/[0.03] border-white/8 hover:border-white/15 transition-colors duration-300 h-full rounded-2xl">
                <CardHeader className="pb-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                      color === "indigo"
                        ? "bg-indigo-500/15 border border-indigo-500/20"
                        : "bg-cyan-500/15 border border-cyan-500/20"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        color === "indigo" ? "text-indigo-400" : "text-cyan-400"
                      }`}
                    />
                  </div>
                  <CardTitle className="text-white font-bold text-xl">
                    {title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <p className="text-white/40 text-sm leading-relaxed">
                    {description}
                  </p>
                  <ul className="flex flex-col gap-2">
                    {perks.map((perk, j) => (
                      <li
                        key={j}
                        className="flex items-center gap-2 text-sm text-white/60"
                      >
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400/70 shrink-0" />
                        {perk}
                      </li>
                    ))}
                  </ul>
                  <Link href={href} className="mt-2">
                    <Button
                      size="sm"
                      className={`rounded-full gap-2 cursor-pointer ${
                        color === "indigo"
                          ? "bg-indigo-600 hover:bg-indigo-500 text-white"
                          : "bg-cyan-600 hover:bg-cyan-500 text-white"
                      }`}
                    >
                      {cta} <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ),
        )}
      </motion.section>

      {/* ── FAQ ── */}
      <motion.section
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{once: true}}
        className="flex flex-col gap-6"
      >
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-white/40 text-sm mt-2">
            Everything you need to know about the platform
          </p>
        </div>

        <Accordion type="multiple" className="w-full flex flex-col gap-2">
          {faqs.map((faq, i) => (
            <motion.div key={i} variants={fadeUp} custom={i}>
              <AccordionItem
                value={`item-${i}`}
                className="border border-white/8 rounded-xl px-5 bg-white/[0.03] hover:bg-white/[0.05] transition-colors"
              >
                <AccordionTrigger className="text-white/80 hover:text-white text-sm py-4 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-white/40 text-sm pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </motion.section>

      {/* ── CTA Banner ── */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{once: true}}
        className="relative rounded-3xl border border-white/8 bg-gradient-to-br from-indigo-500/10 via-transparent to-cyan-500/10 px-8 py-16 text-center overflow-hidden"
      >
        {/* subtle glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 via-transparent to-cyan-600/5 pointer-events-none" />

        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 relative">
          Ready to get started?
        </h2>
        <p className="text-white/40 text-base mb-8 relative">
          Join over 2 million professionals already using the platform.
        </p>
        <div className="flex flex-wrap gap-4 justify-center relative">
          <Link href="/sign-up">
            <Button
              size="lg"
              className="bg-white text-black hover:bg-white/90 rounded-full px-10 font-semibold cursor-pointer"
            >
              Get Started Free
            </Button>
          </Link>
          <Link href="/jobs">
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-10 border-white/15 text-white hover:bg-white/5 cursor-pointer"
            >
              Browse Jobs
            </Button>
          </Link>
        </div>
      </motion.section>
    </main>
  );
}
