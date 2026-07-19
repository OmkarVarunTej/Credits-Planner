// ============================================================
// VIT-AP Integrated M.Tech Software Engineering Curriculum
// Single source of truth — the entire site reads from this file.
// ============================================================

export type CourseStatus = "Completed" | "Registered" | "Not Registered";

export interface Course {
  code: string;
  name: string;
  semester: string; // "Not Registered" is a valid value here too
  credits: number;
  status: CourseStatus;
}

export interface BasketSummary {
  name: string;
  minimum: number;
  earned: number;
  remaining: number;
}

export interface CategorySummary {
  category: string;
  total: number;
  earned: number;
  remaining: number;
}

// ------------------------------------------------------------
// Top-level credit summary (Curriculum Overview table)
// ------------------------------------------------------------
export const creditSummary: CategorySummary[] = [
  { category: "University Core", total: 102, earned: 60, remaining: 42 },
  { category: "Programme Core", total: 48, earned: 28, remaining: 20 },
  { category: "Programme Elective", total: 28, earned: 7, remaining: 21 },
  { category: "University Elective", total: 22, earned: 0, remaining: 22 },
];

export const totalCredits = { total: 200, earned: 95, remaining: 105 };

// ------------------------------------------------------------
// University Core credit distribution
// ------------------------------------------------------------
export const universityCoreDistribution: BasketSummary[] = [
  { name: "Engineering Foundation", minimum: 16, earned: 16, remaining: 0 },
  { name: "Clubs", minimum: 2, earned: 0, remaining: 2 },
  { name: "English", minimum: 6, earned: 6, remaining: 0 },
  { name: "Humanities", minimum: 3, earned: 0, remaining: 3 },
  { name: "Project & Internship", minimum: 32, earned: 4, remaining: 28 },
  { name: "Management", minimum: 5, earned: 2, remaining: 3 },
  { name: "Science", minimum: 20, earned: 20, remaining: 0 },
  { name: "Soft Skills", minimum: 18, earned: 12, remaining: 6 },
];

// ------------------------------------------------------------
// University Core — sub-baskets
// ------------------------------------------------------------

// ── Engineering Foundation (4 courses) ──
export const engineeringFoundation: Course[] = [
  { code: "ECE1005", name: "Basic Electrical and Electronics Engineering", semester: "Fall Semester 2024-25", credits: 4, status: "Completed" },
  { code: "SWE1004", name: "Introduction to Programming in Python", semester: "Fall Semester 2024-25", credits: 4, status: "Completed" },
  { code: "SWE2001", name: "Data Structures and Its Applications", semester: "Fall Semester 2025-26", credits: 4, status: "Completed" },
  { code: "SWE2005", name: "Concepts of Object Oriented Programming", semester: "Winter Semester 2024-25", credits: 4, status: "Completed" },
];

// ── English (3 courses) ──
export const english: Course[] = [
  { code: "ENG1005", name: "Basic Communication in English", semester: "Not Required", credits: 3, status: "Not Registered" },
  { code: "ENG1006", name: "Functional Communication in English", semester: "Fall Semester 2024-25", credits: 3, status: "Completed" },
  { code: "ENG2004", name: "Advanced Professional Communication", semester: "Winter Semester 2024-25", credits: 3, status: "Completed" },
];

