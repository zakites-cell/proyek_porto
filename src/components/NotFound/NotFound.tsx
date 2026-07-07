export function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center text-white p-4 text-center">
      <div className="glass p-12 rounded-2xl max-w-lg border border-primary/20 relative overflow-hidden">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary opacity-20 blur-xl"></div>
        <h1 className="text-8xl font-bold text-gradient mb-4 drop-shadow-[0_0_15px_rgba(0,207,255,0.5)]">404</h1>
        <h2 className="text-2xl font-mono text-white/90 mb-6 tracking-widest uppercase">System Glitch</h2>
        <p className="text-white/60 mb-8 max-w-sm mx-auto leading-relaxed">
          The quadrant you are trying to reach does not exist in this dimension.
        </p>
        <button 
          onClick={() => window.location.href = '/'}
          className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/40 hover:border-primary/80 px-8 py-3 rounded-full transition-all duration-300 font-mono text-sm tracking-widest cursor-pointer hover:shadow-[0_0_20px_rgba(0,207,255,0.3)]"
        >
          RETURN TO BASE
        </button>
      </div>
    </div>
  );
}
