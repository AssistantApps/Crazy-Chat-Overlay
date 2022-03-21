import { ChakraProvider, DarkMode } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './app';
import { AppShell } from './component/appShell';
import { theme } from "./constant/theme";
import { DependencyInjectionProvider } from './integration/dependencyInjection';
import './scss/forty/main.scss';
import './scss/index.scss';

const reactApp = (
  <React.StrictMode>
    <DependencyInjectionProvider>
      <ChakraProvider theme={theme}>
        <DarkMode>
          <AppShell key={window.location?.hash ?? 'test'}>
            <App />
          </AppShell>
        </DarkMode>
      </ChakraProvider>
    </DependencyInjectionProvider>
  </React.StrictMode>
);
ReactDOM.render(
  reactApp,
  document.getElementById('assistantapps-chat')
);