// ── Humanities (33 courses) ──
export const humanities: Course[] = [
  { code: "ENG1017", name: "Film Appreciation", semester: "Not Registered", credits: 3, status: "Not Registered" },
  { code: "ENG1018", name: "Introduction to Fashion and Technology", semester: "Not Registered", credits: 3, status: "Not Registered" },
  { code: "ENG2011", name: "Revisiting Shakespearean Dramas", semester: "Not Registered", credits: 3, status: "Not Registered" },
  { code: "ENG2013", name: "English for Professional Communication", semester: "Not Registered", credits: 3, status: "Not Registered" },
  { code: "ENG2014", name: "Advanced English Communication", semester: "Not Registered", credits: 3, status: "Not Registered" },
  { code: "ENG2015", name: "Effective Technical Communication", semester: "Not Registered", credits: 3, status: "Not Registered" },
  { code: "ENG3004", name: "Professional and Technical Communication", semester: "Not Registered", credits: 3, status: "Not Registered" },
  { code: "FRL1001", name: "Basic French", semester: "Not Registered", credits: 3, status: "Not Registered" },
  { code: "FRL1002", name: "French for Beginners", semester: "Not Registered", credits: 3, status: "Not Registered" },
  { code: "FRL1004", name: "Basic Spanish", semester: "Not Registered", credits: 3, status: "Not Registered" },
  { code: "FRL1005", name: "German for Beginners", semester: "Not Registered", credits: 3, status: "Not Registered" },
  { code: "FRL2003", name: "French for Engineers", semester: "Not Registered", credits: 3, status: "Not Registered" },
  { code: "FRL2004", name: "Korean for Beginners I", semester: "Not Registered", credits: 3, status: "Not Registered" },
  { code: "FRL2005", name: "Japanese for Beginners", semester: "Not Registered", credits: 3, status: "Not Registered" },
  { code: "HUM2014", name: "Introduction to French Theatre from Classics to Contemporary", semester: "Not Registered", credits: 2, status: "Not Registered" },
  { code: "INL1002", name: "Business Communication", semester: "Not Registered", credits: 3, status: "Not Registered" },
  { code: "LIB1007", name: "Gender Studies – An Introduction", semester: "Not Registered", credits: 3, status: "Not Registered" },
  { code: "LIB1011", name: "Inequalities", semester: "Not Registered", credits: 3, status: "Not Registered" },
  { code: "LIB1014", name: "Pursuit of Happiness", semester: "Not Registered", credits: 3, status: "Not Registered" },
  { code: "LIB1016", name: "Theory of Performance and Practice", semester: "Not Registered", credits: 4, status: "Not Registered" },
  { code: "LIB1019", name: "Dynamics of Gender Psychology", semester: "Not Registered", credits: 3, status: "Not Registered" },
  { code: "LIB1020", name: "Basic Psychology for Engineers", semester: "Not Registered", credits: 3, status: "Not Registered" },
  { code: "LIB2003", name: "Introduction to Sociology", semester: "Not Registered", credits: 3, status: "Not Registered" },
  { code: "LIB2004", name: "Ancient Indian History", semester: "Not Registered", credits: 3, status: "Not Registered" },
  { code: "LIB2006", name: "Critical Thinking and Formal Logic", semester: "Not Registered", credits: 3, status: "Not Registered" },
  { code: "LIB2007", name: "The Aesthetics of Performing Arts", semester: "Not Registered", credits: 4, status: "Not Registered" },
  { code: "LIB2010", name: "Food & Literature", semester: "Not Registered", credits: 3, status: "Not Registered" },
  { code: "LIB2015", name: "Indian Philosophy and Ethics", semester: "Not Registered", credits: 3, status: "Not Registered" },
  { code: "LIB2016", name: "Human Factors Psychology", semester: "Not Registered", credits: 3, status: "Not Registered" },
  { code: "LIB2018", name: "Society and Media", semester: "Not Registered", credits: 3, status: "Not Registered" },
  { code: "LIB2019", name: "Water and Society", semester: "Not Registered", credits: 3, status: "Not Registered" },
  { code: "LIB2020", name: "Technology, Society and Political Systems", semester: "Not Registered", credits: 3, status: "Not Registered" },
  { code: "LIB3001", name: "Applications of Moral Philosophy", semester: "Not Registered", credits: 3, status: "Not Registered" },
];

