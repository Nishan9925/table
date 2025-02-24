// import { useCallback, useEffect, useState } from "react";
// import Table, { ColumnType } from "./components/Table";
// import { deleteContact, fetchContacts, IContact, PositionType, sleep, updateContact } from "./service/api";
// import { DefaultCell, CheckboxCell, SelectCell } from "./components/TableCells";
// import { Spin } from "antd";

import TableComponent from "./layouts/TableComponent";

// const columns: ColumnType<IContact>[] = [
//   {
//     title: "Primary",
//     selector: "primary",
//     CellComponent: CheckboxCell
//   },
//   { title: "Name", selector: "name" },
//   {
//     title: "Position", selector: "position", CellComponent: SelectCell<PositionType>, cellProps: {
//       options: [
//         { value: "user", label: "User" },
//         { value: "manager", label: "Manager" },
//       ]
//     }
//   },
//   { title: "Email", selector: "email" },
//   { title: "Phone", selector: "phone" },
// ];

function App() {
  // const [contacts, setContacts] = useState<IContact[]>([]);
  // const [isLoading, setIsLoading] = useState(false);

// const getContacts = async () => {
//     await fetchContacts();
//   }
//   const data = getContacts();

  // const handleDelete = useCallback((async (row: IContact,) => {
  //   const rowId = row.id;
  //   console.log("Data1", contacts);

  //   if (!rowId) return;

  //   try {
  //     await deleteContact(rowId);
  //     const updatedContacts = await fetchContacts();
  //     setContacts(updatedContacts);
  //     console.log("Data2", contacts);
  //   } catch (error) {
  //     console.error("Error deleting contact:", error);
  //   }
  //   console.log("Data3", contacts);
  // }), []);

  // useEffect(() => {
  //   async function getContacts() {
  //     // await sleep;
  //     setIsLoading(true);
  //     const data = await fetchContacts();
  //     if (data) {
  //       setContacts(data);
  //       console.log("isArray",Array.isArray(data));
  //     }
  //     setIsLoading(false);
  //   }
  //   getContacts();
  // }, []);

  return (
    <div className="wrapper">
      {/* {
        isLoading ?
         <Spin
        size="large"
        />
        :
        <Table
          columns={columns}
          data={contacts}
          identifierField="id"
          editable={true}
          rowDelete={handleDelete}
        />
      } */}
      <TableComponent />
    </div>
  );
};

export default App;
