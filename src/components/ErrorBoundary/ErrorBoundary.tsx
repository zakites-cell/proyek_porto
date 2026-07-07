import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center text-white p-4 text-center">
          <div className="glass p-8 rounded-2xl max-w-lg border border-primary/20">
            <h1 className="text-4xl font-bold text-gradient mb-4">Something went wrong</h1>
            <p className="text-white/60 mb-6">
              An unexpected error occurred in the 3D application. We apologize for the inconvenience.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-primary/20 hover:bg-primary/40 text-primary border border-primary/50 px-6 py-2 rounded-full transition-colors font-mono text-sm cursor-pointer"
            >
              REBOOT SYSTEM
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
