import { Delete } from "@mui/icons-material";
import {
  Grid,
  IconButton,
  Paper,
  Stack,
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
import SearchBar from "../../../components/SearchBar";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [copyUsers, setCopyUsers] = useState([]);

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
      .get(process.env.REACT_APP_BASE_API_URL + "admin/users", config)
      .then((response) => {
        setUsers(response.data);
        setCopyUsers(response.data);
      });
  }, []);

  const handleUserProfile = (userId) => {
    navigate(`/admin/users/${userId}`);
  };

  const handleDelete = (userId, index) => {
    axios
      .delete(
        process.env.REACT_APP_BASE_API_URL + `admin/users/${userId}`,
        config
      )
      .then(() => {
        var copy = [...users];
        copy.splice(index, 1);
        setUsers(copy);
      });
  };

  const handleOnSearchChange = (event) => {
    const searchValue = event.target.value.replace(/\s/g, "");

    if (searchValue.length >= 3) {
      var copy = [...users];
      copy = copy.filter((u) => {
        return (
          u.username.includes(searchValue) ||
          u.firstName.includes(searchValue) ||
          u.lastName.includes(searchValue) ||
          u.email.includes(searchValue)
        );
      });

      setUsers(copy);
    } else {
      setUsers(copyUsers);
    }
  };

  return (
    <Grid container>
      <Grid item xs={1}></Grid>
      <Grid item xs={10} sx={{ padding: "20px" }}>
        <Stack spacing={2}>
          <SearchBar barWidth={"100%"} handleOnChange={handleOnSearchChange} />
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
        </Stack>
      </Grid>
      <Grid item xs={1}></Grid>
    </Grid>
  );
};

export default UserList;
