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

// export const fetchPosts = async (): Promise<IContact[] | null> => {
//   try {
//     const response = await fetch(`${BASE_URL}`);
//     // console.log("Response Status:", response.status);
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     await new Promise((resolve) => setTimeout(resolve, (Math.random() * 1.5 + 1.5) * 1000));
//     const data = await response.json();
//     // console.log("Fetched Data:", data);
//     return data;
//     } catch (error) {
//       // console.error("Error fetching posts:", error);
//       // console.log(error);
//       return null;
//     }
// };

// export const postPosts = async (data:IContact): Promise<any> => {
//   try {
//     const response = await fetch(BASE_URL, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     });

//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }

//     const result = await response.json();
//     console.log('Success:', result);
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }

// export const deletePost = async (id: string): Promise<any> => {
//   try {
//     const response = await fetch (`${BASE_URL}/${id}`, {
//       method: "DELETE",
//       headers: {
//         'Content-Type': 'application/json',
//       }
//     });
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//   }
//   catch (error) {
//     console.log("Error:", error);
//   }
// }

const fetchWrapper = async <T>(
  url: string,
  method: "GET" | "POST" | "DELETE" | "PUT" = "GET",
  body?: any
): Promise<T | null> => {
  try {
    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    if (method !== "DELETE") {
      return response.json();
    }

    return null;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
};

const sleep = await new Promise((resolve) => setTimeout(resolve, (Math.random() * 1.5 + 1.5) * 1000));

export const fetchContacts = async (): Promise<IContact[] | null> => {
  await sleep;
  return await fetchWrapper<IContact[]>(BASE_URL);
};

export const createContact = async (data: IContact): Promise<IContact | null> => {
  return await fetchWrapper<IContact>(BASE_URL, "POST", data);
};

export const deleteContact = async (id: string): Promise<void> => {
  await fetchWrapper<void>(`${BASE_URL}/${id}`, "DELETE");
};
