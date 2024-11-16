import { Button } from "@/core/components/Button/Button";
import CompanyFilter from "./filters/CompanyFilter";
import ConsoleFilter from "./filters/ConsoleFilter";
import GenresFilter from "./filters/GenresFilter";
import YearsFilter from "./filters/YearsFilter";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { FiltersFormData } from "../../types";
import styles from "./ExploreFilters.module.scss";

interface ExploreFiltersProps {
  onClose: () => void;
  onChange: (filters: FiltersFormData) => void;
  defaultValues: FiltersFormData;
}

export default function ExploreFilters({ onChange, defaultValues, onClose }: ExploreFiltersProps) {
  const { control, handleSubmit } = useForm<FiltersFormData>({ defaultValues });

  const onSubmit = handleSubmit((data) => {
    onChange(data);
  });

  return (
    <form onSubmit={onSubmit} className={styles["filters"]}>
      <div className={styles["filters__modal-header"]}>
        <X size={30} strokeWidth={3} color="black" onClick={onClose} />
      </div>
      <div className={styles["filters__container"]}>
        <ConsoleFilter control={control} />
        <CompanyFilter control={control} />
        <GenresFilter control={control} />
        <YearsFilter control={control} />
      </div>
      <div className={styles["filters__submit"]}>
        <Button type="submit" onClick={onClose}>
          Apply
        </Button>
      </div>
    </form>
  );
}
