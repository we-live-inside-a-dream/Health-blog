import React, { useEffect, useState } from "react";
import { useAPI } from "../../api/APIContext";

const Upload = () => {
  const apiContext = useAPI();
  const { fileAPI } = apiContext;
  const [files, setFiles] = useState([]);
  useEffect(() => {
    fileAPI.getAll(setFiles);
  });
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const url = await fileAPI.add(file);
    fileAPI.addToCollection({
      name: file.name,
      url,
      createdAt: new Date()
    });
  };
  return (
    <div className="page">
      <div>
        <input type="file" onChange={handleFileUpload} />
      </div>

      <div>
        {files.map((file) => (
          <div key={file.id}>
            <a href={file.url} target="_blank" rel="noreferrer">
              {file.name}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Upload;
