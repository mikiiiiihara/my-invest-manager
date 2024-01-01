import { useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { TickerProvider } from "@/contexts/tickers-context";
import { createApolloClient } from "@/lib/apollo-client/apollo-client";

function App({ Component, pageProps }: AppProps) {
  const apolloClient = useMemo(() => createApolloClient(), []);
  return (
    <ApolloProvider client={apolloClient}>
      <TickerProvider>
        <Component {...pageProps} />
      </TickerProvider>
    </ApolloProvider>
  );
}
export default App;
