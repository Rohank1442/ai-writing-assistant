import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Upload, 
  Sparkles, 
  FileText, 
  ArrowRight,
  Check
} from 'lucide-react';

const features = [
  {
    icon: Upload,
    title: 'Smart PDF Processing',
    description: 'Upload any research PDF and our AI breaks it into searchable, semantic chunks for accurate retrieval.',
  },
  {
    icon: Sparkles,
    title: 'AI-Powered Outlining',
    description: 'Generate structured essay outlines that logically flow from your research materials.',
  },
  {
    icon: FileText,
    title: 'Grounded Generation',
    description: 'Every paragraph is generated using RAG, ensuring your essay stays factually grounded in your sources.',
  },
];

const benefits = [
  'No more citation hunting',
  'Structured writing flow',
  'Source-verified content',
  'Export-ready essays',
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg">ResearchAI</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost">Sign in</Button>
            </Link>
            <Link to="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-6 animate-fade-in">
            <Sparkles className="h-4 w-4" />
            Powered by RAG Technology
          </div>
          
          <h1 className="text-5xl md:text-6xl font-serif font-bold tracking-tight mb-6 animate-slide-up">
            Write Research Papers with AI that{' '}
            <span className="text-primary">actually reads</span> your PDFs
          </h1>
          
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Upload your scholarly sources, let AI understand them deeply, and generate 
            well-structured essays grounded in real academic facts.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Link to="/signup">
              <Button variant="hero" size="xl">
                Start Writing Free
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="xl">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 bg-surface-subtle">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              From PDF to polished essay
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI doesn't just summarize—it understands your research and helps 
              you build coherent arguments backed by your sources.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-card border border-border rounded-xl p-6 shadow-card hover:shadow-elevated transition-shadow duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                Focus on ideas, not formatting
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Stop spending hours organizing citations and structuring arguments. 
                Let AI handle the heavy lifting while you focus on the insights that matter.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                      <Check className="h-4 w-4 text-success" />
                    </div>
                    <span className="font-medium">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-surface-subtle rounded-2xl p-8 border border-border">
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border">
                  <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="h-2 w-32 bg-muted rounded" />
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border">
                  <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="h-2 w-40 bg-muted rounded" />
                  </div>
                </div>
                <div className="h-px bg-border my-4" />
                <div className="p-3 bg-accent rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">AI-Generated Outline</span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 w-full bg-primary/20 rounded" />
                    <div className="h-2 w-3/4 bg-primary/20 rounded" />
                    <div className="h-2 w-5/6 bg-primary/20 rounded" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-surface-subtle">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Ready to transform your research workflow?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join researchers and students who write smarter with AI.
          </p>
          <Link to="/signup">
            <Button variant="hero" size="xl">
              Get Started Free
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <span className="font-semibold">ResearchAI</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 ResearchAI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}