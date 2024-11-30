import { HTMLInputTypeAttribute } from "react";

const Input = ({
  placeholder,
  type,
  reference,
  onKeyPress,
  className,
}: {
  placeholder: string;
  type: HTMLInputTypeAttribute;
  reference?: React.RefObject<HTMLInputElement>;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
}) => {
  return (
    <input
      ref={reference}
      type={type}
      placeholder={placeholder}
      onKeyUp={onKeyPress}
      className={`p-2 h-full bg-zinc-800 w-full outline-none rounded text-lg ${className}`}
    />
  );
};

export default Input;
