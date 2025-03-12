import { Checkbox, CheckboxChangeEvent } from "antd";
import { BaseCellProps } from "../Table";
import { useCallback, useEffect, useState } from "react";

export const CheckboxCell = ({ value, rowData, onChange, disabled }: BaseCellProps<boolean>) => {
    const [checked, setChecked] = useState(value);
    const handleChange = useCallback((e: CheckboxChangeEvent) => {
        if (!disabled) {
            const newChecked = e.target.checked;
            setChecked(newChecked);
            onChange?.(newChecked);
        }
    }, [disabled, onChange]);

    useEffect(() => {
        setChecked(value);
    }, [value]);

    // console.log(value);
    return (
        <Checkbox
            checked={checked}
            onChange={handleChange}
            disabled={disabled}
        />
    )
};
