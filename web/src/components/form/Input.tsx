import styles from "./Input.module.css";

export const Input = ({
  type,
  text,
  name,
  placeholder,
  handleOnChange,
  value,
  multiple,
}: any) => {
  return (
    <div className={styles.form_control}>
      <label>
        {text}:
        <input
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          onChange={handleOnChange}
          value={value}
          {...(multiple ? { multiple } : "")}
        />
      </label>
    </div>
  );
};
