import { useState } from "react";
import usePortfolioEntries from "./usePortfolioEntries";

function usePortfolio() {
  const portfolioEntries = usePortfolioEntries();
  const [open, setIsOpen] = useState(false);
  const [symbol, setSymbol] = useState<string>("");
  const [maxQuantity, setMaxQuantity] = useState<number>(0);

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
