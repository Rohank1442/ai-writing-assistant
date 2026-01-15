import { useState, useCallback } from 'react';
import { Upload, FileText, X, Loader2, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { documentsApi } from '@/lib/api';
import { Button } from '@/components/ui/button';

interface UploadZoneProps {
  onUploadComplete?: () => void;
}

type UploadState = 'idle' | 'uploading' | 'success' | 'error';

export function UploadZone({ onUploadComplete }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadState, setUploadState] = useState<UploadState>('idle');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      setError('');
    } else {
      setError('Please upload a PDF file');
    }
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      setError('');
    } else {
      setError('Please upload a PDF file');
    }
  }, []);

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploadState('uploading');
    setError('');

    try {
      await documentsApi.upload(selectedFile);
      setUploadState('success');
      setTimeout(() => {
        setSelectedFile(null);
        setUploadState('idle');
        onUploadComplete?.();
      }, 1500);
    } catch (err) {
      setUploadState('error');
      setError(err instanceof Error ? err.message : 'Upload failed');
    }
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setUploadState('idle');
    setError('');
  };

  if (selectedFile) {
    return (
      <div className="border-2 border-dashed border-border rounded-xl p-6 bg-card">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium truncate">{selectedFile.name}</p>
            <p className="text-sm text-muted-foreground">
              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
          {uploadState === 'idle' && (
            <button
              onClick={clearSelection}
              className="p-2 hover:bg-muted rounded-md transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {error && (
          <p className="mt-3 text-sm text-destructive">{error}</p>
        )}

        <div className="mt-4 flex gap-3">
          {uploadState === 'idle' && (
            <>
              <Button onClick={handleUpload} className="flex-1">
                <Upload className="h-4 w-4 mr-2" />
                Upload PDF
              </Button>
              <Button variant="outline" onClick={clearSelection}>
                Cancel
              </Button>
            </>
          )}
          {uploadState === 'uploading' && (
            <Button disabled className="flex-1">
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Uploading...
            </Button>
          )}
          {uploadState === 'success' && (
            <Button disabled className="flex-1 bg-success hover:bg-success">
              <CheckCircle className="h-4 w-4 mr-2" />
              Uploaded!
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <label
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        "flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200",
        isDragging
          ? "border-primary bg-accent"
          : "border-border bg-card hover:border-primary/50 hover:bg-accent/50"
      )}
    >
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileSelect}
        className="hidden"
      />
      <div className={cn(
        "w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-colors",
        isDragging ? "bg-primary/20" : "bg-muted"
      )}>
        <Upload className={cn(
          "h-7 w-7 transition-colors",
          isDragging ? "text-primary" : "text-muted-foreground"
        )} />
      </div>
      <p className="font-medium mb-1">
        {isDragging ? 'Drop your PDF here' : 'Upload a research PDF'}
      </p>
      <p className="text-sm text-muted-foreground">
        Drag and drop or click to browse
      </p>
      {error && (
        <p className="mt-3 text-sm text-destructive">{error}</p>
      )}
    </label>
  );
}