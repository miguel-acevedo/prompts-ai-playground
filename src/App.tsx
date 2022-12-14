import React, {useEffect} from 'react';
import {PromptEditor} from './components/PromptEditor';
import {Box, Container, createMuiTheme, CssBaseline, ThemeProvider, Typography,} from "@material-ui/core";
import {useHotkeys} from "react-hotkeys-hook";
import {useDispatch} from "react-redux";
import {fetchForCurrentTab, updateTabIndex, normalizeConversations} from "./slices/editorSlice";
import Header from "./components/Header";
import TemplateDialog from "./components/dialogs/TemplateDialog";
import ApiKeyDialog from "./components/dialogs/ApiKeyDialog";

function App() {
    const dispatch = useDispatch();
    const theme = createMuiTheme({
        palette: {
            type: "dark"
        }
    });

    useEffect(() => {
        dispatch(normalizeConversations());
    });

    useHotkeys('ctrl+enter,cmd+enter', () => {
        dispatch(fetchForCurrentTab());
    }, {filter: () => true});
    useHotkeys('ctrl+1', () => {
        dispatch(updateTabIndex(0));
    });
    useHotkeys('ctrl+2', () => {
        dispatch(updateTabIndex(1));
    });
    useHotkeys('ctrl+3', () => {
        dispatch(updateTabIndex(2));
    });
    useHotkeys('ctrl+4', () => {
        dispatch(updateTabIndex(3));
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>

            <ApiKeyDialog/>
            <TemplateDialog/>

            <Header/>

            <Container maxWidth={"lg"}>
                <Box mt={2}>
                    <PromptEditor/>
                </Box>
                {/*<Box mt={2}>
                    <ModeTabs/>
                </Box>*/}
                <Box mt={2}>
                    <Typography>
                    {/* Computers will overtake humans with AI within the next 100 years. When that happens, we need to make sure the computers have goals aligned with ours. */}
                    "My brain is only a receiver, in the Universe there is a core from which we obtain knowledge, strength and inspiration. I have not penetrated into the secrets of this core, but I know that it exists." - Nikola Tesla
                    </Typography>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default App;
