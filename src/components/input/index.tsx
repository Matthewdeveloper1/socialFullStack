import type React from 'react';
import { useController, type Control } from 'react-hook-form';
import { FieldError } from 'react-hook-form';

type Props = {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  control: Control<any>;
  required?: string;
  endContent?: JSX.Element;
};

export const Input: React.FC<Props> = ({
  name,
  label,
  placeholder,
  type = 'text',
  control,
  required = '',
  endContent,
}) => {
  const {
    field,
    fieldState: { invalid },
    formState: { errors },
  } = useController({
    name,
    control,
    rules: {
      required,
    },
  });

  const errorMessage = errors[name] ? (errors[name] as FieldError).message : '';

  return (
    <div className="flex flex-col mb-4">
      <label htmlFor={name} className="mb-1 text-left font-semibold">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        value={field.value}
        name={field.name}
        onChange={field.onChange}
        onBlur={field.onBlur}
        className={`border ${invalid ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 w-full`}
      />
      {invalid && (
        <span className="text-red-500 text-sm mt-1">{errorMessage}</span>
      )}
    </div>
  );
};