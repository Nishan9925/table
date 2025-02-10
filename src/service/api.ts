const BASE_URL = "http://localhost:3000/contacts";

export interface TableProps {
  id: string;
  checkbox: boolean;
  name: string;
  position: string;
  email: string;
  phonenumber: string;
}

export const fetchPosts = async (): Promise<TableProps[] | null>  => {
  try {
    const response = await fetch(`${BASE_URL}`);
    console.log("Response Status:", response.status);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Fetched Data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    console.log(error);
    return null;
  }
};
