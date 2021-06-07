import { whatsupWidget } from "whatsup-sdk";
import {
  getWhatsUpDetails,
  setWhatsUpDetails,
  setWhatsUpProxyAccessToken,
  getWhatsUpProxyAccessToken,
} from "../apis/local";
import {
  getWhatsupAccessToken,
  requestOtp,
  refetchWhatsupAccessToken,
} from "../apis/backend";

export const setupWhatsup = async (contactNumber, name, otp) => {
  if (!contactNumber || !name || !otp) {
    console.error("[WhatsUp Sample] Contact Number, Name, OTP needed");
    return;
  }
  const { data, error } = await getWhatsupAccessToken(contactNumber, name, otp);
  if (error) {
    console.log(error);
    return;
  }
  if (!data || !data.access_token) return;
  const accessToken = data.access_token;
  setWhatsUpProxyAccessToken(data.whatsupProxyAccessToken);
  setWhatsUpDetails({ contactNumber, name });
  await whatsupWidget.load({ accessToken, contactNumber, name });
  return;
};

export const loadWhatsup = async () => {
  const { contactNumber, name } = getWhatsUpDetails();
  const wupat = getWhatsUpProxyAccessToken();
  const { data, error } = await refetchWhatsupAccessToken(wupat);
  if (error) {
    console.log(error);
    return;
  }
  if (!data || !data.access_token) return;
  const accessToken = data.access_token;
  await whatsupWidget.load({ accessToken, contactNumber, name });
  return;
};

export const generateOtp = async (contactNumber, name) => {
  if (!contactNumber || !name) {
    return;
  }
  const { error } = await requestOtp(contactNumber, name);
  if (error) {
    console.log(error);
    return;
  }
  return;
};
