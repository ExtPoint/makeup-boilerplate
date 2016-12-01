import * as types from '../enums/ActionType';

export default (state = [], action) => {
    switch (action.type) {
        case types.LOAD_ALL_DATA:
            return action.accounts;

        default:
            return state;
    }
};

export const getSelectedAccounts = state => {
    return state.accounts.filter(account => account.isSelected);
};
