import React, { useState } from "react";
import { useDebounceCallback } from "usehooks-ts";
import { searchStock } from "../utils/apis";

function useSearchStock() {
  const [data, setData] = useState<{ value: string; label: string }[]>([]);

  const handleSearch = useDebounceCallback(async (searchTerm: string) => {
    if (searchTerm?.trim()) {
      const result = await searchStock(searchTerm);
      setData(
        result?.map((sym: any) => {
          return {
            value: sym.symbol,
            label: `${sym.name} (${sym.symbol})`,
          };
        }) || [],
      );
    }
  }, 1000);

  return { data, handleSearch };
}

export default useSearchStock;
