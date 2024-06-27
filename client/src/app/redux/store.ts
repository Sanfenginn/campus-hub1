import { configureStore } from "@reduxjs/toolkit";
// import { persistStore, persistReducer } from "redux-persist";
import secondFunctionReducer from "./secondFunction";
import { thunk } from "redux-thunk"; // 导入命名导出 thunk
import usersDataReducer from "./usersData";
import authReducer from "./authSlice";
import selectedUsersIdsReducer from "./selectedUsersIds";
import selectedUserInfoReducer from "./selectedUserInfo";
import reminderReducer from "./reminder";

// 配置 store
const store = configureStore({
  reducer: {
    secondFunction: secondFunctionReducer,
    usersData: usersDataReducer,
    auth: authReducer,
    selectedUsersIds: selectedUsersIdsReducer,
    selectedUserInfo: selectedUserInfoReducer,
    reminder: reminderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        ignoredPaths: ["somePath.register"],
      },
    }).concat(thunk),
});

// const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };
