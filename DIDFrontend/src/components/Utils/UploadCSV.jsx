import React, { useState, useRef } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Button,
  Textarea,
} from "@nextui-org/react";
import Logo from "../../assets/Logo";
import Papa from "papaparse";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

export default function UploadCSV() {
  const [csvData, setCsvData] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setSelectedFileName(selectedFile.name);

    Papa.parse(selectedFile, {
      header: true,
      dynamicTyping: true,
      complete: (result) => {
        setCsvData(result.data);
      },
      skipEmptyLines: true,
    });
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async () => {
    const fileInput = fileInputRef.current;
    if (!fileInput || !fileInput.files || !fileInput.files[0]) {
      toast.error("Please upload a CSV file first.");
      return;
    }

    const selectedFile = fileInput.files[0];

    Papa.parse(selectedFile, {
      header: true,
      dynamicTyping: true,
      complete: (result) => {
        setCsvData(result.data);
      },
      skipEmptyLines: true,
    });

    try {
      const response = await axios.post(
        // "https://myapp.vercel.app/upload"
        "http://localhost:5000/upload"
        , {
        csvData: csvData,
      });

      if (response.status === 200) {
        toast.success("Upload successful!");
        // Clear the file input
        fileInput.value = null;
        // Clear selected file name
        setSelectedFileName("");
      } else {
        toast.error("Upload failed. Please check your request.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(`Upload failed. ${error.message}`);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="min-w-[400px] border border-black">
        <CardHeader className="flex gap-3">
          <Logo />
        </CardHeader>
        <Divider />
        <CardBody>
          <p>Task Submission</p>
        </CardBody>
        <Divider />
        <CardBody>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <label htmlFor="fileInput">
            <Button component="span" onClick={handleButtonClick}>
              Upload CSV
            </Button>
          </label>
          {/* Display the selected file name */}
          {selectedFileName && <p>Selected File: {selectedFileName}</p>}

          {/* Display the file data preview */}
          {csvData && (
            <Textarea
              isReadOnly
              variant="bordered"
              labelPlacement="outside"
              defaultValue={JSON.stringify(csvData, null, 2)}
              className="max-w-xs"
            ></Textarea>
          )}
        </CardBody>
        <Divider />
        <CardFooter>
          <Button onClick={handleSubmit}>Submit</Button>
        </CardFooter>
      </Card>
      <Toaster position="top-center" />
    </div>
  );
}
