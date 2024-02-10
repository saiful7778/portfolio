import { ImSpinner9 } from "react-icons/im";

const Spinner = ({ size = "25" }) => {
  return (
    <span role="status">
      <ImSpinner9 className="animate-spinner" size={size} />
    </span>
  );
};

export default Spinner;
