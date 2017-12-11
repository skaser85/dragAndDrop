class DragAndDrop {
    constructor(el, draggables, droppables) {
        this._el = el;
        this._Draggables = draggables || new Draggables();
        this._Droppables = droppables || new Droppables();
        this._mouseIsMoving = false;
        this._mouseIsPressed = false;
        this._mouseIsReleased = false;
        this._mouseIsDragging = false;
        this._dragStarted = false;
        this._drag = false;
        this._dragEnded = false;
        this._showGrid = false;
        this._grid = 20;
    }

    get el() {
        return this._el;
    }

    get draggables() {
        return this._Draggables;
    }

    get droppables() {
        return this._Droppables;
    }

    get mouseIsMoving() {
        return this._mouseIsMoving;
    }

    get mouseIsPressed() {
        return this._mouseIsPressed;
    }

    get mouseIsReleased() {
        return this._mouseIsReleased;
    }

    get mouseIsDragging() {
        return this._mouseIsDragging;
    }

    get showGrid() {
        return this._showGrid;
    }

    set draggables(value) {
        this._Draggables = value;
    }

    set droppables(value) {
        this._Droppables = value;
    }

    set mouseIsMoving(value) {
        this._mouseIsMoving = value;
    }

    set mouseIsPressed(value) {
        this._mouseIsPressed = value;
    }

    set mouseIsReleased(value) {
        this._mouseIsReleased = value;
    }

    set mouseIsDragging(value) {
        this._mouseIsDragging = value;
    }

    set grid(value) {
        this._grid = value;
    }

    set showGrid(value) {
        this._showGrid = value;
    }

    mouseEvents() {
        this._el.addEventListener("mousemove", e => {
            if (window.lastX !== e.clientX || window.lastY !== e.clientY) {
                if (this._mouseIsPressed) {
                    this._mouseIsDragging = true;
                } else {
                    this._mouseIsDragging = false;
                }
            }
            window.lastX = e.clientX;
            window.lastY = e.clientY;
        });
        this._el.addEventListener("mousedown", e => {
            this._mouseIsPressed = true;
            this._mouseIsReleased = false;
        });
        this._el.addEventListener("mouseup", e => {
            this._mouseIsPressed = false;
            this._mouseIsReleased = true;
        });
    }

    update(m, pm) {
        if (this._Draggables || this._Droppables) {
            this.mouseOver(m, pm);

            if (this._mouseIsDragging) {
                this.mouseDragged(m, pm);
            }

            if (this._mouseIsPressed && !this._mouseIsDragging) {
                this.mousePressed(m, pm);
            }

            if (this._mouseIsReleased) {
                this._mouseIsReleased = false;
                this.mouseReleased(m);
            }
        }
    }

    mouseOver(m, pm) {
        this._Draggables.mouseOver(m, pm);
        this._Droppables.mouseOver(m, pm);
    }

    mousePressed(m, pm) {
        this._Draggables.mousePressed(m, pm);
    }

    mouseReleased(m) {
        this._Draggables.mouseReleased(m, this._Droppables.droppables);
    }

    mouseDragged(m, pm) {
        this._Draggables.mouseDragged(m, pm);
    }

    drawGrid(cx, cy) {
        push();
        translate(cx, cy);
        stroke(0, 50);
        strokeWeight(1);
        // vertical grid lines
        for (let i = 0; i < width; i += this._grid) {
            line(i, 0, i, height);
        }
        // horizontal grid lines
        for (let i = 0; i < height; i += this._grid) {
            line(0, i, width, i);
        }
        pop();
    }

    display(cx, cy) {
        if (this._showGrid) {
            push();
            // translate(-width / 2, -height / 2);
            this.drawGrid(cx, cy);
            pop();
        }
        if (this._Droppables) {
            this._Droppables.display(cx, cy);
        }
        if (this._Draggables) {
            this._Draggables.display(cx, cy);
        }
    }


}