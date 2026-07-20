import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import PageShell from "../components/PageShell";
import CourseTable from "../components/CourseTable";
import CurriculumOverviewTable from "../components/CurriculumOverviewTable";
import {
  allCourses,
  universityCoreDistribution,
  universityCoreBaskets,
  programmeCore,
  programmeElective,
  universityElective,
  type CourseStatus,
} from "../data/curriculum";

type SortKey = "code" | "name" | "credits" | "semester";
type StatusFilter = "All" | CourseStatus;

const SECTIONS = [
  { label: "University Core Distribution", id: "core-distribution" },
  { label: "Engineering Foundation", id: "engineering-foundation", courses: universityCoreBaskets[0].courses },
  { label: "Clubs", id: "clubs", courses: universityCoreBaskets[1].courses },
  { label: "English", id: "english", courses: universityCoreBaskets[2].courses },
  { label: "Humanities", id: "humanities", courses: universityCoreBaskets[3].courses },
  { label: "Project & Internship", id: "project-internship", courses: universityCoreBaskets[4].courses },
  { label: "Management", id: "management", courses: universityCoreBaskets[5].courses },
  { label: "Science", id: "science", courses: universityCoreBaskets[6].courses },
  { label: "Soft Skills", id: "soft-skills", courses: universityCoreBaskets[7].courses },
  { label: "Programme Core", id: "programme-core", courses: programmeCore },
  { label: "Programme Elective", id: "programme-elective", courses: programmeElective },
  { label: "University Elective", id: "university-elective", courses: universityElective },
];

