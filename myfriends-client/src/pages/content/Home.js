import { Grid } from "@mui/material";
import { Stack } from "@mui/system";
import SearchBar from "../../components/SearchBar";

const Home = () => {
  return (
    <Grid container>
      <Stack sx={{ width: "100%", alignItems: "center" }} spacing={5}>
        <SearchBar />
        <Stack
          sx={{ border: "1px solid black", width: "50%" }}
          spacing={1}
        ></Stack>
      </Stack>
    </Grid>
  );
};

export default Home;
