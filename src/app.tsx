import React, { useEffect, useState } from "react";
import { Route, Router } from "wouter";

import { Routes } from "./constant/routes";
import { DisplayPage } from "./pages/display/displayPage";
import { HomePage } from "./pages/homePage";
import { SettingPage } from "./pages/settingPage";

const currentLocation = () => {
  console.log('currentLocation ', window.location.hash.replace(/^#/, "") || "/");
  return window.location.hash.replace(/^#/, "") || "/";
};

const navigate = (to: any) => (window.location.hash = to);

const useHashLocation: any = () => {
  const [loc, setLoc] = useState(currentLocation());

  useEffect(() => {
    // this function is called whenever the hash changes
    const handler = () => {
      console.log('hi');
      console.log(currentLocation());
      setLoc(currentLocation())
    };

    // subscribe to hash changes
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  return [loc, navigate];
};

export const App: React.FC = () => {
  return (
    <Router base="/Crazy-Chat-Overlay" hook={useHashLocation}>
      <Route path={Routes.setting + ':id*'} component={SettingPage} />
      <Route path={Routes.display + ':id*'} component={DisplayPage} />
      <Route component={HomePage} />
    </Router>
  );
}