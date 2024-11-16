import { CalendarRange } from "lucide-react";
import MultiRangeSlider from "@/core/components/MultiRangeSlider/MultiRangeSlider";
import { Control, Controller } from "react-hook-form";
import { FiltersFormData } from "../../../types";
import styles from "./filters.module.scss";

const MIN_YEAR = 1980;
const MAX_YEAR = new Date().getFullYear();

export default function YearsFilter({ control }: { control: Control<FiltersFormData, unknown> }) {
  return (
    <Controller
      control={control}
      name="years"
      render={({ field }) => {
        return (
          <div className={styles["filter"]}>
            <div className={styles["filter__label"]}>
              <CalendarRange size={20} />
              <span>Years</span>
            </div>
            <div style={{ padding: "1rem 0px" }}>
              <MultiRangeSlider
                min={MIN_YEAR}
                max={MAX_YEAR}
                startingMax={field.value[1] || MAX_YEAR}
                startingMin={field.value[0] || MIN_YEAR}
                onChange={(min, max) => {
                  field.onChange([min, max]);
                }}
              />
            </div>
          </div>
        );
      }}
    ></Controller>
  );
}
