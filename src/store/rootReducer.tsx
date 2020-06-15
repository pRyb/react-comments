import { combineReducers } from "redux";
import { commentsReducer, chosenCommentsReducer } from "./reducers";

const rootReducer = combineReducers({
  comments: commentsReducer,
  numberOfChosenComments: chosenCommentsReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
