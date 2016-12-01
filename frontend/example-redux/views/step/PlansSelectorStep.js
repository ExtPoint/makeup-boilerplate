import React from 'react';

import HtmlHelper from '../../../utils/HtmlHelper';

import './PlansSelectorStep.less';

export default class PlansSelectorStep extends React.Component {

    static propTypes = {
        onSelectPlan: React.PropTypes.func,
        plans: React.PropTypes.arrayOf(React.PropTypes.shape({
            id: React.PropTypes.number,
            duration: React.PropTypes.number,
            duration_coupon: React.PropTypes.number,
            old_price_basic: React.PropTypes.number,
            price_basic: React.PropTypes.number,
            price_coupon: React.PropTypes.number,
            most_popular: React.PropTypes.bool,
            isSelected: React.PropTypes.bool,
            currency: React.PropTypes.shape({
                name_short: React.PropTypes.string,
            }),
        }))
    };

    _getAmountPerDay(item) {
        return Math.round(item.price_basic / (item.duration + item.duration_coupon));
    }

    render() {
        const bem = HtmlHelper.bem('PlansSelectorStep');
        // TODO replace all bem classes via bem()

        return (
            <div className={bem.block()}>
                <div className='PlansSelectorStep__container container'>
                    {this.props.plans.map(item => (
                        <div key={item.id} className='PlansSelectorStep__item'>
                            <div className={[
                                'PlansSelectorStep__days',
                                item.duration_coupon > 0 ? 'PlansSelectorStep__days_coupon' : ''
                            ].join(' ')}>
                                <div className='PlansSelectorStep__days-count'>
                                    {item.duration}
                                    {item.duration_coupon > 0 && (
                                        <span className='PlansSelectorStep__days-count-coupon'>
                                            +{item.duration_coupon}
                                        </span>
                                    )}
                                </div>

                                <div className='PlansSelectorStep__days-label'>
                                    {__('frontend/dates', 'дней')}
                                </div>
                            </div>

                            <div className='PlansSelectorStep__price'>
                                {item.most_popular && (
                                    <div className='PlansSelectorStep__most-popular' />
                                )}

                                <div className='PlansSelectorStep__price-old'>
                                    {item.old_price_basic > 0 && (
                                        <div>
                                            {item.old_price_basic + ' ' + item.currency.name_short}
                                        </div>
                                    )}
                                </div>

                                <div className={[
                                    'PlansSelectorStep__price-current',
                                    item.price_coupon > 0 ? 'PlansSelectorStep__price-current_coupon' : ''
                                ].join(' ')}>
                                    {item.price_basic + ' ' + item.currency.name_short}
                                </div>
                                {item.price_coupon > 0 && (
                                    <div className='PlansSelectorStep__price-coupon'>
                                        {item.price_coupon + ' ' + item.currency.name_short}
                                    </div>
                                )}

                                <div className='PlansSelectorStep__price-in-days'>
                                    {__('frontend/pay', '{price} в день', {price: this._getAmountPerDay(item) + ' ' + item.currency.name_short})}
                                </div>

                                <button
                                    className={[
                                        'PlansSelectorStep__price-button',
                                        'btn',
                                        item.duration_coupon > 0 || item.price_coupon > 0 ? 'btn-success' : 'btn-primary'
                                    ].join(' ')}
                                    onClick={() => this.props.onSelectPlan(item)}
                                >
                                    {item.isSelected ? __('frontend/pay', 'Выбран') : __('frontend/pay', 'Выбрать')}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}