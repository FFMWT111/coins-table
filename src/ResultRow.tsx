import paybisLogo from "../src/assets/paybis.png";

type ResultRowProps = {
  loading?: boolean;
  providerNames?: string;
  btc?: string;
};

const ResultRow = (props: ResultRowProps) => {
  return (
    <a
      href={`http://${props.providerNames}.com`}
      target="_blank"
      className="relative block border min-h-[64px] border-white/10 rounded-lg bg-gradient-to-r from-purple-500/10 to-sky-500/10 p-4 my-2 overflow-hidden"
    >
      <div className="flex items-center gap-4">
        {props.providerNames && (
          <div>
            <img src={paybisLogo} alt="paybisLogo" className="h-6 invert" />
          </div>
        )}
        <div className="grow">{props.providerNames || ""}</div>
        {props.btc && (
          <div className="flex gap-2">
            <span className="text-xl text-purple-200/80">
              {new Intl.NumberFormat("sv-SE", {
                minimumFractionDigits: 8,
              }).format(parseFloat(props.btc))}
            </span>
            <span className="text-xl text-purple-300/50">BTC</span>
          </div>
        )}
      </div>
      {props.loading && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-800/50 to-transparent skeleton-animation border-t border-white/25" />
      )}
    </a>
  );
};

export default ResultRow;
