/* --------------------- Info Field --------------------- */
interface InputFieldProps {
  name: string;
  type: string;
  label: string;
  value: string | undefined;
  error: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({
  label,
  value,
  type,
  onChange,
  error,
  name,
}: InputFieldProps) => (
  <div className="space-y-2">
    <label className="text-sm tracking-wide text-indigo-200/80 font-medium">
      {label}
    </label>
    <input
      name={name}
      onChange={onChange}
      type={`${type ? type : "text"}`}
      value={value}
      className={`text-lg font-medium border-b border-purple-300 focus:border-b-3 rounded outline-none ${error ? "focus:border-red-500" : "focus:border-purple-500"} p-2 text-gray-100 wrap-break-words`}
    />
    {error && <div className="text-sm text-red-500">{error}</div>}
  </div>
);
export default InputField;
