import { Box, BoxProps } from "@chakra-ui/react";
import React from "react";

type PageWrapperProps = BoxProps;

export default function PageWrapper(props: PageWrapperProps) {
  return (
    <Box
      height="100vh"
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      {...props}
    />
  );
}
