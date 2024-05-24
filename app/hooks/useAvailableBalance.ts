import React from "react";
import { usePortfolioStore } from "../stores/portfolioStore";

function useAvailableBalance() {
  const { entries } = usePortfolioStore();

  const availableBalance = entries.reduce((prev, next) => prev + next.total, 0);

  return availableBalance;
}

export default useAvailableBalance;
