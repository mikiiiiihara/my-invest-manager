import type { Preview } from "@storybook/react";
import "bootstrap/dist/css/bootstrap.min.css";
// グローバルCSS
import "../src/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import { useMemo } from "react";
import { createApolloClient } from "../src/lib/apollo-client/apollo-client";
import React from "react";
import { Toaster } from "react-hot-toast";
import { Header } from "../src/components/common/header/header";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;

const withProvider = (Story: React.ComponentType) => {
  const apolloClient = useMemo(() => createApolloClient(), []);
  return (
    <ApolloProvider client={apolloClient}>
      <Toaster />
      <Header />
      <Story />
    </ApolloProvider>
  );
};

export const decorators = [withProvider]; // ここに書き足すと、全ストーリーに同じProviderが強制的に適用される
