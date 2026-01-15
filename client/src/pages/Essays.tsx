import { AppLayout } from '@/components/layout/AppLayout';
import { PenTool, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function Essays() {
  const navigate = useNavigate();

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

          {/* Empty state */}
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
        </div>
      </div>
    </AppLayout>
  );
}