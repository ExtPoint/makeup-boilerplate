import React from 'react';
import {connect} from 'react-redux';

import PlansSelectorStep from '../views/step/PlansSelectorStep';

import {getCurrentStep} from '../reducers/steps';
import {getCurrentPlan} from '../reducers/plans';
import {getSelectedAccounts} from '../reducers/accounts';

import {
    changeStep,
    selectPlan,
} from '../actions/index';


class PayContainer extends React.Component {

    render() {
        return (
            <div>
                <h1>{this.props.step.header}</h1>

                <PlansSelectorStep
                    plans={this.props.plans}
                    onSelectPlan={this._handleSelectPlan.bind(this)}
                />
            </div>
        );
    }

    _handleSelectPlan(item) {
        this.props.selectPlan(item);
    }

}

export default connect(
    state => ({
        step: getCurrentStep(state),
        plan: getCurrentPlan(state),
        selectedAccounts: getSelectedAccounts(state),
        steps: state.steps,
        plans: state.plans,
        accounts: state.accounts,
        coupon: state.coupon,
        payments: state.payments,
    }),
    {
        changeStep,
        selectPlan,
    }
)(PayContainer);
