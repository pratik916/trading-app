"use client";
import React, { useState } from "react";
import { usePortfolioStore } from "../stores/portfolioStore";
import PortfolioList from "./portfolioList";
import TradeStockModal from "./tradeStockModal";
import useAvailableBalance from "../hooks/useAvailableBalance";
import OrderBook from "./orderBook";
import classNames from "classnames";

function Portfolio() {
  const [currentView, setCurrentView] = useState<"portfolio" | "orders">(
    "portfolio",
  );
  const [open, setIsOpen] = useState(false);
  const { entries } = usePortfolioStore();
  const available = useAvailableBalance();
  const activeClasses =
    "text-blue-600 bg-gray-50 dark:bg-gray-700   active  dark:text-white";
  const normalClasses =
    "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300";

  return (
    <div className="p-2 ">
      <div className="flex items-center justify-center p-4">
        <button
          onClick={() => setIsOpen(true)}
          className="relative inline-flex items-center justify-center p-0.5  me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Buy Stock
          </span>
        </button>
      </div>

      <div className=" mb-4 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex justify-between">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white ">
          Opening Balance: {entries?.[0].total.toLocaleString()}
        </h5>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white inline-block">
          Available Balance: {available.toLocaleString()}
        </h5>
      </div>

      <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
        <li className="me-2">
          <button
            onClick={() => setCurrentView("portfolio")}
            className={classNames(
              "inline-block p-4 rounded-t-lg font-bold",
              currentView === "portfolio" ? activeClasses : normalClasses,
            )}
          >
            Portfolio
          </button>
        </li>
        <li className="me-2">
          <button
            onClick={() => setCurrentView("orders")}
            className={classNames(
              "inline-block p-4 rounded-t-lg font-bold",
              currentView === "orders" ? activeClasses : normalClasses,
            )}
          >
            Orders
          </button>
        </li>
      </ul>

      {currentView === "portfolio" && <PortfolioList />}
      {currentView === "orders" && <OrderBook />}

      {open && <TradeStockModal onClose={() => setIsOpen(false)} />}
    </div>
  );
}

export default Portfolio;
