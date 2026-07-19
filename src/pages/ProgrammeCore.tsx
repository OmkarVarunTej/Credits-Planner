import PageShell from "../components/PageShell";
import CourseTable from "../components/CourseTable";
import { programmeCore } from "../data/curriculum";

export default function ProgrammeCore() {
  return (
    <PageShell
      title="Programme Core"
      subtitle="Completed, registered, and not-registered Programme Core courses."
    >
      <CourseTable courses={programmeCore} />
    </PageShell>
  );
}
