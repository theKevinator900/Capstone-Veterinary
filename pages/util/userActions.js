import axios from 'axios'
import { baseURL } from "./auth";
import Cookies from "js-cookie";
import catchErrors from "./catchErrors";

const userAxios = axios.create({
  baseURL: `${baseURL}/api/v1/user`,
  headers: { Authorization: `Bearer ${Cookies.get("token")}` },
});

export const deleteUser = async (userId) => {
  try{
    await userAxios.delete(`/${userId}`)
  } catch (err) {
    console.log(catchErrors(err))
  }
}

export const editUser = async (userId, newUser) => {
  try{
    await userAxios.put(`/${userId}`)
  } catch (err) {
    console.log(catchErrors(err))
  }
}