import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedCourse } from '../../../redux/courseSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import { updateCourseContent } from '../../../redux/courseSlice';
import {
  Box,
  Drawer,
  IconButton,
  Avatar,
  Stack,
  MenuItem,
  Select,
  Typography,
  Divider,
  TextField,
  CssBaseline,
  AppBar,
  Button,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  Paper,
  Container
} from '@mui/material';
import { Add } from '@mui/icons-material';
import Sidebar from '../CourseManage.js/SideBar';
import CloseIcon from '@mui/icons-material/Close';

const drawerWidth = 210;
const subMenuWidth = 180;
const headerHeight = 50; 

const Layout = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const CourseSection = ({ title, content, courseId }) => (
    <Box 
      sx={{ 
        mb: 4,
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: '#f5f5f5'
        }
      }}
      onClick={() => navigate('/course-edit', { 
        state: { 
          courseContent: {
            title,
            content,
            courseId: selectedCourse?.id
          }
        }
      })}
    >
      <Typography variant="h5" component="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
        {title}
      </Typography>
      {content.map((paragraph, index) => (
        <Typography key={index} paragraph sx={{ mb: 0.5 }}>
          {paragraph}
        </Typography>
      ))}
    </Box>
  );

  const HtmlSection = ({ content }) => (
    <Paper 
      elevation={2} 
      sx={{ 
        p: 3, 
        mb: 4,
        backgroundColor: '#f5f5f5',
        borderLeft: '4px solid rgb(10, 10, 10)',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: '#e0e0e0'
        }
      }}
      onClick={() => navigate('/edit-course', { 
        state: { 
          courseContent: {
            title: "HTML Content",
            content,
            courseId: selectedCourse?.id
          }
        }
      })}
    >
      <Typography variant="h5" component="h3" gutterBottom sx={{ 
        fontWeight: 'bold',
        color: '#555555'
      }}>
        HTML
      </Typography>
      <Divider/>
      {content.map((paragraph, index) => (
        <Typography key={index} paragraph sx={{ mb: 2 }}>
          {paragraph}
        </Typography>
      ))}
    </Paper>
  );



  const [showInput, setShowInput] = useState(false);
  const [category, setCategory] = useState('');
  const [mainMenuItems, setMainMenuItems] = useState([]);
  const [subMenuItems, setSubMenuItems] = useState([]);
  const [currentMenu, setCurrentMenu] = useState('main'); // 'main' or 'sub'

  // Get courses from both Redux and route state
  const reduxCourses = useSelector((state) => state.course.courses || []);
  const routeCourses = location.state?.allCourses || [];
  
  // Combine sources with Redux courses taking precedence
  const allCourses = reduxCourses.length > 0 ? reduxCourses : routeCourses;
  
  const selectedCourse = useSelector((state) => state.course.selectedCourse) || 
  location.state?.selectedCourse;
  const authors = selectedCourse?.authors || [];


  const toggleInput = (menuType) => {
    setCurrentMenu(menuType);
    setShowInput(!showInput);
  };

  const handleAddItem = () => {
    if (!category) return;
    
    if (currentMenu === 'main') {
      setMainMenuItems([...mainMenuItems, category]);
    } else {
      setSubMenuItems([...subMenuItems, category]);
    }
    
    setCategory('');
    setShowInput(false);
  };

   // Course content data
  const course1Content = [
    "Lorem ipsum dolor sit amet consectetur. Vitae blandit enim commodo eget at augue condimentum id tortor.",
    "Lorem ipsum dolor sit amet consectetur. Vitae blandit enim commodo eget at",
    "Lorem ipsum dolor sit amet consectetur. Vitae blandit enim commodo eget at augue condimentum id tortor.",
    "Lorem ipsum dolor sit amet consectetur. Vitae blandit enim commodo eget at"
  ];

  const course2Content = [
    "Lorem ipsum dolor sit amet consectetur. Vitae blandit enim commodo eget at augue condimentum id tortor.",
    "Lorem ipsum dolor sit amet consectetur. Vitae blandit enim commodo eget at",
    "Lorem ipsum dolor sit amet consectetur. Vitae blandit enim commodo eget at augue condimentum id tortor.",
    "Lorem ipsum dolor sit amet consectetur. Vitae blandit enim commodo eget at"
  ];

  const htmlContent = [
    "Lorem ipsum dolor sit amet consectetur. Nisi et duis lectus placerat et tempus vitae. Vulputate eget donec cursus id. Sit pelieniesque urna eu amet amet leo eget urna. Mattis orci tempus tristique at interatum ipsum faucibus. Duis mauris imperdiet risus in. Pellieniesque adipiscing nam purus leo nisi nulla dignissim amet. Vel vel cursus id ac aliquam. Gravida vulputate mattis cursus eu. Nisi duis morbi lectus at. Amet arcu dignissim in tempus rutrum auctor est at. Enim malesuada sit arcu volutpat quis scelerisque. Nisi sed cras in facilisi elementum ut. Mattis tortor scelerisque molestie aenean egestas platea elit. Tellus augue aliquet ultrices dignissim turpis. Augue posuere id faucibus ultricies malesuada."
  ];


  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      
      {/* Header */}
      <AppBar 
        position="fixed"
        sx={{
          width: `calc(100% - ${70 + subMenuWidth}px)`,
          ml: `${70 }px`,
          backgroundColor: 'white',
          color: 'black',
          boxShadow: 'none',
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
          height: headerHeight,
          zIndex: (theme) => theme.zIndex.drawer + 1
        }}
      >
        <Toolbar sx={{ 
          justifyContent: 'space-between',
          minHeight: `${headerHeight}px !important`,
          height: headerHeight
        }}>

          {/* Course Title (Left Side) */}
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          </Typography>

         <Stack direction="row" alignItems="center" spacing={4.5}>

          

            {/* Grouped Avatars */}
              <Stack direction="row" spacing={-1.5}>
              {authors.map((author, index) => (
                <Avatar
                  key={index}
                  sx={{
                    bgcolor: author.color || '#1e40af', // Fallback color
                    width: 32,
                    height: 32,
                    fontSize: 14,
                    fontWeight: 'bold',
                    border: '2px solid white',
                  }}
                  title={author.name} // Show name on hover
                >
                  {author.name.charAt(0)}
                </Avatar>
            ))}
             </Stack>
            
           
            <Box sx={{ width: 16 }} />
           <IconButton sx={{ p: 0, right:85 }}>
            <Avatar sx={{ 
              bgcolor: '#a5d6a7', 
              width: 32, 
              height: 32,
              border: '2px solid white'
            }}>
              <Add fontSize="small" />
            </Avatar>
          </IconButton>

           {/* Author Names */}
            <Typography variant="body1" sx={{ mr: 2 }}>
             {`Hi! ${authors.map(author => author.name).join(", ")}`}
            </Typography>

           </Stack>
        </Toolbar>
      </AppBar>

      {/* Left SideBar */}
      <Box sx={{ 
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        width: 70,
        zIndex: (theme) => theme.zIndex.drawer
      }}>
        <Sidebar />
      </Box>
      
      {/* Left Panel */}
       <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            mt: `${headerHeight}px`,
            left: 70,
            height: `calc(100vh - ${headerHeight}px)`,
            zIndex: (theme) => theme.zIndex.drawer - 1,
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        <Box sx={{ p: 0.1, flex: 1 }}>
         <Select
              fullWidth
              value={selectedCourse?.id || ''}
              onChange={(e) => {
                const course = allCourses.find(c => c.id.toString() === e.target.value);
                if (course)
                   dispatch(setSelectedCourse(course));
              }}
              displayEmpty
              size="small"
              sx={{
                height: '40px',
                '& .MuiSelect-select': {
                  padding: '8px 12px',
                 },
                  '& .MuiSelect-icon': {
                    color: 'text.primary' // Ensures dropdown icon is visible
                  }
              }}
              renderValue={(selected) => {
                if (!selected) {
                  return <em style={{ color: '#9e9e9e' }}>Course Name</em>;
                }
                const selectedCourse = allCourses.find(c => c.id.toString() === selected);
                return selectedCourse?.title || 'Course Name';
              }}
            >
              <MenuItem value="" disabled>
                <em>Select a Course</em>
              </MenuItem>
              {allCourses.map((course) => (
                 <MenuItem 
                    key={course.id} 
                    value={course.id}
                    sx={{
                      backgroundColor: selectedCourse?.id === course.id ? '#e3f2fd' : 'inherit',
                      '&:hover': {
                        backgroundColor: selectedCourse?.id === course.id ? '#bbdefb' : 'action.hover'
                      }
                    }}
                  >
                    {course.title}
                  </MenuItem>
              ))}
            </Select>

          <Typography variant="body2" sx={{ mt: 1 }}>
            Main Menu
          </Typography>
          <Divider sx={{ mt: 1 }} />
          
          <List>
            {allCourses.map((course) => (
              <ListItem 
                button 
                key={course.id}
                selected={selectedCourse?.id === course.id}
                onClick={() => dispatch(setSelectedCourse(course))}
              >
                <ListItemText primary={course.title} />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Add New Button at the bottom */}
            <Box sx={{ p: 1 }}>
          <Divider sx={{ mb: 0.2 }} /> 
          <Button 
            onClick={() => toggleInput('main')}
            fullWidth 
            sx={{
              color: '#000000',
              '&:hover': {
                backgroundColor: '#333333'
              }
            }}
          >
            + Add New
          </Button>
        </Box>
      </Drawer>

      {/* Main Content */}
           <Box
             component="main"
             sx={{
              position: 'absolute',
              top: `${headerHeight}px`,
              left: `${20 + drawerWidth + 10}px`,
              right: `${subMenuWidth}px`,
              bottom: 0,
              bgcolor: '#f9fafb',
              overflow: 'auto',
              p: 2
            }}
            >
      
         <Container maxWidth="lg" >
          <Paper elevation={0} sx={{ 
            p: 4, 
            backgroundColor: 'white',
            width: '100%' // Ensure it takes full width of the container
          }}>
            <CourseSection title="Course Title" content={course1Content} />
            <CourseSection title="Course Title" content={course2Content} />

            {/* Separate box for HTML content */}
            <HtmlSection content={htmlContent} />
            
          </Paper>
        </Container>


       {/* Pop-out Add Input for Main Menu */}
        {showInput && currentMenu === 'main' && (
          <Box
            sx={{
              p: 1,
              backgroundColor: '#fff',
              borderRadius: 1,
              boxShadow: 3,
              display: 'flex',
              alignItems: 'center',
              gap: 0.2,
              position: 'fixed', 
              bottom: 40, 
              left: `${70 + drawerWidth + 5}px`, // Align with main content left edge plus some padding
              right: `${subMenuWidth + 400}px`, // Align with right panel plus some padding
              zIndex: 1
            }}
          >
            <TextField
              placeholder={`Enter the name of new course category`}
              variant="standard"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              sx={{ flexGrow: 1 }}
            />
            <Button 
              onClick={handleAddItem}
              variant="contained" 
              sx={{
                backgroundColor: '#000000',
                color: '#ffffff',
                '&:hover': {
                  backgroundColor: '#333333'
                }
              }}
            >
              Add
            </Button>
            <IconButton onClick={() => setShowInput(false)} color="error">
              <CloseIcon />
            </IconButton>
          </Box>
        )}

        {/* Pop-out Add Input for Sub Menu */}
          {showInput && currentMenu === 'sub' && (
          <Box
            sx={{
              p: 1,
              backgroundColor: '#fff',
              borderRadius: 1,
              boxShadow: 3,
              display: 'flex',
              alignItems: 'center',
              gap: 0.1,
              position: 'fixed', 
              bottom: 40, 
             right: `${subMenuWidth + 16}px`, // Appears left next to right panel
             width: '500px',
              zIndex: 1
            }}
          >
            <TextField
              placeholder={`Enter the name of new course category`}
              variant="standard"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              sx={{ flexGrow: 1 }}
            />
            <Button 
              onClick={handleAddItem}
              variant="contained" 
              sx={{
                backgroundColor: '#000000',
                color: '#ffffff',
                '&:hover': {
                  backgroundColor: '#333333'
                }
              }}
            >
              Add
            </Button>
            <IconButton onClick={() => setShowInput(false)} color="error">
              <CloseIcon />
            </IconButton>
          </Box>
        )}

        
      </Box>

      {/* Right Panel*/}
      <Drawer
        variant="permanent"
        anchor="right"
        sx={{
          width: subMenuWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: subMenuWidth,
            boxSizing: 'border-box',
            mt: `${headerHeight}px`, // Consistent with headerHeight
            height: `calc(100vh - ${headerHeight}px)`,
          },
        }}
      >
        <Box sx={{ p: 2, flex: 1 }}>
          <Typography variant="body2">Sub Menu</Typography>
          <Divider sx={{ mt: 1 }} />
           {/* Sub Menu Items */}
          <List>
            {subMenuItems.map((item, index) => (
              <ListItem key={`sub-${index}`}>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </Box>
       

        {/* Add New Button at the bottom of submenu */}
              <Box sx={{ p: 1 }}>
          <Divider sx={{ mb: 0.2 }} /> {/* Added divider */}
          <Button 
            onClick={() => toggleInput('sub')}
            fullWidth
            sx={{
              color: '#000000',
              '&:hover': {
                backgroundColor: '#333333'
              }
            }}
          >
            + Add New
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Layout;