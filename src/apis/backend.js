import axios from "axios";
export const getWhatsupAccessToken = async (contactNumber, name, otp) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_WHATSUP_BASE_URL}/LoginToWhatsup`,
      {
        contactNumber,
        name,
        otp,
      },
      {
        timeout: 10000,
      }
    );
    if (response && response.data) {
      return { data: response.data };
    } else {
      console.error(response);
      return { error: "SOMETHING WEIRD" };
    }
  } catch (e) {
    console.error(e);
    return { error: (e.response && e.response.data) || e.toString() };
  }
};

export const refetchWhatsupAccessToken = async (accessToken) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_WHATSUP_BASE_URL}/ReLoginToWhatsup`,
      {},
      {
        timeout: 10000,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response && response.data) {
      return { data: response.data };
    } else {
      console.error(response);
      return { error: "SOMETHING WEIRD" };
    }
  } catch (e) {
    console.error(e);
    return { error: (e.response && e.response.data) || e.toString() };
  }
};

export const requestOtp = async (contactNumber, name) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_WHATSUP_BASE_URL}/GenerateOtp`,
      {
        contactNumber,
        name,
      },
      {
        timeout: 10000,
      }
    );
    if (response) {
      return {};
    } else {
      console.error(response);
      return { error: "SOMETHING WEIRD" };
    }
  } catch (e) {
    console.error(e);
    return { error: (e.response && e.response.data) || e.toString() };
  }
};
