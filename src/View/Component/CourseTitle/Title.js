import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedCourse } from '../../../redux/courseSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import { updateCourseContent } from '../../../redux/courseSlice';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  Toolbar,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Divider,
  Select,
  MenuItem,
  Tabs,
  Tab,
  TextField,
  IconButton,
  Button,
  Stack,
  InputLabel,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import { 
  MoreVert,
  FormatBold,
  FormatItalic,
  HorizontalRule,
  Add,
  FormatListBulleted,
  FormatListNumbered,
  Code,
  CheckBox,
  Close as CloseIcon,
  Link as LinkIcon
} from "@mui/icons-material";
import Sidebar from '../CourseManage.js/SideBar';


const drawerWidth = 240;
const headerHeight = 50;
const subMenuWidth = 180;

export default function Title() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  
   // Get courses from both Redux and route state
    const reduxCourses = useSelector((state) => state.course.courses || []);
    const routeCourses = location.state?.allCourses || [];
    
    // Combine sources with Redux courses taking precedence
    const allCourses = reduxCourses.length > 0 ? reduxCourses : routeCourses;
    
    const selectedCourse = useSelector((state) => state.course.selectedCourse) || 
    location.state?.selectedCourse;
    const authors = selectedCourse?.authors || [];
  
  const [tab, setTab] = useState(0);
  const [fontSize, setFontSize] = useState('10');
  const [fontFamily, setFontFamily] = useState('Arial');
  const [heading, setHeading] = useState('Heading 1');
  const [formatting, setFormatting] = useState({
    bold: false,
    italic: false,
    list: null, // 'bullet' or 'number'
    code: false,
    heading: null // 1-6 or null
  });
  const [alignment, setAlignment] = useState('left');
  const [content, setContent] = useState('');
  const textareaRef = useRef(null);
  const [isCodeMode, setIsCodeMode] = useState(false);
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const handleTabChange = (event, newValue) => setTab(newValue);

  const avatars = ['AG', 'BG', 'CG'];
  const avatarColors = {
    AG: '#d50000',
    BG: '#a5d6a7',
    default: '#1e40af',
  };

  const [showInput, setShowInput] = useState(false);
  const [category, setCategory] = useState('');
  const [mainMenuItems, setMainMenuItems] = useState([]);
  const [subMenuItems, setSubMenuItems] = useState([]);
  const [currentMenu, setCurrentMenu] = useState('main');

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

  // Formatting functions
  const toggleBold = () => {
    setFormatting(prev => ({
      ...prev,
      bold: !prev.bold
    }));
    applyFormatting('bold');
  };

  const toggleItalic = () => {
    setFormatting(prev => ({
      ...prev,
      italic: !prev.italic
    }));
    applyFormatting('italic');
  };

  const toggleBulletList = () => {
    setFormatting(prev => ({
      ...prev,
      list: prev.list === 'bullet' ? null : 'bullet'
    }));
    applyFormatting('bullet');
  };

  const toggleNumberedList = () => {
    setFormatting(prev => ({
      ...prev,
      list: prev.list === 'number' ? null : 'number'
    }));
    applyFormatting('number');
  };

  const toggleCode = () => {
    setFormatting(prev => ({
      ...prev,
      code: !prev.code
    }));
    applyFormatting('code');
  };

  const setHeadingLevel = (level) => {
    setFormatting(prev => ({
      ...prev,
      heading: prev.heading === level ? null : level
    }));
    applyFormatting('heading', level);
  };

  const insertHorizontalRule = () => {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    
    // Insert markdown horizontal rule
    const newText = content.substring(0, start) + '\n---\n' + content.substring(end);
    
    setContent(newText);
    
    // Move cursor to after the inserted HR
    setTimeout(() => {
      textarea.selectionStart = start + 5;
      textarea.selectionEnd = start + 5;
      textarea.focus();
    }, 0);
  };

  const handleLinkDialogOpen = () => {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    
    setLinkText(selectedText);
    setLinkDialogOpen(true);
  };

  const handleLinkDialogClose = () => {
    setLinkDialogOpen(false);
    setLinkUrl('');
    setLinkText('');
  };

  const insertLink = () => {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    
    let linkMarkdown = '';
    if (linkText && linkUrl) {
      linkMarkdown = `[${linkText}](${linkUrl})`;
    } else if (linkUrl) {
      linkMarkdown = `[${linkUrl}](${linkUrl})`;
    } else {
      // If no URL provided, just insert empty link syntax
      linkMarkdown = `[]()`;
    }
    
    const newText = content.substring(0, start) + linkMarkdown + content.substring(end);
    setContent(newText);
    
    // Move cursor appropriately
    setTimeout(() => {
      if (!linkText && !linkUrl) {
        // Place cursor between the square brackets if no text was selected
        textarea.selectionStart = start + 1;
        textarea.selectionEnd = start + 1;
      } else if (!linkUrl) {
        // Place cursor between the parentheses if URL is empty
        textarea.selectionStart = start + linkMarkdown.indexOf('(') + 1;
        textarea.selectionEnd = start + linkMarkdown.indexOf('(') + 1;
      } else {
        // Place cursor after the link if everything was provided
        textarea.selectionStart = start + linkMarkdown.length;
        textarea.selectionEnd = start + linkMarkdown.length;
      }
      textarea.focus();
    }, 0);
    
    handleLinkDialogClose();
  };

  const applyFormatting = (type, value = null) => {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    let newText = content;
    
    switch (type) {
      case 'bold':
        if (selectedText) {
          newText = content.substring(0, start) + 
                   (formatting.bold ? selectedText : `**${selectedText}**`) + 
                   content.substring(end);
        } else {
          newText = content.substring(0, start) + '****' + content.substring(end);
          setTimeout(() => {
            textarea.selectionStart = start + 2;
            textarea.selectionEnd = start + 2;
            textarea.focus();
          }, 0);
        }
        break;
        
      case 'italic':
        if (selectedText) {
          newText = content.substring(0, start) + 
                   (formatting.italic ? selectedText : `*${selectedText}*`) + 
                   content.substring(end);
        } else {
          newText = content.substring(0, start) + '**' + content.substring(end);
          setTimeout(() => {
            textarea.selectionStart = start + 1;
            textarea.selectionEnd = start + 1;
            textarea.focus();
          }, 0);
        }
        break;
        
      case 'bullet':
        if (selectedText) {
          const lines = selectedText.split('\n');
          const formattedLines = lines.map(line => line ? `- ${line}` : line);
          newText = content.substring(0, start) + 
                   formattedLines.join('\n') + 
                   content.substring(end);
        } else {
          newText = content.substring(0, start) + '- ' + content.substring(end);
          setTimeout(() => {
            textarea.selectionStart = start + 2;
            textarea.selectionEnd = start + 2;
            textarea.focus();
          }, 0);
        }
        break;
        
      case 'number':
        if (selectedText) {
          const lines = selectedText.split('\n');
          const formattedLines = lines.map((line, i) => line ? `${i + 1}. ${line}` : line);
          newText = content.substring(0, start) + 
                   formattedLines.join('\n') + 
                   content.substring(end);
        } else {
          newText = content.substring(0, start) + '1. ' + content.substring(end);
          setTimeout(() => {
            textarea.selectionStart = start + 3;
            textarea.selectionEnd = start + 3;
            textarea.focus();
          }, 0);
        }
        break;
        
      case 'heading':
        if (selectedText) {
          const headingPrefix = '#'.repeat(value) + ' ';
          newText = content.substring(0, start) + 
                   headingPrefix + selectedText + 
                   content.substring(end);
        } else {
          const headingPrefix = '#'.repeat(value) + ' ';
          newText = content.substring(0, start) + headingPrefix + content.substring(end);
          setTimeout(() => {
            textarea.selectionStart = start + headingPrefix.length;
            textarea.selectionEnd = start + headingPrefix.length;
            textarea.focus();
          }, 0);
        }
        break;
        
      case 'code':
        if (selectedText) {
          newText = content.substring(0, start) + 
                   (formatting.code ? selectedText : '```\n' + selectedText + '\n```') + 
                   content.substring(end);
        } else {
          newText = content.substring(0, start) + '```\n\n```' + content.substring(end);
          setTimeout(() => {
            textarea.selectionStart = start + 4;
            textarea.selectionEnd = start + 4;
            textarea.focus();
          }, 0);
        }
        break;
        
      default:
        break;
    }
    
    setContent(newText);
  };

  const getTextareaStyle = () => {
    return {
      width: '95%',
      minHeight: '490px',
      border: '2px solid #ccc',
      padding: '20px',
      fontSize: `${fontSize}pt`,
      fontFamily: isCodeMode ? 'monospace' : fontFamily,
      textAlign: alignment,
      whiteSpace: 'pre-wrap'
    };
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      
      {/* Header */}
      <AppBar 
        position="fixed"
        sx={{
          width: `calc(100% - ${70 + subMenuWidth}px)`,
          ml: `${10}px`,
          backgroundColor: 'white',
          color: 'black',
          boxShadow: 'none',
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
          height: headerHeight,
          zIndex: (theme) => theme.zIndex.drawer + 1
        }}
      >
        <Toolbar sx={{ 
          justifyContent: 'flex-end',
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
            defaultValue="course1" 
            displayEmpty
            size="small"
            sx={{
                height: '40px',
                '& .MuiSelect-select': {
                padding: '8px 12px',
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
          left: `${70 + drawerWidth}px`,
          right: `${subMenuWidth}px`,
          bottom: 0,
          bgcolor: '#f9fafb',
          overflow: 'auto',
          p: 3
        }}
      >

        <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between' }}>
          <Tabs value={tab} onChange={handleTabChange}>
            <Tab label="Text" />
            <Tab label="Code" />
          </Tabs>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, pr: 2 }}>
            <IconButton onClick={() => setHeadingLevel(1)}>
              <Typography variant="body2" fontWeight="bold">H</Typography>
            </IconButton>
            <IconButton onClick={toggleBold} color={formatting.bold ? 'primary' : 'default'}>
              <FormatBold />
            </IconButton>
            <IconButton onClick={toggleItalic} color={formatting.italic ? 'primary' : 'default'}>
              <FormatItalic />
            </IconButton>
            <IconButton onClick={toggleBulletList} color={formatting.list === 'bullet' ? 'primary' : 'default'}>
              <FormatListBulleted />
            </IconButton>
            <IconButton onClick={toggleNumberedList} color={formatting.list === 'number' ? 'primary' : 'default'}>
              <FormatListNumbered />
            </IconButton>
            <IconButton>
              <CheckBox />
            </IconButton>
            <IconButton onClick={insertHorizontalRule}>
              <HorizontalRule />
            </IconButton>
            <IconButton onClick={toggleCode} color={formatting.code ? 'primary' : 'default'}>
              <Code />
            </IconButton>
            <IconButton onClick={handleLinkDialogOpen}>
              <LinkIcon />
            </IconButton>
          </Box>
        </Box>

        <Box sx={{ mt: 2, p: 2, bgcolor: 'white', border: '1px solid #ddd', borderRadius: 1, minHeight: '60vh' }}>
         <div style={{ padding: '20px' }}>
        <textarea 
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={getTextareaStyle()}
          placeholder="Type your content here..."
        />
      </div>
        </Box>
      </Box>

      {/* Link Dialog */}
      <Dialog open={linkDialogOpen} onClose={handleLinkDialogClose}>
        <DialogTitle>Insert Link</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Link URL"
            type="url"
            fullWidth
            variant="standard"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Link Text (optional)"
            type="text"
            fullWidth
            variant="standard"
            value={linkText}
            onChange={(e) => setLinkText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLinkDialogClose}>Cancel</Button>
          <Button onClick={insertLink}>Insert</Button>
        </DialogActions>
      </Dialog>

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
            left: `${70 + drawerWidth + 5}px`,
            right: `${subMenuWidth + 400}px`,
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
            right: `${subMenuWidth + 16}px`,
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
            mt: `${headerHeight}px`,
            height: `calc(100vh - ${headerHeight}px)`,
          },
        }}
      >
        <Box sx={{ p: 2, flex: 1 }}>
          <Typography variant="body2">Sub Menu</Typography>
          <Divider sx={{ mt: 1 }} />
          <List>
            {subMenuItems.map((item, index) => (
              <ListItem key={`sub-${index}`}>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </Box>
       
        <Box sx={{ p: 1 }}>
          <Divider sx={{ mb: 0.2 }} />
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
}