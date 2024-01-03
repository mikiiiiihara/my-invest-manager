import { useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { TickerProvider } from "@/contexts/tickers-context";
import { createApolloClient } from "@/lib/apollo-client/apollo-client";
import { Toaster } from "react-hot-toast";

function App({ Component, pageProps }: AppProps) {
  const apolloClient = useMemo(() => createApolloClient(), []);
  return (
    <ApolloProvider client={apolloClient}>
      <TickerProvider>
        <div>
          <Toaster />
        </div>
        <Component {...pageProps} />
      </TickerProvider>
    </ApolloProvider>
  );
}
export default App;
