import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    mode: "light",
    user: null,
    token: null,
    selectedUser: null,
    project: null,
    team: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setUser: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload.userId;
        },
        setProject: (state, action) => {
            state.project = action.payload.projectId;
        },
        setTeam: (state, action) => {
            state.team = action.payload.teamId;
        },
    }
})


export const { setLogin, setUser, setLogout, setProject, setSelectedUser, setTeam } = authSlice.actions;
export default authSlice.reducer;