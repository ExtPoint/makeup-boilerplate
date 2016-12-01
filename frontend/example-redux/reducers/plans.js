import * as types from '../enums/ActionType';

export default (state = [], action) => {
    switch (action.type) {
        case types.LOAD_ALL_DATA:
            return action.plans.map(item => {
                item.isSelected = false;
                return item;
            });

        case types.SELECT_PLAN:
            return state.map(item => {
                item.isSelected = item.id === action.plan.id;
                return {...item};
            });

        default:
            return state;
    }
};

export const getCurrentPlan = state => {
    const plans = state.plans.filter(plan => plan.isSelected === true);
    return plans.length ? plans[0] : null;
};