// ── Management (17 courses) ──
export const management: Course[] = [
  { code: "HUM1012", name: "Engineering Economics", semester: "Not Registered", credits: 3, status: "Not Registered" },
  { code: "HUM2003", name: "Foundations of Privacy and Security", semester: "Not Registered", credits: 3, status: "Not Registered" },
  { code: "HUM2010", name: "Principles of Management", semester: "Not Registered", credits: 3, status: "Not Registered" },
  { code: "HUM2011", name: "Organizational Behaviour", semester: "Not Registered", credits: 3, status: "Not Registered" },
  { code: "LAW1008", name: "Intellectual Property Rights for Engineers", semester: "Not Registered", credits: 3, status: "Not Registered" },
  { code: "LIB1022", name: "Psychology of Success", semester: "Not Registered", credits: 3, status: "Not Registered" },
  { code: "LIB2021", name: "Psychology for the Industrial Sector", semester: "Not Registered", credits: 4, status: "Not Registered" },
  { code: "MGT1001", name: "Ethics and Values", semester: "Fall Semester 2025-26", credits: 2, status: "Completed" },
  { code: "MGT1002", name: "Lean Startup Management", semester: "Not Registered", credits: 3, status: "Not Registered" },
  { code: "MGT1015", name: "Business Mathematics", semester: "Not Registered", credits: 3, status: "Not Registered" },
  { code: "MGT1023", name: "Fundamentals of Human Resource Management", semester: "Not Registered", credits: 3, status: "Not Registered" },
  { code: "MGT1026", name: "Information Assurance and Auditing", semester: "Not Registered", credits: 3, status: "Not Registered" },
  { code: "MGT1027", name: "Product Design, Management Techniques and Entrepreneurship", semester: "Not Registered", credits: 3, status: "Not Registered" },
  { code: "MGT1029", name: "Financial Management", semester: "Not Registered", credits: 3, status: "Not Registered" },
  { code: "MGT2006", name: "Service Operations Research", semester: "Not Registered", credits: 3, status: "Not Registered" },
  { code: "MGT2016", name: "Essentials of Marketing Management", semester: "Not Registered", credits: 3, status: "Not Registered" },
  { code: "MGT3004", name: "Digital and Social Media Marketing", semester: "Not Registered", credits: 3, status: "Not Registered" },
];

// ── Science (5 courses) ──
export const science: Course[] = [
  { code: "CHY1008", name: "Basic Chemistry and Environmental Studies", semester: "Fall Semester 2024-25", credits: 4, status: "Completed" },
  { code: "MAT1008", name: "Fundamentals of Calculus", semester: "Fall Semester 2024-25", credits: 4, status: "Completed" },
  { code: "MAT1009", name: "Applied Linear Algebra", semester: "Winter Semester 2024-25", credits: 4, status: "Completed" },
  { code: "MAT1014", name: "Fundamental Statistics", semester: "Winter Semester 2024-25", credits: 4, status: "Completed" },
  { code: "PHY1005", name: "Fundamentals of Engineering Physics", semester: "Fall Semester 2024-25", credits: 4, status: "Completed" },
];

// ── Project & Internship (2 courses) ──
export const projectAndInternship: Course[] = [
  { code: "ECS1001", name: "Engineering Clinics – Arduino using Embedded C", semester: "Fall Semester 2025-26", credits: 2, status: "Completed" },
  { code: "ECS1002", name: "Engineering Clinics – Raspberry Pi using Python", semester: "Winter Semester 2025-26", credits: 2, status: "Completed" },
];

// ── Soft Skills (6 courses) ──
export const softSkills: Course[] = [
  { code: "STS1004", name: "Introduction to Problem Solving", semester: "Fall Semester 2024-25", credits: 3, status: "Completed" },
  { code: "STS1009", name: "Introduction to Quantitative, Logical and Verbal Ability", semester: "Winter Semester 2024-25", credits: 3, status: "Completed" },
  { code: "STS2008", name: "Numerical Ability and Cognitive Intelligence", semester: "Fall Semester 2025-26", credits: 3, status: "Completed" },
  { code: "STS2009", name: "Arithmetic Problem Solving Skills", semester: "Winter Semester 2025-26", credits: 3, status: "Completed" },
  { code: "STS3007", name: "Advanced Competitive Coding - I", semester: "Fall Semester 2026-27", credits: 3, status: "Registered" },
  { code: "STS4006", name: "Advanced Competitive Coding II", semester: "Not Registered", credits: 3, status: "Not Registered" },
];

// ── Clubs ──
export const clubs: Course[] = [
  { code: "—", name: "Clubs Basket Requirement", semester: "—", credits: 2, status: "Not Registered" },
];

