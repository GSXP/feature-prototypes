#pragma strict

private var castTime : float;
private var baseColor : Color;

function Start() {
	castTime = 0;
	baseColor = gameObject.renderer.material.color;
}

function casting(time : float) {
	castTime += time;
	gameObject.renderer.material.color = Color.Lerp(baseColor, Color.white, castTime);
}

function castSpell() {
	castTime = 0;
	gameObject.renderer.material.color = baseColor;
}