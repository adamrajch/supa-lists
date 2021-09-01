import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import { linkStyles as Link } from "./linkstyles";

const fonts = { mono: `'Menlo', monospace` };

const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
});

const theme = extendTheme({
  colors: {
    black: "#000000",
    bg: {
      100: "#0B0C10",
      200: "#1F2833",
    },
    brand: {
      100: "#E2CDF5",
      200: "#C59FEB",
      300: "#9165C5",
      400: "#5A378B",
      500: "#1F0C3E",
      600: "#170835",
      700: "#11062C",
      800: "#0C0323",
      900: "#08021D",
    },
    text: {
      100: "white",
      200: "#E4E4E4",
      300: "#a1a1a1",
      400: "#737373",
    },
  },
  components: {
    Link,
  },
  styles: {
    global: () => ({
      html: {
        height: "100%",
      },
      body: {
        fontFamily: "body",
        color: "white",
        bg: "bg.100",
        lineHeight: "base",
      },
      a: {
        color: "white",
      },
      div: {
        "&::-webkit-scrollbar": {
          width: "4px",
          height: "8px",
        },
        "&:: -webkit-scrollbar-track": {
          width: "6px",
          backgroundColor: "#171529",
          borderRadius: "0px",
        },
        "&:: -webkit-scrollbar-thumb": {
          backgroundColor: "brand.300",
          borderRadius: "80px",
        },
      },
      // div: {
      //   "&::-webkit-scrollbar": {
      //     // display: "none",
      //   },
      //   "&::-ms-overflow-style": "none" /* IE and Edge */,
      //   " &::scrollbar-width": "none" /* Firefox */,
      // },
    }),
  },
  initialColorMode: "dark",
  fonts,
  breakpoints,
});

export default theme;
