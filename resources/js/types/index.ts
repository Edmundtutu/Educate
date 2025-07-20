export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  password: string;
  role: 'super_admin' | 'school_admin' | 'teacher' | 'student';
  school_ids?: number[];
  current_school_id?: number;
}

export interface School {
  id: number;
  name: string;
  address: string;
  created_at: string;
}

export interface Course {
  id: number;
  name: string;
  description: string;
  school_id: number;
  teacher_id?: number;
  created_at: string;
}

export interface Material {
  id: number;
  title: string;
  description: string;
  file_type: 'pdf' | 'video' | 'document';
  file_url: string;
  course_id: number;
  uploaded_by: number;
  created_at: string;
}

export interface AuthContextType {
  user: User | null;
  school: School | null;
  login: (user: User, school?: School) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

export interface PageProps {
  auth: {
    user: User | null;
  };
  errors: Record<string, string>;
  // Add any other common props that Inertia shares
}