import { useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { createApolloClient } from "@/lib/apollo-client/apollo-client";
import { Toaster } from "react-hot-toast";
import { Header } from "@/components/common/header/header";

function App({ Component, pageProps }: AppProps) {
  const apolloClient = useMemo(() => createApolloClient(), []);
  return (
    <ApolloProvider client={apolloClient}>
      <Toaster />
      <Header />
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
export default App;
