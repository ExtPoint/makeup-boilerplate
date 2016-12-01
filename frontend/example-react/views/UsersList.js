import React from 'react';

import HtmlHelper from '../../utils/HtmlHelper';

import './UsersList.less';

export default class UsersList extends React.Component {

    render() {
        const bem = HtmlHelper.bem('UsersList');
        // TODO replace all bem classes via bem()

        return (
            <div className={bem.block()}>
                Test block
            </div>
        );
    }
}