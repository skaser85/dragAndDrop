class Droppable extends Box {
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this._droppable = true;
        this._draggables = [];
        this._orientation = null;
    }

    get droppable() {
        return this._droppable;
    }

    get draggables() {
        return this._draggables;
    }

    get orientation() {
        return {
            WIDE: this.width > this.height,
            TALL: this.height > this.width
        }
    }

    set droppable(value) {
        this._droppable = value;
    }

    attach(draggable) {
        this._draggables.push(draggable);
    }

    detach(draggable) {
        this._draggables = this._draggables.filter(dragger => {
            return dragger !== draggable;
        });
    }

    realign() {
        let pos = this._pos.copy();
        this._draggables.forEach(dragger => {
            dragger.pos = pos.copy();
            if(this.orientation.WIDE) {
                pos.x += dragger.width;
            } else if(this.orientation.TALL) {
                pos.y += dragger.height;
            } else {

            }
        });
    }

    display(cx, cy) {
        push();
        translate(cx, cy);
        noFill();
        if(this._droppable) {
            strokeWeight(4);
            stroke(50, 255, 200);
        } else {
            strokeWeight(4);
            stroke(255, 0, 0);
        }
        this.dashedBox(this.bounds(), 10, 20);
        if(this._mouseOver) {
            fill(210, 0, 210, 50);
        }
        noStroke();
        rect(this._pos.x, this._pos.y, this._w, this._h);
        pop();
    }

}