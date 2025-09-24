export interface Skill {
  skill_name: string
  Image: string
  width: number
  height: number
}

export const skills: Skill[] = [
  { skill_name: 'AWS', Image: '/aws.png', width: 70, height: 70 },
  { skill_name: 'Azure', Image: '/azure.svg', width: 70, height: 70 },

  { skill_name: 'Kubernetes', Image: '/kubernetes.png', width: 50, height: 50 },
  { skill_name: 'Docker', Image: '/docker.webp', width: 70, height: 70 },
  { skill_name: 'Helm', Image: '/helm.svg', width: 70, height: 70 },
  // { skill_name: 'Helmfile', Image: '/helmfile.png', width: 80, height: 80 },
  // { skill_name: 'Kustomize', Image: '/kustomize.png', width: 80, height: 80 },
  // { skill_name: 'Istio', Image: '/istio.png', width: 80, height: 80 },
  // { skill_name: 'Linkerd', Image: '/linkerd.png', width: 80, height: 80 },

  { skill_name: 'Terraform', Image: '/terraform.png', width: 80, height: 80 },
  { skill_name: 'OpenTofu', Image: '/opentofu.svg', width: 70, height: 70 },
  // { skill_name: 'Pulumi', Image: '/pulumi.png', width: 80, height: 80 },
  { skill_name: 'Ansible', Image: '/ansible.svg', width: 80, height: 80 },

  { skill_name: 'GitHub Actions', Image: '/githubactions.svg', width: 80, height: 80 },
  { skill_name: 'Jenkins', Image: '/jenkins.svg', width: 80, height: 80 },
  { skill_name: 'GitLab CI', Image: '/gitlab.png', width: 80, height: 80 },
  { skill_name: 'ArgoCD', Image: '/argocd.svg', width: 80, height: 80 },
  // { skill_name: 'FluxCD', Image: '/fluxcd.png', width: 80, height: 80 },

  { skill_name: 'Prometheus', Image: '/prometheus.svg', width: 80, height: 80 },
  { skill_name: 'Grafana', Image: '/grafana.svg', width: 80, height: 80 },
  { skill_name: 'ELK Stack', Image: '/elk-stack.png', width: 80, height: 80 },
  { skill_name: 'CloudWatch', Image: '/cloudwatch.png', width: 80, height: 80 },
  // { skill_name: 'OpenTelemetry', Image: '/opentelemetry.png', width: 80, height: 80 },

  { skill_name: 'Trivy', Image: '/trivy.svg', width: 80, height: 80 },
  { skill_name: 'SonarQube', Image: '/sonarqube.svg', width: 80, height: 80 },
  { skill_name: 'OWASP', Image: '/owasp.webp', width: 80, height: 80 },
  { skill_name: 'HashiCorp Vault', Image: '/hashicorp-vault.svg', width: 80, height: 80 },
  { skill_name: 'AWS Secrets Manager', Image: '/aws-secrets-manager.png', width: 80, height: 80 },

  { skill_name: 'PostgreSQL', Image: '/postger.png', width: 70, height: 70 },
  { skill_name: 'MySQL', Image: '/mysql.png', width: 70, height: 70 },
  { skill_name: 'MongoDB', Image: '/mongodb.svg', width: 70, height: 70 },
  { skill_name: 'DynamoDB', Image: '/dynamodb.svg', width: 70, height: 70 },
  { skill_name: 'Kafka', Image: '/kafka.svg', width: 70, height: 70 },
  { skill_name: 'Redis', Image: '/redis.svg', width: 70, height: 70 },
  { skill_name: 'RabbitMQ', Image: '/rabbitmq.svg', width: 70, height: 70 },

  { skill_name: 'Python', Image: '/python.svg', width: 70, height: 70 },
  { skill_name: 'Bash', Image: '/bash.svg', width: 70, height: 70 },
  { skill_name: 'JavaScript', Image: '/js.png', width: 65, height: 65 },
  { skill_name: 'TypeScript', Image: '/ts.png', width: 80, height: 80 },
  { skill_name: 'Node.js', Image: '/node-js.png', width: 80, height: 80 },
  { skill_name: 'Django', Image: '/django.svg', width: 70, height: 70 },
  { skill_name: 'Git', Image: '/git.svg', width: 70, height: 70 },
  { skill_name: 'Linux Sys Admin', Image: '/linux.svg', width: 70, height: 70 },

  { skill_name: 'Networking', Image: '/networking.png', width: 70, height: 70 },
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
