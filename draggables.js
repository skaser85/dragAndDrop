class Draggables {
    constructor(draggables) {
        this._draggables = draggables || [];
        this._highlighted = null;
        this._mousePressed = null;
        this._dragging = null;
    }

    get draggables() {
        return this._draggables;
    }

    get highlighted() {
        return this._highlighted;
    }

    get mousePressed() {
        return this._mousePressed;
    }

    get dragging() {
        return this._dragging;
    }

    set draggables(value) {
        this._draggables = value;
    }

    set highlighted(value) {
        this._highlighted = value;
    }

    set mousePressed(value) {
        this._mousePressed = value;
    }

    set dragging(value) {
        this._dragging = value;
    }

    insert(dragger, droppable) {
        this._draggables.push(dragger);
        dragger.attach(droppable);
    }

    delete(dragger) {
        this._draggables = this._draggables.filter((d) => {
            return d !== dragger;
        });
    }

    find(dragger) {
        return this._draggables.find((d) => {
            return d === dragger;
        });
    }

    mouseOver(m, pm) {
        if (this._highlighted) {
            if (!this._highlighted.intersects(m)) {
                this._highlighted.mouseOver = false;
                this._highlighted = null;
            }
        }

        if (!this._highlighted) {
            for (let i = 0; i < this._draggables.length; i++) {
                let dragger = this._draggables[i];
                if (dragger.intersects(m)) {
                    dragger.mouseOver = true;
                    this._highlighted = dragger;
                } else {
                    dragger.mouseOver = false;
                }
            }
        }
    }

    mousePressed(m, pm) {
        if (this._mousePressed) {
            if (!this._mousePressed.intersects(m)) {
                this._mousePressed.mousePressed = false;
                this._mousePressed = null;
            }
        }

        if (!this._mousePressed) {
            for (let i = 0; i < this._draggables.length; i++) {
                let dragger = this._draggables[i];
                if (dragger.intersects(m)) {
                    dragger.mousePressed = true;
                    this._mousePressed = dragger;
                } else {
                    dragger.mousePressed = false;
                }
            }
        }
    }

    mouseReleased(m, droppables) {
        if (this._dragging) {
            this._dragging.drop(m, droppables);
            this._dragging.dragEnd();
            this._dragging.mousePressed = false;
            this._mousePressed = null;
            this._dragging = null;
        } else {
            for (let i = 0; i < this._draggables.length; i++) {
                let dragger = this._draggables[i];
                if (dragger.intersects(m)) {
                    dragger.mousePressed = false;
                    this._mousePressed = null;
                    break;
                }
            }
        }
    }

    mouseDragged(m, pm) {
        if (this._dragging) {
            if (this._dragging.intersects(m)) {
                this._dragging.drag(m, pm);
            } else {
                this._dragging.dragging = false;
                this._dragging = null;
            }
        }

        if (!this._dragging) {
            for (let i = 0; i < this._draggables.length; i++) {
                let dragger = this._draggables[i];
                if (dragger.intersects(m)) {
                    this._dragging = dragger;
                    dragger.dragStart();
                } else {
                    dragger.dragging = false;
                }
            }
        }
    }

    display(cx, cy) {
        this._draggables.forEach(d => {
            d.display(cx, cy);
        });
    }
}