import { useEffect, useState } from "react";
import { Heart, Shield, Zap } from "lucide-react";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [showTagline, setShowTagline] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 4;
      });
    }, 50);

    // Show tagline after 500ms
    const taglineTimer = setTimeout(() => setShowTagline(true), 500);

    // Fade out and complete after 2.5s
    const fadeTimer = setTimeout(() => setFadeOut(true), 2200);
    const completeTimer = setTimeout(onComplete, 2700);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(taglineTimer);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-primary via-primary to-primary/90 transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Logo */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Animated logo */}
        <div className="relative mb-6">
          <div className="absolute inset-0 animate-ping opacity-30">
            <div className="w-24 h-24 rounded-3xl bg-white/20" />
          </div>
          <div className="relative w-24 h-24 rounded-3xl bg-white shadow-2xl flex items-center justify-center animate-scale-in">
            <Heart className="w-12 h-12 text-primary fill-primary animate-pulse" />
          </div>
        </div>

        {/* App name */}
        <h1 className="text-4xl font-bold text-white mb-2 animate-fade-in">
          SwiftCare
        </h1>
        <p className="text-white/80 text-lg animate-fade-in stagger-2">
          Emergency First
        </p>

        {/* Tagline */}
        <div 
          className={`mt-8 max-w-xs text-center transition-all duration-500 ${
            showTagline ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="text-white/70 text-sm italic leading-relaxed">
            "For those who stand with someone in trouble, even when they're not family by blood."
          </p>
        </div>

        {/* Features icons */}
        <div className={`flex gap-6 mt-10 transition-all duration-500 ${
          showTagline ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`} style={{ transitionDelay: '200ms' }}>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-white/70 text-[10px]">Quick Delivery</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-white/70 text-[10px]">Verified Stores</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-white/70 text-[10px]">24/7 Care</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-12 w-48">
          <div className="h-1 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-white/50 text-xs text-center mt-3">
            {progress < 100 ? 'Loading...' : 'Ready!'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
