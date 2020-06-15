import {IComment,   CREATE_COMMENT, ADD_COMMENT, CHOOSE_COMMENT, INCREASE_CHOSEN_COMMENT, DECREASE_CHOSEN_COMMENT, REMOVE_COMMENT, CommentActionTypes} from "./types"

export function addComment(newComment: IComment): CommentActionTypes {
    return {
        type: ADD_COMMENT,
        payload: newComment
    }
}

export function removeComment(commentId: number): CommentActionTypes {
    return {
        type: REMOVE_COMMENT,
        payload: commentId
    }
}

export function createComment(content: IComment): CommentActionTypes {
    return {
        type: CREATE_COMMENT,
        payload: content
    }
}

export function choseComment(commentId: number): CommentActionTypes {
    return {
        type: CHOOSE_COMMENT,
        payload: commentId
    }
}

export function increaseNumberOfChosenComments(): CommentActionTypes {
    return {
        type: INCREASE_CHOSEN_COMMENT,
    }
}

export function decreaseNumberOfChosenComments(): CommentActionTypes {
    return {
        type: DECREASE_CHOSEN_COMMENT,
    }
}

