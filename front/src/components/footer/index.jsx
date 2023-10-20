import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";

export const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        backgroundColor: "#2E2E2E",
      }}
    >
      <Container maxWidth="lg">
        <Grid paddingTop="0.5rem" paddingBottom="0.3rem" textAlign="center">
          <Typography fontSize="0.8rem" color="#f05123" variant="subtitle1">
            @SMi Engineering 2023
          </Typography>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
