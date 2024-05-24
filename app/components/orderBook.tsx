import React from "react";
import { Entry, usePortfolioStore } from "../stores/portfolioStore";

export const SellBadge = () => (
  <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
    Sell
  </span>
);

export const BuyBadge = () => (
  <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
    Buy
  </span>
);

function OrderBook() {
  const { entries } = usePortfolioStore();
  const map = new Map<string, Entry>();
  const portfolioEntries = entries.filter(
    (e) => e.type === "buy" || e.type === "sell",
  );

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Stock name
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Quantity
            </th>
            <th scope="col" className="px-6 py-3">
              Total
            </th>
            <th scope="col" className="px-6 py-3">
              Type
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
                <td className="px-6 py-4">
                  ${Number(Math.abs(ent.price).toFixed(2)).toLocaleString()}
                </td>
                <td className="px-6 py-4">{ent.quantity}</td>
                <td className="px-6 py-4">
                  ${Number(Math.abs(ent.total).toFixed(2)).toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  {ent.type === "buy" ? <BuyBadge /> : <SellBadge />}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default OrderBook;
