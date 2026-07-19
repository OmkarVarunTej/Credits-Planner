import PageShell from "../components/PageShell";
import CourseTable from "../components/CourseTable";
import { programmeElective } from "../data/curriculum";

export default function ProgrammeElective() {
  return (
    <PageShell
      title="Programme Elective"
      subtitle="Every Programme Elective offered — Computer Science, Industry Certification, Online, and Department electives — registered or not."
    >
      <CourseTable courses={programmeElective} />
    </PageShell>
  );
}
