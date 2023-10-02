import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import produce from "immer";

const persistConfig = {
  key: "root",
  storage,
};

const initialState = {
  theme: "light-theme",
  scroll: "True",
  scrollPosition: "True",
  scrollRecently: "True",
  loginFlag: false,
};

const counterSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    set_day_mode: (state) => {
      return produce(state, (draftState) => {
        draftState.theme = "light-theme";
      });
    },
    set_night_mode: (state) => {
      return produce(state, (draftState) => {
        draftState.theme = "dark-theme";
      });
    },
  },
});

const scrollSlice = createSlice({
  name: "scroll",
  initialState,
  reducers: {
    set_scroll: (state) => {
      return produce(state, (draftState) => {
        draftState.scroll = "False";
      });
    },
  },
});

const loginSlice = createSlice({
  name: "loginFlag",
  initialState,
  reducers: {
    set_login: (state) => {
      return produce(state, (draftState) => {
        draftState.loginFlag = "True";
      });
    },
    set_login_flase: (state) => {
      return produce(state, (draftState) => {
        draftState.loginFlag = false;
      });
    },
  },
});
const loginSliceAdmin = createSlice({
  name: "loginFlagAdmin",
  initialState,
  reducers: {
    set_login_admin: (state) => {
      return produce(state, (draftState) => {
        draftState.loginFlagAdmin = true;
      });
    },
    set_login_flase_admin: (state) => {
      return produce(state, (draftState) => {
        draftState.loginFlagAdmin = false;
      });
    },
  },
});
const scrollSlicePosition = createSlice({
  name: "scrollPosition",
  initialState,
  reducers: {
    set_scroll_position: (state) => {
      return produce(state, (draftState) => {
        draftState.scrollPosition = "False";
      });
    },
  },
});
const scrollSliceRecently = createSlice({
  name: "scrollRecently",
  initialState,
  reducers: {
    set_scroll_recently: (state) => {
      return produce(state, (draftState) => {
        draftState.scrollRecently = "False";
      });
    },
  },
});
const persistedReducer = persistReducer(persistConfig, counterSlice.reducer);
const persistedReducer2 = persistReducer(persistConfig, scrollSlice.reducer);
const persistedReducer3 = persistReducer(
  persistConfig,
  scrollSlicePosition.reducer
);
const persistedReducer4 = persistReducer(
  persistConfig,
  scrollSliceRecently.reducer
);
const persistedReducer5 = persistReducer(persistConfig, loginSlice.reducer);
const persistedReducer6 = persistReducer(persistConfig, loginSliceAdmin.reducer);

export const { set_day_mode, set_night_mode } = counterSlice.actions;
export const { set_scroll } = scrollSlice.actions;
export const { set_scroll_position } = scrollSlicePosition.actions;
export const { set_scroll_recently } = scrollSliceRecently.actions;
export const { set_login, set_login_flase } = loginSlice.actions;
export const { set_login_admin, set_login_flase_admin } = loginSliceAdmin.actions;

export const store = configureStore({
  reducer: {
    theme: persistedReducer,
    scroll: persistedReducer2,
    scrollPosition: persistedReducer3,
    scrollRecently: persistedReducer4,
    loginFlag: persistedReducer5,
    loginFlagAdmin: persistedReducer6,

  },
});

export const persistor = persistStore(store);
