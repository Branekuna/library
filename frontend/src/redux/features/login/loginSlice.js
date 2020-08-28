import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios';

//async _ActionCreators
export const login_AC = createAsyncThunk(
  'loginSlice/login_AC',
  async (data) => {
    const result = await Axios.post('http://localhost:5000/users/login', {
      ...data,
    })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.error(`ERROR IN LOGIN USER GET `, err);
      });
    return result;
  }
);

export const signUp_AC = createAsyncThunk(
  'loginSlice/signUp_AC',
  async (data) => {
    const result = await Axios.post('http://localhost:5000/users/create', {
      ...data,
    })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.error(`ERROR IN LOGIN USER GET `, err);
      });
    return result;
  }
);

const loginSlice = createSlice({
  name: 'loginSlice',
  initialState: {
    isLoggedIn: false,
    isAdmin: false,
    currentUser: {},
    showModalForm: false,
    modalName: '',
    token: '',
    loginErrors: [],
  },
  reducers: {
    loginStatusChangeButton: (state, action) => {
      if (action.payload === 'Logout') {
        return (state = {
          isLoggedIn: false,
          isAdmin: false,
          currentUser: {},
          showModalForm: false,
          modalName: '',
        });
      } else {
        state.showModalForm = true;
        state.modalName = action.payload;
        return state;
      }
    },
    modalCloseNoStatusChange: (state, action) => {
      state.showModalForm = false;
      state.modalName = '';
      return state;
    },
  },
  extraReducers: {
    [login_AC.fulfilled]: (state, action) => {
      console.log('action ', action.payload);
      return (state = {
        isLoggedIn: true,
        showModalForm: false,
        modalName: '',
        token: action.payload.token,
        isAdmin: action.payload.user.isAgent === '1' || false,
        currentUser: {
          ...action.payload.user,
        },
      });
    },
    [login_AC.rejected]: (state, action) => {
      console.log('login_AC.rejected');
      state.loginErrors.push(action.payload.error);
      return state;
    },
    [signUp_AC.fulfilled]: (state, action) => {
      return (state = {
        isLoggedIn: true,
        isAdmin: false,
        showModalForm: false,
        modalName: '',
        currentUser: {
          ...state.currentUser,
          ...action.payload,
        },
      });
    },
    [signUp_AC.rejected]: (state, action) => {
      console.log('signUp_AC.rejected');
      state.loginErrors.push(action.payload.error);
      return state;
    },
  },
});

export const {
  loginStatusChangeButton,
  modalCloseNoStatusChange,
} = loginSlice.actions;

export default loginSlice.reducer;

/*Hopefully someone can help:
tldr; In short: createAsyncThunk (sends data to) -> extraReducer (calls and passes (state, action) ) -> caseReducer -|- nothing happens when changing state even doe I get the data in caseReducer, also can't see it happen in devtools.

I have a question regarding .caseReducers and .extraReducers (for async). I am using createAsyncThunk to create an async call to backend. This is then handled by an 'extraReducer' (.extraReducers in createSlice). I also know that one can access "real" (case) reducers (for login in this case) in createSlice (.reducers) by calling sliceName.caseReducers.someReducer(state, action).  SO... I figured I could, instead of changing state in .fulfilled/.rejected extraReducers, send that data into a "real" reducer and handle it there (otherwise, I don't even need a "real" caseReducer for async? ). This works... sort of. I get the data in (state, action) => , but it seems that without dispatching it, I can't actually change the state in the "real reducer" (when called from extraReducer). Nor does it show up in the redux devtools.*/
