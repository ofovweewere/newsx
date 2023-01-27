import { createPost } from "@/client/request";
import { useState } from "react";
import style from "./style.module.css";
const PostCreatePage = () => {
  const [image, setImage] = useState(null);
  const [imageInput, setImageInput] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleImage = (e) => {
    const file = e.target.files[0];
    setImageInput(file);
    const fileReader = new FileReader();
    fileReader.onload = function (e) {
      setImage(e.target.result);
    };
    fileReader.readAsDataURL(file);
  };

  const handleFormData = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("title", title);
    form.append("desc", desc);
    form.append("image", imageInput);
    const result = await createPost(form);
    if (result.hasError) {
      setErrorMessage(result.errorMessage);
    } else {
      setTitle("");
      setDesc("");
      setImageInput(null);
      setImage(null);
      setErrorMessage("");
    }
    console.log("Result", result);
  };
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
      <form onSubmit={handleFormData}>
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
              className="form-control"
              // value={name}
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
