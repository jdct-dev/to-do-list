import { useState, useEffect } from "react";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  MoreHoriz as MoreIcon,
} from "@mui/icons-material";
import {
  Typography,
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
  IconButton,
  List,
  ListItem,
  Popover,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [toDoList, setTodoList] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(toDoList));
  }, [toDoList]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    console.log(event.key);
    if (event.key === "Enter") {
      event.preventDefault();
      addToDo(inputValue);
    }
  };

  const addToDo = (task) => {
    if (task.trim() === "") return;
    const newTask = {
      id: uuidv4(),
      task: task,
      completed: false,
    };
    setTodoList([...toDoList, newTask]);
    setInputValue("");
  };

  const completeToDo = (id) => {
    const newList = toDoList.map((item) =>
      item.id !== id ? item : { ...item, completed: !item.completed }
    );
    setTodoList(newList);
  };

  const clearTodo = () => {
    const newList = toDoList.filter((item) => !item.completed);
    setTodoList(newList);
  };

  const deleteToDo = (id) => {
    const newList = toDoList.filter((item) => item.id !== id);
    setTodoList(newList);
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMoreClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box display="flex" flexDirection="column" justifyContent="center">
      <Box
        className="App"
        width={"90%"}
        maxWidth={600}
        mx="auto"
        p={3}
        boxShadow={3}
        borderRadius={2}
        bgcolor="#fff"
      >
        <Typography variant="h3" component="h1" gutterBottom align="center">
          To-do List
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
          gap={2}
        >
          <TextField
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Add a new task..."
            fullWidth
          />
          <IconButton size="large" color="primary" onClick={handleMoreClick}>
            <MoreIcon />
          </IconButton>
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Box display="flex" flexDirection="column" p={1}>
              <IconButton
                size="large"
                color="success"
                onClick={() => {
                  addToDo(inputValue);
                  handleClose();
                }}
              >
                <AddIcon />
              </IconButton>
              <IconButton
                size="large"
                color="warning"
                onClick={() => {
                  clearTodo();
                  handleClose();
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Popover>
        </Box>

        <List
          sx={{
            overflow: "auto",
            maxHeight: "50vh",
          }}
        >
          {toDoList.map((item) => (
            <ListItem
              key={item.id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 2,
                px: 0,
              }}
              disableGutters
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={item.completed}
                    onChange={() => completeToDo(item.id)}
                  />
                }
                label={
                  <span
                    style={
                      item.completed
                        ? { textDecoration: "line-through", color: "#888" }
                        : {}
                    }
                  >
                    {item.task}
                  </span>
                }
              />
              <IconButton
                size="large"
                color="warning"
                onClick={() => deleteToDo(item.id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <Typography variant="body2" mt={2} mx="auto" color="text.secondary">
        &copy; 2025 Joseph Dương Công Tiếu
      </Typography>
    </Box>
  );
}

export default App;
