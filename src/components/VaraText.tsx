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
  delay?: number;
};

export type VaraTextHandlers = {
  play: () => void;
};

const VaraText = forwardRef<VaraTextHandlers, VaraTextProps>(
  ({ text, id, fontSize = 5, delay, ...rest }, ref) => {
    const [vara, setVara] = useState<any | null>(null);
    useEffect(() => {
      const newVara = new Vara(
        `#${id}`,
        "https://raw.githubusercontent.com/akzhy/Vara/master/fonts/Pacifico/PacificoSLO.json",
        [
          {
            text,
            fontSize,
            strokeWidth: 1.5,
            delay,
          },
        ],
        {
          autoAnimation: false,
          duration: 500,
        }
      );
      setVara(newVara);
    }, []);
    useImperativeHandle(ref, () => ({
      play: () => {
        vara?.playAll();
      },
    }));
    return <Text as="span" id={id} {...rest} />;
  }
);

export default VaraText;
