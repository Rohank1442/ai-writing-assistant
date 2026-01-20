import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Sparkles,
  ArrowRight,
  Check,
  X,
  AlertCircle,
  Search,
  Database,
} from "lucide-react";

/* ---------------- Comparison Section ---------------- */

const ComparisonSection = () => {
  const comparisons = [
    {
      feature: "Source Reliability",
      standard: "Hallucinates (makes up fake sources)",
      research: "Verified (only uses your uploaded PDFs)",
    },
    {
      feature: "In-Text Citations",
      standard: "Generic or missing",
      research: "Mapped to exact page & paragraph",
    },
    {
      feature: "Bibliography",
      standard: "Manual formatting required",
      research: "Instant APA, MLA, Chicago exports",
    },
    {
      feature: "Academic Integrity",
      standard: "High risk of fake citation flags",
      research: "Built for verifiable research",
    },
  ];

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold mb-4 text-slate-900">
            Why Researchers Choose PaperFlow Over ChatGPT
          </h2>
          <p className="text-slate-600 text-lg">
            Most AI tools are a black box. PaperFlow is evidence-first.
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-slate-50">
                <th className="p-4 font-semibold border-b border-slate-200 text-slate-900">Feature</th>
                <th className="p-4 font-semibold text-slate-600 border-b border-slate-200">
                  Standard AI
                </th>
                <th className="p-4 font-semibold text-blue-600 border-b border-slate-200">
                  PaperFlow
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((item, idx) => (
                <tr
                  key={idx}
                  className="border-b border-slate-200 last:border-0 hover:bg-slate-50 transition-colors"
                >
                  <td className="p-4 font-medium text-slate-900">{item.feature}</td>
                  <td className="p-4 text-slate-600">
                    <div className="flex items-start gap-2">
                      <X className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>{item.standard}</span>
                    </div>
                  </td>
                  <td className="p-4 font-medium text-slate-900">
                    <div className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{item.research}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200 flex gap-3 items-start">
          <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-slate-700">
            <strong className="text-slate-900">Pro Tip:</strong> Using AI with verifiable citations is the
            only way to meet modern (2026) academic integrity standards.
          </p>
        </div>
      </div>
    </section>
  );
};

/* ---------------- Page ---------------- */

export default function OutlineLandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* SEO */}
      <Helmet>
        <title>AI Research Paper Essay Outline Generator | PaperFlow</title>

        <meta
          name="description"
          content="Generate a structured research paper essay outline from your PDFs. PaperFlow ensures every section is grounded in real, verifiable academic sources."
        />

        <meta
          name="keywords"
          content="research paper essay outline generator, AI outline generator, PDF to essay outline, academic writing AI, RAG research tool"
        />

        <link
          rel="canonical"
          href="https://paperflow-ai.vercel.app/research-paper-essay-outline"
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="AI Research Paper Essay Outline Generator"
        />
        <meta
          property="og:description"
          content="Create structured essay outlines directly from your research PDFs using verified AI."
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
                name: "Can AI generate a research paper essay outline?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. PaperFlow generates essay outlines directly from your uploaded PDFs using retrieval-augmented generation (RAG) for accuracy.",
                },
              },
              {
                "@type": "Question",
                name: "Is the outline based on my actual research papers?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Every outline section is grounded in your uploaded documents, not generic training data.",
                },
              },
            ],
          })}
        </script>
      </Helmet>

      {/* NAV */}
      <nav className="border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-blue-600" />
            <span className="font-semibold text-lg text-slate-900">PaperFlow</span>
          </Link>
          <Link to="/signup">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 text-slate-900 leading-tight">
            AI Research Paper Essay Outline Generator
          </h1>

          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            Upload your research PDF and instantly generate a clear, structured
            essay outline grounded in your actual sources.
          </p>

          <Link to="/signup">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-base font-medium inline-flex items-center gap-2">
              Generate My Outline
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-6 border-y border-slate-200 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-center mb-16 text-slate-900">
            How PaperFlow Generates Grounded Outlines
          </h2>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                <Database className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">
                External Knowledge Base
              </h3>
              <p className="text-slate-600">
                Your uploaded PDF becomes a live, queryable research database.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                <Search className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Dense Passage Retrieval</h3>
              <p className="text-slate-600">
                We identify the most relevant sections of your research in
                milliseconds.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                <Sparkles className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Evidence-Conditioned Output</h3>
              <p className="text-slate-600">
                Your outline is generated strictly from retrieved evidence — no hallucinations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <ComparisonSection />

      {/* SEO CONTENT */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-slate-900">How to Turn a Research Paper into an Essay Outline</h2>
          <p className="mb-4 text-slate-700 leading-relaxed">
            Turning a research paper into a structured essay outline requires
            identifying arguments, evidence, and logical flow. PaperFlow
            automates this by grounding each outline section in your PDF.
          </p>
          <p className="text-slate-700 leading-relaxed">
            Unlike generic AI tools, PaperFlow prevents retrieval collapse by
            strictly conditioning output on your uploaded research documents.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 py-8 px-6 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-600" />
            <span className="font-semibold text-slate-900">PaperFlow</span>
          </div>
          <p className="text-sm text-slate-600">
            © 2026 PaperFlow. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}