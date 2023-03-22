import { Delete } from "@mui/icons-material";
import {
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authHeader from "../../../services/authentication/auth-header";
import dateUtils from "../../../utils/dateUtils";
const UserList = () => {
  const [users, setUsers] = useState([]);
  //   const [orderBy, setOrderBy] = useState("");
  //   const [order, setOrder] = useState("asc");

  const navigate = useNavigate();

  const config = {
    headers: authHeader(),
  };

  const headCells = [
    { id: "id", label: "ID" },
    { id: "username", label: "Username" },
    { id: "first_name", label: "First Name" },
    { id: "last_name", label: "Last Name" },
    { id: "email", label: "Email" },
    { id: "created_at", label: "Created At" },
    { id: "delete", label: "Delete" },
  ];

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BASE_API_URL + "users", config)
      .then((response) => {
        setUsers(response.data);
      });
  }, []);

  const handleUserProfile = (userId) => {
    navigate(`/admin/users/${userId}`);
  };

  const handleDelete = (userId, index) => {
    axios
      .delete(process.env.REACT_APP_BASE_API_URL + `users/${userId}`, config)
      .then(() => {
        var copy = [...users];
        copy.splice(index, 1);
        setUsers(copy);
      });
  };

  //   function stableSort(array, comparator) {
  //     const stabilizedThis = array.map((el, index) => [el, index]);
  //     stabilizedThis.sort((a, b) => {
  //       const order = comparator(a[0], b[0]);
  //       if (order !== 0) {
  //         return order;
  //       }
  //       return a[1] - b[1];
  //     });
  //     return stabilizedThis.map((el) => el[0]);
  //   }

  //   const handleSelectChange = (event) => {
  //     setOrderBy(event.target.value);
  //   };

  //   const handleSelectOrder = (event) => {
  //     setOrder(event.target.value);
  //   };

  return (
    <Grid container>
      <Grid item xs={1}></Grid>
      <Grid item xs={10} sx={{ padding: "20px" }}>
        {/* <Paper sx={{ padding: "20px", marginBottom: "10px" }}>
          <Stack direction={"row"} spacing={10} alignItems={"center"}>
            <Typography>Filter by:</Typography>
            <Stack direction={"row"} sx={{ width: "100%" }} spacing={10}>
              <FormControl fullWidth>
                <InputLabel>Column</InputLabel>
                <Select value={orderBy} onChange={handleSelectChange}>
                  {headCells.map((cell) => {
                    if (cell.id !== "delete") {
                      return (
                        <MenuItem key={cell.id} value={cell.label}>
                          {cell.label}
                        </MenuItem>
                      );
                    }
                    return null;
                  })}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Order</InputLabel>
                <Select value={orderBy} onChange={handleSelectOrder}>
                  <MenuItem value={"asc"}>Ascending</MenuItem>
                  <MenuItem value={"desc"}>Descending</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Stack>
        </Paper> */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {headCells.map((cell) => {
                  return (
                    <TableCell key={cell.id}>
                      <Typography>
                        <b>{cell.label}</b>
                      </Typography>
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>

            <TableBody>
              {users.map((user, index) => {
                return (
                  <TableRow key={user.id}>
                    <TableCell
                      sx={{ cursor: "pointer" }}
                      onClick={() => {
                        handleUserProfile(user.id);
                      }}
                    >
                      <b>{user.id}</b>
                    </TableCell>
                    <TableCell
                      sx={{ cursor: "pointer" }}
                      onClick={() => {
                        handleUserProfile(user.id);
                      }}
                    >
                      <b>{user.username}</b>
                    </TableCell>
                    <TableCell>{user.firstName}</TableCell>
                    <TableCell>{user.lastName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {dateUtils.getDateAndTime(user.createdAt)}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => {
                          handleDelete(user.id, index);
                        }}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={1}></Grid>
    </Grid>
  );
};

export default UserList;