// ------------------------------------------------------------
// Programme Core
// ------------------------------------------------------------
export const programmeCore: Course[] = [
  { code: "ECE1006", name: "Digital Logic and Microprocessors", semester: "Winter Semester 2024-25", credits: 4, status: "Completed" },
  { code: "MAT1007", name: "Discrete Mathematics", semester: "Fall Semester 2025-26", credits: 4, status: "Completed" },
  { code: "SWE1002", name: "Principles of Software Engineering", semester: "Fall Semester 2025-26", credits: 4, status: "Completed" },
  { code: "SWE2004", name: "Software Design and Architecture", semester: "Winter Semester 2025-26", credits: 4, status: "Completed" },
  { code: "SWE2006", name: "Database Systems", semester: "Winter Semester 2025-26", credits: 4, status: "Completed" },
  { code: "SWE2007", name: "Introduction to Operating Systems", semester: "Fall Semester 2025-26", credits: 4, status: "Completed" },
  { code: "SWE2008", name: "Object Oriented Analysis and Design", semester: "Fall Semester 2026-27", credits: 4, status: "Registered" },
  { code: "SWE2009", name: "Analysis of Algorithms", semester: "Fall Semester 2026-27", credits: 4, status: "Registered" },
  { code: "SWE3001", name: "Introduction to Computer Networks", semester: "Winter Semester 2025-26", credits: 4, status: "Completed" },
  { code: "SWE3002", name: "Software Project Management", semester: "Fall Semester 2026-27", credits: 4, status: "Registered" },
  { code: "SWE4001", name: "Internet and Web Technologies", semester: "Not Registered", credits: 4, status: "Not Registered" },
  { code: "SWE4002", name: "Software Testing", semester: "Not Registered", credits: 4, status: "Not Registered" },
];

// ------------------------------------------------------------
// Programme Elective
// ------------------------------------------------------------
export const programmeElective: Course[] = [
  // Computer Science Electives
  { code: "CSE1006", name: "Foundations for Data Analytics", semester: "Not Registered", credits: 3, status: "Not Registered" },
  { code: "CSE3001", name: "Agile Development Process", semester: "Not Registered", credits: 4, status: "Not Registered" },
  { code: "CSE3008", name: "Introduction to Machine Learning", semester: "Not Registered", credits: 4, status: "Not Registered" },
  { code: "CSE3009", name: "NoSQL Databases", semester: "Not Registered", credits: 4, status: "Not Registered" },
  { code: "CSE3013", name: "Secure Group Communications", semester: "Not Registered", credits: 3, status: "Not Registered" },
  { code: "CSE4003", name: "Parallel Computing", semester: "Not Registered", credits: 4, status: "Not Registered" },
  { code: "CSE4007", name: "Digital Image Processing", semester: "Not Registered", credits: 4, status: "Not Registered" },
  // Industry Certification Electives
  { code: "INC1001", name: "Juniper Networks - Introduction to the Junos Operating System", semester: "Not Registered", credits: 2, status: "Not Registered" },
  { code: "INC1003", name: "Juniper Networks - Introduction to Junos Platform Automation and DevOps", semester: "Not Registered", credits: 2, status: "Not Registered" },
  { code: "INC1004", name: "Juniper Networks - Juniper Cloud Fundamentals", semester: "Not Registered", credits: 2, status: "Not Registered" },
  { code: "INC1005", name: "Juniper Networks - Juniper Networks Design Fundamentals", semester: "Not Registered", credits: 2, status: "Not Registered" },
  { code: "INC1006", name: "Juniper's Mist AI Networks", semester: "Not Registered", credits: 2, status: "Not Registered" },
  { code: "INC1016", name: "RH124 Red Hat System Administration", semester: "Not Registered", credits: 2, status: "Not Registered" },
  { code: "INC1017", name: "RH134 Red Hat System Administration II", semester: "Not Registered", credits: 2, status: "Not Registered" },
  { code: "INC1018", name: "RH294 Red Hat Enterprise Linux Automation with Ansible", semester: "Not Registered", credits: 2, status: "Not Registered" },
  { code: "INC1019", name: "AD183 Red Hat Application Development I: Programming in Java EE", semester: "Not Registered", credits: 2, status: "Not Registered" },
  { code: "INC1020", name: "CL110 Red Hat OpenStack Administration I: Core Operations for Domain Operators", semester: "Not Registered", credits: 2, status: "Not Registered" },
  { code: "INC2042", name: "Boston IT Solutions - Python for Artificial Intelligence", semester: "Not Registered", credits: 2, status: "Not Registered" },
  { code: "INC2046", name: "INC2046", semester: "Not Registered", credits: 2, status: "Not Registered" },
  { code: "INC2061", name: "MongoDB Associate Database Administrator", semester: "Not Registered", credits: 2, status: "Not Registered" },
  { code: "INC3021", name: "Prompt Engineering", semester: "Not Registered", credits: 2, status: "Not Registered" },
  { code: "INC3023", name: "Quantum Computing", semester: "Not Registered", credits: 2, status: "Not Registered" },
  { code: "INC3024", name: "AutoML", semester: "Not Registered", credits: 2, status: "Not Registered" },
  // Online Courses
  { code: "ONL0432", name: "Real Time Operating System", semester: "Not Registered", credits: 1, status: "Not Registered" },
  { code: "ONL1047", name: "Foundations of Deep Learning: Concepts and Applications", semester: "Not Registered", credits: 3, status: "Not Registered" },
  { code: "ONL2003", name: "Introduction to Machine Learning", semester: "Not Registered", credits: 2, status: "Not Registered" },
  { code: "ONL2070", name: "Information Security - 5 - Secure Systems Engineering", semester: "Not Registered", credits: 2, status: "Not Registered" },
  { code: "ONL2071", name: "Introduction to Soft Computing", semester: "Not Registered", credits: 2, status: "Not Registered" },
  { code: "ONL2072", name: "Mathematical Foundations of Machine Learning", semester: "Not Registered", credits: 3, status: "Not Registered" },
  { code: "ONL2073", name: "Object Oriented System Development using UML, Java And Patterns", semester: "Not Registered", credits: 3, status: "Not Registered" },
  { code: "ONL3027", name: "Introduction to Industry 4.0 and Industrial Internet of Things", semester: "Not Registered", credits: 3, status: "Not Registered" },
  { code: "ONL3032", name: "Deep Learning", semester: "Not Registered", credits: 3, status: "Not Registered" },
  { code: "ONL3049", name: "Compiler Design", semester: "Not Registered", credits: 3, status: "Not Registered" },
  { code: "ONL3052", name: "Machine Learning for Engineering and Science Applications", semester: "Not Registered", credits: 3, status: "Not Registered" },
  { code: "ONL3053", name: "Natural Language Processing", semester: "Not Registered", credits: 3, status: "Not Registered" },
  { code: "ONL4013", name: "Reinforcement Learning", semester: "Not Registered", credits: 3, status: "Not Registered" },
  { code: "ONL4020", name: "User-Centric Computing for Human-Computer Interaction", semester: "Not Registered", credits: 2, status: "Not Registered" },
  { code: "ONL4030", name: "Software Testing", semester: "Not Registered", credits: 3, status: "Not Registered" },
  { code: "ONL4038", name: "Parallel Computer Architecture", semester: "Not Registered", credits: 3, status: "Not Registered" },
  // Department Electives
  { code: "SWE2002", name: "Human Computer Interaction", semester: "Winter Semester 2025-26", credits: 3, status: "Completed" },
  { code: "SWE3003", name: "Information and System Security", semester: "Fall Semester 2026-27", credits: 4, status: "Registered" },
  { code: "SWE3005", name: "Principles of Design Patterns", semester: "Winter Semester 2025-26", credits: 4, status: "Completed" },
  { code: "SWE4004", name: "Cloud Computing and its Applications", semester: "Fall Semester 2026-27", credits: 4, status: "Registered" },
];

