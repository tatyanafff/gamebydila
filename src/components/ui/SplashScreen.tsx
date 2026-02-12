import { useEffect, useState } from 'react';
import { useGameStore } from '@/lib/gameStore';
import { sounds } from '@/lib/sounds';

const SplashScreen = () => {
  const setScreen = useGameStore((s) => s.setScreen);
  const [showBubble, setShowBubble] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => {
      setShowBubble(true);
      sounds.welcome();
    }, 800);
    const t2 = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setScreen('bedroom'), 600);
    }, 3500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [setScreen]);

  return (
    <div
      className={`game-container flex flex-col items-center justify-center bg-foreground transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="text-center px-6">
        <h1
          className="text-primary text-lg leading-relaxed mb-8"
          style={{ animation: 'fade-scale-in 0.6s ease-out' }}
        >
          [GAME START]
        </h1>
        {showBubble && (
          <div
            className="bg-card px-6 py-5 pixel-border relative"
            style={{ animation: 'speech-pop 0.5s ease-out' }}
          >
            <p className="text-foreground text-[10px] leading-6">
              Welcome to
              <br />
              <span className="text-primary">Ryann Dress Up</span>
              <br />
              Game!
            </p>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-card border-b-4 border-r-4 border-border rotate-45" />
          </div>
        )}
      </div>
    </div>
  );
};

export default SplashScreen;
