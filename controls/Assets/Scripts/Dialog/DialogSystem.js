#pragma strict

import System.Collections.Generic;
var gameMode : GameMode;
var dialogQueue : List.<Dialog>;
var currentDialog : Dialog;
var displayTime : float;

function Start() {
	gameMode = gameObject.GetComponent(GameMode);
	dialogQueue = new List.<Dialog>();
	displayTime = -1;
	currentDialog = null;
	enqueue(new Dialog("This is important! You need to press Space to continue."));
	enqueue(new Dialog("Now you're free to walk around.", 3));
	enqueue(new Dialog("Go ahead. WASD or arrow keys. Escape for Menu.", 5));
	enqueue(new Dialog("Looking good! Don't you agree?", 3));
	enqueue(new DialogChoice(new YouLikeChoice()));
}

function enqueue(dialog : Dialog) {
	dialogQueue.Add(dialog);
}

function OnGUI() {
	if (currentDialog == null)
		return;
	currentDialog.draw();
}

function Update () {
	
	if (gameMode.getCurrentMode() == Mode.Dialog) {
		currentDialog.Update();
		// Wait for input
		if (Input.GetButtonDown("Jump")) {
			currentDialog == null;
			if (dialogQueue.Count == 0 || dialogQueue[0].duration != -1) {
				// no need to pause
				gameMode.UnpauseGame();
			}
		}
	} else if (currentDialog != null) {
		currentDialog.Update();
		displayTime -= Time.deltaTime;
		if (displayTime <= 0) {
			// Time's up
			currentDialog = null;
		}
	}
	
	if (dialogQueue.Count > 0 && currentDialog == null) {
		loadNext();
	}
}

function loadNext() {
	currentDialog = dialogQueue[0];
	dialogQueue.RemoveAt(0);
	displayTime = currentDialog.duration;
	if (currentDialog.duration == -1) {
		// We're freezing
		gameMode.KaeporaSpeaks();
	}
}