// ------------------------------------------------------------
// University Elective
// ------------------------------------------------------------
export const universityElective: Course[] = [
  // Chemistry Electives
  { code: "CHY1005", name: "Industrial Chemistry for Engineers", semester: "Not Registered", credits: 3, status: "Not Registered" },
  { code: "CHY1006", name: "Corrosion Science and Engineering", semester: "Not Registered", credits: 3, status: "Not Registered" },
  { code: "CHY1007", name: "Energy Materials and Their Applications", semester: "Not Registered", credits: 3, status: "Not Registered" },
  { code: "CHY2001", name: "Chemical and Biosensors", semester: "Not Registered", credits: 3, status: "Not Registered" },
  { code: "CHY2002", name: "Organic Electronics", semester: "Not Registered", credits: 3, status: "Not Registered" },
  // Humanities & Liberal Arts Electives
  { code: "HUM2014", name: "Introduction of French Theatre from Classics to Contemporary", semester: "Not Registered", credits: 2, status: "Not Registered" },
  { code: "LIB1013", name: "Introduction to Comics and Graphic Narratives", semester: "Not Registered", credits: 3, status: "Not Registered" },
  { code: "LIB1016", name: "Theory of Performance and Practice", semester: "Not Registered", credits: 4, status: "Not Registered" },
  { code: "LIB1019", name: "Dynamics of Gender Psychology", semester: "Not Registered", credits: 3, status: "Not Registered" },
  { code: "LIB1020", name: "Basic Psychology for Engineers", semester: "Not Registered", credits: 3, status: "Not Registered" },
  { code: "LIB1024", name: "Positive Psychology and the Science of Well-being", semester: "Not Registered", credits: 3, status: "Not Registered" },
  { code: "LIB2006", name: "Critical Thinking and Formal Logic", semester: "Not Registered", credits: 3, status: "Not Registered" },
  { code: "LIB2007", name: "The Aesthetics of Performing Arts", semester: "Not Registered", credits: 4, status: "Not Registered" },
  { code: "LIB2010", name: "Food & Literature", semester: "Not Registered", credits: 3, status: "Not Registered" },
  { code: "LIB2016", name: "Human Factors Psychology", semester: "Not Registered", credits: 3, status: "Not Registered" },
  { code: "LIB2019", name: "Water and Society", semester: "Not Registered", credits: 3, status: "Not Registered" },
  { code: "LIB2021", name: "Psychology for the Industrial Sector", semester: "Not Registered", credits: 4, status: "Not Registered" },
  { code: "LIB2023", name: "Constitution of India: Formation and Implementation", semester: "Not Registered", credits: 4, status: "Not Registered" },
  // Mathematics Electives
  { code: "MAT2001", name: "Numerical Methods for Engineers", semester: "Not Registered", credits: 3, status: "Not Registered" },
  { code: "MAT2005", name: "Linear Algebra", semester: "Not Registered", credits: 3, status: "Not Registered" },
  { code: "MAT3004", name: "Parallel Matrix Computation", semester: "Not Registered", credits: 3, status: "Not Registered" },
  // Physics Electives
  { code: "PHY2003", name: "Condensed Matter Physics", semester: "Not Registered", credits: 3, status: "Not Registered" },
  { code: "PHY2004", name: "Optoelectronics", semester: "Not Registered", credits: 3, status: "Not Registered" },
  { code: "PHY2005", name: "Introduction to Nanotechnology", semester: "Not Registered", credits: 3, status: "Not Registered" },
  { code: "PHY2006", name: "Solar Photovoltaics: Fundamentals and Technologies", semester: "Not Registered", credits: 3, status: "Not Registered" },
];