export default function AllCourses() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusFilter>("All");
  const [semester, setSemester] = useState<string>("All");
  const [basket, setBasket] = useState<string>("All");
  const [sortKey, setSortKey] = useState<SortKey>("code");
  const [showFilters, setShowFilters] = useState(false);

  const semesters = useMemo(
    () => ["All", ...Array.from(new Set(allCourses.map((c) => c.semester))).sort()],
    []
  );
  const baskets = useMemo(
    () => ["All", ...Array.from(new Set(allCourses.map((c) => c.basket)))],
    []
  );

  const searching = query.trim().length > 0 || status !== "All" || semester !== "All" || basket !== "All";

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let result = allCourses.filter((c) => {
      const matchesQuery =
        !q ||
        c.code.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q) ||
        c.basket.toLowerCase().includes(q) ||
        c.semester.toLowerCase().includes(q) ||
        String(c.credits).includes(q);
      const matchesStatus = status === "All" || c.status === status;
      const matchesSemester = semester === "All" || c.semester === semester;
      const matchesBasket = basket === "All" || c.basket === basket;
      return matchesQuery && matchesStatus && matchesSemester && matchesBasket;
    });

    result = [...result].sort((a, b) => {
      if (sortKey === "credits") return b.credits - a.credits;
      if (sortKey === "name") return a.name.localeCompare(b.name);
      if (sortKey === "semester") return a.semester.localeCompare(b.semester);
      return a.code.localeCompare(b.code);
    });

    return result;
  }, [query, status, semester, basket, sortKey]);

  return (
    <PageShell
      title="All Curriculum"
      subtitle="Every course across every basket — search, filter, and sort the complete curriculum."
    >
      {/* Search + filters */}
      <div className="mb-10 rounded-2xl bg-brandblack/90 py-4 backdrop-blur-md">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by course code, name, basket, semester, credits..."
              className="w-full rounded-full glass-light py-3 pl-11 pr-4 text-sm text-white placeholder:text-white/30 outline-none focus:border-brandred/50"
            />
          </div>
          <button
            onClick={() => setShowFilters((v) => !v)}
            className="flex items-center justify-center gap-2 rounded-full glass-light px-5 py-3 text-xs uppercase tracking-widest text-white/70 transition hover:text-white sm:w-auto"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as StatusFilter)}
              className="rounded-xl glass-light px-4 py-2.5 text-sm text-white outline-none"
            >
              {(["All", "Completed", "Registered", "Not Registered"] as StatusFilter[]).map((s) => (
                <option key={s} value={s} className="bg-brandgray">
                  {s}
                </option>
              ))}
            </select>
            <select
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="rounded-xl glass-light px-4 py-2.5 text-sm text-white outline-none"
            >
              {semesters.map((s) => (
                <option key={s} value={s} className="bg-brandgray">
                  {s}
                </option>
              ))}
            </select>
            <select
              value={basket}
              onChange={(e) => setBasket(e.target.value)}
              className="rounded-xl glass-light px-4 py-2.5 text-sm text-white outline-none"
            >
              {baskets.map((b) => (
                <option key={b} value={b} className="bg-brandgray">
                  {b}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-white/40">
          <span>Sort by:</span>
          {(["code", "name", "credits", "semester"] as SortKey[]).map((key) => (
            <button
              key={key}
              onClick={() => setSortKey(key)}
              className={`rounded-full px-3 py-1 uppercase tracking-wider transition ${
                sortKey === key ? "bg-brandred text-white" : "glass-light text-white/50 hover:text-white"
              }`}
            >
              {key}
            </button>
          ))}
        </div>
      </div>

      {searching ? (
        <section>
          <h2 className="mb-4 font-podium text-xl uppercase tracking-wide text-white">
            Results <span className="text-white/40">({filtered.length})</span>
          </h2>
          <CourseTable courses={filtered} showBasket />
        </section>
      ) : (
        <div className="space-y-16">
          <section id="credit-summary">
            <h2 className="sticky top-[65px] z-10 mb-4 bg-brandblack/90 py-2 font-podium text-xl uppercase tracking-wide text-white backdrop-blur-md">
              Credit Summary
            </h2>
            <CurriculumOverviewTable />
          </section>

          <section id="core-distribution">
            <h2 className="sticky top-[65px] z-10 mb-4 bg-brandblack/90 py-2 font-podium text-xl uppercase tracking-wide text-white backdrop-blur-md">
              University Core Distribution
            </h2>
            <div className="hidden overflow-hidden rounded-2xl glass md:block">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10 text-xs uppercase tracking-widest text-white/50">
                    <th className="px-6 py-4 font-medium">Basket</th>
                    <th className="px-6 py-4 text-right font-medium">Minimum</th>
                    <th className="px-6 py-4 text-right font-medium">Earned</th>
                    <th className="px-6 py-4 text-right font-medium">Remaining</th>
                  </tr>
                </thead>
                <tbody>
                  {universityCoreDistribution.map((row) => (
                    <tr key={row.name} className="border-b border-white/5 text-sm hover:bg-white/5">
                      <td className="px-6 py-4 font-medium text-white/90">{row.name}</td>
                      <td className="px-6 py-4 text-right text-white/70">{row.minimum}</td>
                      <td className="px-6 py-4 text-right text-white/70">{row.earned}</td>
                      <td className="px-6 py-4 text-right text-white/70">{row.remaining}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="grid gap-3 md:hidden">
              {universityCoreDistribution.map((row) => (
                <div key={row.name} className="glass rounded-2xl p-4 text-sm">
                  <div className="font-medium text-white/90">{row.name}</div>
                  <div className="mt-2 flex justify-between text-xs text-white/50">
                    <span>Min {row.minimum}</span>
                    <span>Earned {row.earned}</span>
                    <span>Remaining {row.remaining}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {SECTIONS.filter((s) => s.courses).map((section) => (
            <section key={section.id} id={section.id}>
              <h2 className="sticky top-[65px] z-10 mb-4 bg-brandblack/90 py-2 font-podium text-xl uppercase tracking-wide text-white backdrop-blur-md">
                {section.label}
              </h2>
              <CourseTable courses={section.courses!} />
            </section>
          ))}
        </div>
      )}
    </PageShell>
  );
}
