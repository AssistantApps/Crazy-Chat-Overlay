import React, { useEffect, useState } from "react";
import { Route, Router } from "wouter";
import { ChakraProvider, DarkMode } from '@chakra-ui/react';

import { Routes } from "./constant/routes";
import { theme } from "./constant/theme";
import { DisplayPage } from "./pages/display/displayPage";
import { HomePage } from "./pages/homePage";
import { SettingPage } from "./pages/settingPage";
import { AppShell } from "./component/appShell";

export const App: React.FC = () => {
  const currentLocation = () => {
    return window.location.hash.replace(/^#/, "") || "/";
  };

  const navigate = (to: any) => (window.location.hash = to);

  const useHashLocation: any = () => {
    const [loc, setLoc] = useState(currentLocation());

    useEffect(() => {
      // this function is called whenever the hash changes
      const handler = () => setLoc(currentLocation());

      // subscribe to hash changes
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
            <Route path={`${Routes.setting}:id*`} component={SettingPage} />
            <Route path={`${Routes.display}:id*`} component={DisplayPage} />
            <Route component={HomePage} />
          </Router>
        </AppShell>
      </DarkMode>
    </ChakraProvider>
  );
}