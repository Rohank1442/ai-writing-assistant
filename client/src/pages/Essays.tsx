import { useEffect, useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { PenTool, Plus, FileText, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { essaysApi, Essay } from '@/lib/api';

export default function Essays() {
  const navigate = useNavigate();

  const [essays, setEssays] = useState<Essay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    essaysApi
      .list()
      .then(setEssays)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);
  console.log("essays: --------------> ",essays);
  return (
    <AppLayout>
      <div className="p-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-serif font-bold mb-1">Essays</h1>
              <p className="text-muted-foreground">
                View and manage your AI-generated essays
              </p>
            </div>
            <Button onClick={() => navigate('/dashboard')}>
              <Plus className="h-4 w-4 mr-2" />
              New Essay
            </Button>
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex justify-center py-20">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <p className="text-center text-destructive">{error}</p>
          )}

          {/* Empty state */}
          {!loading && !error && essays.length === 0 && (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
                <PenTool className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No essays yet</h3>
              <p className="text-muted-foreground mb-6">
                Upload a document and create your first essay
              </p>
              <Button onClick={() => navigate('/dashboard')}>
                <Plus className="h-4 w-4 mr-2" />
                Get Started
              </Button>
            </div>
          )}

          {/* Essays list */}
          {!loading && !error && essays.length > 0 && (
            <div className="grid gap-4">
              {essays.map((essay) => (
                <div
                  key={essay.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted cursor-pointer transition"
                  onClick={() =>
                    navigate(`/essays/new?doc=${essay.doc_id}&essay=${essay.id}`)
                  }
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">
                        {essay.title || 'Untitled Essay'}
                      </p>
                      {essay.created_at && (
                        <p className="text-sm text-muted-foreground">
                          Created{' '}
                          {new Date(essay.created_at).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>

                  <Button variant="outline" size="sm">
                    Continue
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}