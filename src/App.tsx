import { Routes, Route } from "react-router-dom";
import ScrollProgress from "./components/ScrollProgress";
import BackToTop from "./components/BackToTop";
import Home from "./pages/Home";
import UniversityCore from "./pages/UniversityCore";
import ProgrammeCore from "./pages/ProgrammeCore";
import ProgrammeElective from "./pages/ProgrammeElective";
import UniversityElective from "./pages/UniversityElective";
import AllCourses from "./pages/AllCourses";
import PlannerPage from "./pages/PlannerPage";

export default function App() {
  return (
    <div className="min-h-screen bg-brandblack text-white selection:bg-brandred selection:text-white">
      <ScrollProgress />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/university-core" element={<UniversityCore />} />
        <Route path="/programme-core" element={<ProgrammeCore />} />
        <Route path="/programme-elective" element={<ProgrammeElective />} />
        <Route path="/university-elective" element={<UniversityElective />} />
        <Route path="/all-courses" element={<AllCourses />} />
        <Route path="/planner" element={<PlannerPage />} />
      </Routes>
      <BackToTop />
    </div>
  );
}
