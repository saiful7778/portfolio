import { ImSpinner9 } from "react-icons/im";

export default function Spinner({ size = 25 }: { size?: number }) {
  return (
    <span role="status">
      <ImSpinner9 className="animate-spinner" size={size} />
    </span>
  );
}
