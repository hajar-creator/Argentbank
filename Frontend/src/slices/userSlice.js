import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null, // Les informations de l'utilisateur connecté
  token: null, // Le token d'authentification
  loading: false, // Indique si une requête est en cours
  error: null, // Message d'erreur si la connexion échoue
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.user = null;
      state.token = null;
    },
  },
});

const API_URL = "http://localhost:3001/api/v1/user";

export const loginUser = (email, password) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    const { token, user } = response.data;

    // En cas de succès
    dispatch(loginSuccess({ user, token }));
  } catch (error) {
    // En cas d'erreur
    const errorMessage = error.response?.data?.message || "Login failed";
    dispatch(loginFailure(errorMessage));
  }
};

export const { loginStart, loginSuccess, loginFailure, logout } =
  userSlice.actions;
export default userSlice.reducer;
