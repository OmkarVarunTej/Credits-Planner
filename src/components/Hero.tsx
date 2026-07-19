import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight, Award, Crown, X } from "lucide-react";

const NAV_LINKS: { label: string; target: string; route?: string }[] = [
  { label: "Curriculum", target: "curriculum" },
  { label: "University Core", target: "university-core" },
  { label: "Programme Core", target: "programme-core" },
  { label: "Electives", target: "electives" },
  { label: "Planner", target: "planner", route: "/planner" },
  { label: "About", target: "about" },
];

interface HeroProps {
  onExploreCurriculum: () => void;
}

export default function Hero({ onExploreCurriculum }: HeroProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavClick = (link: { target: string; route?: string }) => {
    setMenuOpen(false);
    if (link.route) {
      navigate(link.route);
      return;
    }
    const el = document.getElementById(link.target);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background video */}
      <video
        className="absolute inset-0 h-full w-full object-cover object-[75%_center] sm:object-center"
        autoPlay
        muted
        loop
        playsInline
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260606_154941_df1a96e1-a06f-450c-bd02-d863414cc1a0.mp4"
      />
      <div className="absolute inset-0 bg-black/40" />

      {/* Content overlay */}
      <div className="relative z-10 flex h-full flex-col">
        {/* Navbar */}
        <nav className="flex items-center justify-between px-6 py-5 sm:px-10 lg:px-16 lg:py-7">
          <span className="font-podium text-2xl font-bold uppercase tracking-wider text-white sm:text-3xl">
            VARUN
          </span>

          <div className="hidden items-center gap-10 md:flex">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link)}
                className="font-inter text-sm uppercase tracking-widest text-white/80 transition hover:text-white"
              >
                {link.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => handleNavClick({ target: "about" })}
            className="hidden items-center gap-2 border border-white/30 px-6 py-3 font-inter text-xs uppercase tracking-widest text-white transition hover:border-white/60 hover:bg-white/10 md:flex"
          >
            Get in touch
            <ArrowUpRight className="h-4 w-4" />
          </button>

          <button
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
            className="flex flex-col items-end space-y-1.5 md:hidden"
          >
            <div className="h-0.5 w-6 bg-white" />
            <div className="h-0.5 w-6 bg-white" />
            <div className="h-0.5 w-4 bg-white" />
          </button>
        </nav>

        {/* Mobile menu overlay */}
        <div
          className={`fixed inset-0 z-50 bg-black/95 backdrop-blur-sm transition-all duration-500 md:hidden ${
            menuOpen ? "visible opacity-100" : "invisible opacity-0"
          }`}
        >
          <div className="flex items-center justify-between px-6 py-5">
            <span className="font-podium text-2xl font-bold uppercase tracking-wider text-white">
              VARUN
            </span>
            <button aria-label="Close menu" onClick={() => setMenuOpen(false)}>
              <X className="h-7 w-7 text-white" />
            </button>
          </div>

          <div className="flex h-[calc(100%-88px)] flex-col items-center justify-center gap-8">
            {NAV_LINKS.map((link, i) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link)}
                style={{
                  transitionDelay: `${i * 80 + 100}ms`,
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? "translateY(0)" : "translateY(20px)",
                }}
                className="font-podium text-4xl uppercase text-white transition-all duration-500 sm:text-5xl"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick({ target: "about" })}
              style={{
                transitionDelay: `${NAV_LINKS.length * 80 + 100}ms`,
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(20px)",
              }}
              className="mt-4 border border-white/30 px-8 py-4 font-inter text-xs uppercase tracking-widest text-white transition-all duration-500 hover:border-white/60 hover:bg-white/10"
            >
              Get in touch
            </button>
          </div>
        </div>

        {/* Hero content */}
        <div className="flex flex-1 items-center px-6 sm:px-10 lg:px-16 text-center sm:text-left">
          <div className="max-w-3xl mx-auto sm:mx-0 flex flex-col items-center sm:items-start">
            <div className="animate-fade-up mb-6 flex flex-col items-center sm:items-start gap-1 text-xs uppercase tracking-[0.3em] text-white/70 sm:text-sm lg:mb-8">
              <div className="flex items-center gap-2">
                <Crown className="h-4 w-4 text-white/70" />
                VIT-AP University
              </div>
              <div className="sm:ml-6 text-[10px] tracking-[0.25em] text-white/50 sm:text-xs">
                Integrated M.Tech Software Engineering Curriculum
              </div>
            </div>

            <h1 className="animate-fade-up-delay-1 font-podium uppercase leading-[0.92] tracking-tight text-white">
              <span className="block text-[clamp(2.8rem,8vw,7rem)]">Plan.</span>
              <span className="block text-[clamp(2.8rem,8vw,7rem)]">Track.</span>
              <span className="block text-[clamp(2.8rem,8vw,7rem)]">Graduate.</span>
            </h1>

            <p className="animate-fade-up-delay-2 mt-6 max-w-md text-sm leading-relaxed text-white/70 sm:text-base lg:mt-8">
              Explore the complete Integrated M.Tech Software Engineering
              curriculum including University Core, Programme Core, Programme
              Electives and University Electives.{" "}
              <span className="font-bold text-white">
                Track credits, view basket requirements and browse every
                available course.
              </span>
            </p>

            <div className="animate-fade-up-delay-3 mt-8 flex flex-wrap justify-center sm:justify-start items-center gap-4 sm:gap-6 lg:mt-10">
              <button
                onClick={onExploreCurriculum}
                className="group flex items-center gap-2 bg-black px-5 py-3 text-[11px] uppercase tracking-widest text-white transition hover:bg-neutral-900 sm:px-7 sm:py-4 sm:text-xs"
              >
                Explore Curriculum
                <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>

              <div className="hidden items-center gap-3 sm:flex">
                <Award className="h-8 w-8 text-white/50" />
                <div className="text-xs uppercase tracking-wider text-white/60">
                  <div>VIT-AP</div>
                  <div>Curriculum Reference</div>
                </div>
              </div>
            </div>

            <div className="animate-fade-up-delay-4 mt-8 flex flex-wrap justify-center sm:justify-start gap-6 sm:mt-10 sm:gap-8 lg:mt-14 lg:gap-12">
              {[
                ["200", "Total Credits"],
                ["102", "University Core"],
                ["48", "Programme Core"],
                ["28", "Programme Elective"],
                ["22", "University Elective"],
              ].map(([value, label]) => (
                <div key={label}>
                  <div className="font-inter text-2xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                    {value}
                  </div>
                  <div className="mt-1 text-[9px] uppercase tracking-widest text-white/50 sm:text-xs">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
