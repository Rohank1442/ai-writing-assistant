import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { OutlineItem } from '@/components/essays/OutlineItem';
import { documentsApi, essaysApi, Document, Essay } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  ArrowLeft, 
  FileText, 
  Loader2, 
  Sparkles,
  Download,
  Copy,
  Check
} from 'lucide-react';

export default function EssayEditor() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const docId = searchParams.get('doc');
  const essayId = searchParams.get('essay'); // <--- New: existing essay

  const [document, setDocument] = useState<Document | null>(null);
  const [topic, setTopic] = useState('');
  const [essay, setEssay] = useState<Essay | null>(null);
  const [content, setContent] = useState<Record<string, string>>({});
  const [isGeneratingOutline, setIsGeneratingOutline] = useState(false);
  const [generatingSection, setGeneratingSection] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  // Fetch document and existing essay if essayId is provided
  useEffect(() => {
    if (!docId || docId === 'undefined') return;

    documentsApi.get(docId)
      .then(setDocument)
      .catch(console.error);

    if (essayId) {
      essaysApi.get(essayId)
        .then((res) => {
          setEssay(res);
          setTopic(res.title || '');
          setContent(res.content || {}); // load saved sections
        })
        .catch(console.error);
    }
  }, [docId, essayId]);

  // Parse outline
  const outlineArray = useMemo(() => {
    if (!essay?.outline) return [];
    try {
      let result;
      if (typeof essay.outline === "string") {
        const parsed = JSON.parse(essay.outline);
        result = parsed.outline || parsed;
      } else if (Array.isArray(essay.outline)) {
        result = essay.outline;
      } else if (typeof essay.outline === "object" && essay.outline) {
        result = essay.outline;
      } else {
        result = essay.outline;
      }
      return Array.isArray(result) ? result : [];
    } catch (e) {
      console.error("Invalid outline JSON", e);
      return [];
    }
  }, [essay]);

  // Calculate progress
  const completedSections = outlineArray.filter((item) => content[item.header]).length;
  const totalSections = outlineArray.length;
  const progress = totalSections > 0 ? (completedSections / totalSections) * 100 : 0;

  // Generate outline
  const handleGenerateOutline = async () => {
    if (!docId || !topic) return;

    setIsGeneratingOutline(true);
    setError('');

    try {
      const result = await essaysApi.generateOutline(docId, topic);
      setEssay(result);
      setContent(result.content || {});
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate outline');
    } finally {
      setIsGeneratingOutline(false);
    }
  };

  // Generate section
  const handleGenerateSection = async (header: string) => {
    if (!essay || !docId) return;

    setGeneratingSection(header);

    try {
      const res = await essaysApi.generateSection(essay.id, header, docId);
      const newContent = typeof res === 'string' ? res : (res.content || res);
    
      setContent((prev) => {
        const updated = { 
          ...prev, 
          [header]: newContent 
        };
        console.log("Updated Content State:", updated);
        return updated;
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate section');
    } finally {
      setGeneratingSection(null);
    }
  };

  const getFullText = () => {
    if (!essay || outlineArray.length === 0) return '';
    return outlineArray
      .map((item) => `## ${item.header}\n\n${content[item.header] || ''}`)
      .join('\n\n');
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(getFullText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const text = getFullText();
    const blob = new Blob([text], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${topic || 'essay'}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AppLayout>
      <div className="p-8">
        <div className="max-w-3xl mx-auto">
          {/* Back button */}
          <button
            onClick={() => navigate('/essays')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Essays
          </button>

          {/* Document info */}
          {document && (
            <div className="flex items-center gap-3 mb-6 p-4 bg-muted/50 rounded-lg">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">{document.file_name}</p>
                <p className="text-sm text-muted-foreground">Source document</p>
              </div>
            </div>
          )}

          {/* Topic input (new essay) */}
          {!essay && (
            <div className="animate-fade-in">
              <h1 className="text-3xl font-serif font-bold mb-2">Create Essay</h1>
              <p className="text-muted-foreground mb-8">
                Enter your essay topic and AI will generate a structured outline
              </p>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="topic">Essay Topic</Label>
                  <Input
                    id="topic"
                    placeholder="e.g., The impact of machine learning on healthcare diagnostics"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="text-base"
                  />
                </div>

                {error && <p className="text-sm text-destructive">{error}</p>}

                <Button
                  onClick={handleGenerateOutline}
                  disabled={!topic || isGeneratingOutline}
                  size="lg"
                  className="w-full"
                >
                  {isGeneratingOutline ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Generating outline...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5" />
                      Generate Outline
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* Outline & Editor */}
          {essay && (
            <div className="animate-fade-in">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-serif font-bold mb-2">{topic}</h1>
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {completedSections}/{totalSections} sections
                  </span>
                </div>
              </div>

              {/* Actions */}
              {completedSections > 0 && (
                <div className="flex gap-3 mb-8">
                  <Button variant="outline" onClick={handleCopy}>
                    {copied ? (
                      <>
                        <Check className="h-4 w-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copy All
                      </>
                    )}
                  </Button>
                  <Button variant="outline" onClick={handleDownload}>
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </div>
              )}

              {/* Outline items */}
              <div className="space-y-0">
                {outlineArray.map((item, index) => (
                  <OutlineItem
                    key={item.header}
                    item={item}
                    index={index}
                    content={content[item.header]}
                    isGenerating={generatingSection === item.header}
                    onGenerate={() => handleGenerateSection(item.header)}
                  />
                ))}
              </div>

              {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}