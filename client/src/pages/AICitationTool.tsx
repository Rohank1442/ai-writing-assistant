import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  BookOpen,
  Quote,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AICitationLandingPage() {
  return (
    <>
      {/* SEO HEAD */}
      <Helmet>
        <title>AI Paper Writer with Real Citations | PaperFlow</title>

        <meta
          name="description"
          content="Use PaperFlow to write essays with 100% verified in-text citations. Our RAG technology ensures every source is mapped to a real PDF page."
        />

        <meta
          name="keywords"
          content="ai paper writer with citations, ai essay writer with in text citations, find citations for a paper ai, RAG ai writer"
        />

        <link
          rel="canonical"
          href="https://yourdomain.com/ai-paper-writer-with-citations"
        />

        {/* Open Graph */}
        <meta property="og:title" content="AI Paper Writer with Real Citations" />
        <meta
          property="og:description"
          content="Stop fixing fake AI bibliographies. Use verified RAG technology to map claims to real PDF pages."
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
                name: "Which AI paper writer provides real citations?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "PaperFlow is a specialized AI paper writer that uses Retrieval-Augmented Generation (RAG) to provide real, verifiable in-text citations from your own PDFs.",
                },
              },
              {
                "@type": "Question",
                name: "How do I find citations for a paper using AI?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Upload your documents to PaperFlow. It identifies the exact page and paragraph needed for your citation using dense retrieval.",
                },
              },
            ],
          })}
        </script>
      </Helmet>

      {/* PAGE CONTENT */}
      <div className="bg-white text-slate-900">
        {/* HERO */}
        <section className="pt-20 pb-16 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold uppercase bg-blue-50 text-blue-600 rounded-full">
              100% Verified Sources
            </div>

            <h1 className="text-5xl lg:text-6xl font-serif font-bold leading-tight mb-6">
              The AI Paper Writer That{" "}
              <span className="text-blue-600">Actually Cites</span> Real Sources
            </h1>

            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Stop fixing fake AI bibliographies. PaperFlow uses{" "}
              <strong>Retrieval-Augmented Generation (RAG)</strong> to map every
              claim back to a real page in your PDF.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Start Writing with Citations
              </Button>

              <Link to="/tools/research-paper-essay-outline">
                <Button variant="outline" size="lg">
                  Generate Outline First
                </Button>
              </Link>
            </div>
          </div>

          {/* PROOF VISUAL */}
          <div className="relative bg-slate-100 rounded-2xl p-8 border border-slate-200 shadow-xl">
            <div className="bg-white p-4 rounded-lg shadow-sm mb-4 border-l-4 border-blue-500">
              <p className="text-sm italic">
                “RAG models combine parametric and non-parametric memory to
                improve factual accuracy [1].”
              </p>
            </div>

            <div className="flex justify-end">
              <div className="bg-blue-600 text-white text-xs p-3 rounded-lg shadow-lg w-2/3">
                <strong>Source [1]:</strong> Lewis et al. (2020), Page 3
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10">
            <div className="p-8 rounded-2xl border bg-white">
              <Quote className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">
                Verified In-Text Citations
              </h3>
              <p className="text-slate-600">
                Every claim links directly to the exact paragraph in your PDFs.
              </p>
            </div>

            <div className="p-8 rounded-2xl border bg-white">
              <ShieldCheck className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">
                No Hallucinated Sources
              </h3>
              <p className="text-slate-600">
                The AI is restricted to only your uploaded research documents.
              </p>
            </div>

            <div className="p-8 rounded-2xl border bg-white">
              <BookOpen className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">
                Auto-Formatted Bibliography
              </h3>
              <p className="text-slate-600">
                Export APA, MLA, or Chicago citations instantly.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}