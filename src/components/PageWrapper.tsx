import { Box, BoxProps } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import React from "react";

type PageWrapperProps = BoxProps;

export default function PageWrapper({ children, ...rest }: PageWrapperProps) {
  return (
    <Box height="100vh" width="100%" {...rest}>
      <AnimatePresence mode="wait">{children}</AnimatePresence>
    </Box>
  );
}
