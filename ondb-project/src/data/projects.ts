// 프로젝트 데이터 타입 정의
export interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  image?: string
  link?: string
  github?: string
  category?: string
  status?: 'completed' | 'in-progress' | 'planning'
}

// 프로젝트 데이터
export const projects: Project[] = [
  {
    id: 1,
    title: "KTO MICE",
    description: "Description of project 1",
    technologies: ["REACT", "TypeScript", "GSAP"],
    category: "Web Application, Admin",
    status: "completed",
  },
  {
    id: 2,
    title: "KTO Odii",
    description: "Description of project 2",
    technologies: ["JSP", "Node.js", "Express"],
    category: "Web Application",
    status: "completed",
  },
  {
    id: 3,
    title: "YPBooks",
    description: "Description of project 3",
    technologies: ["Vue", "TypeScript", "Node.js"],
    category: "Web Application, Admin, KIOSK",
    status: "completed",
  },
  {
    id: 4,
    title: "UI/UX WEBSITE",
    description: "Description of project 4",
    technologies: ["HTML5", "SCSS", "Express"],
    category: "Interactive Website",
    status: "completed",
  },
];

// 프로젝트 관련 유틸리티 함수들
export const getProjectsByCategory = (category: string): Project[] => {
  return projects.filter(project => project.category === category)
}

export const getProjectsByStatus = (status: Project['status']): Project[] => {
  return projects.filter(project => project.status === status)
}

export const getProjectById = (id: number): Project | undefined => {
  return projects.find(project => project.id === id)
}