import { useState } from "react";
import { Avatar, IconButton } from "@mui/material";
import { AddAPhoto } from "@mui/icons-material";

const AvatarUpload = ({ onFileSelect }) => {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        onFileSelect(file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input
        accept="image/*"
        style={{ display: "none" }}
        id="avatar-upload"
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="avatar-upload" className=" w-full  flex md:justify-normal justify-center">
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <Avatar
            src={preview}
            sx={{
              width: 150,
              height: 150,
              backgroundColor: preview ? "transparent" : "grey",
             
            }}
        className=" "
          >
            {!preview && <AddAPhoto fontSize="large" />}
          </Avatar>
        </IconButton>
      </label>
    </div>
  );
};

export default AvatarUpload;
