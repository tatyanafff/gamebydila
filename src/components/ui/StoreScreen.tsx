import { useState } from 'react';
import { useGameStore, ItemId } from '@/lib/gameStore';
import { sounds } from '@/lib/sounds';

import walletImg from '@/assets/cool_wallet.png';
import shirtImg from '@/assets/cool_t_shirt.png';
import hoodieImg from '@/assets/cool_hoodie.png';
import playerImg from '@/assets/player.png';
import playerWallet from '@/assets/player_with_cool_wallet.png';
import playerShirt from '@/assets/player_with_cool_t_shirt.png';
import playerHoodie from '@/assets/player_with_cool_hoodie.png';

const items: { id: ItemId; name: string; img: string; playerImg: string }[] = [
  { id: 'cool_wallet', name: 'Cool Wallet', img: walletImg, playerImg: playerWallet },
  { id: 'cool_t_shirt', name: 'Cool T-Shirt', img: shirtImg, playerImg: playerShirt },
  { id: 'cool_hoodie', name: 'Cool Hoodie', img: hoodieImg, playerImg: playerHoodie },
];

const playerSprites: Record<string, string> = {
  default: playerImg,
  cool_wallet: playerWallet,
  cool_t_shirt: playerShirt,
  cool_hoodie: playerHoodie,
};

const StoreScreen = () => {
  const { coins, purchasedItem, purchaseItem, setScreen } = useGameStore();
  const [coinAnim, setCoinAnim] = useState(false);
  const [outfitFlash, setOutfitFlash] = useState(false);
  const sprite = playerSprites[purchasedItem || 'default'];

  const handleBuy = (id: ItemId) => {
    if (coins < 300 || purchasedItem) return;
    sounds.purchase();
    setCoinAnim(true);
    setTimeout(() => {
      purchaseItem(id);
      sounds.outfit();
      setOutfitFlash(true);
      setTimeout(() => {
        setCoinAnim(false);
        setOutfitFlash(false);
      }, 500);
    }, 400);
  };

  return (
    <div className="game-container relative bg-card flex flex-col">
      <div className="relative z-10 flex items-center justify-between px-4 pt-4 pb-2">
        <button
          onClick={() => {
            sounds.tap();
            setScreen('bedroom');
          }}
          className="bg-secondary text-secondary-foreground pixel-btn text-[8px]"
        >
          ← BACK
        </button>

        <div className="bg-primary/20 px-4 py-2 pixel-border">
          <span
            className="text-[10px] text-primary"
            style={coinAnim ? { animation: 'coin-fly 0.4s ease-out' } : {}}
          >
            COINS: {coins}
          </span>
        </div>

        {purchasedItem && (
          <button
            onClick={() => {
              sounds.tap();
              setScreen('photobooth');
            }}
            className="bg-accent text-accent-foreground pixel-btn text-[8px]"
            style={{ animation: 'pixel-glow 2s ease-in-out infinite' }}
          >
            PHOTO
          </button>
        )}
      </div>

      <p className="text-center text-[8px] text-muted-foreground py-2">
        {purchasedItem ? 'Item purchased!' : 'Buy an item'}
      </p>

      <div className="flex justify-center py-2">
        <div style={{ animation: 'pixel-idle 3s ease-in-out infinite' }}>
          <img
            src={sprite}
            alt="Player"
            className={`h-[180px] w-auto ${outfitFlash ? 'brightness-150' : ''}`}
            style={{ transition: 'filter 0.3s' }}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="grid grid-cols-3 gap-3">
          {items.map((item) => {
            const owned = purchasedItem === item.id;
            const disabled = purchasedItem !== null && !owned;
            return (
              <button
                key={item.id}
                onClick={() => handleBuy(item.id)}
                disabled={!!purchasedItem}
                className={`flex flex-col items-center p-3 pixel-border transition-all ${
                  owned
                    ? 'bg-primary/20 border-primary'
                    : disabled
                    ? 'opacity-40 cursor-not-allowed bg-muted'
                    : 'bg-card hover:bg-primary/10 cursor-pointer'
                }`}
                style={!purchasedItem ? { animation: 'pixel-pulse 2s ease-in-out infinite' } : {}}
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-16 h-16 object-contain mb-2"
                />
                <span className="text-[6px] text-foreground leading-tight text-center">
                  {item.name}
                </span>
                <span className="text-[7px] text-primary mt-1">
                  {owned ? 'OWNED' : 'COST: 300'}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StoreScreen;
