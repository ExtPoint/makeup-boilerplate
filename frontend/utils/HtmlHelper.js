function applyModifiers(entity, modifiers) {
    let result = entity;
    if (typeof modifiers === 'string') {
        result += ' ' + entity + '_' + modifiers;
    } else if (modifiers) {
        Object.keys(modifiers).forEach(key => {
            const value = modifiers[key];
            if (value == null || value === false) {
                // Skip
            }
            else if (value === true) {
                result += ' ' + entity + '_' + key;
            }
            else {
                result += ' ' + entity + '_' + key + '_' + value;
            }
        });
    }
    return result;
}

export default class HtmlHelper {

    static bem(blockName) {
        return {
            block(modifiers) {
                return applyModifiers(blockName, modifiers);
            },
            element(elementName, modifiers) {
                return applyModifiers(blockName + '__' + elementName, modifiers);
            },
        };
    }

};