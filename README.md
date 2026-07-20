# Credits Planner — VIT-AP Software Engineering Curriculum Dashboard

A premium, dark-themed web dashboard for exploring the **Integrated M.Tech Software Engineering** curriculum at **VIT-AP University**. Browse every course, track earned/remaining credits across all baskets, and plan your semester selections with a live credit calculator.

---

## ✨ Features

### 🏠 Home — Dashboard
- Full-screen hero with background video, animated typography, and credit summary stats.
- Curriculum overview table showing earned, registered, and remaining credits per category.
- Category cards linking to individual basket pages.

### 📚 All Courses
- Complete course catalogue across all baskets in one view.
- **Search** by course code, name, basket, semester, or credits.
- **Filter** by status (Completed / Registered / Not Registered), semester, and basket.
- **Sort** by code, name, credits, or semester.
- Per-basket section headers with sticky scrolling.
- Credit distribution summary and University Core breakdown table.

### 📝 Curriculum Planner
- Select courses you plan to take — credits are calculated **live**.
- Basket credit limits are enforced with visual feedback.
- Filter by status, selection state; sort by code, name, credits, or status.
- Sticky footer summary bar showing per-category and grand totals.
- **Selections auto-persist** in `localStorage` — survives page reload.
- One-click reset with a confirmation dialog.

### 🗂️ Category Pages
- Dedicated pages for University Core, Programme Core, Programme Elective, and University Elective.
- Accordion / table views with status badges (Completed, Registered, Not Registered).

### 🎨 Design
- Dark glassmorphism aesthetic with `backdrop-blur` panels.
- Podium Sharp display font + Inter body text.
- Framer Motion page transitions and GSAP scroll-triggered animations.
- Fully responsive — desktop, tablet, and mobile.
- Scroll progress indicator and back-to-top button.

---

## 🛠️ Tech Stack

| Layer       | Technology                                    |
|-------------|-----------------------------------------------|
| Framework   | React 19 + TypeScript                         |
| Build       | Vite 8                                        |
| Styling     | Tailwind CSS 3                                |
| Animation   | Framer Motion, GSAP + ScrollTrigger           |
| Routing     | React Router v7                               |
| Icons       | Lucide React                                  |
| Lint        | OxLint                                        |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Install & Run

```bash
# Clone the repository
git clone https://github.com/OmkarVarunTej/Credits-Planner.git
cd Credits-Planner

# Install dependencies
npm install

# Start dev server (default: http://localhost:5173)
npm run dev
```

### Build for Production

```bash
npm run build
npm run preview   # preview the production build locally
```

### Lint

```bash
npm run lint
```

---

## 📁 Project Structure

```
src/
├── main.tsx                  # App entry point (React + Router)
├── App.tsx                   # Route definitions
├── index.css                 # Global styles, animations, glass utilities
│
├── components/
│   ├── Hero.tsx              # Full-screen hero with video + nav
│   ├── PageShell.tsx         # Shared page layout (header + content area)
│   ├── CategoryCard.tsx      # Dashboard category summary card
│   ├── CourseTable.tsx       # Reusable course table (desktop + mobile)
│   ├── CurriculumOverviewTable.tsx  # Credit overview table
│   ├── Accordion.tsx         # Expandable section component
│   ├── StatusBadge.tsx       # Completed / Registered / Not Registered badge
│   ├── ScrollProgress.tsx    # Top scroll progress bar
│   └── BackToTop.tsx         # Floating back-to-top button
│
├── pages/
│   ├── Home.tsx              # Landing page
│   ├── AllCourses.tsx        # Full course catalogue with search + filters
│   ├── PlannerPage.tsx       # Curriculum planner
│   ├── UniversityCore.tsx    # University Core detail page
│   ├── ProgrammeCore.tsx     # Programme Core detail page
│   ├── ProgrammeElective.tsx # Programme Elective detail page
│   └── UniversityElective.tsx# University Elective detail page
│
├── planner/
│   ├── PlannerContext.tsx     # Global planner state (localStorage-backed)
│   ├── PlannerBasket.tsx     # Single basket section in the planner
│   ├── PlannerCourseCard.tsx # Selectable course card
│   ├── PlannerSummary.tsx    # Per-category credit summary
│   ├── PlannerProgressBar.tsx# Visual credit progress bar
│   ├── StickySummary.tsx     # Fixed bottom summary footer
│   ├── SearchBar.tsx         # Planner search input
│   └── ResetDialog.tsx       # Reset confirmation modal
│
└── data/
    └── curriculum.ts         # ⭐ Single source of truth for all course data
```

---

## 🗺️ Routes

| Path                   | Page                          |
|------------------------|-------------------------------|
| `/`                    | Home — Dashboard              |
| `/university-core`     | University Core detail        |
| `/programme-core`      | Programme Core detail         |
| `/programme-elective`  | Programme Elective detail     |
| `/university-elective` | University Elective detail    |
| `/all-courses`         | Full course catalogue         |
| `/planner`             | Curriculum Planner            |

---

## 📊 Curriculum Data

All course data lives in a **single file**: `src/data/curriculum.ts`.

The entire site reads from this file — no duplicated data. Each course record includes:

```ts
{
  code: string;      // e.g. "CSE1001"
  name: string;      // e.g. "Problem Solving using C"
  credits: number;   // e.g. 4
  semester: string;  // e.g. "Fall 2023"
  status: "Completed" | "Registered" | "Not Registered";
  basket: string;    // e.g. "Engineering Foundation"
}
```

### Credit Breakdown

| Category              | Credits |
|-----------------------|---------|
| University Core       | 102     |
| Programme Core        | 48      |
| Programme Elective    | 28      |
| University Elective   | 22      |
| **Total**             | **200** |

> **Note:** Some University Core sub-baskets (Humanities, Management, Science, Soft Skills) were truncated in the original source document. Only explicitly listed courses are included — add the rest in the same shape in `curriculum.ts` when the full lists are available.

---

## 📝 License

This project is for personal academic use.
