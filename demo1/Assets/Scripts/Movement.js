#pragma strict

var speed : float;
var face : Vector3;
private var camBottomLeft : Vector3;
private var camTopRight : Vector3;
private var hasDest : boolean = false;
private var dest : Vector3 = Vector3.zero;
private var velocity : Vector3 = Vector3.zero;
var dancing : boolean = false;
// Movement Logic in Here

function Start() {
	var cam : Camera = Camera.main;
	camBottomLeft = cam.ScreenToWorldPoint(new Vector3(0, 0, cam.nearClipPlane));
	camTopRight = cam.ScreenToWorldPoint(new Vector3(cam.pixelWidth, cam.pixelHeight, cam.nearClipPlane));
}

function moveHorizontal(delta : float) {
	changeFace(delta, 0);
	var newpos = transform.position.x + delta * speed;
	var width = camTopRight.x - camBottomLeft.x;
	if (newpos > camBottomLeft.x && newpos < camTopRight.x)
		transform.position.x = newpos;
	if (newpos >= camTopRight.x){
	//refactor some time is realy bade
		print("move camra");
		Camera.main.transform.position.x += width;
		transform.position.x = newpos;
		
		camBottomLeft.x += width;
		camTopRight.x += width;
	}
	if (newpos <= camBottomLeft.x){
	//refactor some time is realy bade
		print("move camra");
		Camera.main.transform.position.x -= width;
		transform.position.x = newpos;
		
		camBottomLeft.x -= width;
		camTopRight.x -= width;
	}
	hasDest = false;
}

function moveVertical(delta : float) {
	changeFace(0, delta);
	var newpos = transform.position.y + delta * speed;
	if (newpos > camBottomLeft.y && newpos < camTopRight.y)
		transform.position.y += delta * speed;
	hasDest = false;
}

function changeFace(deltaX : float, deltaY : float) {
	if (dancing) return;
	if (Mathf.Abs(deltaX) > Mathf.Abs(deltaY)) {
		// Horizontal
		if (deltaX > 0) {
			face = Vector3.right;
		} else {
			face = Vector3.left;
		}
		transform.rotation = Quaternion.Euler(0, 0, face.x * 90);
	} else {
		// Vertical
		if (deltaY > 0) {
			face = Vector3.up;
		} else {
			face = Vector3.down;
		}
		transform.rotation = Quaternion.Euler(0, 0, face.y * 90 + 90);
	}
}

function setDestination(location : Vector3) {
	dest = location;
	lookTowards(location);
	hasDest = true;
}

function lookTowards(location : Vector3) {
	var delta = location - transform.position;
	changeFace(delta.x, delta.y);
}

function removeDestination() {
	hasDest = false;
}

private function moveToDest() {
	transform.position = Vector3.SmoothDamp (transform.position, dest, velocity, 0.2, speed);
	if (transform.position == dest) {
		hasDest = false;
	}
}

function Update() {
	if (hasDest) {
		moveToDest();
	}
}