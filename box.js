class Box {
    constructor(x, y, w, h) {
        this._pos = createVector(x, y);
        this._w = w;
        this._h = h;
        this._bounds;
        this._mouseOver = false;
        this._mousePressed = false;
        this._grid = 20;
    }

    // GETTERS
    get pos() {
        return this._pos;
    }

    get width() {
        return this._w;
    }

    get height() {
        return this._h;
    }

    get mouseOver() {
        return this._mouseOver;
    }

    get mousePressed() {
        return this._mousePressed;
    }

    get grid() {
        return this._grid;
    }

    // SETTERS
    set pos(vec) {
        this._pos = vec;
    }

    set width(value) {
        this._w = value;
    }

    set height(value) {
        this._h = value;
    }

    set mouseOver(value) {
        this._mouseOver = value;
    }

    set mousePressed(value) {
        this._mousePressed = value;
    }

    set grid(value) {
        this._grid = value;
    }

    // METHODS
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

    contains(other) {
        //assumes other is a BOX's bounds
        let me = this.bounds();
        return (other.TOP > me.TOP && other.TOP < me.BOTTOM &&
            other.BOTTOM < me.BOTTOM && other.BOTTOM > me.TOP) &&
            (other.LEFT > me.LEFT && other.LEFT < me.RIGHT &&
                other.RIGHT > me.LEFT && other.RIGHT < me.RIGHT);
    }

    overlaps(other) {
        //assumes other is a BOX's bounds
        let me = this.bounds();
        let inside = {
            top: false,
            right: false,
            bottom: false,
            left: false
        }

        // CHECK IF TOP IS INSIDE me
        if (other.TOP > me.TOP && other.TOP < me.BOTTOM) {
            inside.top = true;
        }
        // CHECK IF BOTTOM IS INSIDE me
        if (other.BOTTOM < me.BOTTOM && other.BOTTOM > me.TOP) {
            inside.bottom = true;
        }
        // CHECK IF LEFT IS INSIDE me
        if (other.LEFT > me.LEFT && other.LEFT < me.RIGHT) {
            inside.left = true;
        }
        // CHECK IF RIGHT IS INSIDE me
        if (other.RIGHT > me.LEFT && other.RIGHT < me.RIGHT) {
            inside.right = true;
        }
        // CHECK IF TOP LEFT CORNER IS INSIDE me
        if (inside.left && inside.top) {
            return true;
        }
        // CHECK IF TOP RIGHT CORNER IS INSIDE me
        if (inside.right && inside.top) {
            return true;
        }
        // CHECK IF BOTTOM LEFT CORNER IS INSIDE me
        if (inside.left && inside.bottom) {
            return true;
        }
        // CHECK IF BOTTOM RIGHT CORNER IS INSIDE me
        if (inside.right && inside.bottom) {
            return true;
        }

        return false;
    }

    dashedBox(b, dashLen, spaceLen) {
        // TOP & BOTTOM
        for (let i = b.LEFT; i < b.RIGHT; i += spaceLen) {
            line(i, b.TOP, i + dashLen, b.TOP);
            line(i, b.BOTTOM, i + dashLen, b.BOTTOM);
        }
        // LEFT & RIGHT
        for (let i = b.BOTTOM - dashLen; i >= b.TOP; i -= spaceLen) {
            line(b.LEFT, i, b.LEFT, i + dashLen);
            line(b.RIGHT, i, b.RIGHT, i + dashLen);
        }
    }
}