import { create } from 'zustand';

export type GameScreen = 'splash' | 'bedroom' | 'store' | 'photobooth';
export type ItemId = 'cool_wallet' | 'cool_t_shirt' | 'cool_hoodie' | null;

interface GameState {
  screen: GameScreen;
  coins: number;
  purchasedItem: ItemId;
  showGirlfriend: boolean;
  setScreen: (screen: GameScreen) => void;
  purchaseItem: (item: ItemId) => void;
  toggleGirlfriend: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  screen: 'splash',
  coins: 300,
  purchasedItem: null,
  showGirlfriend: false,
  setScreen: (screen) => set({ screen }),
  purchaseItem: (item) => set({ coins: 0, purchasedItem: item }),
  toggleGirlfriend: () =>
    set((s) => ({ showGirlfriend: !s.showGirlfriend })),
}));
