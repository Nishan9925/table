import { useEffect, useState } from "react";
import { fetchPosts, TableProps } from "../service/api";

function Mycomp() {
  const [contacts, setContacts] = useState<TableProps[] | null>([]);
  const [newContact, setNewContact] = useState("");

  // const 

  useEffect(() => {
    async function getContacts() {
      const data = await fetchPosts();
      if (data) {
        setContacts(data);
      }
    }
    getContacts();
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      <form action="">
        <input />
        <input />
        <input />
      </form>
      {contacts === null ? (
        <p>Loading posts...</p>
      ) : (
        <ul>
          {contacts.map((contact) => (
            <li key={contact.id}>
              {contact.id} - {contact.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Mycomp;
