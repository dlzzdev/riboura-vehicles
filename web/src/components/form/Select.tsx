export const Select = ({ text, name, options, handleOnChange, value }: any) => {
  return (
    <div className="relative z-0 w-full mb-8">
      <label htmlFor={name} className="duration-300 text-neutral-200">
        {text}
      </label>
      <select
        name={name}
        id={name}
        onChange={handleOnChange}
        value={value || ""}
        className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-white border-neutral-600 text-neutral-200"
      >
        <option className="text-black">Selecione...</option>
        {options.map((option: any) => (
          <option value={option} key={option} className="text-black">
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
