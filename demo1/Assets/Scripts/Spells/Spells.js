#pragma strict

var ding : AudioClip;
var _isCasting : boolean = false;
var maxed : boolean = false;
var castTime : float = 0;
var castArea : Transform;
var castingArea : boolean;
var hero : GameObject;
public static var longPress : float = .5;


function Start() {
	hero = GameObject.Find("Hero");
	castingArea = false;
}

function castHeal() {
	// If Heal is being cast, don't recast it
	if(!hero.GetComponent(Heal).enabled) {
		Debug.Log("Healing!");
		hero.GetComponent(Heal).enabled = true;
	}
}

function castOther() {
	if(castingArea) {
		// Already casting, return
		return;
	}
	Debug.Log("Other!");
	var area = Instantiate(castArea, Vector3.zero, Quaternion.Euler(270, 0, 0));
	area.gameObject.renderer.enabled = false;
	area.gameObject.AddComponent(FollowRaycast);
	castingArea = true;
}

function castOtherAtLocation(location : Vector3) {
	Debug.Log("You cast at " + location);
	castingArea = false;
}

function Update() {
	if (_isCasting) {
		castTime += Time.deltaTime;
		casting();
	}
}

function startCasting() {
	_isCasting = true;
}

function casting() {
	if (castTime >= longPress && !maxed && !castingArea) {
		var dest : Vector3 = Camera.main.ScreenToWorldPoint(Input.mousePosition);
		dest.z = 0;
		var area = Instantiate(castArea, dest, Quaternion.Euler(270, 0, 0));
		area.gameObject.AddComponent(FollowMouse);
		maxed = true;
		castingArea = true;
	}
}

function endCasting() {
	if (castTime < longPress) {
		castHeal();
	} else {
		// castOther();
	}
	maxed = false;
	_isCasting = false;
	castTime = 0;
}

function isCasting() {
	return _isCasting;
}
