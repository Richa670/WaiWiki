import { createSlice } from '@reduxjs/toolkit';

const courseSlice = createSlice({
  name: 'course',
  initialState: {
    selectedCourse: null
  },
  reducers: {
    setSelectedCourse: (state, action) => {
      state.selectedCourse = action.payload;
    },

     updateCourseContent: (state, action) => {
      const { courseId, content } = action.payload;
      const courseIndex = state.courses.findIndex(c => c.id === courseId);
      if (courseIndex !== -1) {
        state.courses[courseIndex].content = content;
        if (state.selectedCourse?.id === courseId) {
          state.selectedCourse.content = content;
        }
      }
    },

  }
});


export const { setSelectedCourse, updateCourseContent  } = courseSlice.actions;
export default courseSlice.reducer;