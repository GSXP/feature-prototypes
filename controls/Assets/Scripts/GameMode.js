#pragma strict

public enum Mode {Play, Pause, Dialog};
private var currentMode : Mode;

function Start() {
	currentMode = Mode.Play;
}

function getCurrentMode() {
	return currentMode;
}

function setCurrentMode(newMode : Mode) {
	currentMode = newMode;
}

function PauseGame() {
	currentMode = Mode.Pause;
	gameObject.GetComponent(MenuSystem).push(new MainMenu());
	Time.timeScale = 0;
}

function UnpauseGame() {
	currentMode = Mode.Play;
	Time.timeScale = 1;
}

// Not final name
// Freezes game to read text
function KaeporaSpeaks() {
	currentMode = Mode.Dialog;
	Time.timeScale = 0;
}

