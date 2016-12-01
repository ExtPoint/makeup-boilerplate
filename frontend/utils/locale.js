
window.__ = (category, message, params = {}) => {
    message = window.APP_LOCALE && window.APP_LOCALE[category] && window.APP_LOCALE[category] && window.APP_LOCALE[category][message] || message;

    Object.keys(params).forEach(key => {
        message = message.replace(new RegExp('\{{1,2}' + key + '\}{1,2}', 'gi'), params[key]);
    });
    return message;
};