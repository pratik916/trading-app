import React, { useState } from "react";
import { Entry, usePortfolioStore } from "../stores/portfolioStore";
import TradeStockModal from "./tradeStockModal";

function PortfolioList() {
  const [open, setIsOpen] = useState(false);
  const [symbol, setSymbol] = useState<string>("");
  const [maxQuantity, setMaxQuantity] = useState<number>(0);
  const { entries } = usePortfolioStore();
  const map = new Map<string, Entry>();
  entries
    .filter((e) => e.type === "buy" || e.type === "sell")
    .map((e) => {
      console.log({ e });
      if (map.has(e.symbol)) {
        const val = map.get(e.symbol);
        if (val) {
          val.quantity =
            Number(val.quantity) +
            (e.type === "sell" ? -1 : 1) * Number(e.quantity);
          val.total =
            Number(val.total) + (e.type === "sell" ? -1 : 1) * Number(e.total);
          val.price = Number(
            Math.abs(val.total / val.quantity || 1).toPrecision(5),
          );

          console.log("val and e", val, e);
          map.set(val.symbol, { ...val });
        }
      } else {
        map.set(e.symbol, {
          ...e,
          quantity: Number((e.type === "sell" ? -1 : 1) * e.quantity),
          total: Number((e.type === "sell" ? -1 : 1) * e.total),
        });
      }
    });
  const portfolioEntries = Array.from(map.values()).filter((i) => i.quantity);
  console.log({ portfolioEntries });
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
                <td className="px-6 py-4">{ent.price}</td>
                <td className="px-6 py-4">{ent.quantity}</td>
                <td className="px-6 py-4">{Math.abs(ent.total)}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => {
                      setSymbol(ent.symbol);
                      setMaxQuantity(ent.quantity);
                      setIsOpen(true);
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
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

export default PortfolioList;
