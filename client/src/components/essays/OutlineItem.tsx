import { useState } from 'react';
import { OutlineItem as OutlineItemType } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Sparkles, Check, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OutlineItemProps {
  item: OutlineItemType;
  index: number;
  content?: string;
  isGenerating?: boolean;
  onGenerate: () => void;
}

export function OutlineItem({ 
  item, 
  index, 
  content, 
  isGenerating, 
  onGenerate 
}: OutlineItemProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasContent = !!content;

  return (
    <div className="relative">
      {/* Timeline connector */}
      <div className="absolute left-5 top-12 bottom-0 w-px bg-border" />
      
      <div className="flex gap-4">
        {/* Step indicator */}
        <div className={cn(
          "relative z-10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-medium transition-colors",
          hasContent
            ? "bg-success text-success-foreground"
            : "bg-muted text-muted-foreground"
        )}>
          {hasContent ? <Check className="h-5 w-5" /> : index + 1}
        </div>

        {/* Content */}
        <div className="flex-1 pb-8">
          <div className="bg-card border border-border rounded-lg p-4 shadow-card">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-medium mb-1">{item.header}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
              
              {!hasContent ? (
                <Button
                  size="sm"
                  onClick={onGenerate}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Generate
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              )}
            </div>

            {/* Generated content */}
            {hasContent && isExpanded && (
              <div className="mt-4 pt-4 border-t border-border">
                <div className="prose prose-sm max-w-none">
                  <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                    {content}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}