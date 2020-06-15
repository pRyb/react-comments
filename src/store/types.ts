export const ADD_COMMENT = 'ADD_COMMENT'
export const CREATE_COMMENT = 'CREATE_COMMENT'
export const CHOOSE_COMMENT = "CHOOSE_COMMENT"
export const REMOVE_COMMENT = "REMOVE_COMMENT"
export const INCREASE_CHOSEN_COMMENT = "INCREASE_CHOSEN_COMMENT"
export const DECREASE_CHOSEN_COMMENT = "DECREASE_CHOSEN_COMMENT"


export interface IComment {
    postId?: number,
    id?: number,
    name?: string,
    email?: string,
    body?: string,
    chosen?: boolean,
}

export type NumberOfChosenComments = number;

export interface IState {
  comments: IComment[] | undefined,
  numberOfChosenComments?: NumberOfChosenComments
}

interface AddCommentAction {
  type: typeof ADD_COMMENT
  payload: IComment
}

interface CreateCommentAction {
  type: typeof CREATE_COMMENT
  payload: IComment
}

interface ChoseCommentAction {
  type: typeof CHOOSE_COMMENT
  payload: number
}

interface RemoveCommentAction {
  type: typeof REMOVE_COMMENT
  payload: number
}

interface IncreaseCommentAction {
  type: typeof INCREASE_CHOSEN_COMMENT
}

interface DecreaseCommentAction {
  type: typeof DECREASE_CHOSEN_COMMENT
}

 

export type CommentActionTypes = 
AddCommentAction |
CreateCommentAction | 
ChoseCommentAction | 
RemoveCommentAction |
IncreaseCommentAction | 
DecreaseCommentAction 
