import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const lightGray = "#f2f2f2";
const gray = "#cccccc";
const green = "#4caf50";
const white = "#ffffff";

const initialState = [
  {
    id: 1,
    name: "John Doe",
    gender: "Male",
    school: "Example University",
  },
  {
    id: 2,
    name: "Jane Smith",
    gender: "Female",
    school: "Another University",
  },
];

function StudentsPage() {
  const [students, setStudents] = useState(initialState);
  const [open, setOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({
    id: "",
    name: "",
    gender: "",
    school: "",
  });

  const [editStudent, setEditStudent] = useState({
    id: "",
    name: "",
    gender: "",
    school: "",
  });
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  const handleAddStudent = () => {
    // Add new student to the students array
    setStudents((prevStudents) => [...prevStudents, newStudent]);
    // Close the dialog
    handleClose();
  };

  const handleDeleteStudent = (id) => {
    // Filter out the student with the given id
    const updatedStudents = students.filter((student) => student.id !== id);
    setStudents(updatedStudents);
    // Show notification
    setNotification({
      open: true,
      message: "Student deleted successfully!",
      severity: "success",
    });
  };

  const handleEdit = (student) => {
    setEditStudent(student);
    setEditDialogOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  const handleUpdateStudent = () => {
    const index = students.findIndex(
      (student) => student.id === editStudent.id
    );
    if (index !== -1) {
      const updatedStudents = [...students];
      updatedStudents[index] = editStudent;
      setStudents(updatedStudents);
      setNotification({
        open: true,
        message: "Student updated successfully!",
        severity: "success",
      });
      setEditDialogOpen(false);
    }
  };

  const handleNotificationClose = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <div
      style={{
        backgroundColor: lightGray,
        padding: "20px",
        margin: "0 auto",
        maxWidth: "1000px",
        overflowY: "auto",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Student List</h1>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Add New Student
        </Button>
      </div>
      <Table style={{ border: `1px solid ${gray}` }}>
        <TableHead style={{ backgroundColor: green, color: white }}>
          <TableRow>
            <TableCell
              style={{ border: `1px solid ${gray}`, fontWeight: "bold" }}
            >
              ID
            </TableCell>
            <TableCell
              style={{ border: `1px solid ${gray}`, fontWeight: "bold" }}
            >
              Student Name
            </TableCell>
            <TableCell
              style={{ border: `1px solid ${gray}`, fontWeight: "bold" }}
            >
              Gender
            </TableCell>
            <TableCell
              style={{ border: `1px solid ${gray}`, fontWeight: "bold" }}
            >
              School
            </TableCell>
            <TableCell
              style={{ border: `1px solid ${gray}`, fontWeight: "bold" }}
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell style={{ border: `1px solid ${gray}` }}>
                {student.id}
              </TableCell>
              <TableCell style={{ border: `1px solid ${gray}` }}>
                {student.name}
              </TableCell>
              <TableCell style={{ border: `1px solid ${gray}` }}>
                {student.gender}
              </TableCell>
              <TableCell style={{ border: `1px solid ${gray}` }}>
                {student.school}
              </TableCell>
              <TableCell style={{ border: `1px solid ${gray}` }}>
                <Button
                  variant="contained"
                  component={Link}
                  to={`/students/${student.id}`}
                  style={{ marginRight: "8px" }}
                >
                  View
                </Button>
                <Button
                  variant="contained"
                  onClick={() => handleEdit(student)}
                  style={{ marginRight: "8px" }}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  onClick={() => handleDeleteStudent(student.id)}
                  color="error"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Student</DialogTitle>
        <DialogContent>
          <DialogContentText>Please enter student details:</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="ID"
            name="id"
            fullWidth
            value={newStudent.id}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Name"
            name="name"
            fullWidth
            value={newStudent.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Gender"
            name="gender"
            fullWidth
            value={newStudent.gender}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="School"
            name="school"
            fullWidth
            value={newStudent.school}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddStudent} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Student</DialogTitle>
        <DialogContent>
          <DialogContentText>Please update student details:</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="ID"
            name="id"
            fullWidth
            value={editStudent.id}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            label="Name"
            name="name"
            fullWidth
            value={editStudent.name}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            label="Gender"
            name="gender"
            fullWidth
            value={editStudent.gender}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            label="School"
            name="school"
            fullWidth
            value={editStudent.school}
            onChange={handleEditChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateStudent} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={handleNotificationClose}
      >
        <Alert
          onClose={handleNotificationClose}
          severity={notification.severity}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default StudentsPage;