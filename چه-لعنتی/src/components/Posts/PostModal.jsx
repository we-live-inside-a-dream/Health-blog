import React, { useState } from "react";
import { useAPI } from "../../api/APIContext";
import styles from "./PostModal.module.css";

const PostModal = ({ postAPI, toggleModal }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [files, setFiles] = useState([]);

  const apiContext = useAPI();
  const { fileAPI } = apiContext;

  const handleSubmission = async (e) => {
    e.preventDefault();
    const promises = [];
    for (let i = 0; i < files.length; i += 1) {
      const file = files[i];
      const promise = fileAPI.add(file);
      promises.push(promise);
    }
    const fileUrls = await Promise.all(promises);

    const post = {
      title,
      body,
      fileUrls,
      createdAt: new Date()
    };
    await postAPI.add(post);
    toggleModal();
  };
  return (
    <>
      <div
        aria-label="overlay"
        role="button"
        tabIndex={0}
        onClick={toggleModal}
        onKeyPress={({ key }) => {
          if (key === " ") {
            toggleModal();
          }
        }}
        className={styles.overlay}
      />
      <div className={styles.modal}>
        <label htmlFor="title">
          <input
            id="title"
            type="text"
            value={title}
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label htmlFor="body">
          <textarea
            rows={10}
            id="body"
            value={body}
            placeholder="Body"
            onChange={(e) => setBody(e.target.value)}
          />
        </label>
        <label htmlFor="file">
          <input
            id="file"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              setFiles([...files, file]);
            }}
          />
        </label>
        <div>
          {files.map((file) => (
            <div key={file.name}>
              <div>{file.name}</div>
              <button
                type="button"
                onClick={() => {
                  const newFiles = files.filter((f) => f.name !== file.name);
                  setFiles(newFiles);
                }}
              >
                X
              </button>
            </div>
          ))}
        </div>
        <div className={styles.modalButtons}>
          <button onClick={handleSubmission} type="submit">
            Add
          </button>

          <button type="button" onClick={toggleModal}>
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default PostModal;
