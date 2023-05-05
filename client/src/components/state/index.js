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
                setMode: (state) => {
                        state.mode = state.mode === "light" ? "dark" : "light";
                },
                setLogin: (state, action) => {
                        state.user = action.payload.user;
                        state.fullName = action.payload.user;
                        state.token = action.payload.token;
                },
                setLogout: (state) => {
                        state.user = null;
                        state.token = null;
                },
                // setProject: (state, action) => {
                // if (state.user) {
                // state.user.projects = action.payload.projects;
                // } else { console.error("Project non-existent :")},
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

export const { setMode, setLogin, setLogout, setProjects, setProject } = authSlice.actions;
export default authSlice.reducer;
