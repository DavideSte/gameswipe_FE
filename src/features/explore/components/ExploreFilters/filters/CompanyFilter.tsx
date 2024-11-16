import { Building2 } from "lucide-react";
import { Company } from "@/core/store/api/gamesApi/types/enums";
import Dropdown from "@/core/components/Dropdown/Dropdown";
import { Control, Controller } from "react-hook-form";
import { enumToDropdownOptions } from "@/core/utils";
import { FiltersFormData } from "../../../types";
import styles from "./filters.module.scss";

const companyOptions = enumToDropdownOptions(Company);

export default function CompanyFilter({ control }: { control: Control<FiltersFormData, unknown> }) {
  return (
    <Controller
      control={control}
      name="company"
      render={({ field }) => {
        return (
          <div className={styles["filter"]}>
            <div className={styles["filter__label"]}>
              <Building2 size={20} />
              <span>Companies</span>
            </div>
            <Dropdown
              options={companyOptions}
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
