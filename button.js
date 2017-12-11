class Button {
    constructor(x, y, w, h, caption, action) {
        this._x = x;
        this._y = y
        this._pos = createVector(x, y);
        this._w = w;
        this._h = h;
        this._caption = caption;
        this._action = action;
    }

    get pos() {
        return this._pos;
    }

    get width() {
        return this._w;
    }

    get height() {
        return this._h;
    }

    get caption() {
        return this._caption;
    }

    set pos(value) {
        this._pos = value;
    }

    set width(value) {
        this._w = value;
    }

    set height(value) {
        this._h = value;
    }

    set caption(value) {
        this._caption = value;
    }

    bounds() {
        return {
            TOP: this._pos.y,
            RIGHT: this._pos.x + this._w,
            BOTTOM: this._pos.y + this._h,
            LEFT: this._pos.x
        }
    }    
    
    intersects(other) {
        // this function expects other to be vector
        this._bounds = this.bounds();
        return other.x > this._bounds.LEFT && other.x < this._bounds.RIGHT &&
            other.y > this._bounds.TOP && other.y < this._bounds.BOTTOM;
    }

    click() {
        this._action();
    }

    display() {
        push();
        stroke(0);
        strokeWeight(2);
        fill(84, 149, 255)
        rect(this._pos.x, this._pos.y, this._w, this._h);
        fill(255, 2555, 255);
        textAlign(CENTER, CENTER);
        text(this._caption, this.bounds().RIGHT - (this._w / 2), this.bounds().BOTTOM - (this._h / 2));
        // textAlign(CENTER, TOP);
        // text(this._caption, this.bounds().RIGHT - (this._w / 2), this.bounds().BOTTOM - (this._h / 2));
        pop();
    }


}