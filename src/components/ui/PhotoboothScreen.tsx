import { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { useGameStore } from '@/lib/gameStore';
import { sounds } from '@/lib/sounds';

import boothBg from '@/assets/photobooth_background.png';
import playerImg from '@/assets/player.png';
import playerWallet from '@/assets/player_with_cool_wallet.png';
import playerShirt from '@/assets/player_with_cool_t_shirt.png';
import playerHoodie from '@/assets/player_with_cool_hoodie.png';
import girlfriendImg from '@/assets/girlfriend.png';

const playerSprites: Record<string, string> = {
  default: playerImg,
  cool_wallet: playerWallet,
  cool_t_shirt: playerShirt,
  cool_hoodie: playerHoodie,
};

const PhotoboothScreen = () => {
  const { purchasedItem, showGirlfriend, toggleGirlfriend, setScreen } = useGameStore();
  const [flash, setFlash] = useState(false);
  const captureRef = useRef<HTMLDivElement>(null);
  const sprite = playerSprites[purchasedItem || 'default'];

  const takePhoto = async () => {
    sounds.shutter();
    setFlash(true);
    setTimeout(() => setFlash(false), 300);

    if (!captureRef.current) return;
    try {
      const dataUrl = await toPng(captureRef.current, { pixelRatio: 2 });
      const link = document.createElement('a');
      link.download = 'ryanngame.png';
      link.href = dataUrl;
      link.click();
    } catch (e) {
      console.error('Screenshot failed', e);
    }
  };

  return (
    <div className="game-container relative flex flex-col">
      <div ref={captureRef} className="relative flex-1">
        <img
          src={boothBg}
          alt="Photobooth"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute bottom-[15%] left-1/2 -translate-x-1/2 flex items-end justify-center gap-0 z-10">
          <div style={{ animation: 'pixel-idle 3s ease-in-out infinite' }}>
            <img
              src={sprite}
              alt="Player"
              className="h-[260px] w-auto"
            />
          </div>

          {showGirlfriend && (
            <div style={{ animation: 'pixel-idle 3.5s ease-in-out infinite 0.3s' }}>
              <img
                src={girlfriendImg}
                alt="Girlfriend"
                className="h-[245px] w-auto"
                style={{ animation: 'fade-scale-in 0.5s ease-out' }}
              />
            </div>
          )}
        </div>

        {flash && (
          <div
            className="absolute inset-0 bg-white z-50"
            style={{ animation: 'shutter 0.3s ease-out' }}
          />
        )}
      </div>

      <div className="absolute top-4 left-4 z-20">
        <button
          onClick={() => {
            sounds.tap();
            setScreen('store');
          }}
          className="bg-secondary text-secondary-foreground pixel-btn text-[8px]"
        >
          ← BACK
        </button>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3">
        <button
          onClick={takePhoto}
          className="bg-accent text-accent-foreground pixel-btn text-[10px] px-6"
          style={{ animation: 'pixel-bounce 2s ease-in-out infinite' }}
        >
          SNAP
        </button>

        <button
          onClick={() => {
            sounds.tap();
            toggleGirlfriend();
          }}
          className={`pixel-btn text-[7px] ${
            showGirlfriend
              ? 'bg-accent text-accent-foreground'
              : 'bg-card text-foreground'
          }`}
        >
          {showGirlfriend ? 'GIRLFRIEND ON' : 'ACCESSORIES'}
        </button>
      </div>
    </div>
  );
};

export default PhotoboothScreen;
