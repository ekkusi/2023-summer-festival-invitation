import { extendTheme } from "@chakra-ui/react";

const colors = {
  // Custom colors here
};

const colorScheme = "teal";

const theme = extendTheme({
  fonts: {
    heading: "Oxygen",
    body: "Raleway",
  },
  styles: {
    global: () => ({
      "html, body, #root": {
        margin: 0,
        width: "100%",
        minHeight: "100vh",
        overflowX: "hidden",
      },
      body: {
        fontSize: { base: "xl", md: "2xl" },
      },
      p: {
        marginBottom: "2",
      },
      a: {
        color: colorScheme,
        _hover: {
          opacity: 0.7,
        },
        transition: "opacity 0.2s",
      },
      h1: {
        fontSize: { base: "4xl", md: "6xl" },
      },
      h2: {
        fontSize: { base: "3xl", md: "4xl" },
      },
      h3: {
        fontSize: { base: "2xl", md: "3xl" },
      },
    }),
  },
  colors,
  withDefaultColorScheme: { colorScheme },
});

export default theme;
