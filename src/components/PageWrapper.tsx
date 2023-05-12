import { Box, BoxProps } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import React from "react";

type PageWrapperProps = BoxProps & {
  noAnimation?: boolean;
};

export default function PageWrapper({
  children,
  noAnimation = false,
  ...rest
}: PageWrapperProps) {
  return (
    <Box height="100vh" width="100%" {...rest}>
      {noAnimation ? (
        children
      ) : (
        <AnimatePresence mode="wait">{children}</AnimatePresence>
      )}
    </Box>
  );
}
