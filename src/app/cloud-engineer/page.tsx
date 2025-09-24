import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cloud Engineer Portfolio - Hasan Ashab | AWS, Azure, GCP Specialist',
  description: 'Professional cloud engineer portfolio showcasing expertise in AWS, Azure, GCP cloud architecture, migration, and optimization. View cloud infrastructure projects and certifications.',
  keywords: [
    'cloud engineer',
    'cloud engineer portfolio',
    'aws cloud engineer',
    'azure cloud engineer',
    'cloud architecture',
    'cloud migration',
    'cloud optimization',
    'cloud consultant',
    'cloud infrastructure',
    'cloud security'
  ],
  alternates: {
    canonical: 'https://hasanashab.vercel.app/cloud-engineer',
  },
}

export default function CloudEngineerPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Cloud Engineer Portfolio - Hasan Ashab
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Certified cloud engineer with expertise in designing, implementing, and managing 
            scalable cloud infrastructure across AWS, Azure, and Google Cloud Platform.
          </p>
        </header>

        <main>
          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-6 text-foreground">Cloud Engineering Services</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-4 text-primary">Cloud Architecture & Design</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Scalable multi-tier architectures</li>
                  <li>• Microservices and serverless designs</li>
                  <li>• High availability and disaster recovery</li>
                  <li>• Cost-optimized cloud solutions</li>
                </ul>
              </div>
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-4 text-primary">Cloud Migration</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Legacy system modernization</li>
                  <li>• Lift-and-shift migrations</li>
                  <li>• Application refactoring for cloud</li>
                  <li>• Zero-downtime migration strategies</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-6 text-foreground">Cloud Platform Expertise</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-orange-100 dark:bg-orange-900/20 p-4 rounded-lg mb-4">
                  <h3 className="text-lg font-semibold text-orange-600 dark:text-orange-400">Amazon Web Services</h3>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>EC2, ECS, EKS, Lambda</li>
                  <li>S3, RDS, DynamoDB</li>
                  <li>VPC, CloudFront, Route 53</li>
                  <li>IAM, CloudWatch, CloudTrail</li>
                </ul>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 dark:bg-blue-900/20 p-4 rounded-lg mb-4">
                  <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">Microsoft Azure</h3>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Virtual Machines, AKS</li>
                  <li>Azure SQL, Cosmos DB</li>
                  <li>Azure Functions, Logic Apps</li>
                  <li>Azure AD, Key Vault</li>
                </ul>
              </div>
              <div className="text-center">
                <div className="bg-green-100 dark:bg-green-900/20 p-4 rounded-lg mb-4">
                  <h3 className="text-lg font-semibold text-green-600 dark:text-green-400">Google Cloud Platform</h3>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Compute Engine, GKE</li>
                  <li>Cloud Storage, BigQuery</li>
                  <li>Cloud Functions, Pub/Sub</li>
                  <li>Cloud IAM, Monitoring</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-6 text-foreground">Cloud Engineering Approach</h2>
            <div className="bg-card p-6 rounded-lg border">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-foreground">Security & Compliance</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Identity and Access Management (IAM)</li>
                    <li>• Network security and encryption</li>
                    <li>• Compliance frameworks (SOC 2, GDPR)</li>
                    <li>• Security monitoring and incident response</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-foreground">Performance & Optimization</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Auto-scaling and load balancing</li>
                    <li>• Cost optimization strategies</li>
                    <li>• Performance monitoring and tuning</li>
                    <li>• Resource right-sizing</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-6 text-foreground">Featured Cloud Projects</h2>
            <div className="space-y-6">
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-lg font-semibold mb-2 text-primary">Multi-Cloud Infrastructure</h3>
                <p className="text-muted-foreground mb-3">
                  Designed and implemented a hybrid multi-cloud architecture spanning AWS and Azure, 
                  providing high availability and disaster recovery capabilities.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">AWS</span>
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">Azure</span>
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">Terraform</span>
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">Kubernetes</span>
                </div>
              </div>
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-lg font-semibold mb-2 text-primary">Serverless Application Platform</h3>
                <p className="text-muted-foreground mb-3">
                  Built a fully serverless application platform using AWS Lambda, API Gateway, and DynamoDB, 
                  reducing operational costs by 60% while improving scalability.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">AWS Lambda</span>
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">API Gateway</span>
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">DynamoDB</span>
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">CloudFormation</span>
                </div>
              </div>
            </div>
          </section>

          <section className="text-center">
            <h2 className="text-3xl font-semibold mb-6 text-foreground">Let's Build Your Cloud Solution</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Ready to leverage the power of cloud computing for your business? Let's discuss your 
              requirements and design a cloud strategy that drives growth and efficiency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/#contact"
                className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Start Your Cloud Journey
              </Link>
              <Link 
                href="/#projects"
                className="inline-flex items-center px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors"
              >
                View Cloud Projects
              </Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}