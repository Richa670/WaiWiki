import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Index from './View/Component/SignIn Page/Index';
import Inndex from './View/Component/Forgot pass/Inndex';
import Otp from './View/Component/OTP Page/Otp';
import SetnewPassword from './View/Component/Set Pass Page/set new pass';
import SignUp from './View/Component/SignUp Page/signup';
import SetPassword from './View/Component/Set Pass Page/set pass';
import Course from './View/Component/CourseManage.js/Course';
import Layout from './View/Component/CourseContent/content';
import Title from './View/Component/CourseTitle/Title';

function App() {
  return (
    <Provider store={store}>
    <Router>
      <Routes>                                        
      <Route path="/" element={<Index />} />
      <Route path="/forgot-password" element={<Inndex />} />
      <Route path="/otp" element={<Otp/>} />
      <Route path="/set-pass" element={<SetnewPassword/>} />
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/setpass" element={<SetPassword/>} />
      <Route path='/course' element={<Course/>} />
      <Route path='/course-content' element={<Layout/>} />
      <Route path='/course-edit' element={<Title/>} />
    </Routes>
    </Router>
    </Provider>
  );
}

export default App;

