export interface AuthState {
    userId?: string
}

export const initialAuthState: AuthState = {
} 

type AuthActionType = "SET_USER_ID"

export interface AuthAction {
    type: AuthActionType;
    payload: {
        userId?: string
    }
}

export const authReducer = (state: AuthState, action: AuthAction) => {
    const {type, payload} = action
    const {userId} = payload
    switch(type) {
        case "SET_USER_ID":
            return {...state, userId: userId}
        default:
            return {...state}
    } 
}