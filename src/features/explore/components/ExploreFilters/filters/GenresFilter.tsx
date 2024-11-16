import { Tag } from "lucide-react";
import { Genre } from "@/core/store/api/gamesApi/types/enums";
import Dropdown from "@/core/components/Dropdown/Dropdown";
import { Control, Controller } from "react-hook-form";
import { enumToDropdownOptions } from "@/core/utils";
import { FiltersFormData } from "../../../types";
import styles from "./filters.module.scss";

const genresOptions = enumToDropdownOptions(Genre);

export default function GenresFilter({ control }: { control: Control<FiltersFormData, unknown> }) {
  return (
    <Controller
      control={control}
      name="genres"
      render={({ field }) => {
        return (
          <div className={styles["filter"]}>
            <div className={styles["filter__label"]}>
              <Tag size={20} />
              <span>Genres</span>
            </div>
            <Dropdown
              options={genresOptions}
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
