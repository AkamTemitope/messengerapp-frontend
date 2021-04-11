import { configureStore } from "@reduxjs/toolkit"
import userReducer from "../redux/Slices/userSlice"
import optionReducer from "../redux/Slices/optionSlice"

export default configureStore({
    reducer: {
        user: userReducer,
        option: optionReducer
    },
})