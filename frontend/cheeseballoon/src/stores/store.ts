// zustand 사용 예시
/** import { createStore } from "zustand";

type State = {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
};

const useStore = createStore<State>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));

export default useStore;
*/