// ------------------------------------------------------------
// University Core sub-basket registry (for the accordion page)
// ------------------------------------------------------------
export interface UniversityCoreBasket {
  key: string;
  label: string;
  courses: Course[];
}

export const universityCoreBaskets: UniversityCoreBasket[] = [
  { key: "engineering-foundation", label: "Engineering Foundation", courses: engineeringFoundation },
  { key: "clubs", label: "Clubs", courses: clubs },
  { key: "english", label: "English", courses: english },
  { key: "humanities", label: "Humanities", courses: humanities },
  { key: "project-internship", label: "Project & Internship", courses: projectAndInternship },
  { key: "management", label: "Management", courses: management },
  { key: "science", label: "Science", courses: science },
  { key: "soft-skills", label: "Soft Skills", courses: softSkills },
];

// ------------------------------------------------------------
// All courses — flattened, for the /all-courses search + filter page
// ------------------------------------------------------------
export interface FlatCourse extends Course {
  basket: string;
}

export const allCourses: FlatCourse[] = [
  ...engineeringFoundation.map((c) => ({ ...c, basket: "Engineering Foundation" })),
  ...clubs.map((c) => ({ ...c, basket: "Clubs" })),
  ...english.map((c) => ({ ...c, basket: "English" })),
  ...humanities.map((c) => ({ ...c, basket: "Humanities" })),
  ...projectAndInternship.map((c) => ({ ...c, basket: "Project & Internship" })),
  ...management.map((c) => ({ ...c, basket: "Management" })),
  ...science.map((c) => ({ ...c, basket: "Science" })),
  ...softSkills.map((c) => ({ ...c, basket: "Soft Skills" })),
  ...programmeCore.map((c) => ({ ...c, basket: "Programme Core" })),
  ...programmeElective.map((c) => ({ ...c, basket: "Programme Elective" })),
  ...universityElective.map((c) => ({ ...c, basket: "University Elective" })),
];
