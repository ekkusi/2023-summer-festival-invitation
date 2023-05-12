import React from "react";
import { PageProps, graphql } from "gatsby";
import { Icon, Image, Text } from "@chakra-ui/react";
import { GiCheckMark } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import dataJson from "../data.json";
import PageWrapper from "../components/PageWrapper";
import Invitation from "../components/Invitation";
import VaraText, { VaraTextHandlers } from "../components/VaraText";
import { MotionBox } from "../components/motion";

type InvitationType = (typeof dataJson)[number];

type InvitationTemplateProps = PageProps<Queries.InvitationTemplateQuery>;

export default function InvitationTemplate({ data }: InvitationTemplateProps) {
  const { sitePage } = data;
  const invitation = sitePage?.pageContext as InvitationType | null;

  const [animationState, setAnimationState] = React.useState<"closed" | "open">(
    "closed"
  );
  const firstTextRef = React.useRef<VaraTextHandlers>(null);
  const secondTextRef = React.useRef<VaraTextHandlers>(null);

  if (!invitation) throw new Error("No invitation data found");

  const animationEnd = () => {
    setAnimationState("open");
    firstTextRef.current?.play();
    secondTextRef.current?.play();
  };

  return (
    <PageWrapper display="flex" alignItems="center" justifyContent="center">
      <Invitation label="Testi" onAnimationEnd={animationEnd}>
        <Image src="/invitation.jpeg" />
        <MotionBox
          display="flex"
          animate={animationState}
          position="absolute"
          bottom="0"
          left="5"
          right="3"
          fontSize="6px"
          color="black"
          fontFamily="handwritten"
        >
          <Text
            as="a"
            display="inline-flex"
            color="black"
            cursor="pointer"
            marginRight="12px"
          >
            <MotionBox
              variants={{
                open: {
                  opacity: 1,
                },
                closed: {
                  opacity: 0,
                },
              }}
            >
              <Icon as={GiCheckMark} mr="1px" mt="1px" />
            </MotionBox>
            <VaraText ref={firstTextRef} id="text1" text="Tulen" delay={200} />
          </Text>
          <Text as="a" display="inline-flex" color="black" cursor="pointer">
            <MotionBox
              variants={{
                open: {
                  opacity: 1,
                  transition: {
                    delay: 1,
                  },
                },
                closed: {
                  opacity: 0,
                },
              }}
            >
              <Icon as={RxCross1} mr="1px" mt="1px" />
            </MotionBox>
            <VaraText
              ref={secondTextRef}
              id="text2"
              text="En tule :("
              delay={1200}
            />
          </Text>
        </MotionBox>
      </Invitation>
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
