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
	
	if (Input.GetButton("Jump")) {
		pSpell.casting(Time.deltaTime);
	}
	
	if (Input.GetButtonUp("Jump")) {
		pSpell.castSpell();
	}
}