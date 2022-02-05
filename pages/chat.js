import React from "react";
import appConfig from "../config.json";
import { Box, TextField, Button } from "@skynexui/components";
import Header from "../components/Header";
import MessageList from "../components/MessageList";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzkyNDk0MSwiZXhwIjoxOTU5NTAwOTQxfQ.lzFrVg0g1XtSjK2iKwL3DFHLbKy6rvbgd6KQ5X_29BM";

const SUPABASE_URL = "https://pcifwqiflysgretcymhn.supabase.co";

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// supabaseClient
//   .from("mensagens")
//   .select("*")
//   .then((dados) => {
//     console.log(dados.data);
//   });

export default function ChatPage({ usuario }) {
  console.log(usuario);
  // Sua lógica vai aqui
  const [mensagem, setMensagem] = React.useState("");
  const [listaMensagem, setListaMensagem] = React.useState([]);

  const filtraLista = (id) => {
    setListaMensagem([
      ...listaMensagem.filter((i) => {
        return i.id !== id;
      }),
    ]);
  };

  React.useEffect(() => {
    supabaseClient
      .from("mensagens")
      .select("*")
      .then(({ data }) => {
        // console.log("Dados: ", data);
        setListaMensagem(data.reverse());
      });
  }, []);

  const handleNovaMensagem = (novaMensagem) => {
    if (novaMensagem !== "") {
      const mensagem = {
        // id: listaMensagem.length + 1,
        de: usuario,
        texto: novaMensagem,
        created_at: new Date(),
      };

      supabaseClient
        .from("mensagens")
        .insert([mensagem])
        .then((qualÉAResposta) => {
          // console.log("Criando a Mensagem:", qualÉAResposta);
        });

      // setListaMensagem([mensagem, ...listaMensagem]);
      setMensagem("");
    }
  };

  // ./Sua lógica vai aqui
  return (
    <Box
      styleSheet={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: appConfig.theme.colors.primary[500],
        backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundBlendMode: "multiply",
        color: appConfig.theme.colors.neutrals["000"],
      }}
    >
      <Box
        styleSheet={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
          borderRadius: "5px",
          backgroundColor: appConfig.theme.colors.neutrals[700],
          height: "100%",
          maxWidth: "95%",
          maxHeight: "95vh",
          padding: "32px",
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: "relative",
            display: "flex",
            flex: 1,
            height: "80%",
            backgroundColor: appConfig.theme.colors.neutrals[600],
            flexDirection: "column",
            borderRadius: "5px",
            padding: "16px",
          }}
        >
          {/* {listaMensagem.map((mensagem) => {  })} */}
          <MessageList mensagens={listaMensagem} deletaMsg={filtraLista} />
          <Box
            as="form"
            styleSheet={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              value={mensagem}
              onChange={(e) => {
                setMensagem(e.target.value);
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleNovaMensagem(mensagem);
                }
              }}
              placeholder="Insira sua mensagem aqui..."
              type="textarea"
              styleSheet={{
                width: "100%",
                border: "0",
                resize: "none",
                borderRadius: "5px",
                padding: "6px 8px",
                backgroundColor: appConfig.theme.colors.neutrals[800],
                marginRight: "12px",
                color: appConfig.theme.colors.neutrals[200],
              }}
            />
            <Button
              onClick={() => handleNovaMensagem(mensagem)}
              label="Enviar"
              size="md"
              styleSheet={{
                height: "45px",
                top: "-5px",
              }}
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
