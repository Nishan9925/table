import { Checkbox, Select } from "antd";
import { BaseCellProps, OptionType } from "./Table";

interface SelectCellProps<T> extends BaseCellProps<T> {
    options: OptionType<T>[];
}

export const DefaultCell = ({ value }: BaseCellProps) => <span>{String(value)}</span>;

export const CheckboxCell = ({ value, rowData, onChange, disabled }: BaseCellProps<boolean>) => {
    return (
        <Checkbox
            checked={value}
            onChange={(e) => disabled && onChange?.(e.target.checked)}
            disabled={disabled}
        />
    )
};

export const SelectCell = <ValueType extends string,> ({ value, onChange, disabled, options }: SelectCellProps<ValueType>) => (
    <Select
        style={{width: "100%"}}
        defaultValue={value}
        onChange={(val) => !disabled && onChange?.(val)}
        options={options}
        disabled={disabled}
    />
);
