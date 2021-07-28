import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { MainApis } from '../../shared/api';

// action
const G_LOAD = 'main/G_LOAD';
const M_LOAD = 'main/M_LOAD';

// action creator
const guestLoad = createAction(G_LOAD, (guestmain) => ({guestmain}));
const userLoad = createAction(M_LOAD, (usermain) => ({usermain}));

// initialState

const initialState = {
    guestmain:[],
    usermain:[],   
}

// Thunk function
const guestLoadDB = () => {
    return function(dispatch, getState, {history}){
        MainApis
        .guestMain()
        .then((res) => {
            console.log(res);
            dispatch(guestLoad(res.data))
        }).catch((err) => {
            console.log(err)
        })
    }
}

const userLoadDB = () => {
    return function(dispatch, getState, {history}){
        MainApis
        .userMain()
        .then((res) => {
            dispatch(userLoad(res.data))
        }).catch((err) => {
            console.log(err)
        })
    }
}

// reducer

export default handleActions({
    [G_LOAD]:(state,action) => produce(state, (draft) => {
        draft.guestmain = action.payload.guestmain;
    }),
    [M_LOAD]:(state,action) => produce(state,(draft) => {
        draft.usermain = action.payload.usermain;
    })
}, initialState)

const MainCreators = {
    guestLoadDB,
    userLoadDB,
}

export { MainCreators }