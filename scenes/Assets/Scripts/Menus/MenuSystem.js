#pragma strict
import System.Collections.Generic;

var gameMode : GameMode;
var menuStack : List.<Menu>;


function Start() {
	gameMode = gameObject.GetComponent(GameMode);
	menuStack = new List.<Menu>();
}

function push(newMenu : Menu) {
	menuStack.Add(newMenu);
}

function peek() {
	return menuStack[menuStack.Count - 1];
}

function pop() {
	var top : Menu = menuStack[menuStack.Count - 1];
	menuStack.RemoveAt(menuStack.Count - 1);
	if (menuStack.Count == 0) {
		// Nothing left in menu
		gameMode.UnpauseGame();
	}
	return top;
}

function OnGUI () {
	if (gameMode.getCurrentMode() == Mode.Pause && menuStack.Count > 0)
		peek().draw();
}

function Update () {
	if (gameMode.getCurrentMode() == Mode.Pause && menuStack.Count > 0)
		peek().Update();
}