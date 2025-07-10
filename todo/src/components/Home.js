import React, { useState, useEffect } from "react";
import {
  Container, Typography, Box, TextField, Button, Paper,
  List, ListItem, ListItemText, IconButton
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

const Home = ({ user, onLogout }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);

  const API_URL = "http://localhost:3001/api/tasks";
  const token = "mysecrettoken";

  useEffect(() => {
    fetch(`${API_URL}?email=${user}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error("Failed to fetch tasks:", err));
  }, [user]);

  const handleAddOrUpdateTask = () => {
    if (name.trim() === "" || description.trim() === "") return;

    const payload = { name, description, email: user };

    if (editId !== null) {
      fetch(`${API_URL}/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      })
        .then(res => res.json())
        .then(updated => {
          setTasks(tasks.map(t => (t.id === updated.id ? updated : t)));
          setName("");
          setDescription("");
          setEditId(null);
        });
    } else {
      fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      })
        .then(res => res.json())
        .then(newTask => {
          setTasks([...tasks, newTask]);
          setName("");
          setDescription("");
        });
    }
  };

  const handleDelete = (id) => {
    fetch(`${API_URL}/${id}?email=${user}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    }).then(() => {
      setTasks(tasks.filter(t => t.id !== id));
    });
  };

  const handleEdit = (task) => {
    setName(task.name);
    setDescription(task.description);
    setEditId(task.id);
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" align="center">Welcome, {user}</Typography>
        <Box mt={2} display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Task Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
          />
          <Box display="flex" gap={2}>
            <Button variant="contained" onClick={handleAddOrUpdateTask}>
              {editId !== null ? "Update" : "Add"}
            </Button>
            <Button variant="outlined" onClick={onLogout}>Logout</Button>
          </Box>
        </Box>

        <Paper elevation={3} sx={{ mt: 4 }}>
          <List>
            {tasks.map((t) => (
              <ListItem
                key={t.id}
                secondaryAction={
                  <>
                    <IconButton onClick={() => handleEdit(t)}><Edit /></IconButton>
                    <IconButton onClick={() => handleDelete(t.id)}><Delete /></IconButton>
                  </>
                }
              >
                <ListItemText
                  primary={t.name}
                  secondary={`Description: ${t.description}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </Container>
  );
};

export default Home;
