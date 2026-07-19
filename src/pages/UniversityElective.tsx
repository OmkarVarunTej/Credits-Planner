import PageShell from "../components/PageShell";
import CourseTable from "../components/CourseTable";
import { universityElective } from "../data/curriculum";

export default function UniversityElective() {
  return (
    <PageShell
      title="University Elective"
      subtitle="Every University Elective across Chemistry, Humanities & Liberal Arts, Mathematics, and Physics — registered or not."
    >
      <CourseTable courses={universityElective} />
    </PageShell>
  );
}
