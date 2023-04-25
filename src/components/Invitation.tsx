import * as React from "react";
import {
  Box,
  Button,
  Icon,
  Image,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { Variants } from "framer-motion";
import { AiFillHeart } from "react-icons/ai";
import { MotionBox, MotionText } from "./motion";

const BUTTON_DURATION = 0.3;
const TAB_DURATION = 0.5;
const LETTER_DURATION = 1;

const CLOSE_DURATION = 0.5;

const envelopeTab: Variants = {
  open: {
    rotateX: 180,
    zIndex: 0,
    transition: {
      delay: BUTTON_DURATION - 0.1,
      duration: TAB_DURATION,
    },
  },
  closed: {
    rotateX: 0,
    zIndex: 2,
    transition: {
      delay: CLOSE_DURATION - 0.1,
    },
  },
};

const text: Variants = {
  open: {
    ...envelopeTab.open,
    x: "-50%",
  },
  closed: {
    ...envelopeTab.closed,
    x: "-50%",
  },
};

const openButton: Variants = {
  open: {
    rotateZ: -90,
    x: "-50%",
    y: "-35%",
    transition: {
      duration: BUTTON_DURATION,
    },
  },
  closed: {
    rotateZ: 0,
    x: "-50%",
    y: "-35%",
    transition: {
      delay: CLOSE_DURATION,
    },
  },
};

type InvitationProps = {
  label: string;
};

function Invitation({ label }: InvitationProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLargerThan600] = useMediaQuery("(min-width: 600px)");

  const bgEnvelopeColor = "#f5edd1";
  const envelopeTabColor = "#ecdeb8";
  const envelopeCoverColor = "#e6cfa7";
  const shadowColor = "rgba(0, 0, 0, 0.2)";
  const envelopeWidth = isLargerThan600 ? "500px" : "350px";
  const envelopeHeight = isLargerThan600 ? "350px" : "250px";
  const tabHeight = isLargerThan600 ? "180px" : "130px";

  const y = isLargerThan600 ? [-50, -300, -50] : [-25, -300, -25];

  const envelopeLetter: Variants = {
    open: {
      // translateY: ["0", "-100%", "0"],
      y,
      x: "-50%",
      // width: [150, 300, 400],
      scale: [1, 2, 3],
      zIndex: 3,
      transition: {
        duration: LETTER_DURATION,
        delay: BUTTON_DURATION + TAB_DURATION / 2,
        zIndex: {
          delay: BUTTON_DURATION + TAB_DURATION / 2 + LETTER_DURATION / 2,
        },
        // times: [0.5, 1.0, 1.5],
      },
    },
    closed: {
      // translateY: ["0", "-100%", "0"],
      y,
      x: "-50%",
      // width: [400, 300, 150],
      scale: [3, 2, 1],
      zIndex: 1,
      transition: {
        duration: CLOSE_DURATION,
        zIndex: {
          delay: CLOSE_DURATION / 2,
        },
        // times: [0.5, 1.0, 1.5],
      },
    },
  };

  return (
    <MotionBox
      initial="open"
      position="relative"
      animate={isOpen ? "open" : "closed"}
      bg={bgEnvelopeColor}
      boxShadow={`0 0 40px ${shadowColor}`}
    >
      <Box
        position="relative"
        width={envelopeWidth}
        height={envelopeHeight}
        __css={{
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
      >
        <MotionBox
          variants={envelopeTab}
          position="absolute"
          top={0}
          borderTop={`${tabHeight} solid ${envelopeTabColor}`}
          borderRight={`calc(${envelopeWidth} / 2) solid transparent`}
          borderLeft={`calc(${envelopeWidth} / 2) solid transparent`}
          transformOrigin="top"
        />
        <MotionBox
          variants={text}
          position="absolute"
          width={envelopeWidth}
          height={tabHeight}
          left="50%"
          zIndex={3}
          translateX="-50%"
          transformOrigin="top"
          style={{
            backfaceVisibility: "hidden",
          }}
        >
          <Text
            position="absolute"
            top="25%"
            left="50%"
            transform="translateX(-50%)"
            fontFamily="handwritten"
          >
            {label}
          </Text>
        </MotionBox>
        <MotionBox
          position="absolute"
          top={0}
          zIndex={2}
          width={0}
          height={0}
          borderTop={`${tabHeight} solid transparent`}
          borderBottom={`calc(${envelopeHeight} - ${tabHeight}) solid ${envelopeCoverColor}`}
          borderRight={`calc(${envelopeWidth} / 2) solid ${envelopeCoverColor}`}
          borderLeft={`calc(${envelopeWidth} / 2) solid ${envelopeCoverColor}`}
          transformOrigin="top"
        />
        <MotionBox
          variants={envelopeLetter}
          position="absolute"
          bottom="0"
          left="50%"
          width="130px"
          bg="white"
          textAlign="center"
          boxShadow={`0 0 5px ${shadowColor}`}
          py="5"
          px="3"
          overflow="hidden"
        >
          <Image src="/invitation.jpeg" />
        </MotionBox>
        <MotionBox
          variants={openButton}
          color="pink.400"
          position="absolute"
          top="50%"
          left="50%"
          _hover={{
            bg: "none",
          }}
          zIndex="2"
          transformOrigin=""
          onClick={() => setIsOpen(!isOpen)}
        >
          <Icon as={AiFillHeart} w={8} h={8} />
        </MotionBox>
      </Box>
      {/* <Button
        position="absolute"
        bottom="0"
        left="50%"
        transform="translateX(-50%)"
        zIndex="2"
        onClick={() => setIsOpen(!isOpen)}
      >
        Close
      </Button> */}
    </MotionBox>
  );
}

export default Invitation;
