import { FC } from "react";
import { ImSpinner9 } from "react-icons/im";

interface SpinnerProps {
  size?: number;
}

const Spinner: FC<SpinnerProps> = ({ size = 25 }) => {
  return (
    <span role="status">
      <ImSpinner9 className="animate-spinner" size={size} />
    </span>
  );
};

export default Spinner;
