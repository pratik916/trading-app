import axios from "axios";
type API_PROVIDER_TYPE = "alphavantage" | "benzinga" | "finnhub";

const API_PROVIDER: API_PROVIDER_TYPE = "finnhub";

const alphaEndpoint = "https://www.alphavantage.co/";
const alphaApikey = "GYLJ2G9GWHJNVUS1";

const finnhubEndpoint = "https://finnhub.io/api/v1";
export const finnhubApiKey = "cp7qq6hr01qi8q89ahjgcp7qq6hr01qi8q89ahk0";
export const finhubWebhookSecret = "cp7qq6hr01qi8q89ahl0";

const searchStockFromProvider: Partial<
  Record<
    API_PROVIDER_TYPE,
    (term: string) => Promise<{ symbol: string; name: string }[]>
  >
> = {
  alphavantage: async (searchTerm: string) => {
    const result = await axios.get(`${alphaEndpoint}/query`, {
      params: {
        function: "SYMBOL_SEARCH",
        keywords: searchTerm,
        apikey: alphaApikey,
      },
    });

    return result.data?.bestMatches?.map((sym: any) => {
      return {
        symbol: sym["1. symbol"],
        name: sym["2. name"],
      };
    });
  },
  finnhub: async (term) => {
    const result = await axios.get(`${finnhubEndpoint}/search`, {
      params: {
        q: term,
        token: finnhubApiKey,
      },
    });

    return result.data?.result?.map((sym: any) => {
      return {
        symbol: sym.symbol,
        name: sym.description,
      };
    });
  },
};

export const searchStock = async (searchTerm: string) => {
  return await searchStockFromProvider[API_PROVIDER]?.(searchTerm);
};
