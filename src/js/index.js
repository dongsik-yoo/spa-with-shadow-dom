import * as _ from 'lodash';
import moment from 'moment';

import Project from './project';
import Mail from './mail';
import Calendar from './calendar';
import Drive from './drive';
import Wiki from './wiki';
import Contacts from './contacts';

const SERVICE_CLASSES = {
    'project': Project,
    'mail': Mail,
    'calendar': Calendar,
    'drive': Drive,
    'wiki': Wiki,
    'contacts': Contacts
};

export default class RootContainer {
    constructor(selector) {
        this._shadowRootContainer = selector;
        this._serviceName = 'project';
        this._service = null;
        this._dummy = _.assign({}, moment());
    }

    goTo(serviceName) {
        if (!window.location.href.includes(serviceName)) {
            window.location.href = serviceName;

            return false;
        }

        return true;
    }

    changeService(serviceName) {
        if (!SERVICE_CLASSES[serviceName]) {
            return;
        }

        this.destroyService();

        if (!this.goTo(serviceName)) {
            return;
        }
        this.createService(serviceName);
    }

    destroyService() {
        if (this._service) {
            this._service.destroy();
        }
    }

    createService(serviceName) {
        const constructor = SERVICE_CLASSES[serviceName];
        this._service = new constructor(this._shadowRootContainer);
        this._serviceName = serviceName;
    }
}

let rootContainer;

function onNaviBtnsClicked(event) {
    const className = _.get(event, 'target.className');
    let serviceName;

    if (className.includes('project-btn')) {
        serviceName = 'project';
    } else if (className.includes('mail-btn')) {
        serviceName = 'mail';
    } else if (className.includes('calendar-btn')) {
        serviceName = 'calendar';
    } else if (className.includes('drive-btn')) {
        serviceName = 'drive';
    } else if (className.includes('wiki-btn')) {
        serviceName = 'wiki';
    } else if (className.includes('contacts-btn')) {
        serviceName = 'contacts';
    }

    if (serviceName) {
        rootContainer.changeService(serviceName);
    }
}

function initEvents() {
    const naviBtns = document.querySelectorAll('#global-navi-btns a');
    naviBtns.forEach(btn => btn.addEventListener('click', onNaviBtnsClicked));
}

function initRootContainer() {
    const rootContainerSelector = 'service-shadow-root';
    const {pathname} = window.location;
    const initialServiceName = pathname.split('/')[1] || 'project';

    console.log(window.location.pathname, initialServiceName);

    rootContainer = new RootContainer(rootContainerSelector);

    if (initialServiceName) {
        rootContainer.changeService(initialServiceName);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initRootContainer();
    // initEvents();
});
