import { Checkbox } from "antd";
import { BaseCellProps } from "../Table";

export const CheckboxCell = ({ value, rowData, onChange, disabled }: BaseCellProps<boolean>) => {
    return (
        <Checkbox
            checked={value}
            onChange={(e) => disabled && onChange?.(e.target.checked)}
            disabled={disabled}
        />
    )
};
