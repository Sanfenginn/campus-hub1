import axios from "axios";

const login = async (account: string, password: string) => {
  console.log("开始登录");
  try {
    const url = process.env.NEXT_PUBLIC_API_URL;
    console.log("url: ", url);
    const response = await axios.post(`${url}/login`, {
      account,
      password,
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export default login;
