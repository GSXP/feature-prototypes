#pragma strict

var pMove : Movement;
var pSpell : Spells;
var gameMode : GameMode;

function Start() {
	pMove = gameObject.GetComponent(Movement);
	pSpell = gameObject.GetComponent(Spells);
	gameMode = GameObject.Find("GameManager").GetComponent(GameMode);
}

function Update () {
	
	if (gameMode.getCurrentMode() != Mode.Play)
		return;
	
	var horizontal : float = Input.GetAxis("Horizontal");
	var vertical : float = Input.GetAxis("Vertical");
	
	if (horizontal != 0) {
		pMove.moveHorizontal(horizontal * Time.deltaTime);
	}
	if (vertical != 0) {
		pMove.moveVertical(vertical * Time.deltaTime);
	}
	if (Input.GetMouseButtonDown(1)) {
		moveByMouse();
	}
	
	handleMouseCasting();
	
	// Other casting
	
	if (Input.GetButtonDown("Fire1")) {
		pSpell.castOther();
	}
	
	if (Input.GetButtonDown("Fire2")) {
		pSpell.castHeal();
	}
}

function moveByMouse() {
	var dest : Vector3 = Camera.main.ScreenToWorldPoint(Input.mousePosition);
	dest.z = 0;
	pMove.setDestination(dest);
}

function handleMouseCasting() {
	if (Input.GetMouseButtonDown(0)) {
		pSpell.startCasting();
	}
	
	if (pSpell.isCasting() && !Input.GetMouseButton(0)) {
		// player has released, cast something
		pSpell.endCasting();
	}
}
