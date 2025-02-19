import { Button, Form, Input, Modal, Tooltip } from "antd";
import { useEffect, useState } from "react";
import FormComponent from "./FormComponent";
import { deleteContact, createContact } from "../service/api";
import { DeleteOutlined, EditOutlined, StopOutlined } from "@ant-design/icons";
import TableHeader from "./TableHeader";
import SearchTab from "./SearchTab";

const { Search } = Input;

export interface OptionType<T> {
    value: T;
    label: string;
};

export interface BaseCellProps<ValueT = any, RowDataT = {}> {
    value: ValueT;
    rowData?: RowDataT;
    disabled?: boolean;
    onChange?: (value: ValueT) => void;
}

// export interface ColumnType<PropsT = {}, RowDataT extends {} = {email: string, prim: boolean}> {
//     title: string;
//     selector: keyof RowDataT;
//     CellComponent?: React.ComponentType<PropsT & BaseCellProps<RowDataT[ColumnType<PropsT, RowDataT>['selector']], RowDataT>>;
//     cellProps?: PropsT;
// }

type ColumnIntermiediateType<DataT extends {}, PropsT extends {}> = {
    [K in keyof DataT]: {
        selector: K,
        title: string;
        CellComponent?: React.ComponentType<PropsT & BaseCellProps<DataT[K], DataT>>;
        cellProps?: PropsT;
    }
}

export type ColumnType<DataT extends {}, PropsT extends {} = {}> = ColumnIntermiediateType<DataT, PropsT>[keyof DataT];

export interface TableProps<DataT extends {}> {
    data: DataT[];
    columns: ColumnType<DataT, {}>[];
    identifierField: keyof DataT;
    IS_ACTIONS_AVAILABLE: boolean;
}



// const col: ColumnType<{}, string, { email: string, phone: string, }> = {
//     selector: 'primary',
// }



// const obj = {
//     name: "Name",
//     age: 122,
// }

// // type T = typeof obj;

// type keyTypes = {
//     type: keyof typeof obj
// }

function Table<T extends {}>({ data, columns, identifierField, IS_ACTIONS_AVAILABLE }: TableProps<T>) {
    const [isDisabled] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tableData, setTableData] = useState(data);
    const [isEditActive, setIsEditActive] = useState(false);
    // console.log("tabledata",tableData);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleDelete = async (row: any) => {
        const rowId = row[identifierField];
        console.log("Row", row);
        console.log("RowId inside HD", rowId);
        console.log("Data Inside HD:", data);
        if (!rowId) {
            console.error("No identifier found for this row.");
            return;
        }
        try {
            await deleteContact(rowId);
            setTableData((prevData) => prevData.filter((item) => item[identifierField] !== rowId))
        } catch (error) {
            console.error("Error deleting contact:", error);
        }
    };

    const handleSubmit = async (data: any) => {
        // console.log(values);
        try {
            const response = await createContact(data);
            setTableData((prevData) => [...prevData, response]);
            setIsModalOpen(false);
            // form.resetFields();
            console.log("Data successfully posted:", response);
        } catch (error) {
            console.error("Failed to post data:", error);
        }
    };

    const handleUpdate = async (data: any) => {
        const rowId = editingRow[identifierField];
        try {
            const response = await updateContact(rowId, values);
            setTableData((prevData) =>
                prevData.map((item) => (item[identifierField] === rowId ? { ...item, ...response } : item))
            );
            setIsModalOpen(false);
            setEditingRow(null);
        } catch (error) {
            console.error("Failed to update data:", error);
        }
    };

    return (
        <section>
            <TableHeader
                showModal={showModal}
            />
            <SearchTab />
            <Modal title="Add Contact" open={isModalOpen} onCancel={handleCancel} footer={null}>
                <FormComponent
                    handleSubmit={handleSubmit}
                />
            </Modal>
            <table className="table">
                <tbody className="tbody">
                    <tr className="container thead">
                        {
                            columns.map((column, index) => (
                                <th className="th"
                                    key={index}>
                                    {column.title}
                                </th>
                            ))
                        }
                        {
                            IS_ACTIONS_AVAILABLE && <th>Actions</th>
                        }
                    </tr>
                    {
                        tableData?.map((row, rowIndex) => (
                            <tr
                                key={rowIndex}>
                                {
                                    columns.map(({ CellComponent, selector, cellProps }, colIndex) => (
                                        <td className="row-td"
                                            key={colIndex}>
                                            {CellComponent
                                                ?
                                                <CellComponent
                                                    value={row[selector]}
                                                    {...(cellProps) || {}}
                                                    disabled={isDisabled}
                                                />
                                                :
                                                row[selector] as string
                                            }
                                        </td>
                                    ))
                                }
                                {
                                    IS_ACTIONS_AVAILABLE &&
                                    <td className="container actions">
                                        <Button onClick={() => handleDelete(row)}>
                                            {
                                                isEditActive ?
                                                    <span>
                                                        <Tooltip title="Edit" color="yellow"><span className="icon-wrapper"><StopOutlined /></span></Tooltip>
                                                    </span>
                                                    :
                                                    <Tooltip title="Delete" color="red"><span className="icon-wrapper"><DeleteOutlined /></span></Tooltip>
                                            }
                                        </Button>
                                        <Button onClick={() => { setIsEditActive(!isEditActive); console.log(isEditActive) }}>
                                            <span className="icon-wrapper"><EditOutlined /></span>
                                        </Button>
                                    </td>
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </section>
    );
};

export default Table;
