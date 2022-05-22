import { CssBaseline } from "@mui/material";
import {
  alpha,
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";
import { createContext, useMemo, useState } from "react";
import customizeComponents from "./customizations";

const PRIMARY = {
  lighter: "#C8FACD",
  light: "#5BE584",
  main: "#ff7675",
  dark: "#e87272",
  darker: "#005249",
  contrastText: "#FFF",
};
const PRIMARY_1 = {
  lighter: "#E3F2FD",
  light: "#90CAF9",
  main: "#ff7675",
  dark: "#e87272",
  darker: "#1565C0",
  contrastText: "#FFF",
};
const SECONDARY = {
  lighter: "#D6E4FF",
  light: "#84A9FF",
  main: "#3366FF",
  dark: "#1939B7",
  darker: "#091A7A",
  contrastText: "#FFF",
};
const SECONDARY_1 = {
  lighter: "#ede7f6",
  light: "#b39ddb",
  main: "#673ab7",
  dark: "#5e35b1",
  darker: "#4527a0",
  contrastText: "#FFF",
};
const SUCCESS = {
  lighter: "#E9FCD4",
  light: "#AAF27F",
  main: "#54D62C",
  dark: "#229A16",
  darker: "#08660D",
  contrastText: "#FFF",
};
const SUCCESS_1 = {
  lighter: "#b9f6ca",
  light: "#69f0ae",
  main: "#69f0ae",
  dark: "#00c853",
  darker: "#08660D",
  contrastText: "#FFF",
};

const GREY = {
  0: "#FFFFFF",
  100: "#F9FAFB",
  200: "#F4F6F8",
  300: "#DFE3E8",
  400: "#C4CDD5",
  500: "#919EAB",
  600: "#637381",
  700: "#454F5B",
  800: "#212B36",
  900: "#161C24",
  500_8: alpha("#919EAB", 0.08),
  500_12: alpha("#919EAB", 0.12),
  500_16: alpha("#919EAB", 0.16),
  500_24: alpha("#919EAB", 0.24),
  500_32: alpha("#919EAB", 0.32),
  500_48: alpha("#919EAB", 0.48),
  500_56: alpha("#919EAB", 0.56),
  500_80: alpha("#919EAB", 0.8),
};

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

function ThemeProvider({ children }) {
  const [mode, setMode] = useState("light");
  const themeOptions = (mode) =>
    mode === "light"
      ? {
          typography: {
            fontFamily: ["Be Vietnam Pro", "Arial", "sans-serif"].join(","),
          },
          palette: {
            primary: PRIMARY,
            secondary: SECONDARY,
            success: SUCCESS,
            header: "#fff",
            comment: "rgb(240, 242, 245)",
            main: "#ff7675",
            text: {
              primary: GREY[800],
              secondary: GREY[600],
              disabled: GREY[500],
              header: "black",
            },
            background: {
              paper: "#fff",
              default: "rgba(230, 230, 230,0.05)",
              neutral: GREY[200],
            },
            action: {
              active: GREY[600],
              hover: GREY[500_8],
              selected: GREY[500_16],
              disabled: GREY[500_80],
              disabledBackground: GREY[500_24],
              focus: GREY[500_24],
              hoverOpacity: 0.08,
              disabledOpacity: 0.48,
            },
          },
          shape: { borderRadius: 8 },
        }
      : {
          palette: {
            mode: "dark",
            primary: PRIMARY_1,
            secondary: SECONDARY_1,
            success: SUCCESS_1,
            header: "rgb(31,29,25)",
            comment: "#3d3d3d",
            main: "#ff7675",
            text: {
              header: "white",
            },
            background: {
              default: "rgba(43, 42, 51)",
            },
          },
        };

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );
  const theme = useMemo(() => createTheme(themeOptions(mode)), [mode]);
  theme.components = customizeComponents(theme);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default ThemeProvider;
