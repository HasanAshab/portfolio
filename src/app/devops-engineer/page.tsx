import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'DevOps Engineer - Hasan Ashab | AWS, Kubernetes, CI/CD Expert',
  description: 'Professional DevOps engineer specializing in AWS cloud infrastructure, Kubernetes orchestration, Docker containerization, and CI/CD pipeline automation. Hire experienced DevOps consultant.',
  keywords: [
    'devops engineer',
    'aws devops',
    'kubernetes engineer', 
    'docker specialist',
    'ci cd pipeline',
    'infrastructure automation',
    'cloud devops',
    'devops consultant',
    'terraform expert',
    'ansible automation'
  ],
  alternates: {
    canonical: 'https://hasan-ashab.vercel.app/devops-engineer',
  },
}

export default function DevOpsEngineerPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            DevOps Engineer - Hasan Ashab
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Experienced DevOps engineer specializing in cloud infrastructure automation, 
            containerization, and continuous integration/deployment pipelines.
          </p>
        </header>

        <main>
          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-6 text-foreground">DevOps Expertise</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-primary">Cloud Platforms</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• AWS (EC2, ECS, EKS, Lambda, S3, RDS)</li>
                  <li>• Azure DevOps and Cloud Services</li>
                  <li>• Google Cloud Platform (GCP)</li>
                  <li>• Multi-cloud architecture design</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-primary">Containerization & Orchestration</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Docker containerization</li>
                  <li>• Kubernetes cluster management</li>
                  <li>• Helm charts and package management</li>
                  <li>• Container security best practices</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-6 text-foreground">CI/CD & Automation</h2>
            <div className="bg-card p-6 rounded-lg border">
              <p className="text-muted-foreground mb-4">
                I design and implement robust CI/CD pipelines that automate the entire software 
                delivery lifecycle, from code commit to production deployment.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold mb-2 text-foreground">Pipeline Tools</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Jenkins</li>
                    <li>• GitHub Actions</li>
                    <li>• GitLab CI/CD</li>
                    <li>• Azure DevOps</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-foreground">Infrastructure as Code</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Terraform</li>
                    <li>• Ansible</li>
                    <li>• CloudFormation</li>
                    <li>• Pulumi</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-foreground">Monitoring & Logging</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Prometheus & Grafana</li>
                    <li>• ELK Stack</li>
                    <li>• CloudWatch</li>
                    <li>• Datadog</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-6 text-foreground">Why Choose Me as Your DevOps Engineer?</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                As a dedicated DevOps engineer, I bring a comprehensive understanding of both 
                development and operations, enabling seamless collaboration between teams and 
                faster, more reliable software delivery.
              </p>
              <ul className="space-y-2 ml-4">
                <li>• <strong>Scalable Infrastructure:</strong> Design cloud-native solutions that grow with your business</li>
                <li>• <strong>Cost Optimization:</strong> Implement efficient resource management to reduce cloud costs</li>
                <li>• <strong>Security First:</strong> Integrate security practices throughout the DevOps pipeline</li>
                <li>• <strong>Automation Focus:</strong> Eliminate manual processes and reduce human error</li>
                <li>• <strong>Continuous Improvement:</strong> Implement monitoring and feedback loops for ongoing optimization</li>
              </ul>
            </div>
          </section>

          <section className="text-center">
            <h2 className="text-3xl font-semibold mb-6 text-foreground">Ready to Transform Your Infrastructure?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss how I can help streamline your development workflow, improve deployment 
              reliability, and scale your infrastructure efficiently.
            </p>
            <Link 
              href="/#contact"
              className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Get In Touch
            </Link>
          </section>
        </main>
      </div>
    </div>
  )
}