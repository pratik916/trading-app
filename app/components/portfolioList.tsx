import React, { useState } from "react";
import { Entry, usePortfolioStore } from "../stores/portfolioStore";
import TradeStockModal from "./tradeStockModal";
import usePortfolio from "../hooks/usePortfolio";

function PortfolioList() {
  const {
    portfolioEntries,
    open,
    symbol,
    maxQuantity,
    openSellModal,
    closeSellModal,
  } = usePortfolio();

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Stock name
            </th>
            <th scope="col" className="px-6 py-3">
              Avg. Price
            </th>
            <th scope="col" className="px-6 py-3">
              Quantity
            </th>
            <th scope="col" className="px-6 py-3">
              Total
            </th>
            <th scope="col" className="px-6 py-3">
              Sale
            </th>
          </tr>
        </thead>
        <tbody>
          {portfolioEntries.map((ent) => {
            return (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={ent.id}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {ent.desc}
                </th>
                <td className="px-6 py-4">${ent.price.toLocaleString()}</td>
                <td className="px-6 py-4">{ent.quantity}</td>
                <td className="px-6 py-4">
                  ${Math.abs(ent.total).toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => {
                      openSellModal(ent.symbol, ent.quantity);
                    }}
                    type="button"
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  >
                    Sell
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {open && (
        <TradeStockModal
          symbol={symbol}
          maxQuantity={maxQuantity}
          type="sell"
          onClose={() => closeSellModal()}
        />
      )}
    </div>
  );
}

export default PortfolioList;
