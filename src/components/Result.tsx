import {
  Button,
  Container,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { clearState } from "../store/slices";
import { useNavigate } from "react-router-dom";
import { countMatchingElements } from "../utils/features";

const Result = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { words, result } = useSelector(
    (state: { root: StateType }) => state.root
    );
    
    const correntAns = countMatchingElements(result, words.map(i=>i.meaning));
  const percentage = (correntAns / words.length) * 100;

  const resetHandler = () => {
    dispatch(clearState());
    navigate("/")
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h3" color={"primary"} m={"2rem 0"}>
        Result
      </Typography>
      <Typography m="1rem" variant="h6">
        You got {correntAns} right out of {words?.length}
      </Typography>

      <Stack direction="row" justifyContent={"space-evenly"}>
        <Stack>
          <Typography m="1rem 0" variant="h5">
            Your Answer
          </Typography>
          <List>
            {result.map((i, index) => (
              <ListItem key={index}>
                {index + 1} - {i}
              </ListItem>
            ))}
          </List>
        </Stack>

        <Stack>
          <Typography m="1rem 0" variant="h5">
            Corrent Answer
          </Typography>
          <List>
            {words?.map((i, index) => (
              <ListItem key={index}>
                {index + 1} - {i.meaning}
              </ListItem>
            ))}
          </List>
        </Stack>
      </Stack>

      <Typography
        m="1rem"
        variant="h5"
        color={percentage > 50 ? "green" : "red"}
      >
        {percentage > 50 ? "Pass" : "Fail"}
      </Typography>

      <Button sx={{ margin: "1rem" }} variant="contained" onClick={resetHandler}>
        Reset
      </Button>
    </Container>
  );
};

export default Result;
