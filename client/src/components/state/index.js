import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    mode: "light",
    user: null,
    token: null,
    projects: [],
};

export const authSlice = createSlice({
        name: "auth",
        initialState,
        reducers: {
                
                setLogin: (state, action) => {
                        state.user = action.payload.user;
                        state.fullName = action.payload.user;
                        state.token = action.payload.token;
                },
                setLogout: (state) => {
                        state.user = null;
                        state.token = null;
                },
               
                setProjects: (state, action) => {
                        state.projects = action.payload.projects;
                },
                setProject: (state, action) => {
                        const updatedProjects = state.projects.map((project) => {
                                if (project._id === action.payload.project_id) return action.payload.project;
                                return project;
                        })
                        state.projects = updatedProjects;
                }
        }
})


export const { setLogin, setLogout, setProjects, setProject } = authSlice.actions;
export default authSlice.reducer;
