import styles from "@components/FormComponents/TextInput.module.scss";
import { ChangeEvent, useState } from "react";
type Props = {
  onChange: (value: string | number) => void;
  checkInput?: (input: string) => boolean;
};

enum State {
  Empty,
  Valid,
  Invalid,
}

export const TextInput = ({ onChange, checkInput }: Props) => {
  return (
    <input
      type="text"
      name=""
      id={styles.textInput}
      placeholder="Input..."
      onChange={(ev: ChangeEvent<HTMLInputElement>) => {
        onChange(ev.target.value);
      }}
    />
  );
};
