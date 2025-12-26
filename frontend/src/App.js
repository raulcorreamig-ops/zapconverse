import React, { useState, useEffect } from "react";

import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "react-query";

import {enUS, ptBR, esES} from "@material-ui/core/locale";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";
import ColorModeContext from "./layout/themeContext";
import { SocketContext, SocketManager } from './context/Socket/SocketContext';

import Routes from "./routes";

const queryClient = new QueryClient();

const App = () => {
    const [locale, setLocale] = useState();

    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    const preferredTheme = window.localStorage.getItem("preferredTheme");
    const [mode, setMode] = useState(preferredTheme ? preferredTheme : prefersDarkMode ? "dark" : "light");

    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
            },
        }),
        []
    );

    const theme = createTheme(
        {
            scrollbarStyles: {
                "&::-webkit-scrollbar": {
                    width: '8px',
                    height: '8px',
                },
                "&::-webkit-scrollbar-thumb": {
                    boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
                    backgroundColor: "#F5B800",
                    borderRadius: "10px",
                },
            },
            scrollbarStylesSoft: {
                "&::-webkit-scrollbar": {
                    width: "8px",
                },
                "&::-webkit-scrollbar-thumb": {
                    backgroundColor: mode === "light" ? "#F3F3F3" : "#333333",
                    borderRadius: "10px",
                },
            },
            shape: {
                borderRadius: 16,
            },
            shadows: [
                "none",
                "0px 2px 4px rgba(0,0,0,0.05)",
                "0px 4px 8px rgba(0,0,0,0.08)",
                "0px 6px 12px rgba(0,0,0,0.1)",
                "0px 8px 16px rgba(0,0,0,0.12)",
                "0px 10px 20px rgba(0,0,0,0.14)",
                "0px 12px 24px rgba(0,0,0,0.16)",
                "0px 14px 28px rgba(0,0,0,0.18)",
                "0px 16px 32px rgba(0,0,0,0.2)",
                "0px 18px 36px rgba(0,0,0,0.22)",
                "0px 20px 40px rgba(0,0,0,0.24)",
                "0px 22px 44px rgba(0,0,0,0.26)",
                "0px 24px 48px rgba(0,0,0,0.28)",
                "0px 26px 52px rgba(0,0,0,0.3)",
                "0px 28px 56px rgba(0,0,0,0.32)",
                "0px 30px 60px rgba(0,0,0,0.34)",
                "0px 32px 64px rgba(0,0,0,0.36)",
                "0px 34px 68px rgba(0,0,0,0.38)",
                "0px 36px 72px rgba(0,0,0,0.4)",
                "0px 38px 76px rgba(0,0,0,0.42)",
                "0px 40px 80px rgba(0,0,0,0.44)",
                "0px 42px 84px rgba(0,0,0,0.46)",
                "0px 44px 88px rgba(0,0,0,0.48)",
                "0px 46px 92px rgba(0,0,0,0.5)",
                "0px 48px 96px rgba(0,0,0,0.52)"
            ],
            palette: {
                type: mode,
                primary: { main: mode === "light" ? "#F5B800" : "#FFFFFF" },
                textPrimary: mode === "light" ? "#F5B800" : "#FFFFFF",
                borderPrimary: mode === "light" ? "#F5B800" : "#FFFFFF",
                dark: { main: mode === "light" ? "#333333" : "#F3F3F3" },
                light: { main: mode === "light" ? "#F3F3F3" : "#333333" },
                tabHeaderBackground: mode === "light" ? "#EEE" : "#666",
                optionsBackground: mode === "light" ? "#fafafa" : "#333",
				options: mode === "light" ? "#fafafa" : "#666",
				fontecor: mode === "light" ? "#128c7e" : "#fff",
                fancyBackground: mode === "light" ? "#fafafa" : "#333",
				bordabox: mode === "light" ? "#eee" : "#333",
				newmessagebox: mode === "light" ? "#eee" : "#333",
				inputdigita: mode === "light" ? "#fff" : "#666",
				contactdrawer: mode === "light" ? "#fff" : "#666",
				announcements: mode === "light" ? "#ededed" : "#333",
				login: mode === "light" ? "#fff" : "#1C1C1C",
				announcementspopover: mode === "light" ? "#fff" : "#666",
				chatlist: mode === "light" ? "#eee" : "#666",
				boxlist: mode === "light" ? "#ededed" : "#666",
				boxchatlist: mode === "light" ? "#ededed" : "#333",
                total: mode === "light" ? "#fff" : "#222",
                messageIcons: mode === "light" ? "grey" : "#F3F3F3",
                inputBackground: mode === "light" ? "#FFFFFF" : "#333",
                barraSuperior: mode === "light" ? "linear-gradient(to right, #F5B800, #F5B800 , #F5B800)" : "#666",
				boxticket: mode === "light" ? "#EEE" : "#666",
				campaigntab: mode === "light" ? "#ededed" : "#666",
				mediainput: mode === "light" ? "#ededed" : "#1c1c1c",
            },
            overrides: {
                MuiPaper: {
                    rounded: {
                        borderRadius: 16,
                    },
                    elevation1: {
                        boxShadow: "0px 2px 8px rgba(0,0,0,0.08)",
                    },
                    elevation2: {
                        boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
                    },
                },
                MuiButton: {
                    root: {
                        borderRadius: 14,
                        textTransform: "none",
                        fontWeight: 500,
                        transition: "all 0.3s ease",
                    },
                    contained: {
                        boxShadow: "0px 4px 12px rgba(245, 184, 0, 0.2)",
                        "&:hover": {
                            boxShadow: "0px 6px 16px rgba(245, 184, 0, 0.3)",
                            transform: "translateY(-2px)",
                        },
                    },
                },
                MuiCard: {
                    root: {
                        borderRadius: 20,
                        boxShadow: "0px 4px 16px rgba(0,0,0,0.08)",
                    },
                },
                MuiDialog: {
                    paper: {
                        borderRadius: 20,
                    },
                },
                MuiDrawer: {
                    paper: {
                        borderRadius: "0 20px 20px 0",
                    },
                },
                MuiTextField: {
                    root: {
                        "& .MuiOutlinedInput-root": {
                            borderRadius: 14,
                        },
                    },
                },
                MuiChip: {
                    root: {
                        borderRadius: 12,
                    },
                },
            },
            mode,
        },
        locale
    );

    useEffect(() => {
        const i18nlocale = localStorage.getItem("i18nextLng");
        const browserLocale = i18nlocale?.substring(0, 2) ?? 'pt';

        if (browserLocale === "pt"){
            setLocale(ptBR);
        }else if( browserLocale === "en" ) {
            setLocale(enUS)
        }else if( browserLocale === "es" )
            setLocale(esES)

    }, []);

    useEffect(() => {
        window.localStorage.setItem("preferredTheme", mode);
    }, [mode]);



    return (
        <ColorModeContext.Provider value={{ colorMode }}>
            <ThemeProvider theme={theme}>
                <QueryClientProvider client={queryClient}>
                  <SocketContext.Provider value={SocketManager}>
                      <Routes />
                  </SocketContext.Provider>
                </QueryClientProvider>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

export default App;
