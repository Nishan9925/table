import { Checkbox, Select } from "antd";
import { BaseCellProps, OptionType } from "./Table";
import { IContact, PositionType } from "../service/api";

export const DefaultCell = ({ value }: BaseCellProps) => <span>{String(value)}</span>;

export const CheckboxCell = ({ value, rowData, onChange, disabled }: BaseCellProps<boolean>) => {
    return (
        <Checkbox
            // checked={Boolean(value)}
            onChange={(e) => disabled && onChange?.(e.target.checked)}
            disabled={disabled}
        />
    )
};

export const SelectCell = ({ value, onChange, disabled, options }: BaseCellProps<PositionType, IContact>) => (
    <Select
        style={{width: "100%"}}
        defaultValue={value}
        onChange={(val) => !disabled && onChange?.(val)}
        options={options}
        disabled={disabled}
    />
);
