import { combineReducers } from "redux";
import userReducer from "./user/reducer";
import testReducer from "./test/reducer";

const rootReducer = combineReducers({
    user: userReducer,
    test: testReducer,
});

export default rootReducer;
