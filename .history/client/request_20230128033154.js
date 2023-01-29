import { getValue } from "@/utils/common";
import axios from "axios";
import { baseUrl } from "./config";

export const signup = async (payload) => {
  try {
    const res = await axios.post(baseUrl + `/signup`, payload);
    return res.data;
  } catch (error) {
    return getValue(error, ["response", "data"]);
  }
};

export const createPost = async (form) => {
  try {
    // Display the key/value pairs
    for (var pair of form.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    const res = await axios.post(baseUrl + `/post/create`, form);
    return res.data;
  } catch (error) {
    return getValue(error, ["response", "data"]);
  }
};

export const getAllPosts = async () => {
  console.log("get all posts called");
  try {
    const res = await axios.get(baseUrl + `/post`);
    return res.data;
  } catch (error) {
    return getValue(error, ["response", "data"]);
  }
};

export const getSinglePost = async (id) => {
  try {
    const res = await axios.get(baseUrl + `/post/${id}`);
    return res.data;
  } catch (error) {
    return getValue(error, ["response", "data"]);
  }
};

export const getUserPosts = async (id) => {
  try {
    const res = await axios.post(baseUrl + `/user/posts`, id);
    return res.data;
  } catch (error) {
    return getValue(error, ["response", "data"]);
  }
};
