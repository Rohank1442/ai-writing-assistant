import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { DocumentCard } from '@/components/documents/DocumentCard';
import { UploadZone } from '@/components/documents/UploadZone';
import { documentsApi, Document } from '@/lib/api';
import { FileText, Plus, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const navigate = useNavigate();

  const fetchDocuments = async () => {
    try {
      const docs = await documentsApi.list();
      setDocuments(docs);
    } catch (error) {
      console.error('Failed to fetch documents:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleDocumentClick = (doc: Document) => {
    if (doc.status === 'ready') {
      navigate(`/essays/new?doc=${doc.doc_id}`);
    }
  };

  return (
    <AppLayout>
      <div className="p-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-serif font-bold mb-1">Documents</h1>
              <p className="text-muted-foreground">
                Upload research PDFs to start writing essays
              </p>
            </div>
            <Button onClick={() => setShowUpload(!showUpload)}>
              <Plus className="h-4 w-4 mr-2" />
              New Upload
            </Button>
          </div>

          {/* Upload Zone */}
          {showUpload && (
            <div className="mb-8 animate-slide-up">
              <UploadZone
                onUploadComplete={() => {
                  fetchDocuments();
                  setShowUpload(false);
                }}
              />
            </div>
          )}

          {/* Document List */}
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : documents.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No documents yet</h3>
              <p className="text-muted-foreground mb-6">
                Upload your first research PDF to get started
              </p>
              <Button onClick={() => setShowUpload(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Upload PDF
              </Button>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {documents.map((doc) => (
                <DocumentCard
                  key={doc.doc_id}
                  document={doc}
                  onClick={() => handleDocumentClick(doc)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}