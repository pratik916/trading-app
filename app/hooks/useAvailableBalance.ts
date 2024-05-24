import { usePortfolioStore } from "../stores/portfolioStore";
import usePortfolioEntries from "./usePortfolioEntries";

function useAvailableBalance() {
  const { entries } = usePortfolioStore();

  const portfolioEntries = usePortfolioEntries();

  const availableBalance = entries.reduce(
    (prev, next) => prev + (next.type === "buy" ? -1 : 1) * next.total,
    0,
  );

  const totalHoldingValue = portfolioEntries.reduce(
    (prev, next) => prev + (next.type === "buy" ? -1 : 1) * next.total,
    0,
  );

  return { availableBalance, totalHoldingValue };
}

export default useAvailableBalance;
