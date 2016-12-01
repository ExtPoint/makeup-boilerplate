import * as types from '../enums/ActionType';

// Debug data
window.APP_PAY_DATA = {'plans':[{'id':11,'duration':30,'duration_coupon':0,'most_popular':false,'old_price_basic':0,'price_basic':30,'price_coupon':0,'currency':{'iso_code':'USD','name_short':'$'}},{'id':12,'duration':90,'duration_coupon':0,'most_popular':false,'old_price_basic':90,'price_basic':75,'price_coupon':0,'currency':{'iso_code':'USD','name_short':'$'}},{'id':13,'duration':180,'duration_coupon':0,'most_popular':false,'old_price_basic':180,'price_basic':135,'price_coupon':0,'currency':{'iso_code':'USD','name_short':'$'}},{'id':14,'duration':360,'duration_coupon':0,'most_popular':false,'old_price_basic':360,'price_basic':240,'price_coupon':0,'currency':{'iso_code':'USD','name_short':'$'}}],'accounts':[{'id':139,'name':'diana_morozova_moscow','picture':'https:\/\/scontent.cdninstagram.com\/hphotos-xtp1\/t51.2885-19\/11049397_396941987144900_588861128_a.jpg','realRemaining':101088000},{'id':116,'name':'kinodrom','picture':'https:\/\/scontent.cdninstagram.com\/t51.2885-19\/10727374_363441990490004_1875504034_a.jpg','realRemaining':9093485}],'counts':{'all':'2','remaining':'0'}};
window.APP_LOCALE = {'frontend\/pay':{'Оплата':'Payment','Выбор тарифа':'Select a plan','Выбор аккаунтов':'Select accounts','Способ оплаты':'Payment method','Тип платежа':'Pay type','Выбрать':'Select','все':'all','время истекло':'time expired','очистить все':'clear all','Далее':'Next','Оплатить':'Pay','{price} в день':'{price} per day','Выбран':'Selected','Кол-во дней':'Days','Цена':'Price','Итого':'Total','Аккаунты':'Accounts','Код вашего купона':'Your coupon code','Ваш купон на {daysCount} дополнительных дней активирован.':'Your coupon activated to {daysCount} additional days.','Бонус действителен до {expires}.':'Bonus is valid until {expires}.','Можно активировать до {accountsCount} разных аккаунтов Инстаграм.':'You can activate {accountsCount} Instagram accounts.','Активировать':'Activate','счетчик активаций':'activations counter'},'frontend\/dates':{'д':'d','ч':'h','дней':'days'}};

export const changeStep = stepKey => dispatch => {
    dispatch({
        type: types.CHANGE_STEP,
        stepKey: stepKey
    });
};

export const selectPlan = plan => dispatch => {
    dispatch({
        type: types.SELECT_PLAN,
        plan: plan,
    });
};

export const loadAllData = () => {
    return {
        ...window.APP_PAY_DATA,
        type: types.LOAD_ALL_DATA,
    };
};
