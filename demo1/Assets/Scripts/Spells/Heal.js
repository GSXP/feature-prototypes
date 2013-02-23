#pragma strict

var baseColor : Color;
final static var lifetime : float = 1;
var pastTime : float;

function Start () {
	baseColor = gameObject.renderer.material.color;
	pastTime = 0;
	gameObject.GetComponent(Heal).enabled = false;
}

function Update () {
	pastTime += Time.deltaTime;
	gameObject.renderer.material.color = Color.Lerp(Color.white, baseColor, pastTime/lifetime);
	if (pastTime >= lifetime) {
		pastTime = 0;
		gameObject.GetComponent(Heal).enabled = false;
	}
}