import { useState, useEffect } from 'react';
import { Search, Shield, Eye, Database, Globe, Lock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface LoadingScreenProps {
  query: string;
}

const loadingStages = [
  { icon: Search, text: 'Initializing search algorithms', duration: 800 },
  { icon: Globe, text: 'Scanning public web sources', duration: 1000 },
  { icon: Database, text: 'Checking breach databases', duration: 700 },
  { icon: Shield, text: 'Analyzing platform signatures', duration: 900 },
  { icon: Eye, text: 'Cross-referencing digital footprints', duration: 600 },
  { icon: Lock, text: 'Generating security report', duration: 400 },
];

export const LoadingScreen = ({ query }: LoadingScreenProps) => {
  const [currentStage, setCurrentStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let totalDuration = 0;
    let currentTime = 0;

    const runStages = () => {
      loadingStages.forEach((stage, index) => {
        setTimeout(() => {
          setCurrentStage(index);
          setDisplayText(stage.text);
          
          // Animate progress
          const progressIncrement = (100 / loadingStages.length) * (index + 1);
          setProgress(progressIncrement);
          
        }, totalDuration);
        
        totalDuration += stage.duration;
      });
    };

    runStages();
  }, []);

  const currentIcon = loadingStages[currentStage]?.icon || Search;
  const Icon = currentIcon;

  return (
    <div className="fixed inset-0 bg-background z-50 flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold font-mono mb-2">
            Tracing Digital Footprint
          </h2>
          <p className="text-muted-foreground">
            Analyzing: <span className="text-primary font-mono">{query}</span>
          </p>
        </div>

        {/* Central animation */}
        <div className="relative mb-8">
          <div className="mx-auto w-32 h-32 rounded-full border-2 border-border/30 flex items-center justify-center relative">
            {/* Rotating border */}
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary animate-spin"></div>
            
            {/* Pulsing glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyber-orange/20 to-cyber-blue/20 animate-pulse"></div>
            
            {/* Icon */}
            <div className="relative z-10">
              <Icon className="w-12 h-12 text-primary" />
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-6">
          <Progress value={progress} className="h-3" />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>0%</span>
            <span>{Math.round(progress)}%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Current stage */}
        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <Icon className="w-5 h-5 text-primary" />
            <span className="font-mono text-lg">
              {displayText}
              <span className="terminal-cursor"></span>
            </span>
          </div>

          {/* Stage indicators */}
          <div className="flex justify-center space-x-2">
            {loadingStages.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index <= currentStage 
                    ? 'bg-primary' 
                    : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Scan lines effect */}
        <div className="absolute inset-0 scan-lines pointer-events-none opacity-20"></div>
      </div>
    </div>
  );
};