import { Container, Typography, Stack, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const languages = [
    {
      name: "Japanese",
      code: "ja",
    },
    {
      name: "Hindi",
      code: "hi",
    },
    {
      name: "Spanish",
      code: "es",
    },
    {
      name: "French",
      code: "fr",
    },
    {
      name: "Urdu",
      code: "ur",
    },
  ];

  const selectedClickHandler = (code: string) => {
    navigate(`/learn?language=${code}`);
  };

  return (
    <Container maxWidth={"sm"}>
      <Typography variant="h3" p={"2rem"} textAlign={"center"}>
        Welcome, Begin your journey of learning.
      </Typography>

      <Stack
        direction="row"
        spacing={"2rem"}
        p="2rem"
        alignItems={"center"}
        justifyContent={"center"}
      >
        {languages.map((i) => {
          return (
            <Button
              onClick={() => selectedClickHandler(i.code)}
              key={i.code}
              variant="contained"
            >
              {i.name}
            </Button>
          );
        })}
      </Stack>
    </Container>
  );
};

export default Home;
