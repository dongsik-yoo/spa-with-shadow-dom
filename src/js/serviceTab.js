export default class ServiceTab {
    constructor(selector) {
        this._shadowRootContainer = selector;
        this._shadowRoot = null;
    }

    create() {
        this.goTo();
        // this.createShadowDOM();
        // this.createIFrame();
    }

    goTo() {
        if (!window.location.href.includes(this._path)) {
            window.location.href = this._path;
        }
    }

    createShadowDOM() {
        const container = document.getElementById(this._shadowRootContainer);
        if (!container) {
            return;
        }

        const root = document.createElement('div');
        const shadowRoot = root.attachShadow({mode: 'open'});
        container.appendChild(root);

        // create iframe
        shadowRoot.innerHTML = `
            <style>
                iframe {
                    width: 100%;
                    border: none;
                }
            </style>
            <h1>Hello Shadow DOM: ${this._name}</h1>
            <iframe src="${this._path}"></iframe>
        `;
        this._shadowRoot = shadowRoot;
    }

    createIFrame() {
        const container = document.getElementById(this._shadowRootContainer);
        if (!container) {
            return;
        }

        container.innerHTML = `
            <style>
                iframe {
                    width: 100%;
                    border: none;
                }
            </style>
            <h1>Hello Shadow DOM: ${this._name}</h1>
            <iframe src="${this._path}"></iframe>
        `;
    }

    destroy() {
        const container = document.getElementById(this._shadowRootContainer);
        if (container) {
            container.innerHTML = '';
        }
    }
}
