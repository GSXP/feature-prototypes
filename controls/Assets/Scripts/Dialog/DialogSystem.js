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
	
	enqueue(new Dialog("Welcome to the new Controls Demo. Press Space to continue."));
	enqueue(new Dialog("First, let's try the new mouse controls.\nRight-Click = Move\nLeft-Click = Heal\nLeft-Hold = Special"));
	enqueue(new Dialog("Try it yourself!\nRight-Click = Move\nLeft-Click = Heal\nLeft-Hold = Special", 20));
	enqueue(new Dialog("Next, arrow/buttons.\nWASD/Arrows = Move\nLeft-Alt = Heal\nLeft-Ctrl = Special"));
	enqueue(new Dialog("Try it yourself!\nWASD/Arrows = Move\nLeft-Alt = Heal\nLeft-Ctrl = Special", 20));
	enqueue(new Dialog("Feel free to mix and match.\nI personally prefer WASD with mouse clicks for casting."));
	enqueue(new Dialog("That concludes this demo. Thanks for playing!", 20));
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
			currentDialog = null;
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
	print("loading " + currentDialog.text);
	dialogQueue.RemoveAt(0);
	displayTime = currentDialog.duration;
	if (currentDialog.duration == -1) {
		// We're freezing
		gameMode.KaeporaSpeaks();
	}
}