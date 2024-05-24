import { useState } from "react";
import { Entry, usePortfolioStore } from "../stores/portfolioStore";
import _ from "lodash";

function usePortfolio() {
  const [open, setIsOpen] = useState(false);
  const [symbol, setSymbol] = useState<string>("");
  const [maxQuantity, setMaxQuantity] = useState<number>(0);
  const { entries } = usePortfolioStore();

  const openSellModal = (sym: string, qnty: number) => {
    setSymbol(sym);
    setMaxQuantity(qnty);
    setIsOpen(true);
  };
  const closeSellModal = () => {
    setSymbol("");
    setMaxQuantity(0);
    setIsOpen(false);
  };

  const groupedEntries = _.groupBy(
    entries.filter((e) => e.type === "buy" || e.type === "sell"),
    "symbol",
  );

  const updatedMap = new Map<string, Entry>();

  for (let key of Object.keys(groupedEntries)) {
    const buys = groupedEntries[key].filter((e) => e.type === "buy");
    const sells = groupedEntries[key].filter((e) => e.type === "sell");

    const totalBuyQuantity = buys.reduce(
      (prev, next) => Number(prev) + Number(next.quantity),
      0,
    );

    const totalBuyAmount = buys.reduce(
      (prev, next) => Number(prev) + Number(next.quantity) * Number(next.price),
      0,
    );

    const totalSellQuantity = sells.reduce(
      (prev, next) => Number(prev) + Number(next.quantity),
      0,
    );

    const totalSellAmount = sells.reduce(
      (prev, next) => Number(prev) + Number(next.quantity) * Number(next.price),
      0,
    );

    const remainingQuantity = totalBuyQuantity - totalSellQuantity;

    if (remainingQuantity > 0) {
      const remainingAmount = totalBuyAmount - totalSellAmount;
      const averagePrice = Number(
        (remainingAmount / remainingQuantity).toFixed(3),
      );

      updatedMap.set(key, {
        ...buys[0],
        price: averagePrice,
        quantity: remainingQuantity,
        total: Number(remainingAmount.toFixed(3)),
      });
    }
  }

  const portfolioEntries = Array.from(updatedMap.values()).filter(
    (i) => i.quantity,
  );

  return {
    portfolioEntries,
    open,
    symbol,
    maxQuantity,
    openSellModal,
    closeSellModal,
  };
}

export default usePortfolio;
