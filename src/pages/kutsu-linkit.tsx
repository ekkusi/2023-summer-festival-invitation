import * as React from "react";
import { IconButton, ListItem, Text, UnorderedList } from "@chakra-ui/react";
import { PageProps } from "gatsby";
import { MdOutlineContentCopy } from "react-icons/md";
import { BsCheckLg } from "react-icons/bs";
import { collection, getDocs } from "firebase/firestore";
import PageWrapper from "../components/PageWrapper";

import data from "../data.json";
import { InvitationType } from "../types";
import db from "../db";
import LoadingPage from "../components/LoadingPage";

const getAttendanceString = (attending: boolean | undefined) => {
  switch (attending) {
    case true:
      return "Tulossa";
    case false:
      return "Ei tulossa";
    default:
      return "Ei vastannut";
  }
};

function InvitationLink(
  props: InvitationType & {
    origin: string;
    onClickCopy: (href: string, id: string) => void;
    copiedId: string;
  }
) {
  const { id, origin, onClickCopy, name, attending, copiedId } = props;
  const href = `${origin}/${id}`;

  return (
    <ListItem>
      <Text as="span">
        {name}: {getAttendanceString(attending)}
      </Text>
      <br />
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
  const [loading, setLoading] = React.useState(true);

  const respondents: InvitationType[] = [...data];

  React.useEffect(() => {
    const colRef = collection(db, "answers");
    getDocs(colRef)
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          const respondent = doc.data();
          const match = respondents.find((it) => it.id === respondent.id);
          if (match) match.attending = respondent.attending;
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const copyHrefToClipboard = async (href: string, id: string) => {
    await navigator.clipboard.writeText(href);
    setCopiedId(id);
  };

  if (loading) return <LoadingPage />;

  return (
    <PageWrapper noAnimation p="3">
      <Text as="h1" textAlign="center" mb="3">
        Kutsulinkit
      </Text>
      <UnorderedList>
        {respondents.map((it) => (
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
