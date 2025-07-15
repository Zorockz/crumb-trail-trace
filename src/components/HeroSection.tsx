import { Shield, Search, Eye, AlertTriangle } from 'lucide-react';
import heroBackground from '@/assets/hero-background.jpg';

export const HeroSection = () => {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background with scan lines effect */}
      <div className="absolute inset-0 scan-lines">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBackground})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/85 to-background/90"></div>
      </div>

      {/* Hero content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        {/* Logo/Brand */}
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-cyber-orange to-cyber-blue rounded-full blur opacity-30"></div>
            <div className="relative bg-background p-4 rounded-full border border-border/50">
              <Search className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold font-mono ml-4">
            Trace<span className="text-primary">.</span>Me
          </h1>
        </div>

        {/* Main tagline */}
        <div className="mb-8">
          <p className="text-2xl md:text-3xl font-light text-muted-foreground mb-2">
            "What can the internet find about you…
          </p>
          <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyber-orange to-cyber-blue bg-clip-text text-transparent">
            with just crumbs?"
          </p>
        </div>

        {/* Description */}
        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          A clean, sharable OSINT-style tool that pulls together public data trails 
          to show users what's out there — across platforms, leaks, and web footprints.
        </p>

        {/* Feature icons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="flex flex-col items-center space-y-2">
            <div className="p-3 rounded-lg bg-card/30 border border-border/50">
              <Shield className="w-6 h-6 text-cyber-green" />
            </div>
            <p className="text-sm text-muted-foreground">Security checkup</p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="p-3 rounded-lg bg-card/30 border border-border/50">
              <Eye className="w-6 h-6 text-cyber-blue" />
            </div>
            <p className="text-sm text-muted-foreground">Digital wake-up call</p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="p-3 rounded-lg bg-card/30 border border-border/50">
              <AlertTriangle className="w-6 h-6 text-cyber-yellow" />
            </div>
            <p className="text-sm text-muted-foreground">Exposure analysis</p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="p-3 rounded-lg bg-card/30 border border-border/50">
              <Search className="w-6 h-6 text-cyber-purple" />
            </div>
            <p className="text-sm text-muted-foreground">Cross-platform tracing</p>
          </div>
        </div>

        {/* Terminal cursor effect */}
        <div className="font-mono text-primary text-lg">
          <span>Ready to trace your digital footprint?</span>
          <span className="terminal-cursor"></span>
        </div>
      </div>
    </div>
  );
};