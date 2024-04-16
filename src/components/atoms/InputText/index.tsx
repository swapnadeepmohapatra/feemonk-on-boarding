import React from "react";
import Styles from "./index.module.css";

interface InputTextProps {
  id?: string; // Make the id prop optional
  placeholder: string;
  style?: Object;
  type?: string;
  changeHandler?: (name?: any) => void;
  value?: string;
  autoComplete?: string;
  options?: {
    placeholder: string;
    value: string;
  }[];
  square?: boolean;
}

function InputText({
  id, // Accept the id prop
  placeholder,
  type,
  changeHandler,
  value,
  autoComplete,
  options,
  style,
  square,
  ...props
}: InputTextProps) {
  return (
    <div
      {...props}
      className={`${Styles.inputField} ${square && Styles.inputFieldSquare}`}
    >
      {type === "textarea" ? (
        <textarea
          id={id} // Pass the id to the textarea
          onChange={changeHandler}
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete}
        ></textarea>
      ) : type === "option" ? (
        <select
          id={id} // Pass the id to the select
          name={placeholder}
          onChange={changeHandler}
          value={value}
        >
          <option value="none" disabled hidden>
            {placeholder}
          </option>
          {options &&
            options.map((item, index) => (
              <option value={item.value} key={index} hidden={index === 0}>
                {item.placeholder}
              </option>
            ))}
        </select>
      ) : type === "toggleSwitch" ? (
        <div className={Styles.toggleSwitch}>
          <label className={Styles.switch}>
            <input
              type="checkbox"
              checked={!!value}
              className={Styles.switchInput}
              onChange={changeHandler}
            />
            <span className={`${Styles.slider} ${Styles.round}`}></span>
          </label>
        </div>
      ) : (
        <input
          id={id} // Pass the id to the input field
          style={style}
          onChange={changeHandler}
          type={type ? type : "text"}
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required
        />
      )}
    </div>
  );
}

export default InputText;
