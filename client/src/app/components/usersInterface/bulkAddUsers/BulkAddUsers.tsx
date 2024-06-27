import * as React from "react";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Box from "@mui/material/Box";
import SendIcon from "@mui/icons-material/Send";
import Tooltip from "@mui/material/Tooltip";
import ReminderForBulkAdd from "@/app/components/usersInterface/bulkAddUsers/ReminderForBulkAddModel";
import postBulkUsers from "@/app/api/postBulkUsers";
import postUser from "@/app/api/postUser";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "auto",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const UsersFileUpload: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewContent, setPreviewContent] = useState<string[]>([]);
  const [reminderShow, setReminderShow] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const files = Array.from(event.target.files).filter(
      (file) => file.type === "text/csv" || file.type === "application/json"
    );

    setSelectedFiles(files);

    // 读取文件内容并放到previewContent
    files.forEach((file, index) => {
      //创建一个FileReader对象用于读取文件
      const reader = new FileReader();
      //每个文件读取完成后，把内容放到previewContent数组的对应位置
      reader.onload = (e) => {
        //本次读取的文件内容
        const content = e.target?.result as string;
        //将本次读取的文件内容放到previewContent数组的对应位置，确保数组的顺序和文件的顺序一致
        setPreviewContent((prevContent) => {
          const newContent = [...prevContent];
          newContent[index] = content;
          return newContent;
        });
      };

      if (file.type === "text/csv" || file.type === "application/json") {
        reader.readAsText(file);
      }
    });
  };

  const handleReminderModelShow = () => {
    setReminderShow(true);
  };

  const handleReminderModelClose = () => {
    setReminderShow(false);
  };

  const handleReminderForSubmit = () => {
    handleReminderModelShow();
  };

  console.log("isConfirmed: ", isConfirmed);

  const handleSubmit = () => {
    handleReminderForSubmit();
  };

  console.log("selectedFiles: ", selectedFiles);
  console.log("previewContent: ", previewContent);

  const aaa = [
    {
      name: {
        firstName: "John",
        lastName: "Doe",
      },
      dob: "2001-04-15",
      account: "john",
      password: "12345",
      role: {
        userType: "student",
      },
      contact: {
        email: "john.doe@example.com",
        phone: "+61412345678",
      },
      address: {
        houseNumber: "123",
        street: "Example Street",
        suburb: "Example Suburb",
        city: "Sydney",
        state: "NSW",
        country: "Australia",
        postalCode: "2000",
      },
    },
    {
      name: {
        firstName: "Jane",
        lastName: "Smith",
      },
      dob: "2000-09-21",
      account: "jane",
      password: "12345",
      role: {
        userType: "student",
      },
      contact: {
        email: "jane.smith@example.com",
        phone: "+61487654321",
      },
      address: {
        houseNumber: "456",
        street: "Sample Avenue",
        suburb: "Sample Suburb",
        city: "Melbourne",
        state: "VIC",
        country: "Australia",
        postalCode: "3000",
      },
    },
    {
      name: {
        firstName: "Alice",
        lastName: "Johnson",
      },
      dob: "1999-12-05",
      account: "alice",
      password: "12345",
      role: {
        userType: "student",
      },
      contact: {
        email: "alice.johnson@example.com",
        phone: "+61423456789",
      },
      address: {
        houseNumber: "789",
        street: "Demo Road",
        suburb: "Demo Suburb",
        city: "Brisbane",
        state: "QLD",
        country: "Australia",
        postalCode: "4000",
      },
    },
  ];

  const handleUpload = async () => {
    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });

    try {
      // const response = await postBulkUsers(formData);
      // console.log("response2:", response);
      // setSelectedFiles([]);
      // setPreviewContent([]);

      console.log("aaa: ", aaa);
      const response1 = await postUser(aaa);
      console.log("response1:", response1);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  useEffect(() => {
    console.log("selectedFiles updated: ", selectedFiles);
  }, [selectedFiles]);

  useEffect(() => {
    console.log("previewContent updated: ", previewContent);
  }, [previewContent]);

  return (
    <div className="border-2 border-black  flex flex-col  h-full">
      <Box className="flex justify-center gap-6">
        <Tooltip title="You can Only Upload JSON files">
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Upload
            <VisuallyHiddenInput
              type="file"
              onChange={handleFileChange}
              multiple
            />
          </Button>
        </Tooltip>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          startIcon={<SendIcon />}
        >
          Submit
        </Button>
      </Box>
      {previewContent.map((content, index) => (
        <div
          key={index}
          className="flex-grow border-2 border-yellow-500 overflow-scroll"
        >
          <pre>{content}</pre>
        </div>
      ))}
      <ReminderForBulkAdd
        show={reminderShow}
        handleClose={handleReminderModelClose}
        onConfirm={handleUpload}
      />
    </div>
  );
};

export default UsersFileUpload;
