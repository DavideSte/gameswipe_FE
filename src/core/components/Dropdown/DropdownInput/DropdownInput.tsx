import { X } from "lucide-react";
import { useRef } from "react";
import { Option } from "../types";
import styles from "./DropdownInput.module.scss";
import SelectedLabel from "./SelectedLabel";

interface DropdownInputProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  selectedOptions: Option[];
  setSelectedOptions: (selectedOptions: Option["value"][]) => void;
  setDropdown: (isOpen: boolean) => void;
  isOpen: boolean;
  toggleOption: (optionValue: Option["value"]) => void;
}

const DropdownInput = ({
  selectedOptions,
  setSelectedOptions,
  search,
  setSearch,
  setDropdown,
  isOpen,
  toggleOption,
}: DropdownInputProps) => {
  const divInputContainer = useRef<HTMLDivElement>(null);
  const atLeastOneOptionSelected = selectedOptions.length > 0;

  const refDiv = useRef<HTMLDivElement>(null);

  const reset = () => setSelectedOptions([]);

  const toggleDropdown = () => {
    setDropdown(!isOpen);
    if (refDiv.current) {
      refDiv.current.querySelector(`input`)?.scrollIntoView({
        behavior: "smooth",
      });
      refDiv.current.querySelector(`input`)?.focus();
    }
  };

  const openDropdown = () => {
    setDropdown(true);
  };

  const closeDropdown = () => {
    setDropdown(false);
  };

  return (
    <div onClick={toggleDropdown} className={styles["input-area"]} ref={refDiv}>
      {/* show selected options and input to search */}
      <div
        ref={divInputContainer}
        className={styles["input-area__selected"]}
        onClick={toggleDropdown}
      >
        {selectedOptions.map((selectedOption) => (
          <SelectedLabel
            key={selectedOption.value}
            onClick={() => toggleOption(selectedOption.value)}
            label={selectedOption.label}
          />
        ))}
        <div className={styles["input-area__search"]}>
          <input
            onChange={(event) => setSearch(event.target.value)}
            onKeyDown={openDropdown}
            type="text"
            placeholder={atLeastOneOptionSelected ? "" : "Select a value..."}
            value={search}
          />
        </div>
      </div>

      {/* button to reset selected options */}
      <div
        className={styles["input-area__reset"]}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          reset();
          closeDropdown();
        }}
      >
        <X size={20} strokeWidth={2.6} />
      </div>
    </div>
  );
};

export default DropdownInput;
