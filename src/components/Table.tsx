import { Button, Form, Input, Modal, Tooltip } from "antd";
import { useEffect, useState } from "react";
import FormComponent from "./FormComponent";
import { deleteContact, createContact, updateContact, fetchContacts, IContact } from "../service/api";
import { DeleteOutlined, EditOutlined, SaveOutlined, StopOutlined } from "@ant-design/icons";
import TableHeader from "./TableHeader";
import SearchTab from "./SearchTab";

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
    editable: boolean;
    rowDelete?: (row: IContact) => void | Promise<void>;
    rowSubmit?: (data: IContact) => Promise<void>;
    rowEdit?: (row: IContact) => Promise<void>;
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

// const [form] = Form.useForm();


function Table<T extends {}>({ data, columns, identifierField, editable, editingRowId, updatedValues, rowDelete, rowSubmit, rowEdit, handleInputChange, handleSave, handleCancelEdit }: TableProps<T>) {
    const [isDisabled] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const [tableData, setTableData] = useState(data);
    // const [isEditActive, setIsEditActive] = useState(false);
    // const [editingRowId, setEditingRowId] = useState<string | null>(null);
    // const [updatedValues, setUpdatedValues] = useState<Record<string, any>>({});
    // console.log("tabledata",tableData);

    console.log("Data passed", data);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // const handleDelete = async (row: any) => {
    //     const rowId = row[identifierField];
    //     console.log("Data1", data);

    //     if (!rowId) return;

    //     try {
    //         await deleteContact(rowId);
    //         await fetchContacts();
    //         console.log("Data2", data);
    //         // forceRender({});
    //     } catch (error) {
    //         console.error("Error deleting contact:", error);
    //     }
    //     console.log("Data3", data);
    // };


    // const handleDelete = async (row: any) => {
    //     const rowId = row[identifierField];
    //     console.log("Row", row);
    //     console.log("RowId inside HD", rowId);
    //     console.log("Data Inside HD:", data);
    //     if (!rowId) {
    //         console.error("No identifier found for this row.");
    //         return;
    //     }
    //     try {
    //         await deleteContact(rowId);
    //         // setTableData((prevData) => prevData.filter((item) => item[identifierField] !== rowId))
    //         data.filter((item) => item[identifierField] !== rowId);
    //     } catch (error) {
    //         console.error("Error deleting contact:", error);
    //     }
    //     console.log("Second data",data);
    // };



    // const handleEdit = (rowId: string) => {
    //     setEditingRowId(rowId);
    //     setUpdatedValues(tableData.find(row => row[identifierField] === rowId) || {});
    // };

    // const handleInputChange = (key: string, value: any) => {
    //     setUpdatedValues(prev => ({ ...prev, [key]: value }));
    // };

    // const handleSave = async (rowId: string) => {
    //     try {
    //         const response = await updateContact(rowId, updatedValues);
    //         setTableData(prevData =>
    //             prevData.map(row =>
    //                 row[identifierField] === rowId ? { ...row, ...response } : row
    //             )
    //         );
    //         setEditingRowId(null);
    //     } catch (error) {
    //         console.error("Failed to update data:", error);
    //     }
    // };

    // const handleCancelEdit = () => {
    //     setEditingRowId(null);
    //     setUpdatedValues({});
    // };

    return (
        <section className="section-table">
            <TableHeader
                showModal={showModal}
            />
            <>
                <SearchTab />
            </>
            <Modal title="Add Contact" open={isModalOpen} onCancel={handleCancel} footer={null}>
                <FormComponent
                    handleSubmit={rowSubmit}
                />
            </Modal>
            <table className="table">
                <thead>
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index} className="th">
                                {column.title}
                            </th>
                        ))}
                        {editable && <th className="th">Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {data?.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map(({ CellComponent, cellProps, selector }, colIndex) => (
                                <td key={colIndex} className="td">
                                    {/* chnage this conditionals, try to change the way they check and have only one conditin to check */}
                                    {editingRowId === row[identifierField] ? (
                                        CellComponent ? (
                                            <CellComponent
                                                value={row[selector]}
                                                onChange={(value) => handleInputChange(selector, value)}
                                                {...(cellProps || {})}
                                            />
                                        ) : (
                                            <input
                                                value={updatedValues[selector]}
                                                onChange={(e) => handleInputChange(selector, e.target.value)}
                                                className="input-field"
                                            />
                                        )
                                    ) : (
                                        CellComponent ? (
                                            <CellComponent
                                                value={row[selector]}
                                                {...(cellProps || {})}
                                                disabled={true}
                                            />
                                        ) : (
                                            row[selector] as string
                                        )
                                    )}
                                </td>
                            ))}
                            {
                                editable && (
                                    <td className="actions">
                                        {editingRowId === row[identifierField] ? (
                                            <>
                                                <Tooltip title="Cancel" color="yellow">
                                                    <Button className="icon-wrapper" onClick={handleCancelEdit}><span ><StopOutlined /></span></Button>
                                                </Tooltip>
                                                <Tooltip title="Save" color="green">
                                                    <Button className="icon-wrapper" onClick={() => handleSave(row[identifierField] as string)}><span><SaveOutlined /></span></Button>
                                                </Tooltip>
                                            </>
                                        ) : (
                                            <>
                                                <Tooltip title="Delete" color="red">
                                                    <Button className="icon-wrapper" onClick={() => rowDelete(row)}>
                                                        <span ><DeleteOutlined /></span>
                                                    </Button>
                                                </Tooltip>
                                                <Tooltip title="Edit" color="blue">
                                                    <Button className="icon-wrapper" onClick={() => rowEdit(row[identifierField] as string)}>
                                                        <span ><EditOutlined /></span>
                                                    </Button>
                                                </Tooltip>
                                            </>
                                        )}
                                    </td>
                                )
                            }
                        </tr>
                    ))}
                </tbody>
            </table>

        </section>
    );
};

export default Table;
