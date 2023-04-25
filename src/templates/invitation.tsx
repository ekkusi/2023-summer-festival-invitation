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

  return (
    <PageWrapper display="flex" alignItems="center" justifyContent="center">
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

export function Head({ data }: InvitationTemplateProps) {
  const { sitePage } = data;
  const invitation = sitePage?.pageContext as InvitationType | null;
  if (!invitation) throw new Error("No invitation data found");
  return (
    <>
      <title>{invitation.label}</title>
      <meta
        name="description"
        content="Kutsu kesän ei välttämättä parhaisiin, mutta ainakin ihan kivoihin juhliin:)"
      />
    </>
  );
}
