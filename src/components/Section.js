export class Section {
    constructor({
        items,
        renderer
    }, selector) {
        this._container = document.querySelector(selector);
        this._initialItems = items;
        this._renderer = renderer;
    }

    render(items) {
        items.forEach(item => {
            this._container.append(this._renderer(item))
        })
    }

    addItem(htmlElement) {
        this._container.prepend(htmlElement);
    }
}