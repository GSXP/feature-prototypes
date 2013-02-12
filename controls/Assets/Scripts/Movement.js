#pragma strict

var speed : float;
private var camBottomLeft : Vector3;
private var camTopRight : Vector3;

// Movement Logic in Here

function Start() {
	var cam : Camera = Camera.main;
	camBottomLeft = cam.ScreenToWorldPoint(new Vector3(0, 0, cam.nearClipPlane));
	camTopRight = cam.ScreenToWorldPoint(new Vector3(cam.pixelWidth, cam.pixelHeight, cam.nearClipPlane));
}

function moveHorizontal(delta : float) {
	var newpos = transform.position.x + delta * speed;
	if (newpos > camBottomLeft.x && newpos < camTopRight.x)
			transform.position.x = newpos;
}

function moveVertical(delta : float) {
	var newpos = transform.position.y + delta * speed;
	if (newpos > camBottomLeft.y && newpos < camTopRight.y)
		transform.position.y += delta * speed;

}

function moveTowards(object : GameObject, progress : float) {
	var pos : Vector3 = object.transform.position;
	transform.position = Vector3.Lerp(transform.position, pos, progress);
}