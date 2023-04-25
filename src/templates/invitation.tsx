import React from "react";
import { PageProps, graphql } from "gatsby";
import PageWrapper from "../components/PageWrapper";
import Invitation from "../components/Invitation";
import dataJson from "../data.json";

type InvitationType = (typeof dataJson)[number];

type InvitationTemplateProps = PageProps<Queries.InvitationTemplateQuery>;

export default function InvitationTemplate({ data }: InvitationTemplateProps) {
  const { sitePage } = data;
  const invitation = sitePage?.pageContext as InvitationType | null;
  if (!invitation) throw new Error("No invitation data found");
  console.log(invitation);

  return (
    <PageWrapper>
      <Invitation label={invitation.label} />
    </PageWrapper>
  );
}

export const query = graphql`
  query InvitationTemplate($path: String!) {
    sitePage(path: { eq: $path }) {
      id
      pageContext
      # fields {
      #   id
      #   label
      # }
    }
  }
`;
