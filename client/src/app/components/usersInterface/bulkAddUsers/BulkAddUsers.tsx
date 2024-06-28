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
import Papa from "papaparse";
import ReminderForEdit from "@/app/components/usersInterface/displayAllUsers/ReminderForSelection";
import { setReminder } from "@/app/redux/reminder";
import { useDispatch } from "react-redux";

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
  const dispatch = useDispatch();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewContent, setPreviewContent] = useState<string[]>([]);
  const [reminderShow, setReminderShow] = useState(false);
  const [parsedCsvData, setParsedCsvData] = useState<string[][]>([]);
  const [reminderNotSelected, setReminderNotSelected] = useState(false);

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

          // 如果是CSV文件，解析内容并设置到parsedCsvData
          if (file.type === "text/csv") {
            const parsed = Papa.parse<string[]>(content, { header: false });
            setParsedCsvData(parsed.data);
          }

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

  const handleReminderNotSelectedClose = () => {
    setReminderNotSelected(false);
  };

  const handleSubmit = () => {
    if (selectedFiles.length === 0) {
      dispatch(setReminder("upload files"));
      setReminderNotSelected(true);
      return;
    }
    handleReminderForSubmit();
  };

  console.log("selectedFiles: ", selectedFiles);
  console.log("previewContent: ", previewContent);

  const handleUpload = async () => {
    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await postBulkUsers(formData);
      console.log("response2:", response);
      // setSelectedFiles([]);
      // setPreviewContent([]);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const isValidJson = (content: string) => {
    try {
      JSON.parse(content);
      return true;
    } catch (e) {
      return false;
    }
  };

  return (
    <div className="  flex flex-col  h-full">
      <Box className="flex justify-center gap-6">
        <Tooltip title="You can Only Upload CSV and JSON files">
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
      {selectedFiles.map((file, index) => {
        let content;

        if (file.type === "text/csv") {
          content = (
            <table className="table-auto w-full">
              <thead>
                <tr>
                  {parsedCsvData[0]?.map((header, i) => (
                    <th key={i} className="px-4 py-2">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {parsedCsvData.slice(1).map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="border px-4 py-2">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          );
        } else if (isValidJson(previewContent[index])) {
          content = (
            <pre>
              {JSON.stringify(JSON.parse(previewContent[index]), null, 2)}
            </pre>
          );
        } else {
          content = <pre>{previewContent[index]}</pre>;
        }

        return (
          <div key={index} className="flex-grow overflow-scroll">
            {content}
          </div>
        );
      })}
      <ReminderForBulkAdd
        show={reminderShow}
        handleClose={handleReminderModelClose}
        onConfirm={handleUpload}
      />
      <ReminderForEdit
        show={reminderNotSelected}
        handleClose={handleReminderNotSelectedClose}
      />
    </div>
  );
};

export default UsersFileUpload;
