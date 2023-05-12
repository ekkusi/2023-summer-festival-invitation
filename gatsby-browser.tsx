import React from "react";
import { WrapPageElementNodeArgs } from "gatsby";
import { ChakraProvider } from "@chakra-ui/react";
import { Helmet } from "react-helmet";

import theme from "./src/theme";

import "@fontsource/pacifico";

export const wrapPageElement = ({ element }: WrapPageElementNodeArgs) => {
  return (
    <>
      <Helmet htmlAttributes={{ lang: "fi" }} />
      <ChakraProvider theme={theme}>{element}</ChakraProvider>
    </>
  );
};

export const shouldUpdateScroll = () => {
  return false;
};
