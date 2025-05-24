import React from 'react';
import { List, ListItem, ListItemText, Paper } from '@mui/material';
import { useLocation } from 'react-router-dom';

const CourseMenu = () => {
  const location = useLocation();
  const { allCourses } = location.state || {};

  return (
    <Paper elevation={3} sx={{ p: 2, minWidth: 250 }}>
      <List>
        <ListItem>
          <ListItemText primary="All Courses" sx={{ fontWeight: 'bold' }} />
        </ListItem>
        {allCourses?.map((course) => (
          <ListItem button key={course.id}>
            <ListItemText primary={course.title} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default CourseMenu;