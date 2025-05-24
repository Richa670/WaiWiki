import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setSelectedCourse} from '../../../redux/courseSlice';
import {
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Container,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  IconButton,
  Stack
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { Visibility, Link } from "@mui/icons-material";
import Author from './Author';

const Course = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [level, setLevel] = useState('');
  const [courseTitle, setCourseTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [courses, setCourses] = useState(() => {
    // Initialize state from localStorage
    const savedCourses = localStorage.getItem('courses');
    return savedCourses ? JSON.parse(savedCourses) : [];
  });
  const navigate = useNavigate();


  // Save to localStorage whenever courses change
  useEffect(() => {
    localStorage.setItem('courses', JSON.stringify(courses));
    console.log('Courses saved:', courses); // Debug log
  }, [courses]);

  const handleLevelChange = (event) => {
    setLevel(event.target.value);
  };

   const handleViewCourse = (course) => {
    dispatch(setSelectedCourse(course)); 
    navigate('/course-content',  {
      state: { 
      selectedCourse: course,
      allCourses: courses // Pass all courses to the next page
    } 
   });
   };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCourseTitle('');
    setLevel('');
    setAuthor('');
  };

  // Filter courses based on search query
  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.level.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.authors.some(a => a.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSubmit = () => {
    if (!courseTitle || !level || !author) {
      alert('Please fill all fields');
      return;
    }

    const newCourse = {
      id: Date.now(),
      title: courseTitle,
      level: level,
      authors: [{
        name: author,
        color: `#${Math.floor(Math.random()*16777215).toString(16)}`
      }]
    };

    // Update the courses state
    setCourses(prevCourses => [...prevCourses, newCourse]);
    
    // Close dialog and reset form
    handleCloseDialog();
  };

  return (
    <Author>
      <Box sx={{ 
        minHeight: '100vh',
        backgroundColor: 'grey.50',
        py: 8,
        px: { xs: 2, sm: 3, md: 4 }
      }}>
        <Container maxWidth="xxl">
          <Paper elevation={3} sx={{ p: 6, borderRadius: 2 }}>
            {/* Header row with title, search, and button */}
            <Box sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 2,
              mb: 4
            }}>
              <Box>
                <Typography variant="h5" component="h1" sx={{ fontWeight: 600 }}>
                  All courses
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Based on your profile, preferences, and activity like applies, searches, and saves
                </Typography>
              </Box>
              
              <Box sx={{
                display: 'flex',
                gap: 2,
                alignItems: 'center',
                flexWrap: 'wrap'
              }}>
                <TextField
                  size="small"
                  placeholder="Search"
                  variant="outlined"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ minWidth: 250 }}
                />
                
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={handleOpenDialog}
                  sx={{
                    backgroundColor: '#91e0c1',
                    color: '#1b2452',
                    borderRadius: '10px',
                    textTransform: 'none',
                    fontWeight: '500',
                    '&:hover': {
                      backgroundColor: '#7ed6b2',
                    },
                    paddingX: 2.0,
                    paddingY: 1.2,
                    fontSize: '15px',
                  }}
                >
                  Add New
                </Button>
              </Box>
            </Box>
            
            {/* Course Table */}
            <TableContainer component={Paper} sx={{ margin: 2 }}>
              <Table>
                <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableRow>
                    <TableCell>Course ID</TableCell>
                    <TableCell>Course Title</TableCell>
                    <TableCell>Level</TableCell>
                    <TableCell>Author</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredCourses.map((course, index) => (
                    <TableRow key={`${course.id}-${index}`} hover>
                      <TableCell>{course.id}</TableCell>
                      <TableCell>{course.title}</TableCell>
                      <TableCell>{course.level}</TableCell>
                      <TableCell spacing={"0.2px"}>
                        <Stack direction="row">
                          {course.authors.map((author, idx) => (
                            <Avatar
                              key={idx}
                              sx={{
                                bgcolor: author.color,
                                color: "white",
                                width: "30px",
                                height: "30px",
                                fontWeight: "bold",
                                fontSize: "0.9rem",
                                border: "2px solid white",
                                zIndex: course.authors.length - idx,
                                marginLeft: idx === 0 ? 0 : "-10px",
                              }}
                            >
                              {author.name.charAt(0)}
                            </Avatar>
                          ))}
                        </Stack>
                      </TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                          <IconButton 
                            size="small"
                            onClick={() => handleViewCourse(course)}
                          >
                            <Visibility fontSize="small" />
                          </IconButton>
                          <IconButton size="small">
                            <Link fontSize="small" />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Show All Button */}
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Button variant="text" sx={{ color: 'secondary.main' }}>
                Show All
              </Button>
            </Box>
          </Paper>
        </Container>

        {/* Add New Course Dialog */}
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>
            <Typography variant="h6">Add New Course</Typography>
          </DialogTitle>
          <DialogContent>
            <Box sx={{ mt: 2 }}>
              <TextField
                label="Course Title"
                fullWidth
                margin="normal"
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
              />

              <FormControl fullWidth margin="normal">
                <InputLabel>Level</InputLabel>
                <Select
                  value={level}
                  onChange={handleLevelChange}
                  label="Level"
                >
                  <MenuItem value="Beginner">Beginner</MenuItem>
                  <MenuItem value="Intermediate">Intermediate</MenuItem>
                  <MenuItem value="Advanced">Advanced</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Author"
                fullWidth
                margin="normal"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'flex-start', px: 3, pb: 2 }}>
            <Button 
              onClick={handleSubmit} 
              variant="contained" 
              sx={{ 
                backgroundColor: '#2b2b2b',
                mr: 2
              }}
            >
              Add
            </Button>
            <Button 
              onClick={handleCloseDialog}
              variant="outlined"
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Author>
  );
};

export default Course;