import axios from "axios";

interface User {
  name: {
    firstName: string;
    lastName: string;
  };
  dob: string;
  account: string;
  password: string;
  role: {
    userType: string;
  };

  contact: {
    phone: string;
    email: string;
  };
  address: {
    houseNumber: string;
    street: string;
    suburb: string;
    state: string;
    country: string;
    postalCode: string;
  };
}

const postUser = async (newUser: User[]) => {
  try {
    const url = process.env.NEXT_PUBLIC_API_URL + "/users";
    const response = await axios.post(url, newUser);
    console.log("response:", response);
    return response;
  } catch (err) {
    console.error(err);
  }
};

export default postUser;
