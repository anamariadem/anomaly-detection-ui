import React from "react";
import { Container, Box, ThemeProvider } from "@mui/material";
import StepCard from "./components/StepCard";
import theme from "./theme/theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container maxWidth={"xl"}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            bgcolor="#f0f0f0"
          >
            <StepCard />
          </Box>
        </Container>
      </ThemeProvider>
      <ToastContainer />
    </>
  );
};

export default App;
