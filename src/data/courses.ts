export type Course = {
  slug: string
  number: string
  title: string
  description: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  duration: string
  modules: number
  accent: string
  icon: string
}

export const courses: Course[] = [
  { slug: 'html-fundamentals', number: '01', title: 'HTML Fundamentals', description: 'Build accessible, well-structured pages with the language of the web.', level: 'Beginner', duration: '4 hours', modules: 6, accent: 'cyan', icon: '</>' },
  { slug: 'css-responsive-design', number: '02', title: 'CSS & Responsive Design', description: 'Shape thoughtful interfaces with modern layout, color, and type.', level: 'Beginner', duration: '5 hours', modules: 6, accent: 'violet', icon: '{ }' },
  { slug: 'javascript-fundamentals', number: '03', title: 'JavaScript Fundamentals', description: 'Make pages respond to people with practical, modern JavaScript.', level: 'Beginner', duration: '6 hours', modules: 6, accent: 'amber', icon: 'JS' },
  { slug: 'git-github', number: '04', title: 'Git & GitHub', description: 'Track changes, collaborate clearly, and build a dependable workflow.', level: 'Beginner', duration: '4 hours', modules: 6, accent: 'mint', icon: 'git' },
  { slug: 'react-development', number: '05', title: 'React Development', description: 'Compose reusable interfaces and manage state with React.', level: 'Intermediate', duration: '6 hours', modules: 6, accent: 'blue', icon: 'R' },
  { slug: 'apis-fetch', number: '06', title: 'APIs & Fetch', description: 'Connect your interfaces to live data and handle async states well.', level: 'Intermediate', duration: '5 hours', modules: 6, accent: 'rose', icon: '↗' },
  { slug: 'website-deployment', number: '07', title: 'Website Deployment', description: 'Ship a project to the web and learn the essentials of production.', level: 'Intermediate', duration: '4 hours', modules: 6, accent: 'lime', icon: '↑' },
]