import { createTsForm, useTsController } from "@ts-react/form";
import { z } from "zod";

interface TextFieldProps {
  label: string;
  placeholder?: string;
}

const TextField = ({ label, placeholder }: TextFieldProps) => {
  const { field, error } = useTsController<string>();
  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        value={field.value ? field.value : ""} // conditional to prevent "uncontrolled to controlled" react warning
        onChange={(e) => {
          field.onChange(e.target.value);
        }}
        type="text"
        placeholder={placeholder ?? label}
        className="input-bordered input w-full"
      />
      {error?.errorMessage && (
        <label className="label">
          <span className="label-text-alt text-warning">
            {error.errorMessage}
          </span>
        </label>
      )}
    </div>
  );
};

const mapping = [
  [z.string(), TextField],
  [
    z
      .string()
      .url()
      .transform((u) => u),
    TextField,
  ],
] as const;

const Form = createTsForm(mapping);

export default Form;
