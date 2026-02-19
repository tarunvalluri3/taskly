import { Link } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Target,
  AlertCircle,
  Trash2,
  BarChart3,
  Shield,
  Layers,
  TrendingUp
} from "lucide-react";

import { header_content } from "../content";

/* ---------------- animations ---------------- */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 }
  }
};

/* ---------------- reusable card ---------------- */

const Card = ({ icon: Icon, title, text }) => (
  <motion.div
    variants={fadeUp}
    whileHover={{
      y: -6,
      scale: 1.02
    }}
    transition={{ type: "spring", stiffness: 260, damping: 18 }}
    className="
      group
      backdrop-blur-xl
      bg-white/60
      border border-gray-200
      rounded-2xl
      p-6
      shadow-sm
      text-center
      sm:text-left
    "
  >
    <div className="
      mx-auto sm:mx-0
      w-11 h-11
      bg-black text-white
      rounded-xl
      flex items-center justify-center
      mb-4
      transition-transform
      group-hover:rotate-6
    ">
      <Icon size={18} />
    </div>

    <h3 className="text-sm font-semibold text-black">{title}</h3>
    <p className="mt-2 text-xs text-gray-600 leading-relaxed">
      {text}
    </p>
  </motion.div>
);

/* ---------------- main component ---------------- */

const Home = () => {
  /* scroll progress */
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative pb-28 space-y-28 overflow-hidden">

      {/* Scroll Progress Indicator */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1 bg-black origin-left z-50"
      />

      {/* Subtle Background Grid */}
      <div
        className="
          pointer-events-none
          absolute inset-0
          -z-10
          bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)]
          bg-[size:40px_40px]
          opacity-30
        "
      />

      {/* ================= HERO ================= */}
      <section className="relative px-4 pt-24 text-center overflow-hidden">

        {/* glow effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1.2 }}
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[32rem] h-[32rem] bg-gradient-to-tr from-gray-200 via-gray-100 to-transparent blur-3xl -z-10"
        />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          {/* floating icons */}
          <div className="flex justify-center gap-4">
            {[Target, Clock, TrendingUp].map((Icon, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.4
                }}
                className="w-11 h-11 bg-black text-white rounded-xl flex items-center justify-center"
              >
                <Icon size={18} />
              </motion.div>
            ))}
          </div>

          <h1 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
            {header_content.heading}
          </h1>

          <p className="text-sm text-gray-600 leading-relaxed max-w-xl mx-auto sm:text-base">
            {header_content.subheading}
          </p>

          {/* CTA */}
          <div className="flex flex-col gap-3 items-center pt-4">
            <Link
              to="/create-todo"
              className="
                group
                w-full max-w-xs
                px-6 py-3
                text-sm font-semibold
                text-white bg-black
                rounded-xl
                flex items-center justify-center gap-2
                transition-all duration-200
                hover:opacity-90
              "
            >
              Create Your First Task
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <Link
              to="/dashboard"
              className="
                w-full max-w-xs
                px-6 py-3
                text-sm font-semibold
                text-black
                bg-white
                border border-gray-300
                rounded-xl
                transition-all duration-200
                hover:bg-gray-50
              "
            >
              View Dashboard
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="px-4 space-y-10 max-w-6xl mx-auto">

        <div className="text-center space-y-3">
          <h2 className="text-xl font-semibold text-black">
            Structured Productivity System
          </h2>
          <p className="text-sm text-gray-600 max-w-2xl mx-auto">
            Not just tasks — outcomes, reasons, priorities and measurable
            execution clarity.
          </p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <Card
            icon={Clock}
            title="Deadlines"
            text="Attach due dates to every task and maintain execution discipline."
          />
          <Card
            icon={Target}
            title="Priority Control"
            text="Low, Medium, High priority visibility."
          />
          <Card
            icon={CheckCircle2}
            title="Outcome Tracking"
            text="Completed, Missed, Deleted — fully recorded."
          />
          <Card
            icon={AlertCircle}
            title="Missed Reasons"
            text="Understand what blocks your execution."
          />
          <Card
            icon={Trash2}
            title="Deletion Reasons"
            text="Track logic behind removal decisions."
          />
          <Card
            icon={BarChart3}
            title="Dashboard View"
            text="See everything grouped by lifecycle state."
          />
        </motion.div>
      </section>

      {/* ================= BENEFITS ================= */}
      <section className="px-4 space-y-10 max-w-5xl mx-auto">

        <div className="text-center space-y-3">
          <h2 className="text-xl font-semibold text-black">
            Why This App Is Different
          </h2>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2"
        >
          <Card
            icon={Shield}
            title="Private by Design"
            text="Each user sees only their own tasks."
          />
          <Card
            icon={TrendingUp}
            title="Behavior Insights"
            text="Detect patterns in missed and deleted tasks."
          />
          <Card
            icon={CheckCircle2}
            title="Execution Reliability"
            text="Measure how consistently you deliver."
          />
          <Card
            icon={Layers}
            title="Lifecycle Intelligence"
            text="Every task has a state and meaning."
          />
        </motion.div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="px-4 text-center space-y-6">
        <h3 className="text-lg font-semibold text-black">
          Stop Managing Tasks. Start Improving Performance.
        </h3>

        <Link
          to="/create-todo"
          className="
            group
            inline-flex
            px-8 py-3
            text-sm font-semibold
            text-white bg-black
            rounded-xl
            items-center gap-2
            transition-all duration-200
            hover:opacity-90
          "
        >
          Get Started Now
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </section>

    </div>
  );
};

export default Home;
