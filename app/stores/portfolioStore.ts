import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";

export interface Entry {
  id: string;
  symbol: string;
  desc?: string;
  quantity: number;
  price: number;
  total: number;
  type: "sell" | "buy" | "credit" | "withdrawl";
  time?: string;
}

type PortfolioState = {
  entries: Entry[];
  addEntry: (entry: Entry) => void;
  resetStore: () => void;
};

const initialEntry: Entry = {
  id: uuidv4(),
  symbol: "USD",
  price: 1,
  quantity: 100000,
  total: 100000,
  type: "credit",
  time: dayjs().format("YYYY-MM-DDTHH:mm:ss"),
};

export const usePortfolioStore = create<
  PortfolioState,
  [
    ["zustand/devtools", never],
    ["zustand/persist", never],
    ["zustand/immer", never],
  ]
>(
  devtools(
    persist(
      immer((set) => ({
        entries: [initialEntry],
        addEntry: (entry) => {
          set((state) => {
            state.entries.push(entry);
          });
        },
        resetStore: () => {
          set((state) => {
            state.entries = [initialEntry];
          });
        },
      })),
      {
        name: "portfolio-storage",
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
  ),
);
