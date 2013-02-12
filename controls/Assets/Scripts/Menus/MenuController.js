#pragma strict

var gameMode : GameMode;

function Start() {
	gameMode = gameObject.GetComponent(GameMode);
}

function Update () {
	switch (gameMode.getCurrentMode()) {
	case Mode.Play:
		if (Input.GetButtonUp("Menu"))
			gameMode.PauseGame();
		break;
	case Mode.Pause:
		sendToMenu();
		break;
	}
}

function sendToMenu() {
	var currentMenu : Menu = gameObject.GetComponent(MenuSystem).peek();
	if (Input.GetButtonUp("Menu")) {
		currentMenu.back();
	}
	
	if (Input.GetButtonDown("Horizontal")) {
		if(Input.GetAxisRaw("Horizontal") > 0) currentMenu.moveRight();
		else currentMenu.moveLeft();
	}
	
	if (Input.GetButtonDown("Vertical")) {
		if (Input.GetAxisRaw("Vertical") > 0) currentMenu.moveUp();
		else currentMenu.moveDown();
	}
	
	if (Input.GetButtonUp("Jump")) {
		currentMenu.select();
	}
}