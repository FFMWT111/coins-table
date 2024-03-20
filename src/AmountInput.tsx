import Input, { InputProps } from "./Input";

const AmountInput = (props: InputProps) => {
  return (
    <div className="flex items-center bg-blue-950 border border-white/10 rounded-lg">
      <Input
        value={props.value}
        onChange={props.onChange}
        placeholder="Amount"
        className="border-0 w-24 pl-4 text-2xl bg-transparent"
      />
      <span className="text-white/50 px-4">USD</span>
    </div>
  );
};

export default AmountInput;
