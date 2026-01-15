import { Document } from '@/lib/api';
import { FileText, Clock, CheckCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DocumentCardProps {
  document: Document;
  onClick?: () => void;
  selected?: boolean;
}

export function DocumentCard({ document, onClick, selected }: DocumentCardProps) {
  const getStatusIcon = () => {
    switch (document.status) {
      case 'processing':
        return <Loader2 className="h-4 w-4 animate-spin text-primary" />;
      case 'ready':
        return <CheckCircle className="h-4 w-4 text-success" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusText = () => {
    switch (document.status) {
      case 'processing':
        return 'Processing...';
      case 'ready':
        return `${document.chunks_count || 0} chunks`;
      default:
        return 'Pending';
    }
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left p-4 rounded-lg border transition-all duration-200 group",
        selected
          ? "border-primary bg-accent shadow-sm"
          : "border-border bg-card hover:border-primary/50 hover:shadow-card"
      )}
    >
      <div className="flex items-start gap-3">
        <div className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors",
          selected ? "bg-primary/10" : "bg-muted group-hover:bg-primary/10"
        )}>
          <FileText className={cn(
            "h-5 w-5",
            selected ? "text-primary" : "text-muted-foreground group-hover:text-primary"
          )} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium truncate mb-1">
            {document.filename || 'Untitled Document'}
          </h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {getStatusIcon()}
            <span>{getStatusText()}</span>
          </div>
        </div>
      </div>
    </button>
  );
}