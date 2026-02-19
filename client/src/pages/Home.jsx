import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BarChart3,
  CheckCircle2,
  Clock,
  Target,
  TrendingUp,
  AlertCircle,
  Layers,
  ArrowRight
} from "lucide-react";

import { header_content } from "../content";

/* ---------------- animation helpers ---------------- */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
};

/* ---------------- feature card ---------------- */

const FeatureCard = ({ icon:Icon,  title, text }) => (
  <motion.div
    variants={fadeUp}
    whileHover={{ y: -6 }}
    className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm text-center"
  >
    <div className="mx-auto mb-4 w-12 h-12 flex items-center justify-center bg-black text-white rounded-xl">
      <Icon size={20} />
    </div>

    <h3 className="text-sm font-semibold text-black">{title}</h3>
    <p className="mt-2 text-xs text-gray-600 leading-relaxed">{text}</p>
  </motion.div>
);

/* ---------------- main page ---------------- */

const Home = () => {
  return (
    <div className="space-y-28 pb-20">

      {/* ================= HERO ================= */}
      <section className="px-4 pt-16 text-center space-y-8 relative overflow-hidden">

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] bg-gradient-to-tr from-gray-200 via-gray-100 to-transparent blur-3xl -z-10"
        />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight text-black">
            {header_content.heading}
          </h1>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-xl mx-auto">
            {header_content.subheading}
          </p>

          <div className="flex flex-col gap-3 items-center pt-4">
            <Link
              to="/create-todo"
              className="w-full max-w-xs px-6 py-3 text-sm font-semibold text-white bg-black rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition"
            >
              Create Task <ArrowRight size={16} />
            </Link>

            <Link
              to="/dashboard"
              className="w-full max-w-xs px-6 py-3 text-sm font-semibold text-black bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition"
            >
              View Dashboard
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="px-4 space-y-6 text-center max-w-3xl mx-auto">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.6 }}
          className="text-xl font-semibold text-black"
        >
          More Than a Todo List
        </motion.h2>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          transition={{ delay: 0.1 }}
          className="text-sm text-gray-600 leading-relaxed"
        >
          TrackMyWork is built for structured execution.  
          Every task has a lifecycle. Every outcome has meaning.  
          And every decision generates insight.
        </motion.p>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="px-4 space-y-10">
        <div className="text-center space-y-2">
          <h2 className="text-lg font-semibold text-black">
            Core Capabilities
          </h2>
          <p className="text-xs text-gray-600">
            Built for productivity with measurable performance
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="grid gap-6"
        >
          <FeatureCard
            icon={Clock}
            title="Deadline Enforcement"
            text="Assign due times and maintain structured execution."
          />

          <FeatureCard
            icon={Target}
            title="Priority Control"
            text="Balance workload with clear priority weighting."
          />

          <FeatureCard
            icon={CheckCircle2}
            title="Lifecycle States"
            text="Active, Completed, Missed, Deleted — with reason tracking."
          />

          <FeatureCard
            icon={BarChart3}
            title="Analytics Dashboard"
            text="Visualize distribution, trends, and reliability."
          />

          <FeatureCard
            icon={AlertCircle}
            title="Behavior Insights"
            text="Understand why tasks fail — not just that they fail."
          />

          <FeatureCard
            icon={TrendingUp}
            title="Performance Tracking"
            text="Measure your completion consistency over time."
          />
        </motion.div>
      </section>

      {/* ================= SERVICES STRIP ================= */}
      <section className="px-4 py-14 bg-black rounded-3xl space-y-8 text-center">
        <Layers size={24} className="mx-auto text-white" />

        <h2 className="text-lg font-semibold text-white">
          Structured Workflow. Real Intelligence.
        </h2>

        <p className="text-xs text-gray-400 max-w-xl mx-auto leading-relaxed">
          TrackMyWork transforms tasks into measurable performance data.
          Every action contributes to long-term productivity improvement.
        </p>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="px-4 text-center space-y-6">
        <h3 className="text-lg font-semibold text-black">
          Stop Managing Tasks. Start Mastering Execution.
        </h3>

        <Link
          to="/create-todo"
          className="inline-block px-8 py-3 text-sm font-semibold text-white bg-black rounded-xl hover:opacity-90 transition"
        >
          Get Started
        </Link>
      </section>

    </div>
  );
};

export default Home;
