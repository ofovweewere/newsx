import { createPost } from "@/client/request";
import { useState } from "react";
import style from "./style.module.css";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";
import { useStore } from "@/client/context";
import { get } from "mongoose";
import { getValue } from "@/utils/common";
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
    form.append("image", imageInput);
    console.log("IMAGE INPUT", imageInput);

    const result = await createPost(form);
    if (result.hasError) {
      setErrorMessage(result.errorMessage);
    } else {
      setTitle("");
      setDesc("");
      setImageInput(null);
      setImage(null);
      setErrorMessage("");
      document.getElementById("myFile").value = "";
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