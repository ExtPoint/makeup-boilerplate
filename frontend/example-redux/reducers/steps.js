import * as types from '../enums/ActionType';

const initialState = {
    items: [
        {
            key: 1,
            title: __('frontend/pay', 'Выбор тарифа'),
            header: __('frontend/pay', 'Оплата'),
            isActive: true,
            isEnabled: true,
        },
        {
            key: 2,
            title: __('frontend/pay', 'Выбор аккаунтов'),
            header: __('frontend/pay', 'Оплата'),
            isActive: false,
            isEnabled: false,
        },
        {
            key: 3,
            title: __('frontend/pay', 'Способ оплаты'),
            header: __('frontend/pay', 'Тип платежа'),
            isActive: false,
            isEnabled: false,
        },
    ],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.CHANGE_STEP:
            return {
                items: state.items.map(item => {
                    item.isActive = (item.key === action.stepKey && item.isEnabled);
                    return {...item};
                }),
            };

        case types.SELECT_PLAN:
            return {
                items: state.items.map(item => {
                    if (item.key === 2) {
                        item.isEnabled = true;
                        item.isActive = true;
                    } else {
                        item.isActive = false;
                    }

                    return {...item};
                }),
            };

        default:
            return state;
    }
};

export const getCurrentStep = state => {
    const steps = state.steps.items.filter(step => step.isActive === true);
    return steps.length ? steps[0] : null;
};