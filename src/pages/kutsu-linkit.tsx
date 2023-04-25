import * as React from "react";
import { ListItem, Text, UnorderedList } from "@chakra-ui/react";
import { PageProps } from "gatsby";
import PageWrapper from "../components/PageWrapper";

import data from "../data.json";

function InvitationLink(props: { id: string; label: string; origin: string }) {
  const { id, label, origin } = props;
  const href = `${origin}/${id}`;
  return (
    <ListItem>
      <Text as="span">{label}: </Text>
      <Text as="a" href={href}>
        {href}
      </Text>
    </ListItem>
  );
}

function InvitationLinksPage(props: PageProps) {
  const { location } = props;

  return (
    <PageWrapper p="3">
      <Text as="h1" textAlign="center" mb="3">
        Kutsulinkit
      </Text>
      <UnorderedList>
        {data.map((it) => (
          <InvitationLink key={it.id} origin={location.origin} {...it} />
        ))}
      </UnorderedList>
    </PageWrapper>
  );
}

export default InvitationLinksPage;
