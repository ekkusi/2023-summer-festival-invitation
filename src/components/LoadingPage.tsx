import { Text } from "@chakra-ui/react";
import { TypeAnimation } from "react-type-animation";
import React from "react";
import PageWrapper from "./PageWrapper";

const loadingAnimationDuration = 300;

export default function LoadingPage() {
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
}
