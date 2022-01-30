import appConfig from "../config.json";
import { Box, Button, Text, TextField, Image } from "@skynexui/components";
import Titulo from "./Titulo";
import React, { useState } from "react";
import { useRouter } from "next/router";

function LoginBox() {
  const [username, setUsername] = useState("");
  const [activeUsername, setActiveUsername] = useState("");
  const roteamento = useRouter();

  const activatedUsername = (username) => {
    if (username.length >= 3) {
      setActiveUsername(username);
    } else {
      setActiveUsername("");
    }
  };

  return (
    <Box
      styleSheet={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: {
          xs: "column",
          sm: "row",
        },
        width: "100%",
        maxWidth: "700px",
        borderRadius: "5px",
        padding: "32px",
        margin: "16px",
        boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
        backgroundColor: appConfig.theme.colors.neutrals[700],
      }}
    >
      {/* Formulário */}
      <Box
        as="form"
        onSubmit={(e) => {
          e.preventDefault();
          roteamento.push("/chat");
        }}
        styleSheet={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: { xs: "100%", sm: "50%" },
          textAlign: "center",
          marginBottom: "32px",
        }}
      >
        <Titulo tag="h2">Boas vindas de volta!</Titulo>
        <Text
          variant="body3"
          styleSheet={{
            marginBottom: "32px",
            color: appConfig.theme.colors.neutrals[300],
          }}
        >
          {appConfig.name}
        </Text>

        <TextField
          as="input"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            activatedUsername(e.target.value);
          }}
          fullWidth
          textFieldColors={{
            neutral: {
              textColor: appConfig.theme.colors.neutrals[200],
              mainColor: appConfig.theme.colors.neutrals[900],
              mainColorHighlight: appConfig.theme.colors.primary[500],
              backgroundColor: appConfig.theme.colors.neutrals[800],
            },
          }}
        />
        <Button
          type="submit"
          label="Entrar"
          fullWidth
          buttonColors={{
            contrastColor: appConfig.theme.colors.neutrals["000"],
            mainColor: appConfig.theme.colors.primary[500],
            mainColorLight: appConfig.theme.colors.primary[400],
            mainColorStrong: appConfig.theme.colors.primary[600],
          }}
        />
      </Box>
      {/* Formulário */}

      {/* Photo Area */}
      <Box
        styleSheet={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "200px",
          padding: "16px",
          backgroundColor: appConfig.theme.colors.neutrals[800],
          border: "1px solid",
          borderColor: appConfig.theme.colors.neutrals[999],
          borderRadius: "10px",
          flex: 1,
          minHeight: "240px",
        }}
      >
        <Image
          styleSheet={{
            borderRadius: "50%",
            marginBottom: "16px",
          }}
          src={`https://github.com/${activeUsername}.png`}
        />
        <Text
          variant="body4"
          styleSheet={{
            color: appConfig.theme.colors.neutrals[200],
            backgroundColor: appConfig.theme.colors.neutrals[900],
            padding: "3px 10px",
            borderRadius: "1000px",
          }}
        >
          {activeUsername}
        </Text>
      </Box>
      {/* Photo Area */}
    </Box>
  );
}

export default LoginBox;
