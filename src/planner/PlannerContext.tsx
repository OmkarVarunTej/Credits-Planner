import { createContext, useContext, useCallback, useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import type { Course } from "../data/curriculum";
import {
  engineeringFoundation,
  clubs,
  english,
  humanities,
  projectAndInternship,
  management,
  science,
  softSkills,
  programmeCore,
  programmeElective,
  universityElective,
} from "../data/curriculum";

// ─── basket definitions ───
export interface BasketDef {
  key: string;
  label: string;
  maxCredits: number;
  courses: Course[];
  category: "University Core" | "Programme Core" | "Programme Elective" | "University Elective";
}

export const PLANNER_BASKETS: BasketDef[] = [
  // University Core sub-baskets
  { key: "engineering-foundation", label: "Engineering Foundation", maxCredits: 16, courses: engineeringFoundation, category: "University Core" },
  { key: "clubs", label: "Clubs", maxCredits: 2, courses: clubs, category: "University Core" },
  { key: "english", label: "English", maxCredits: 6, courses: english, category: "University Core" },
  { key: "humanities", label: "Humanities", maxCredits: 3, courses: humanities, category: "University Core" },
  { key: "project-internship", label: "Project & Internship", maxCredits: 32, courses: projectAndInternship, category: "University Core" },
  { key: "management", label: "Management", maxCredits: 5, courses: management, category: "University Core" },
  { key: "science", label: "Science", maxCredits: 20, courses: science, category: "University Core" },
  { key: "soft-skills", label: "Soft Skills", maxCredits: 18, courses: softSkills, category: "University Core" },
  // Programme Core
  { key: "programme-core", label: "Programme Core", maxCredits: 48, courses: programmeCore, category: "Programme Core" },
  // Programme Elective
  { key: "programme-elective", label: "Programme Elective", maxCredits: 28, courses: programmeElective, category: "Programme Elective" },
  // University Elective
  { key: "university-elective", label: "University Elective", maxCredits: 22, courses: universityElective, category: "University Elective" },
];

export const CATEGORY_LIMITS: Record<string, number> = {
  "University Core": 102,
  "Programme Core": 48,
  "Programme Elective": 28,
  "University Elective": 22,
};

// ─── localStorage-backed store ───
const STORAGE_KEY = "planner-selections";

export function getCourseSelectionKey(basketKey: string, courseCode: string): string {
  return `${basketKey}-${courseCode}`;
}

function isCourseSelected(basketKey: string, courseCode: string, sel: Set<string>): boolean {
  return sel.has(getCourseSelectionKey(basketKey, courseCode));
}

function loadSelections(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as string[];
      return new Set(parsed.filter((key) => typeof key === "string" && key.includes("-")));
    }
  } catch { /* ignore */ }
  return new Set();
}

function saveSelections(set: Set<string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
}

// Tiny external store so all consumers re-render on change
let _selections = loadSelections();
const _listeners = new Set<() => void>();

function getSnapshot() { return _selections; }
function subscribe(cb: () => void) {
  _listeners.add(cb);
  return () => { _listeners.delete(cb); };
}
function emit() { _listeners.forEach((l) => l()); }

function toggleCourse(basketKey: string, courseCode: string) {
  const key = getCourseSelectionKey(basketKey, courseCode);
  const next = new Set(_selections);
  if (next.has(key)) next.delete(key); else next.add(key);
  _selections = next;
  saveSelections(next);
  emit();
}

function resetAll() {
  _selections = new Set();
  saveSelections(_selections);
  emit();
}

// ─── derived helpers ───
function completedCreditsForBasket(basket: BasketDef) {
  return basket.courses
    .filter((c) => c.status === "Completed")
    .reduce((s, c) => s + c.credits, 0);
}

function selectedCreditsForBasket(basket: BasketDef, sel: Set<string>) {
  return basket.courses
    .filter((c) => isCourseSelected(basket.key, c.code, sel) && c.status !== "Completed")
    .reduce((s, c) => s + c.credits, 0);
}

function totalForBasket(basket: BasketDef, sel: Set<string>) {
  return completedCreditsForBasket(basket) + selectedCreditsForBasket(basket, sel);
}

function canSelectCourse(course: Course, basket: BasketDef, sel: Set<string>) {
  if (course.status === "Completed") return false;
  if (isCourseSelected(basket.key, course.code, sel)) return true; // can always deselect
  return totalForBasket(basket, sel) + course.credits <= basket.maxCredits + 5;
}

export interface CategoryTotals {
  selected: number;
  completed: number;
  total: number;
  max: number;
}

function categoryTotals(category: string, sel: Set<string>): CategoryTotals {
  const baskets = PLANNER_BASKETS.filter((b) => b.category === category);
  let selected = 0, completed = 0, total = 0;
  for (const b of baskets) {
    completed += completedCreditsForBasket(b);
    selected += selectedCreditsForBasket(b, sel);
    total += completedCreditsForBasket(b) + selectedCreditsForBasket(b, sel);
  }
  return { selected, completed, total, max: CATEGORY_LIMITS[category] };
}

// ─── Context ───
interface PlannerContextValue {
  selections: Set<string>;
  isSelected: (basketKey: string, courseCode: string) => boolean;
  toggle: (basketKey: string, courseCode: string) => void;
  reset: () => void;
  canSelect: (course: Course, basket: BasketDef) => boolean;
  completedCredits: (basket: BasketDef) => number;
  selectedCredits: (basket: BasketDef) => number;
  basketTotal: (basket: BasketDef) => number;
  getCategoryTotals: (cat: string) => CategoryTotals;
  grandTotal: () => { selected: number; completed: number; total: number };
}

const PlannerContext = createContext<PlannerContextValue | null>(null);

export function PlannerProvider({ children }: { children: ReactNode }) {
  const selections = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  const value: PlannerContextValue = {
    selections,
    isSelected: useCallback(
      (basketKey: string, courseCode: string) => isCourseSelected(basketKey, courseCode, selections),
      [selections]
    ),
    toggle: useCallback((basketKey: string, courseCode: string) => toggleCourse(basketKey, courseCode), []),
    reset: useCallback(() => resetAll(), []),
    canSelect: useCallback((c: Course, b: BasketDef) => canSelectCourse(c, b, selections), [selections]),
    completedCredits: useCallback((b: BasketDef) => completedCreditsForBasket(b), []),
    selectedCredits: useCallback((b: BasketDef) => selectedCreditsForBasket(b, selections), [selections]),
    basketTotal: useCallback((b: BasketDef) => totalForBasket(b, selections), [selections]),
    getCategoryTotals: useCallback((cat: string) => categoryTotals(cat, selections), [selections]),
    grandTotal: useCallback(() => {
      const cats = ["University Core", "Programme Core", "Programme Elective", "University Elective"];
      let sel = 0, comp = 0, tot = 0;
      for (const c of cats) {
        const t = categoryTotals(c, selections);
        sel += t.selected;
        comp += t.completed;
        tot += t.total;
      }
      return { selected: sel, completed: comp, total: tot };
    }, [selections]),
  };

  return <PlannerContext.Provider value={value}>{children}</PlannerContext.Provider>;
}

export function usePlanner() {
  const ctx = useContext(PlannerContext);
  if (!ctx) throw new Error("usePlanner must be used inside PlannerProvider");
  return ctx;
}

