import React from "react";
import Styles from "./index.module.css";

interface InputTextProps {
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
          onChange={changeHandler}
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete}
        ></textarea>
      ) : type === "option" ? (
        <select
          name={placeholder}
          id={placeholder}
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
