export interface Skill {
  skill_name: string
  Image: string
  width: number
  height: number
}

export const skills: Skill[] = [
  { skill_name: 'JavaScript', Image: '/js.png', width: 65, height: 65 },
  { skill_name: 'TypeScript', Image: '/ts.png', width: 80, height: 80 },
  { skill_name: 'React', Image: '/react.png', width: 80, height: 80 },
  { skill_name: 'Next.js', Image: '/next.png', width: 80, height: 80 },
  { skill_name: 'Redux', Image: '/redux.png', width: 80, height: 80 },
  { skill_name: 'React Query', Image: '/reactquery.png', width: 80, height: 80 },
  { skill_name: 'Tailwind CSS', Image: '/tailwind.png', width: 80, height: 80 },
  { skill_name: 'GitLab', Image: '/gitlab.png', width: 80, height: 80 },
  { skill_name: 'Node.js', Image: '/node-js.png', width: 80, height: 80 },
  { skill_name: 'Express.js', Image: '/express.png', width: 80, height: 80 },
  { skill_name: 'Spring Boot', Image: '/spring-boot.png', width: 55, height: 55 },
  { skill_name: 'PostgreSQL', Image: '/postger.png', width: 70, height: 70 },
  { skill_name: 'MySQL', Image: '/mysql.png', width: 70, height: 70 },
  { skill_name: 'Prisma', Image: '/prisma.webp', width: 70, height: 70 },
  { skill_name: 'GraphQL', Image: '/graphql.png', width: 80, height: 80 },
  { skill_name: 'Terraform', Image: '/terraform.png', width: 80, height: 80 },
  { skill_name: 'Docker', Image: '/docker.webp', width: 70, height: 70 },
  { skill_name: 'Kubernetes', Image: '/kubernetes.png', width: 50, height: 50 },
  { skill_name: 'AWS', Image: '/aws.png', width: 70, height: 70 },
  { skill_name: 'Azure', Image: '/azure.png', width: 70, height: 70 },
]

export const Socials = [
  {
    name: 'Discord',
    src: '/instagram.svg',
    link: '',
  },
  {
    name: 'Facebook',
    src: '/facebook.svg',
    link: '',
  },
  {
    name: 'Instagram',
    src: '/discord.svg',
    link: '',
  },
]
