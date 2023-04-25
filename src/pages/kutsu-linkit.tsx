import * as React from "react";
import { IconButton, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import { PageProps } from "gatsby";
import { MdOutlineContentCopy } from "react-icons/md";
import { BsCheckLg } from "react-icons/bs";
import PageWrapper from "../components/PageWrapper";

import data from "../data.json";

function InvitationLink(props: {
  id: string;
  label: string;
  origin: string;
  onClickCopy: (href: string, id: string) => void;
  copiedId: string;
}) {
  const { id, label, origin, onClickCopy, copiedId } = props;
  const href = `${origin}/${id}`;

  return (
    <ListItem>
      <Text as="span">{label}: </Text>
      <Text as="a" href={href}>
        {href}
      </Text>
      <IconButton
        variant="ghost"
        _hover={{
          bg: "none",
        }}
        onClick={() => onClickCopy(href, id)}
        isDisabled={id === copiedId}
        icon={id === copiedId ? <BsCheckLg /> : <MdOutlineContentCopy />}
        aria-label="Copy href to clipboard"
      />
    </ListItem>
  );
}

function InvitationLinksPage(props: PageProps) {
  const { location } = props;

  const [copiedId, setCopiedId] = React.useState("");

  const copyHrefToClipboard = async (href: string, id: string) => {
    await navigator.clipboard.writeText(href);
    setCopiedId(id);
  };

  return (
    <PageWrapper p="3">
      <Text as="h1" textAlign="center" mb="3">
        Kutsulinkit
      </Text>
      <UnorderedList>
        {data.map((it) => (
          <InvitationLink
            key={it.id}
            copiedId={copiedId}
            onClickCopy={copyHrefToClipboard}
            origin={location.origin}
            {...it}
          />
        ))}
      </UnorderedList>
    </PageWrapper>
  );
}

export default InvitationLinksPage;

export function Head() {
  return <title>Kutsulinkit</title>;
}
