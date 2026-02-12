import { useGameStore } from '@/lib/gameStore';
import { sounds } from '@/lib/sounds';

import playerBg from '@/assets/player_background.png';
import playerImg from '@/assets/player.png';
import playerWallet from '@/assets/player_with_cool_wallet.png';
import playerShirt from '@/assets/player_with_cool_t_shirt.png';
import playerHoodie from '@/assets/player_with_cool_hoodie.png';

const playerSprites: Record<string, string> = {
  default: playerImg,
  cool_wallet: playerWallet,
  cool_t_shirt: playerShirt,
  cool_hoodie: playerHoodie,
};

const BedroomScreen = () => {
  const { setScreen, coins, purchasedItem } = useGameStore();
  const sprite = playerSprites[purchasedItem || 'default'];

  return (
    <div className="game-container relative">
      <img
        src={playerBg}
        alt="Bedroom"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute top-4 left-4 z-10 bg-card/90 px-4 py-2 pixel-border">
        <span className="text-[10px] text-primary">COINS: {coins}</span>
      </div>

      <div
        className="absolute bottom-[8%] left-1/2 -translate-x-1/2 z-10 flex items-end justify-center"
        style={{ animation: 'pixel-idle 3s ease-in-out infinite' }}
      >
        <img
          src={sprite}
          alt="Player"
          className="h-[55vh] max-h-[500px] w-auto"
        />
      </div>

      <button
        onClick={() => {
          sounds.tap();
          setScreen('store');
        }}
        className="absolute bottom-6 right-6 z-10 bg-primary text-primary-foreground pixel-btn text-[8px]"
        style={{ animation: 'pixel-bounce 2s ease-in-out infinite' }}
      >
        STORE
      </button>
    </div>
  );
};

export default BedroomScreen;
