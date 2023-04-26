import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import React from "react";
import { useFormContext } from "react-hook-form";

type FormInputProps = {
  name: string;
  placeholder?: string;
  ref?: React.ForwardedRef<HTMLInputElement>;
  keyDown?: boolean;
  value?: string;
};

const FormNumberInput: React.FC<FormInputProps> = React.forwardRef(function FormNumberInput(
  { name, value, placeholder, keyDown },
  ref,
) {
  const { register } = useFormContext();
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " ") {
      e.preventDefault();
    }
  };
  return (
    <NumberInput defaultValue={0} min={0} variant="filled">
      <NumberInputField
        _focus={{ borderColor: "green.500" }}
        bg="gray.50"
        rounded="none"
        onKeyDown={keyDown ? handleKeyDown : undefined}
        {...register(name)}
        ref={ref}
        name={name}
        placeholder={placeholder}
        type="number"
        value={value}
      />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
});

export default FormNumberInput;
