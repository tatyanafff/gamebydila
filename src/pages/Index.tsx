import { useGameStore } from '@/lib/gameStore';
import SplashScreen from '@/components/ui/SplashScreen';
import BedroomScreen from '@/components/ui/BedroomScreen';
import StoreScreen from '@/components/ui/StoreScreen';
import PhotoboothScreen from '@/components/ui/PhotoboothScreen';

const Index = () => {
  const screen = useGameStore((s) => s.screen);

  return (
    <div className="min-h-screen bg-foreground flex items-center justify-center">
      {screen === 'splash' && <SplashScreen />}
      {screen === 'bedroom' && <BedroomScreen />}
      {screen === 'store' && <StoreScreen />}
      {screen === 'photobooth' && <PhotoboothScreen />}
    </div>
  );
};

export default Index;
