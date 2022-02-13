import GlobalStyle from "../GlobalStyle";
import React from "react";

export default function ({ Component, pageProps }) {
  const [usuario, setUsuario] = React.useState("");
  const obtemUsuario = (user) => {
    setUsuario(user);
  };
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} usuario={usuario} obtemUsuario={obtemUsuario} />
    </>
  );
}
