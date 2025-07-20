import { User, School, Course, Material } from '../types';

export const schools: School[] = [
  {
    id: 1,
    name: "Green Hill School",
    address: "123 Education St, City Center",
    created_at: "2024-01-15"
  },
  {
    id: 2,
    name: "Bright Future Academy",
    address: "456 Learning Ave, Downtown",
    created_at: "2024-02-20"
  },
  {
    id: 3,
    name: "Excellence High School",
    address: "789 Knowledge Blvd, Uptown",
    created_at: "2024-03-10"
  }
];

export const users: User[] = [
  {
    id: 1,
    name: "Edmond Rodriguez",
    email: "edmond@system.com",
    username: "edmond",
    password: "admin123",
    role: "super_admin"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@greenhill.edu",
    username: "jane.smith",
    password: "password123",
    role: "school_admin",
    school_ids: [1]
  },
  {
    id: 3,
    name: "Michael Johnson",
    email: "michael@greenhill.edu",
    username: "michael.j",
    password: "teacher123",
    role: "teacher",
    school_ids: [1, 2] // Teacher at multiple schools
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah@brightfuture.edu",
    username: "sarah.w",
    password: "teacher456",
    role: "teacher",
    school_ids: [2]
  },
  {
    id: 5,
    name: "David Brown",
    email: "david@greenhill.edu",
    username: "david.b",
    password: "student123",
    role: "student",
    school_ids: [1]
  },
  {
    id: 6,
    name: "Emily Davis",
    email: "emily@brightfuture.edu",
    username: "emily.d",
    password: "student456",
    role: "student",
    school_ids: [2, 3] // Student transferred between schools
  },
  {
    id: 7,
    name: "Robert Taylor",
    email: "robert@schools.edu",
    username: "robert.t",
    password: "admin789",
    role: "school_admin",
    school_ids: [2, 3] // Admin for multiple schools
  }
];

export const courses: Course[] = [
  {
    id: 1,
    name: "Mathematics 101",
    description: "Introduction to basic mathematics concepts",
    school_id: 1,
    teacher_id: 3,
    created_at: "2024-01-20"
  },
  {
    id: 2,
    name: "Biology Fundamentals",
    description: "Basic principles of biology and life sciences",
    school_id: 2,
    teacher_id: 4,
    created_at: "2024-02-15"
  },
  {
    id: 3,
    name: "English Literature",
    description: "Classical and modern literature analysis",
    school_id: 1,
    teacher_id: 3,
    created_at: "2024-03-01"
  },
  {
    id: 4,
    name: "Chemistry Basics",
    description: "Introduction to chemical principles",
    school_id: 2,
    teacher_id: 3,
    created_at: "2024-03-15"
  }
];

export const materials: Material[] = [
  {
    id: 1,
    title: "Algebra Fundamentals",
    description: "Complete guide to algebraic expressions",
    file_type: "pdf",
    file_url: "/materials/algebra.pdf",
    course_id: 1,
    uploaded_by: 3,
    created_at: "2024-01-25"
  },
  {
    id: 2,
    title: "Cell Structure Video",
    description: "Animated explanation of cell components",
    file_type: "video",
    file_url: "/materials/cell-structure.mp4",
    course_id: 2,
    uploaded_by: 4,
    created_at: "2024-02-20"
  },
  {
    id: 3,
    title: "Shakespeare Analysis",
    description: "Study guide for Hamlet",
    file_type: "document",
    file_url: "/materials/hamlet-analysis.docx",
    course_id: 3,
    uploaded_by: 3,
    created_at: "2024-03-05"
  },
  {
    id: 4,
    title: "Periodic Table Reference",
    description: "Interactive periodic table with element details",
    file_type: "pdf",
    file_url: "/materials/periodic-table.pdf",
    course_id: 4,
    uploaded_by: 3,
    created_at: "2024-03-20"
  }
];