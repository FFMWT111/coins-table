import { useState, useEffect } from "react";
import AmountInput from "./AmountInput";
import ResultRow from "./ResultRow";
import axios from "axios";
import { sortBy } from "lodash";
import useDebouncedEffect from "use-debounced-effect";
import LoadingSkeleton from "./LoadingSkeleton";

type cachedValues = {
  provider: string;
  btc: string;
};

type offerResults = {
  [keys: string]: string;
};

const defaultAmount = "100";

function App() {
  const [prevAmount, setPrevAmount] = useState(defaultAmount);
  const [amount, setAmount] = useState(defaultAmount);
  const [cachedValues, setCachedValues] = useState<cachedValues[]>([]);
  const [loading, setLoading] = useState(true);
  const [offerResults, setOfferResults] = useState<offerResults>({});

  useEffect(() => {
    setLoading(true);
    axios.get("https://9me9nrscx3.us.aircode.run/cachedValues").then((res) => {
      setCachedValues(res.data);
      setLoading(false);
    });
  }, []);

  useDebouncedEffect(
    () => {
      if (amount == prevAmount) return;
      if (amount !== prevAmount) {
        setLoading(true);
        axios
          .get(`https://9me9nrscx3.us.aircode.run/offers?amount=${amount}`)
          .then((res) => {
            setLoading(false);
            setOfferResults(res.data);
            setPrevAmount(amount);
          });
        setLoading(false);
      }
    },
    300,
    [amount]
  );

  const sortedCache = sortBy(cachedValues, "btc").reverse();
  const sortedResults = sortBy(
    Object.keys(offerResults).map((provider) => {
      return {
        provider,
        btc: offerResults[provider],
      };
    }),
    "btc"
  ).reverse();

  const showCache = amount === defaultAmount;

  const rows = showCache ? sortedCache : sortedResults;

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="uppercase text-6xl text-center font-bold bg-gradient-to-br from-purple-500 to-sky-500 bg-clip-text text-transparent from-30%">
        Find cheapest BTC
      </h1>
      <div className="flex justify-center mt-6">
        <AmountInput
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div className="mt-6">
        {loading && <LoadingSkeleton />}
        {!loading &&
          rows.map((result) => (
            <ResultRow
              key={result.provider}
              providerNames={result.provider}
              btc={result.btc}
            />
          ))}
        {/* {!loading &&
          !showCache &&
          sortedResults.map((result) => (
            <ResultRow
              key={result.offerValue}
              providerNames={result.offerValue}
              btc={result.btc}
            />
          ))} */}
      </div>
    </main>
  );
}

export default App;
