import React, { useEffect } from "react";
import { PageProps, graphql } from "gatsby";
import { Box, Icon, Image, Text, useMediaQuery } from "@chakra-ui/react";
import { GiCheckMark } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { TypeAnimation } from "react-type-animation";
import { doc, getDoc, setDoc } from "firebase/firestore";
import dataJson from "../data.json";
import PageWrapper from "../components/PageWrapper";
import Invitation, { InvitationHandlers } from "../components/Invitation";
import VaraText, { VaraTextHandlers } from "../components/VaraText";
import { MotionBox } from "../components/motion";
import db from "../db";

type InvitationType = (typeof dataJson)[number] & {
  attending?: boolean;
};

type InvitationTemplateProps = PageProps<Queries.InvitationTemplateQuery>;

export default function InvitationTemplate({ data }: InvitationTemplateProps) {
  const { sitePage } = data;
  const invitation = sitePage?.pageContext as InvitationType | null;

  const [isLargerThan600] = useMediaQuery("(min-width: 600px)");
  const [animationState, setAnimationState] = React.useState<"closed" | "open">(
    "closed"
  );
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [attendance, setAttendance] = React.useState<boolean | null>(null);
  const [answerState, setAnswerState] = React.useState<
    "answered" | "not-answered" | null
  >(null);
  const invitationRef = React.useRef<InvitationHandlers>(null);
  const answerRef = React.useRef<InvitationHandlers>(null);
  const firstTextRef = React.useRef<VaraTextHandlers>(null);
  const secondTextRef = React.useRef<VaraTextHandlers>(null);

  if (!invitation) throw new Error("No invitation data found");

  const getAnswer = async () => {
    const docRef = doc(db, "answers", invitation.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const snapData = docSnap.data();
      return snapData as InvitationType;
    }
    return null;
  };

  const addAnswer = async (attending: boolean) => {
    const docRef = doc(db, "answers", invitation.id);
    await setDoc(docRef, { ...invitation, attending });
  };

  useEffect(() => {
    getAnswer()
      .then((answer) => {
        const newAttendance = answer?.attending ?? null;
        setAttendance(newAttendance);
        setAnswerState(newAttendance === null ? "not-answered" : "answered");
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError(
          "Jotakin jännää tapahtui... Voisitko ilmottaa Ekelle kiitos..."
        );
      });
  }, []);

  const invitationAnimationEnd = () => {
    if (!invitationRef.current) return;
    if (invitationRef.current.getState() === "open") {
      setAnimationState("open");
      firstTextRef.current?.play();
      secondTextRef.current?.play();
    } else {
      setAnswerState("answered");
    }
  };

  const onAttendanceChanged = (attending: boolean) => {
    setAttendance(attending);
    invitationRef.current?.setState("closed");
    try {
      addAnswer(attending);
    } catch (e) {
      setError("Jotakin jännää tapahtui... Voisitko ilmottaa Ekelle kiitos...");
    }
  };

  const answerAnimationEnd = () => {
    if (!answerRef.current) return;
    if (answerRef.current.getState() === "closed") {
      setAnswerState("not-answered");
      invitationRef.current?.setState("open");
      setAnimationState("open");
    }
  };

  const onChangeAnswerClicked = () => {
    answerRef.current?.setState("closed");
  };

  const initialAnimationX = isLargerThan600 ? 1500 : 500;

  const loadingAnimationDuration = 300;

  if (error) {
    return (
      <PageWrapper
        noAnimation
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text as="span" mx="3" textAlign="center">
          {error}
        </Text>
      </PageWrapper>
    );
  }

  if (loading || !answerState)
    return (
      <PageWrapper
        noAnimation
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text as="span" fontFamily="handwritten">
          Ladataan
        </Text>
        <TypeAnimation
          sequence={[
            ".",
            loadingAnimationDuration,
            "..",
            loadingAnimationDuration,
            "...",
            loadingAnimationDuration,
            "..",
            loadingAnimationDuration,
          ]}
          cursor={false}
          repeat={Infinity}
        />
      </PageWrapper>
    );

  return (
    <PageWrapper display="flex" alignItems="center" justifyContent="center">
      {answerState === "not-answered" ? (
        <MotionBox
          key="invitation"
          initial={{
            x: -initialAnimationX,
          }}
          animate={{
            x: 0,
          }}
          exit={{
            x: initialAnimationX,
          }}
        >
          <Invitation
            ref={invitationRef}
            label={invitation.label}
            onAnimationEnd={invitationAnimationEnd}
          >
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
                marginRight="12px"
                onClick={() => onAttendanceChanged(true)}
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
                <VaraText
                  ref={firstTextRef}
                  autoPlay={attendance !== null}
                  id="text1"
                  text="Tulen"
                  delay={200}
                />
              </Text>
              <Text
                as="a"
                display="inline-flex"
                color="black"
                onClick={() => onAttendanceChanged(false)}
              >
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
                  autoPlay={attendance !== null}
                  text="En tule :("
                  delay={1200}
                />
              </Text>
            </MotionBox>
          </Invitation>
        </MotionBox>
      ) : (
        <MotionBox
          key="answer"
          initial={{
            x: -initialAnimationX,
          }}
          animate={{
            x: 0,
          }}
          exit={{
            x: initialAnimationX,
          }}
        >
          <Invitation
            ref={answerRef}
            label={invitation.label}
            autoOpen
            autoOpenDelay={500}
            onAnimationEnd={answerAnimationEnd}
          >
            <Image
              src={attendance ? "/answer-yes.jpg" : "/answer-no.jpg"}
              mb="3"
            />
            <Box height="30px">
              <TypeAnimation
                wrapper="div"
                sequence={[2500, "You chose:"]}
                speed={60}
                cursor={false}
              />
              <TypeAnimation
                wrapper="div"
                speed={60}
                sequence={[3700, attendance ? "Greatly" : "Poorly"]}
                cursor={false}
              />
            </Box>
            <Box
              position="absolute"
              bottom="0"
              left="0"
              width="100%"
              fontSize="4.5px"
            >
              <Text as="span" mr="1px">
                Vastauksenne on tallennettu.
              </Text>
              <Text
                as="a"
                color="gray.700"
                textDecoration="underline"
                onClick={onChangeAnswerClicked}
              >
                Muokkaa vastausta
              </Text>
            </Box>
          </Invitation>
        </MotionBox>
      )}
    </PageWrapper>
  );
}

export const query = graphql`
  query InvitationTemplate($path: String!) {
    sitePage(path: { eq: $path }) {
      id
      pageContext
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
