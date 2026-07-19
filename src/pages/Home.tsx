import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import CurriculumOverviewTable from "../components/CurriculumOverviewTable";
import CategoryCard from "../components/CategoryCard";
import { creditSummary } from "../data/curriculum";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const curriculumRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const scrollToCurriculum = () => {
    curriculumRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".gsap-fade-section", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Hero onExploreCurriculum={scrollToCurriculum} />

      <div ref={curriculumRef} id="curriculum" className="mx-auto max-w-6xl px-6 py-20 sm:px-10 lg:py-28">
        <div ref={sectionRef}>
          <div className="gsap-fade-section mb-10 lg:mb-14">
            <div className="text-xs uppercase tracking-[0.3em] text-brandred">
              Software Engineering · VIT-AP
            </div>
            <h2 className="mt-3 font-podium text-3xl uppercase tracking-wide text-white sm:text-4xl lg:text-5xl">
              Curriculum Overview
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-white/50 sm:text-base">
              200 total credits across four baskets — track what's earned, registered, and still
              remaining.
            </p>
          </div>

          <div className="gsap-fade-section">
            <CurriculumOverviewTable />
          </div>

          <div className="mt-16 grid gap-6 sm:mt-20 md:grid-cols-2">
            {creditSummary.map((row, i) => (
              <CategoryCard key={row.category} row={row} index={i} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 text-center sm:mt-20"
          >
            <Link
              to="/all-courses"
              className="inline-flex items-center gap-2 border border-white/20 px-6 py-4 font-inter text-xs uppercase tracking-widest text-white/80 transition hover:border-brandred hover:bg-brandred/10 hover:text-white"
            >
              Browse every course
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
}
