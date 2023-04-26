import { Input } from "@chakra-ui/react";
import React from "react";
import { useFormContext } from "react-hook-form";

type FormInputProps = {
  name: string;
  placeholder?: string;
  type?: string;
  ref?: React.ForwardedRef<HTMLInputElement>;
  keyDown?: boolean;
  value?: string;
};

const FormInput: React.FC<FormInputProps> = React.forwardRef(function FormInput(
  { name, type, value, placeholder, keyDown },
  ref,
) {
  const { register } = useFormContext();
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " ") {
      e.preventDefault();
    }
  };
  return (
    <Input
      {...register(name)}
      ref={ref}
      _placeholder={{
        color: "gray.400",
        fontSize: "sm",
      }}
      bg="gray.50"
      name={name}
      placeholder={placeholder}
      rounded="none"
      type={type}
      value={value}
      variant={"filled"}
      onKeyDown={keyDown ? handleKeyDown : undefined}
    />
  );
});

export default FormInput;
