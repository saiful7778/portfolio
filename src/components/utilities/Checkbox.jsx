import { useField } from "formik";

const Checkbox = ({ options, name, label }) => {
  const data = useField(name);
  return (
    <div>
      <span>{label}</span>
      {options.map((option) => (
        <CheckboxItem
          key={option.value}
          id={option.value}
          label={option.text}
          name={name}
          value={option.value}
        />
      ))}
      {data[1].error && data[1].touched ? (
        <p className="mt-1 text-xs text-red-500">{data[1].error}</p>
      ) : null}
    </div>
  );
};

const CheckboxItem = (props) => {
  const [field] = useField({ ...props, type: "checkbox" });
  return (
    <label
      className="mb-1 block cursor-pointer text-sm text-gray-400"
      htmlFor={props.id}
    >
      <input type="checkbox" id={props.id} {...field} />
      <span className="ml-1">{props.label}</span>
    </label>
  );
};

export default Checkbox;
