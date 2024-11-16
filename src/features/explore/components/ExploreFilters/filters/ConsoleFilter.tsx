import Dropdown from "@/core/components/Dropdown/Dropdown";
import { Joystick } from "lucide-react";
import { Control, Controller } from "react-hook-form";
import { Console } from "@/core/store/api/gamesApi/types/enums";
import { enumToDropdownOptions } from "@/core/utils";
import { FiltersFormData } from "../../../types";
import styles from "./filters.module.scss";

const consoleOptions = enumToDropdownOptions(Console);

export default function ConsoleFilter({ control }: { control: Control<FiltersFormData, unknown> }) {
  return (
    <Controller
      control={control}
      name="console"
      render={({ field }) => {
        return (
          <div className={styles["filter"]}>
            <div className={styles["filter__label"]}>
              <Joystick size={20} />
              <span>Console</span>
            </div>
            <Dropdown
              options={consoleOptions}
              multiple={true}
              selectedOptions={field.value}
              setSelectedOptions={field.onChange}
            />
          </div>
        );
      }}
    ></Controller>
  );
}
