import React from "react";
import { Box } from "@mui/material";

const PDFViewer = ({ src }) => {
  const baseUrl = (process.env.NODE_ENV === 'production') ? process.env.REACT_APP_PROD_URL : process.env.REACT_APP_DEV_URL;
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        borderColor: "divider",
      }}
    >
      <iframe
        src={`${baseUrl}/${src}`}
        title="PDF Viewer"
        width="100%"
        height="100%"
        style={{ border: "none" }}
      ></iframe>
    </Box>
  );
}

export default PDFViewer;