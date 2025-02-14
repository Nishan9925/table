const BASE_URL = "http://localhost:3000/contacts";

export type PositionType = "user" | "manager";

export interface IContact {
  id: string;
  primary: boolean;
  name: string;
  position: PositionType;
  email: string;
  phonenumber: string;
}

export const fetchPosts = async (): Promise<IContact[] | null> => {
  // await new Promise((resolve) => setTimeout(resolve, (Math.random() * 1.5 + 1.5) * 1000));
    try {
      const response = await fetch(`${BASE_URL}`);
      // console.log("Response Status:", response.status);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      // console.log("Fetched Data:", data);
      return data;
    } catch (error) {
      // console.error("Error fetching posts:", error);
      // console.log(error);
      return null;
    }
};

export const postPosts = async (data:IContact): Promise<any> => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const result = await response.json();
    console.log('Success:', result);
  } catch (error) {
    console.error('Error:', error);
  }
}

export const deletePost = async (id: string): Promise<any> => {
  try {
    const response = await fetch (`${BASE_URL}/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  }
  catch (error) {
    console.log("Error:", error);
  }
}
