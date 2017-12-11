class Droppables {
    constructor(droppables) {
        this._droppables = droppables || [];
        this._droppable = null;
    }

    get droppables() {
        return this._droppables;
    }

    get droppable() {
        return this._droppable;
    }

    set droppables(value) {
        this._droppables = value;
    }

    set droppable(value) {
        this._droppable = value;
    }

    insert(droppable, options) {
        this._droppables.push(droppable);
        if (options) {
            droppable.droppable = options.droppable
        }
    }

    delete(droppable) {
        this._droppables = this._droppables.filter(d => {
            return d !== droppable;
        });
    }

    find(droppable) {
        return this._droppables.find(d => {
            return d === droppable;
        })
    }

    mouseOver(m, pm) {
        if (this._droppable) {
            if (!this._droppable.intersects(m)) {
                this._droppable.mouseOver = false;
                this._droppable = null;
            }
        }

        if (!this._droppable) {
            for (let i = 0; i < this._droppables.length; i++) {
                let dropper = this._droppables[i];
                if (dropper.intersects(m)) {
                    dropper.mouseOver = true;
                    this._droppable = dropper;
                } else {
                    dropper.mouseOver = false;
                }
            }
        }
    }

    display(cx, cy) {
        this._droppables.forEach(d => {
            d.display(cx, cy);
        });
    }
}