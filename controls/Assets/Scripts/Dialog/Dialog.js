#pragma strict

class Dialog {

	var text : String;
	var duration : float;
	var textRect : Rect;
	var nextRect : Rect = Rect(0,0,20,20);
	
	function Dialog(message : String, seconds : float) {
		text = message;
		duration = seconds;
	}
	
	function Dialog(message : String) {
		text = message;
		duration = -1;
	}
	
	function draw() {	
		var width = Screen.width / 4 * 3;
		var height = Screen.height / 6;
		textRect = Rect(Screen.width / 2 - width / 2, Screen.height / 2 + height * 1.5, width, height);
		
		GUI.Box(textRect, text);
		
		if(duration == -1)
			GUI.Label(Rect(textRect.xMax - nextRect.width, textRect.yMax - nextRect.height, nextRect.width, nextRect.height), "...");
	}
	
	function Update() {
	
	}
}

class DialogChoice extends Dialog {
	
	private var menu : Menu;
	
	function DialogChoice(choices : Menu) {
		super("",0);
		menu = choices;
	}
	
	function Update() {
		var manager : GameObject = GameObject.Find("GameManager");
		manager.GetComponent(MenuSystem).push(menu);
		manager.GetComponent(GameMode).setCurrentMode(Mode.Pause);
		
	}
}