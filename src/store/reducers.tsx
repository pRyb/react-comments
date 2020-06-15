import {
  IComment,
  CommentActionTypes,
  ADD_COMMENT,
  CREATE_COMMENT,
  CHOOSE_COMMENT,
  INCREASE_CHOSEN_COMMENT,
  DECREASE_CHOSEN_COMMENT,
  REMOVE_COMMENT,
} from "./types";

export function commentsReducer(state = [], action: CommentActionTypes) {
  const newState: IComment[] = [...state];
  switch (action.type) {
    case ADD_COMMENT:
      return [...state, action.payload];
    case CHOOSE_COMMENT:
      const chosenCommentIndex = newState.findIndex(
        (comment) => comment.id === action.payload
      );
      if (chosenCommentIndex === -1) return state;
      newState[chosenCommentIndex].chosen = !newState[chosenCommentIndex]
        .chosen;
      return newState;
    case REMOVE_COMMENT:
      const commentIndex = newState.findIndex(
        (comment) => comment.id === action.payload
      );
      if (commentIndex === -1) return state;
      newState.splice(commentIndex, 1);
      return newState;
    case CREATE_COMMENT:
      const biggestId = newState.reduce((prev, curr): number => {
        if (curr.id && curr.id !== 0) {
          return prev > curr.id ? prev : curr.id;
        }
        return prev;
      }, 0);
      const nextIndex = biggestId + 1;
      const newComment = { postId: 1, id: nextIndex };
      return [...state, { ...newComment, ...action.payload }];
    default:
      return state;
  }
}

export function chosenCommentsReducer(state = 0, action: CommentActionTypes) {
  switch (action.type) {
    case INCREASE_CHOSEN_COMMENT:
      return ++state;
    case DECREASE_CHOSEN_COMMENT:
      return --state;
    default:
      return state;
  }
}
