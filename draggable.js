class Draggable extends Box {
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this._dragging = false;
        this._startPos = null;
        this._droppable = null;
        this._dragOffset = createVector(0, 0);
        this._snapToGrid = false;
        this._snapToDroppable = false;
    }

    get startPos() {
        return this._startPos;
    }

    get dragging() {
        return this._dragging;
    }

    get droppable() {
        return this._droppable;
    }

    get dragOffset() {
        return this._dragOffset;
    }

    get snapToGrid() {
        return this._snapToGrid;
    }

    get snapToGrid() {
        return this._snapToDroppable;
    }

    set dragging(value) {
        this._dragging = value;
    }

    set startPos(value) {
        this._startPos = value;
    }

    set dragOffset(value) {
        this._dragOffset = value;
    }

    set snapToGrid(value) {
        this._snapToGrid = value;
    }

    set snapToDroppable(value) {
        this._snapToDroppable = value;
    }

    bounds(start) {
        if (start) {
            return {
                TOP: this._startPos.y,
                RIGHT: this._startPos.x + this._w,
                BOTTOM: this._startPos.y + this._h,
                LEFT: this._startPos.x
            }
        }
        return {
            TOP: this._pos.y,
            RIGHT: this._pos.x + this._w,
            BOTTOM: this._pos.y + this._h,
            LEFT: this._pos.x
        }
    }

    dragStart() {
        this._dragging = true;
        this._startPos = this._pos.copy();
    }

    dragEnd() {
        this._dragging = false;
        this._startPos = null;
    }

    reset() {
        this._pos = this._startPos;
    }

    drag(m, pm) {
        this._dragOffset = p5.Vector.sub(m, pm);
        this._pos.add(this._dragOffset);
    }

    drop(m, droppables) {
        let dropped = false;
        let lastDroppable = null;
        for (let i = 0; i < droppables.length; i++) {
            if (droppables[i].intersects(m)) { //(droppables[i].overlaps(this.bounds())) {
                if (droppables[i].droppable) {
                    dropped = true;
                    if(this._droppable) {
                        lastDroppable = this._droppable;
                    }
                    this.attach(droppables[i]);
                    break;
                } else {
                    dropped = true;
                    this.reset();
                    break;
                }
            }
        }
        if (!dropped) {
            this.reset();
            this._droppable.realign();
        } else {
            if (this._snapToGrid) {
                this.pos = this.snapItToGrid();
            } else if (this._snapToDroppable) {
                this.pos = this.snapItToDroppable();
                this._droppable.realign();
                if(lastDroppable) {
                    lastDroppable.realign();
                }
            } else {
                // do we need to do anyting to tell the draggable to just
                // drop whereever it is?...????
            }
        }
    }

    snapItToGrid() {
        let xdir = Math.sign(this._dragOffset.x);
        let ydir = Math.sign(this._dragOffset.y);
        let x = Math.round(this._pos.x / this._grid) * this._grid;
        let y = Math.round(this._pos.y / this._grid) * this._grid;
        x += (this._grid * xdir);
        y += (this._grid * ydir);
        return createVector(x, y);
    }

    snapItToDroppable() {
        if(this._droppable.draggables.length === 1) {
            return this._droppable.pos.copy();
        }
        if (this._droppable.orientation.WIDE) {
            let last = this._droppable.draggables[this._droppable.draggables.length-2];
            let lastPos = last.pos.copy();
            return createVector(last.bounds().RIGHT, lastPos.y);
        } else if (this._droppable.orientation.TALL) {
            let last = this._droppable.draggables[this._droppable.draggables.length-2];
            let lastPos = last.pos.copy();
            return createVector(lastPos.x, last.bounds().BOTTOM);
        } else { //this._droppable is square

        }
    }

    attach(droppable) {
        if (this._droppable && this._droppable !== droppable) {
            this.detach(this._droppable);
        }
        this._droppable = droppable;
        this._droppable.attach(this);
    }

    detach(droppable) {
        droppable.detach(this);
        this._droppable = null;
    }

    display(cx, cy) {
        push();
        translate(cx, cy);
        if (this._mouseOver) {
            push();
            stroke(0, 255, 0);
            strokeWeight(2);
            fill(0, 255, 0, 100);
            rect(this._pos.x, this._pos.y, this._w, this._h);
            pop();
            if (this._mousePressed) {
                push();
                stroke(255, 0, 0);
                strokeWeight(2);
                fill(255, 0, 0, 100);
                rect(this._pos.x, this._pos.y, this._w, this._h);
                pop();
                if (this._dragging) {
                    push();
                    stroke(0, 0, 255);
                    strokeWeight(2);
                    fill(0, 0, 255, 100);
                    rect(this._pos.x, this._pos.y, this._w, this._h);
                    pop();
                    push();
                    stroke(0);
                    strokeWeight(1);
                    noFill();
                    this.dashedBox(this.bounds(true), 3, 6);
                    pop();
                }
            }
        } else {
            push();
            stroke(0);
            strokeWeight(2);
            fill(0, 100);
            rect(this._pos.x, this._pos.y, this._w, this._h);
            pop();
        }
        pop();
    }
}