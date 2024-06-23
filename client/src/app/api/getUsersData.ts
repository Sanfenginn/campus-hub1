import axios from "axios";

type Input = {
  condition: string;
  inputValue: string;
};

const getUsersData = async (input: Input) => {
  console.log("input:", input);

  try {
    const url = process.env.NEXT_PUBLIC_API_URL;
    const token = localStorage.getItem("token");
    console.log("url:", url);

    console.log("condition:", input.condition);
    console.log("inputValue:", input.inputValue);

    const response = await axios.get(`${url}/users`, {
      params: {
        condition: input.condition,
        inputValue: input.inputValue,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (err) {
    console.error(err);
  }
};

export default getUsersData;
