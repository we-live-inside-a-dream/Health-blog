import React, { useEffect, useState } from "react";
import { useAPI } from "../../api/APIContext";
import PostModal from "./PostModal";
import styles from "./Posts.module.css";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const apiContext = useAPI();
  const { postAPI } = apiContext;

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  useEffect(() => {
    postAPI.getAll(setPosts);
  }, []);

  return (
    <div>
      <div className={styles.posts}>
        {posts.map((post) => (
          <div key={post.id}>
            <div>{post.title}</div>
            <div>{post.body}</div>
            <div className={styles.img}>
              {post.fileUrls.map((url) => (
                <div key={url}>
                  <img src={url} alt="post" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button type="button" onClick={toggleModal}>
        Add Post
      </button>
      {modalVisible && (
        <PostModal postAPI={postAPI} toggleModal={toggleModal} />
      )}
    </div>
  );
};
export default Posts;
