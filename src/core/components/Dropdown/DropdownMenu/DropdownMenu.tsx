import { useRef, useState } from "react";
import CheckboxItem from "../CheckboxItem/CheckboxItem";
import { Option } from "../types";
import styles from "./DropdownMenu.module.scss";

const MAX_RENDERED_OPTIONS = 20;
const STEP_RENDERED_OPTIONS = 20;

interface DropdownMenuProps {
  options: Option[];
  toggleOption: (optionValue: string) => void;
  search: string;
  selectedOptions: string[];
  handleAddOption: (() => void) | undefined;
  multiple: boolean;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const DropdownMenu = ({
  options,
  toggleOption,
  search,
  selectedOptions,
  handleAddOption,
  multiple,
  setSearch,
}: DropdownMenuProps) => {
  const filteredOptions = options.filter((option) => {
    return option.label.toLocaleLowerCase().includes(search.toLocaleLowerCase());
  });

  const refDiv = useRef<HTMLDivElement>(null);
  const optionNumber = filteredOptions.length;
  const [numberOfRenderedOptions, setNumberOfRenderedOptions] = useState(MAX_RENDERED_OPTIONS);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (optionNumber <= MAX_RENDERED_OPTIONS) return;
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 100;
    setNumberOfRenderedOptions((prev) => (isAtBottom ? prev + STEP_RENDERED_OPTIONS : prev));
  };

  return (
    <div ref={refDiv} onScroll={handleScroll} className={styles["options"]}>
      <div className={styles["options--active"]}>
        {[...filteredOptions.slice(0, numberOfRenderedOptions)].map((option) => (
          <CheckboxItem
            key={option.value}
            option={option}
            isSelected={selectedOptions.includes(option.value)}
            onClick={() => {
              toggleOption(option.value);
              setSearch("");
            }}
            multiple={multiple}
          />
        ))}
      </div>
      {filteredOptions.length === 0 && search.length > 0 && (
        <div className={styles["options__hints"]}>
          <p className={styles["options__noresults"]}>No options.</p>
          {handleAddOption && (
            <>
              <hr />
              <p onClick={() => handleAddOption()} className={styles["options__extra"]}>
                + add "<b>{search}</b>".
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
