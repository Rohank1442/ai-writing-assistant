import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Upload,
  Sparkles,
  FileText,
  ArrowRight,
  Check,
} from "lucide-react";

/* ---------------- Data ---------------- */

const features = [
  {
    icon: Upload,
    title: "Smart PDF Processing",
    description:
      "Upload any research PDF and our AI breaks it into searchable, semantic chunks for accurate retrieval.",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Outlining",
    description:
      "Generate structured essay outlines that logically flow from your research materials.",
  },
  {
    icon: FileText,
    title: "Grounded Generation",
    description:
      "Every paragraph is generated using RAG, ensuring your essay stays factually grounded in your sources.",
  },
];

const benefits = [
  "No more citation hunting",
  "Structured writing flow",
  "Source-verified content",
  "Export-ready essays",
];

/* ---------------- Page ---------------- */

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* SEO */}
      <Helmet>
        <title>
          PaperFlow | AI Research Paper Writer with Verified Citations
        </title>

        <meta
          name="description"
          content="Write research papers using AI that actually reads your PDFs. Generate essays and outlines grounded in real academic sources."
        />

        <link rel="canonical" href="https://paperflow-ai.vercel.app/" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="PaperFlow – AI Research Paper Writer with Real Citations"
        />
        <meta
          property="og:description"
          content="Upload your PDFs and write essays grounded in real academic sources using RAG-powered AI."
        />
        <meta property="og:type" content="website" />

        {/* FAQ Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Can AI write a research paper using my PDFs?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. PaperFlow reads your uploaded PDFs and generates essays and outlines grounded in your actual academic sources.",
                },
              },
              {
                "@type": "Question",
                name: "How is PaperFlow different from ChatGPT?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "PaperFlow uses Retrieval-Augmented Generation (RAG) to ensure all output is grounded in your uploaded research documents.",
                },
              },
            ],
          })}
        </script>
      </Helmet>

      {/* NAV */}
      <nav className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg">PaperFlow</span>
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

      {/* HERO */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">

          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
            Write Research Papers with AI that{" "}
            <span className="text-primary">Actually Reads</span> Your PDFs
          </h1>

          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Upload your scholarly sources, let AI understand them deeply, and
            generate well-structured essays grounded in real academic facts.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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

      {/* FEATURES */}
      <section className="py-24 px-6 bg-surface-subtle">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              From PDF to Polished Essay
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI doesn’t just summarize—it understands your research and
              builds coherent arguments backed by your sources.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-card border border-border rounded-xl p-6 shadow-card hover:shadow-elevated transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/ai-paper-writer-with-citations"
              className="text-primary font-medium underline"
            >
              Looking for an AI paper writer with real citations?
            </Link>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Focus on Ideas, Not Formatting
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Stop wasting hours organizing citations and structure. Let AI
              handle the mechanics while you focus on insight.
            </p>
            <ul className="space-y-4">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center">
                    <Check className="h-4 w-4 text-success" />
                  </div>
                  <span className="font-medium">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-surface-subtle rounded-2xl p-8 border border-border">
            <div className="p-3 bg-accent rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">
                  AI-Generated Outline
                </span>
              </div>
              <div className="space-y-2">
                <div className="h-2 w-full bg-primary/20 rounded" />
                <div className="h-2 w-3/4 bg-primary/20 rounded" />
                <div className="h-2 w-5/6 bg-primary/20 rounded" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-surface-subtle">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Ready to Transform Your Research Workflow?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join researchers and students writing smarter with AI.
          </p>
          <Link to="/signup">
            <Button variant="hero" size="xl">
              Get Started Free
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-8 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <span className="font-semibold">PaperFlow</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 PaperFlow. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}