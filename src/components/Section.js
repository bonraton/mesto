export class Section {
    constructor({
        items,
        renderer
    }, selector) {
        this._container = document.querySelector(selector);
        this._initialItems = items;
        this._renderer = renderer;
    }

    render() {
        this._initialItems.forEach(data => {
            this._container.append(this._renderer(data))
        })
    }

    addItem(htmlElement) {
        this._container.prepend(htmlElement);
    }
}