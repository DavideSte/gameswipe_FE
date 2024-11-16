import { useCallback, useState } from "react";
import useOutsideClick from "../../hooks/use-outside-click";
import styles from "./Dropdown.module.scss";
import { Option } from "./types";
import DropdownMenu from "./DropdownMenu/DropdownMenu";
import DropdownInput from "./DropdownInput/DropdownInput";

interface DropdownProps {
  options: Option[];
  selectedOptions: Option["value"][];
  setSelectedOptions: (selectedOptions: Option["value"][]) => void;
  addOption?: (option: Option) => void;
  multiple?: boolean;
}

export default function Dropdown({
  options,
  selectedOptions,
  setSelectedOptions,
  addOption,
  multiple = false,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
  }, []);
  const ref = useOutsideClick(closeDropdown);

  const toggleOption = (optionValue: string) => {
    if (multiple) {
      if (selectedOptions.includes(optionValue)) {
        setSelectedOptions(selectedOptions.filter((value) => value !== optionValue));
      } else {
        setSelectedOptions([...selectedOptions, optionValue]);
      }
    } else {
      if (selectedOptions.includes(optionValue)) {
        setSelectedOptions([]);
      } else {
        setSelectedOptions([optionValue]);
        setIsOpen(false);
      }
    }
  };

  const handleAddOption = addOption
    ? () => {
        if (!addOption) return;
        const trimmedSearch = search.trim();
        if (trimmedSearch === "") return;
        // maybe use some unique id here instead of value
        addOption({ value: trimmedSearch, label: trimmedSearch });
        toggleOption(trimmedSearch);
        setSearch("");
      }
    : undefined;

  const selectedOptionsObject = options.filter((option) => selectedOptions.includes(option.value));

  return (
    <div ref={ref} className={styles["dropdown"]}>
      <DropdownInput
        selectedOptions={selectedOptionsObject}
        setSelectedOptions={setSelectedOptions}
        toggleOption={toggleOption}
        search={search}
        setSearch={setSearch}
        setDropdown={setIsOpen}
        isOpen={isOpen}
      />
      {isOpen && (
        <DropdownMenu
          setSearch={setSearch}
          handleAddOption={handleAddOption}
          options={options}
          toggleOption={toggleOption}
          search={search}
          selectedOptions={selectedOptions}
          multiple={multiple}
        />
      )}
    </div>
  );
}
