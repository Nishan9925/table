import { useEffect, useState } from "react";
import Table, { ColumnType } from "./components/Table";
import { fetchPosts, IContact, PositionType } from "./service/api";
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
    title: "Position", selector: "position", CellComponent: SelectCell, cellProps: {
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
      const data = await fetchPosts();
      if (data) {
        setContacts(data);
      }
    }
    getContacts();
  }, []);

  useEffect(() => {
    const loading = setTimeout(() => {
      setIsLoading(true);
    }, ((Math.random() * 0.5) + 0.5) * 1000)
    return () => clearTimeout(loading);
  }, []);

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
