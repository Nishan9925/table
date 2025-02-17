import { useEffect, useState } from "react";
import Table, { ColumnType } from "./components/Table";
import { fetchContacts, IContact, PositionType } from "./service/api";
import { DefaultCell, CheckboxCell, SelectCell } from "./components/TableCells";
import { Spin } from "antd";

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
        { value: "manager", label: "Manager" },
      ]
    }
  },
  { title: "Email", selector: "email" },
  { title: "Phone", selector: "phonenumber" },
];

function App() {
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getContacts() {
      setIsLoading(false);
      const data = await fetchContacts();
      if (data) {
        setContacts(data);
      }
      setIsLoading(true);
    }
    getContacts();
  }, []);

  // useEffect(() => {
  //   const loading = setTimeout(() => {
  //     setIsLoading(true);
  //   }, ((Math.random() * 1) + 1) * 1000)
  //   return () => clearTimeout(loading);
  // }, []);

  return (
    <div className="wrapper">
      {
        isLoading ?
          <Table
            columns={columns}
            data={contacts}
            identifierField="id"
          />
          : <Spin />
      }
    </div>
  );
};

export default App;
