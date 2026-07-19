# Curriculum Dashboard (VANGUARD)

React + TypeScript + Vite + Tailwind CSS project.

## Setup

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Notes

- All curriculum data lives in `src/data/curriculum.ts` — the entire site reads from this single file, no duplicated data.
- The Humanities, Management, Science, and Soft Skills basket lists under University Core were truncated ("...") in the source curriculum document — only the courses explicitly listed there are included. Add the rest in the same shape in `curriculum.ts` when you have the full lists.
- Routes: `/`, `/university-core`, `/programme-core`, `/programme-elective`, `/university-elective`, `/all-courses`.
