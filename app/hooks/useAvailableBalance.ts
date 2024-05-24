import { usePortfolioStore } from "../stores/portfolioStore";

function useAvailableBalance() {
  const { entries } = usePortfolioStore();

  const availableBalance = entries.reduce(
    (prev, next) => prev + (next.type === "buy" ? -1 : 1) * next.total,
    0,
  );

  return availableBalance;
}

export default useAvailableBalance;
