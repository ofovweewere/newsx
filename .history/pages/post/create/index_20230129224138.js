import { createPost } from "@/client/request";
import { useState } from "react";
import style from "./style.module.css";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";
import { useStore } from "@/client/context";
import { get } from "mongoose";
import { getValue } from "@/utils/common";
import axios from "axios";
const PostCreatePage = () => {
  const [image, setImage] = useState(null);
  const [imageInput, setImageInput] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [state] = useStore();
  const user = getValue(state, ["user"], null);
  const router = useRouter();
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageInput(file);
      const fileReader = new FileReader();
      fileReader.onload = function (e) {
        setImage(e.target.result);
      };

      fileReader.readAsDataURL(file);
    }
  };

  const handleFormData = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("title", title);
    form.append("desc", desc);
    const datas = new FormData();
    datas.append("file", imageInput);
    datas.append("upload_preset", "upload");

    if (!imageInput) {
      throw "Image required";
    }

    try {
      // const uploadRes = await axios.post(
      //   "https://api.cloudinary.com/v1_1/dx8ndowtw/image/upload",
      //   data,
      //   {
      //     headers: {
      //       "Access-Control-Allow-Origin": "*",
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/dx8ndowtw/image/upload`,
        {
          method: "POST",
          body: datas,
        }
      );
      const data = await res.json();
      const { url } = data;
      form.append("url", url);
      const result = await createPost(form);
      if (result && result.hasError) {
        setErrorMessage(result.errorMessage);
      } else {
        setTitle("");
        setDesc("");
        setImageInput(null);
        setImage(null);
        setErrorMessage("");
        document.getElementById("myFile").value = "";
      }
    } catch (err) {
      setErrorMessage("Error uploading image");
      console.log("Error uploading image", err);
    }
  };
  if (user && user.authenticating) {
    return <Loader />;
  }
  if (!user.authenticated) {
    router.replace("/login");
    return null;
  }
  return (
    <div className={`container ${style["post-create"]}`}>
      <div className="row">
        <div className="col">
          <h2>Create News</h2>
        </div>
      </div>
      <div className="row">
        <div className="col">
          {errorMessage && (
            <p style={{ textTransform: "capitalize", color: "red" }}>
              {errorMessage}
            </p>
          )}
        </div>
      </div>
      <form
        onSubmit={handleFormData}
        enctype="multipart/form-data"
        method="post"
      >
        <div className="row">
          <div className="col">
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Title"
            />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <textarea
              type="text"
              className="form-control"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Enter Description"
            />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <input
              type="file"
              id="myFile"
              className="form-control"
              onChange={handleImage}
            />
          </div>
          <div className="col">
            {image && (
              <img
                src={image}
                alt="uploaded image"
                style={{ width: "100px" }}
              />
            )}
          </div>
        </div>

        <div className="row">
          <div className="col">
            <button>Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default PostCreatePage;
