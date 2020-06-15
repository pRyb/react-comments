import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { RootState } from './store'
import {addComment, removeComment, createComment, choseComment, increaseNumberOfChosenComments, decreaseNumberOfChosenComments} from "./actions"
import {IComment} from "./types"

import fakeComments from  "../comments.json"


export const thunkChooseComponent = (commentId: number): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
  dispatch(choseComment(commentId))
  dispatch(increaseNumberOfChosenComments())
}

export const thunkCommentRemove = (commentId: number): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
  dispatch(removeComment(commentId))
  dispatch(decreaseNumberOfChosenComments())
}

export const thunkCommentCreate = (body: IComment): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
  dispatch(createComment(body))
}

export const thunkFetchMultipleComments = (numberOfComments: number): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {

  await Promise.all([...Array(numberOfComments).keys()].map((taskNumber) =>
     fetchComment(++taskNumber)
    )).then(res => res.forEach(content => {
      dispatch(addComment(content))
    })).catch(err => console.log(err))
    
// fakeComments.forEach(fakeComment => {dispatch(addComment(fakeComment))}) 

}

const fetchComment = async (taskNumber: number) => {
    const result = await fetch(`https://jsonplaceholder.typicode.com/comments/${taskNumber}`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "Content-Type", 
        },
      })
    if (result.status !== 200) return;
    const data = await result.json();
    return data;
}
