import * as React from "react";
import { Link } from "gatsby";
import { Box, Text } from "@chakra-ui/react";

function NotFoundPage() {
  return (
    <Box>
      <Text as="h1">Page not found</Text>
      <Text>
        Sorry 😔, we couldn’t find what you were looking for.
        <br />
        {process.env.NODE_ENV === "development" ? (
          <>
            <br />
            Try creating a page in <code>src/pages/</code>.
            <br />
          </>
        ) : null}
        <br />
        <Link to="/">Go home</Link>.
      </Text>
    </Box>
  );
}

export default NotFoundPage;

export function Head() {
  return <title>Not found</title>;
}
