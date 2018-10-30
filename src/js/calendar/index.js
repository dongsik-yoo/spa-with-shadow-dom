import 'tui-chart';
import 'tui-grid';
import Calendar from 'tui-calendar';
import 'tui-calendar/dist/tui-calendar.css';
import * as _ from 'lodash';
import moment from 'moment';
import ServiceTab from '../serviceTab';

export default class CalendarTab extends ServiceTab {
    constructor(selector) {
        super(selector);
        this._name = 'Calendar';
        this._path = '/calendar';
        this._dummy = _.assign({}, moment());
        this._calendar = null;

        this.create();
        this.initialize();
    }

    initialize() {
        const contentsLayout = document.querySelector('.contents-layout');
        const container = document.createElement('div');
        const {style} = container;
        contentsLayout.appendChild(container);

        style.flex = 1;

        this._calendar = new Calendar(container, {});
    }
}
