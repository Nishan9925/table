import { useCallback, useEffect, useState } from "react";
import Table, { BaseCellProps, ColumnType } from "../components/Table";
import { createContact, deleteContact, fetchContacts, IContact, PositionType, updateContact } from "../service/api";
import { SelectCell } from "../components/TableCells/SelectCell";
import { CheckboxCell } from "../components/TableCells/CheckboxCell";
import { message } from "antd";



const columns: ColumnType<IContact>[] = [
    {
        title: "Primary",
        selector: "primary",
        CellComponent: CheckboxCell
    },
    { title: "Name", selector: "name" },
    {
        title: "Position", selector: "position", CellComponent: SelectCell<PositionType>, cellProps: {
            options: [
                { value: "user", label: "User" },
                {
                    value: "manager", label: "Manager", children: [
                        { value: "manager", label: "Manager" }
                    ]
                },
            ],
        }
    },
    { title: "Email", selector: "email" },
    { title: "Phone", selector: "phone" },
];

const identifierField = "id";

export const DefaultCell = ({ value }: BaseCellProps) => <span className="string-default">{value}</span>;

function TableComponent() {
    const [contacts, setContacts] = useState<IContact[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRowId, setEditingRowId] = useState<string | null>(null);
    const [updatedValues, setUpdatedValues] = useState<Record<string, any>>({});
    const [confirm, setConfirm] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    // const getContacts = async () => {
    //     await fetchContacts();
    //   }
    //   const data = getContacts();

    const handleSubmit = useCallback((async (data: any) => {
        // console.log("before try");
        try {
            const response = await createContact(data);
            setContacts((prevData) => [...prevData, response]);
            setIsModalOpen(isModalOpen);
            // console.log("in try");

            // form.resetFields();
        } catch (error) {
            console.error("Error in Submit:", error);
        }
        // console.log("after try");
    }), [contacts]);

    const handleEdit = (rowId: string) => {
        setEditingRowId(rowId);
        setUpdatedValues(contacts.find(row => row[identifierField] === rowId) || {});
    };

    const handleInputChange = (key: string, value: any) => {
        setUpdatedValues(prev => ({ ...prev, [key]: value }));
    };

    const handleSave = async (rowId: string, row: IContact) => {
        console.log(rowId);
        const theStore = {};
        try {
            const response = await updateContact(rowId, updatedValues);
            setContacts(prevData =>
                prevData.map(row =>
                    row[identifierField] === rowId ? { ...row, ...response } : row
                )
            );
            console.log("updatedValues:", updatedValues);
            setEditingRowId(null);
            // if (!theStore[rowId]) {
            //     theStore[rowId] = updatedValues;
            // };
            // if (theStore[rowId] = theStore.rowId) {
                
            // };
            messageApi.open({
                type: "success",
                content: `The contact of ${row.name} has been changed `,
            })
            console.log("theStore: ", theStore);
        } catch (error) {
            console.error("Failed to update data:", error);
        }
    };

    const handleCancelEdit = () => {
        setEditingRowId(null);
        setUpdatedValues({});
    };

    const handleDelete = useCallback((async (row: IContact) => {
        const rowId = row.id;
        console.log("Data1", contacts);

        if (!rowId) return;

        try {
            await deleteContact(rowId);
            const updatedContacts = await fetchContacts();
            setContacts(updatedContacts);
            messageApi.open({
                type: "success",
                content: `The contact of ${row.name} has been deleted `,
            })
            console.log("Data2", contacts);
        } catch (error) {
            console.error("Error deleting contact:", error);
        }
        console.log("Data3", contacts);
    }), [contacts]);

    useEffect(() => {
        async function getContacts() {
            // await sleep;
            setIsLoading(true);
            const data = await fetchContacts();
            if (data) {
                setContacts(data);
                // console.log("isArray", Array.isArray(data));
            }
            setIsLoading(false);
        }
        getContacts();
    }, []);

    return (
        <Table
            columns={columns}
            data={contacts}
            identifierField="id"
            editable={true}
            editingRowId={editingRowId}
            updatedValues={updatedValues}
            rowDelete={handleDelete}
            rowSubmit={handleSubmit}
            handleCancelEdit={handleCancelEdit}
            rowEdit={handleEdit}
            handleInputChange={handleInputChange}
            handleSave={handleSave}
            contextHolder={contextHolder}
        />
    )
}

export default TableComponent;
