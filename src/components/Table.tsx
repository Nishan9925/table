import { Button, Modal } from "antd";
import { useState } from "react";
import FormComponent from "./FormComponent";
import { deleteContact, createContact } from "../service/api";

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

type ColumnIntermiediateType<DataT extends {}, PropsT> = {
    [K in keyof DataT]: {
        selector: K,
        title: string;
        CellComponent?: React.ComponentType<PropsT & BaseCellProps<DataT[K], DataT>>;
        cellProps?: PropsT;
    }
}

export type ColumnType<DataT extends {}, PropsT = {}> = ColumnIntermiediateType<DataT, PropsT>[keyof DataT];

export interface TableProps<DataT extends {}> {
    data: DataT[];
    columns: ColumnType<DataT, {}>[]
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

function Table<T extends {}>({ data, columns, identifierField }: TableProps<T>) {
    const [isDisabled] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const handleLoading = () => {
        if (isLoading) return 
    }



    console.log(((Math.random() * 0.5) + 0.5) * 1000);

    const showModal = () => {
        setIsModalOpen(true);
    };

    // const handleDelete = async (id: string) => {
    //     try {
    //         await deletePost(id);
    //         // setData((prevData) => prevData.filter((item) => item.id !== id)); 
    //         console.log("Deleted item:", id);
    //     } catch (error) {
    //         console.error("Error deleting:", error);
    //     }
    // };

    const handleDelete = async (row: []) => {
        const rowId = row[identifierField];
        console.log("Row", row);
        console.log("RowID", row[identifierField]);
        if (!rowId) {
            console.error("No identifier found for this row.");
            return;
        }

        await deleteContact(rowId);
    };

    const handleSubmit = async (values: any) => {
        try {
            const response = await createContact(values);
            setIsModalOpen(false);
            console.log("Data successfully posted:", response);
        } catch (error) {
            console.error("Failed to post data:", error);
        }
    };

    return (
        <>
            {/* {contacts?.map((contact) => ( */}
            <Button
                onClick={showModal}
            >
                Add
            </Button>
            <Modal title="Add Contact" open={isModalOpen} footer={null}>
                <FormComponent
                    handleSubmit={handleSubmit}
                />
            </Modal>
            <table>
                {/* <th> */}
                {/* <input
                                type="checkbox"
                                onClick={() => handleTableDisable()}
                            /> */}
                {/* </th> */}
                <thead>
                    <tr>
                        {
                            columns.map((column, index) => (
                                <th key={index}>
                                    {column.title}
                                </th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {
                                    columns.map(({ CellComponent, selector, cellProps }, colIndex) => (
                                        <td key={colIndex}>
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
                                <td>
                                    <Button onClick={() => handleDelete(row)}>Delete</Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {/* ))} */}
        </>
    );
};

export default Table;
