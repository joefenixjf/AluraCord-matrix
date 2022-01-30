import { Box } from "@skynexui/components";
import appConfig from "../config.json";
import LoginBox from "../components/Login";

function PaginaInicial() {
  return (
    <>
      <Box
        styleSheet={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: appConfig.theme.colors.primary[500],
          backgroundImage:
            "url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundBlendMode: "multiply",
        }}
      >
        <LoginBox />
      </Box>
    </>
  );
}

export default PaginaInicial;
