import { Text, TextProps } from "@chakra-ui/react";
import Vara from "vara";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

type VaraTextProps = Omit<TextProps, "children" | "id"> & {
  text: string;
  id: string;
  fontSize?: number;
  autoPlay?: boolean;
  delay?: number;
};

export type VaraTextHandlers = {
  play: () => void;
};

const VaraText = forwardRef<VaraTextHandlers, VaraTextProps>(
  ({ text, id, fontSize = 10, delay, autoPlay = false, ...rest }, ref) => {
    const [vara, setVara] = useState<any | null>(null);
    useEffect(() => {
      const newVara = new Vara(
        `#${id}`,
        "https://raw.githubusercontent.com/akzhy/Vara/master/fonts/Satisfy/SatisfySL.json",
        [
          {
            text,
            fontSize,
            strokeWidth: 1.5,
            delay,
          },
        ],
        {
          autoAnimation: autoPlay,
          duration: 500,
        }
      );
      setVara(newVara);
    }, [autoPlay]);
    useImperativeHandle(ref, () => ({
      play: () => {
        vara?.playAll();
      },
    }));
    return <Text as="span" id={id} {...rest} />;
  }
);

export default VaraText;
