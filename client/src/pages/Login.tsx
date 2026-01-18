import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BookOpen, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { redirect, useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async (e: React.MouseEvent) => {
    e.preventDefault();
    setError('');
    setIsGoogleLoading(true);

    const redirectUrl = `${window.location.origin}/dashboard`;
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
          queryParams: {
            access_type: 'offline',
            prompt: 'select_account',
          },
        },
      });

      if (error) throw error;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Google login failed');
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md animate-fade-in">
          <div className="flex items-center gap-2 mb-8">
            <BookOpen className="h-8 w-8 text-primary" />
            <span className="text-xl font-semibold">ResearchAI</span>
          </div>

          <h1 className="text-3xl font-serif font-bold mb-2">Welcome back</h1>
          <p className="text-muted-foreground mb-8">
            Sign in to continue your research journey
          </p>

          {error && (
            <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm mb-5">
              {error}
            </div>
          )}

          {/* Google Sign In Button - Type="button" is key */}
          <Button
            type="button"
            variant="outline"
            className="w-full mb-6"
            size="lg"
            onClick={handleGoogleLogin}
            disabled={isGoogleLoading || isLoading}
          >
            {isGoogleLoading ? (
              <>
                <Loader2 className="animate-spin h-5 w-5 mr-2" />
                Connecting...
              </>
            ) : (
              <>
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </>
            )}
          </Button>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-background text-muted-foreground">
                Or continue with email
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              size="lg" 
              disabled={isLoading || isGoogleLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-muted-foreground">
            Don't have an account?{' '}
            <a href="/signup" className="text-primary hover:underline font-medium">
              Sign up
            </a>
          </p>
        </div>
      </div>

      {/* Right side - Visual Content */}
      <div className="hidden lg:flex flex-1 bg-slate-50 items-center justify-center p-12">
        <div className="max-w-lg text-center animate-slide-up">
          <div className="w-24 h-24 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <BookOpen className="h-12 w-12 text-primary" />
          </div>
          <h2 className="text-2xl font-serif font-bold mb-4">
            Research papers, simplified
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Upload your PDFs, let AI understand them, and generate well-structured essays grounded in real academic sources.
          </p>
        </div>
      </div>
    </div>
  );
}