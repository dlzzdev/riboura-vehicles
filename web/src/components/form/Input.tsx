export const Input = ({
  type,
  name,
  placeholder,
  handleOnChange,
  value,
  pattern,
  multiple,
}: any) => {
  return (
    <div className="relative z-0 w-full mb-8">
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={handleOnChange}
        value={value}
        {...(pattern ? { pattern: pattern } : "")}
        {...(multiple ? { multiple } : "")}
        className={
          "pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-white border-neutral-600 text-neutral-200" +
          (type === "file" &&
            " text-sm text-neutral-100 cursor-pointer file:px-6 file:py-2 file:rounded file:border-0")
        }
      />
      <label
        htmlFor={name}
        className="absolute duration-300 top-3 -z-1 origin-0 text-neutral-200"
      >
        {placeholder}
      </label>
    </div>
  );
};
