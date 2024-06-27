import axios from "axios";

interface User {
  name: {
    firstName: string;
    lastName: string;
  };
  dob: string | Date;
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
    console.log("newUser:", newUser);
    console.log("开始添加用户");
    const url = process.env.NEXT_PUBLIC_API_URL + "/users";
    const response = await axios.post(url, newUser, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    // const response = await fetch(url, {
    //   method: "post",
    //   body: JSON.stringify(newUser),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    console.log("response3:", response);
    return response;
  } catch (err) {
    console.error(err);
  }
};

export default postUser;
