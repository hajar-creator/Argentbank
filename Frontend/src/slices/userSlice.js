import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// URL de base de l'API
const BASE_URL = "http://localhost:3001/api/v1";

// Thunk pour gérer la connexion
export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/user/login`, {
        email,
        password,
      });
      return response.data.body.token; // On récupère le token
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Login failed");
    }
  }
);

// Thunk pour récupérer le profil utilisateur
export const fetchUserProfile = createAsyncThunk(
  "user/fetchProfile",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.body; // Récupère les infos utilisateur
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "Profile fetch failed"
      );
    }
  }
);

// Slice utilisateur
const userSlice = createSlice({
  name: "user",
  initialState: {
    token: null,
    user: null,
    error: null,
    status: "idle",
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.error = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
