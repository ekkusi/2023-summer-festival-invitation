import * as React from "react";
import { Box, Icon, Text, useMediaQuery } from "@chakra-ui/react";
import {
  TargetAndTransition,
  Variants,
  useAnimationControls,
} from "framer-motion";
import { AiFillHeart } from "react-icons/ai";
import { MotionBox } from "./motion";

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
      zIndex: {
        delay: CLOSE_DURATION / 2 + CLOSE_DURATION / 4,
      },
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
  label?: string;
  autoOpen?: boolean;
  autoOpenDelay?: number;
  children: React.ReactNode;
  onAnimationEnd?: () => void;
  exitAnimation?: TargetAndTransition;
};

export type InvitationHandlers = {
  setState: (state: "open" | "closed") => void;
  getState: () => "open" | "closed";
};

const Invitation = React.forwardRef<InvitationHandlers, InvitationProps>(
  (
    {
      autoOpen = false,
      autoOpenDelay,
      label,
      children,
      onAnimationEnd,
      exitAnimation,
    }: InvitationProps,
    ref
  ) => {
    const controls = useAnimationControls();
    const [animationState, setAnimationState] = React.useState<
      "open" | "closed"
    >("closed");
    const [isLargerThan600] = useMediaQuery("(min-width: 600px)");

    const bgEnvelopeColor = "#f5edd1";
    const envelopeTabColor = "#ecdeb8";
    const envelopeCoverColor = "#e6cfa7";
    const shadowColor = "rgba(0, 0, 0, 0.2)";
    const envelopeWidth = isLargerThan600 ? "500px" : "350px";
    const envelopeHeight = isLargerThan600 ? "350px" : "250px";
    const tabHeight = isLargerThan600 ? "180px" : "130px";

    const y = isLargerThan600 ? [-75, -400, -75] : [-50, -300, -50];
    const maxScale = isLargerThan600 ? 4 : 3;

    const setState = (state: "open" | "closed") => {
      setAnimationState(state);
      controls.start(state);
    };

    React.useImperativeHandle(ref, () => ({
      setState,
      getState: () => animationState,
    }));

    React.useEffect(() => {
      if (autoOpen) {
        if (autoOpenDelay) {
          setTimeout(() => {
            setState("open");
          }, autoOpenDelay);
        } else {
          setState("open");
        }
      }
    }, [autoOpen]);

    const envelopeLetter: Variants = {
      open: {
        // translateY: ["0", "-100%", "0"],
        y,
        x: "-50%",
        // width: [150, 300, 400],
        scale: [1, 2, maxScale],
        zIndex: 3,
        transition: {
          duration: LETTER_DURATION,
          delay: BUTTON_DURATION + TAB_DURATION,
          zIndex: {
            delay: BUTTON_DURATION + TAB_DURATION + LETTER_DURATION / 2,
          },
          // times: [0.5, 1.0, 1.5],
        },
      },
      closed: {
        // translateY: ["0", "-100%", "0"],
        y,
        x: "-50%",
        // width: [400, 300, 150],
        scale: [4, 2, 1],
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
        initial="closed"
        position="relative"
        animate={controls}
        bg={bgEnvelopeColor}
        boxShadow={`0 0 40px ${shadowColor}`}
        onAnimationComplete={onAnimationEnd}
        exit={exitAnimation}
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
          {label && (
            <MotionBox
              variants={text}
              position="absolute"
              width={envelopeWidth}
              height={tabHeight}
              left="50%"
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
          )}
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
            initial={{
              scale: 1,
              y: -25,
              zIndex: 1,
              x: "-50%",
            }}
            position="absolute"
            bottom="0"
            left="50%"
            width="130px"
            bg="white"
            textAlign="center"
            boxShadow={`0 0 5px ${shadowColor}`}
            py="2"
            pb="5"
            px="3"
            overflow="hidden"
            color="black"
            fontSize="10px"
          >
            {children}
          </MotionBox>
          {!autoOpen && (
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
              onClick={() => setState("open")}
            >
              <Icon as={AiFillHeart} w={8} h={8} />
            </MotionBox>
          )}
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
);

export default Invitation;
