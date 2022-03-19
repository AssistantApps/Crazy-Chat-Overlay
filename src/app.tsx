import { Router, Route } from "wouter";
import { ChakraProvider, DarkMode } from '@chakra-ui/react';

import { Routes } from "./constant/routes";
import { theme } from "./constant/theme";
import { DisplayPage } from "./pages/display/displayPage";
import { HomePage } from "./pages/homePage";
import { SettingPage } from "./pages/settingPage";
import { AppShell } from "./component/appShell";

export const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <DarkMode>
        <AppShell>
          <Router>
            <Route path={Routes.home} component={HomePage} />
            <Route path={Routes.setting} component={SettingPage} />
            <Route path={Routes.display} component={DisplayPage} />
          </Router>
        </AppShell>
      </DarkMode>
    </ChakraProvider>
  );
}