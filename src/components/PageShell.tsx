import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

interface PageShellProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export default function PageShell({ title, subtitle, children }: PageShellProps) {
  return (
    <div className="min-h-screen bg-brandblack">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-brandblack/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
          <Link
            to="/"
            className="flex items-center gap-2 font-inter text-xs uppercase tracking-widest text-white/60 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Dashboard
          </Link>
          <div className="flex items-center gap-6">
            <Link
              to="/planner"
              className="font-inter text-xs uppercase tracking-widest text-white/60 transition hover:text-white"
            >
              Planner
            </Link>
            <Link
              to="/all-courses"
              className="font-inter text-xs uppercase tracking-widest text-white/60 transition hover:text-white"
            >
              All Courses
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-14 sm:px-10 lg:py-20">
        <div className="mb-10 lg:mb-14">
          <h1 className="font-podium text-3xl uppercase tracking-wide text-white sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          {subtitle && <p className="mt-3 max-w-2xl text-sm text-white/50 sm:text-base">{subtitle}</p>}
        </div>
        {children}
      </div>
    </div>
  );
}
