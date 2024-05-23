"use client";
import React from "react";
import { usePortfolioStore } from "../stores/portfolioStore";
import OrderBook from "./orderBook";

function Portfolio() {
  const { entries } = usePortfolioStore();
  console.log({ entries });
  return (
    <div>
      <OrderBook />
    </div>
  );
}

export default Portfolio;
