let cnv;
let cnvEl;
let draggables;
let droppables;
let dragDrop;
let grid;
let cam;
let addDraggable;
let addDroppable;
let pool;
let w;
let fluff;
let cX;
let cY;

function setup() {
	cnv = createCanvas(6000, windowHeight);
	cnvEl = cnv.elt;
	// cam = new Camera();
	cX = 0;
	cY = 0;
	dragDrop = new DragAndDrop(cnvEl);
	dragDrop.mouseEvents();
	droppables = new Droppables()
	draggables = new Draggables();
	w = 100;
	// fluff = 4;
	dragDrop.grid = w;
	for (let i = 0; i < 30; i++) {
		droppables.insert(new Droppable(w + (i * w), w, w, w * 5));
	}

	pool = new Droppable(w, 700, 600, 200);
	droppables.insert(pool);
	for (let i = 0; i < 5; i++) {
		draggables.insert(new Draggable(w + (i * w), pool.pos.y, w, w), pool);
		// draggables.draggables[i].snapToGrid = true;
		draggables.draggables[i].snapToDroppable = true;
	}
	// grid = draggables.draggables[0].grid;
	dragDrop.draggables = draggables;
	dragDrop.droppables = droppables;
	// dragDrop.showGrid = true;
	// addDraggable = new Button(10, height - 100, 100, 50, "Add Draggable", () => {
	// dragDrop.draggables.insert(new Draggable(0, 100, 100, 100), droppables.droppables[2]);
	// console.log("Idk, mang, like shit happens here. (add draggable)");
	// });
	// addDroppable = new Button(120, height - 100, 100, 50, "Add Droppable", () => {
	// droppables.insert(new Droppable(600, 100, 300, 800))
	// console.log("This is where I would put a droppable...if I could figure out a way to make it make sense.");
	// });
}

function draw() {
	background(200);
	dragDrop.update(getMouse(), getPmouse());
	dragDrop.display(cX, cY);
	// addDraggable.display();
	// addDroppable.display();
}

function mouseClicked() {
	// if(addDraggable.intersects(getMouse())) {
	// 	addDraggable.click();
	// }
	// if(addDroppable.intersects(getMouse())) {
	// 	addDroppable.click();
	// }
}

function mouseWheel(e) {
	let factor = Math.pow(1.01, e.delta);
	cam.scale(factor, mouseX, mouseY);
}

function mouseDragged() {
	if (mouseOnCanvas()) {
		cX += mouseX - pmouseX;
		cY += mouseY - pmouseY;
		if (cX > 0) {
			cX = 0;
		}
		if (cY > 0) {
			cY = 0;
		}
	}
}

function mouseOnCanvas() {
	return !dragDrop.draggables.highlighted && !dragDrop.droppables.droppable;
}

function getMouse() {
	return createVector(mouseX - cX, mouseY - cY);
}

function getPmouse() {
	return createVector(pmouseX - cX, pmouseY - cY);
}