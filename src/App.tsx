import { useState, useEffect } from "react";
import { Router, Route } from "wouter";
import { ChakraProvider, DarkMode } from '@chakra-ui/react';

import { Routes } from "./constant/routes";
import { theme } from "./constant/theme";
import { DisplayPage } from "./pages/display";
import { HomePage } from "./pages/homePage";
import { SettingPage } from "./pages/settingPage";
import { AppShell } from "./component/appShell";

export const App: React.FC = () => {
  const currentLocation = () => {
    return window.location.hash.replace(/^#/, "") || "/";
  };

  const navigate = (to: string) => (window.location.hash = to);

  const useHashLocation: any = () => {
    const [loc, setLoc] = useState(currentLocation());

    useEffect(() => {
      const handler = () => setLoc(currentLocation());

      window.addEventListener("hashchange", handler);
      return () => window.removeEventListener("hashchange", handler);
    }, []);

    return [loc, navigate];
  };

  return (
    <ChakraProvider theme={theme}>
      <DarkMode>
        <AppShell>
          <Router hook={useHashLocation}>
            <Route path={Routes.home} component={HomePage} />
            <Route path={Routes.display} component={DisplayPage} />
            <Route path={Routes.setting} component={SettingPage} />
          </Router>
        </AppShell>
      </DarkMode>
    </ChakraProvider>
  );
}