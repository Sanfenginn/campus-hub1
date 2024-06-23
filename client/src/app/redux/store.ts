import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import secondFunctionReducer from "./secondFunction";
import { thunk } from "redux-thunk"; // 导入命名导出 thunk
import usersDataReducer from "./usersData"; // 导入默认导出 usersDataSlice.reducer

// 为每个需要持久化的 reducer 定义单独的持久化配置
// const fourHotCitiesWeatherDataPersistConfig = {
//   key: "fourHotCitiesWeatherData",
//   storage,
// };

// const persistedFourHotCitiesWeatherDataReducer = persistReducer(
//   fourHotCitiesWeatherDataPersistConfig,
//   fourHotCitiesWeatherDataReducer
// );

// 配置 store
const store = configureStore({
  reducer: {
    secondFunction: secondFunctionReducer,
    usersData: usersDataReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        ignoredPaths: ["somePath.register"],
      },
    }).concat(thunk),
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
