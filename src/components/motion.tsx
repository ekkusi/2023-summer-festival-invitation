import {
  Text,
  TextProps,
  Box,
  BoxProps,
  forwardRef,
  IconButtonProps,
  IconButton,
} from "@chakra-ui/react";
import { HTMLMotionProps, motion } from "framer-motion";
import * as React from "react";

// ##### MOTION CHAKRA COMBINATIONS ######

// Chakra components need ref for framer-motion wrapper
const BoxWithRef = forwardRef<BoxProps, "div">((props: BoxProps, ref) => (
  <Box ref={ref} {...props} />
));
const TextWithRef = forwardRef<TextProps, "p">((props, ref) => (
  <Text ref={ref} {...props} />
));
const IconButtonWithRef = forwardRef<IconButtonProps, "button">(
  (props, ref) => <IconButton ref={ref} {...props} />
);

type Merge<P, T> = Omit<P, keyof T> & T;
export type MotionTextProps = Merge<
  TextProps,
  Omit<HTMLMotionProps<"p">, "color">
>;
export const MotionText: React.FC<MotionTextProps> = motion(TextWithRef);

export type MotionBoxProps = Merge<
  BoxProps,
  Omit<HTMLMotionProps<"div">, "color">
>;
export const MotionBox: React.FC<MotionBoxProps> = motion(BoxWithRef);

export type MotionIconButtonProps = Merge<
  IconButtonProps,
  Omit<HTMLMotionProps<"button">, "color">
>;
export const MotionIconButton: React.FC<MotionIconButtonProps> =
  motion(IconButtonWithRef);
