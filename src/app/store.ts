import { tassign } from 'tassign';
import { SAVE_USER } from 'app/actions';

export interface IAppState {
  user: any;
}

export const INITIAL_STATE: IAppState = {
  user: null,
}

export function rootReducer(state: IAppState, action): IAppState {
  switch (action.type) {
    case SAVE_USER: return tassign(state, { user: action.payload });
  }

  return state;
}