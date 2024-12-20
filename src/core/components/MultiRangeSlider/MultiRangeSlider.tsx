import { ChangeEvent, useCallback, useEffect, useState, useRef } from "react";
import styles from "./MultiRangeSlider.module.scss";

interface MultiRangeSliderProps {
  min: number;
  max: number;
  startingMin?: number;
  startingMax?: number;
  onChange: (min: number, max: number) => void;
}

export default function MultiRangeSlider({
  min,
  max,
  onChange,
  startingMin,
  startingMax,
}: MultiRangeSliderProps) {
  const [minVal, setMinVal] = useState(startingMin || min);
  const [maxVal, setMaxVal] = useState(startingMax || max);
  const range = useRef<HTMLDivElement>(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // reverse getPercent
  const getValue = useCallback(
    (percent: number) => {
      return Math.round((percent / 100) * (max - min) + min);
    },
    [min, max]
  );

  useEffect(() => {
    if (range.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(maxVal);
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, maxVal, getPercent]);

  const handleMinChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(+event.target.value, maxVal - 1);
    setMinVal(value);
    onChange(value, maxVal);
  };

  const handleMaxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(+event.target.value, minVal + 1);
    setMaxVal(value);
    onChange(minVal, value);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // get the click position % relative to the slider
    const clickX = e.clientX - e.currentTarget.getBoundingClientRect().left;
    const percent = (clickX / e.currentTarget.offsetWidth) * 100;
    const value = getValue(percent);
    if (Math.abs(value - minVal) < Math.abs(value - maxVal)) {
      setMinVal(value);
      onChange(value, maxVal);
    } else {
      setMaxVal(value);
      onChange(minVal, value);
    }
  };

  return (
    <div className={styles["range-slider"]}>
      <div onClick={handleClick} className={styles["range-slider__click"]} />
      <div className={styles["range-slider__range"]} ref={range} />
      <div className={styles["range-slider__minmax"]}>
        <span>{minVal}</span>
        <span>{maxVal}</span>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        onChange={handleMinChange}
        className={`${styles["slider"]} ${styles["slider__left"]} ${
          minVal > max - 100 ? "slider__left--active" : ""
        }`}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        onChange={handleMaxChange}
        className={`${styles["slider"]} ${styles["slider__right"]}`}
      />
    </div>
  );
}
