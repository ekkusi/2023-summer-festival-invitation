import * as React from "react";
import { PageProps, graphql } from "gatsby";
import { Box, Text } from "@chakra-ui/react";

function IndexPage({ data }: PageProps<Queries.IndexPageQuery>) {
  return (
    <Box textAlign="center" pt="10">
      <Text as="h1">{data.site?.siteMetadata?.title}</Text>
      <Text>This is a starter for Gatsby, Chakra and Typescript</Text>
    </Box>
  );
}

export default IndexPage;

export const query = graphql`
  query IndexPage {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
