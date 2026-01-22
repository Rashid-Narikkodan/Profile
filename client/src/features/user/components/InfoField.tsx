/* --------------------- Info Field --------------------- */
type InfoFieldProps = {
  label: string;
  value?: string;
  capitalize?: boolean;
  type?: "text" | "email" | "phone";
};

const InfoField = ({
  label,
  value = "—",
  capitalize = false,
}: InfoFieldProps) => (
  <div className="space-y-2">
    <dt className="text-sm tracking-wide text-indigo-200/80 font-medium">
      {label}
    </dt>
    <dd
      className={`text-lg font-medium text-gray-100 wrap-break-words ${
        capitalize ? "capitalize" : ""
      }`}
    >
      {value || "Not Available"}
    </dd>
  </div>
);
export default InfoField;
