#pragma strict

class YouLikeChoice extends ListMenu {
	
	function YouLikeChoice() {
		super(["Yeah, it's cool!","Nah, I'm not feeling it"]);
	}
	
	function draw() {
		var width = Screen.width / 3;
		var height = Screen.height / 4;
		var box : Rect = Rect(Screen.width / 2  - width / 2, Screen.height / 2 - height / 2, width, height);
		GUI.Box(box, "What Do You Think?");
		var buttonBox : Rect = Rect(box.x + 5, box.y + 20, box.width - 10, box.height - 25);
		super.drawButtonList(buttonBox, .075);
	}
	
	function back() {
		// You can't escape!
		return;
	}
	
	function select() {
		var dialogSystem : DialogSystem = GameObject.Find("GameManager").GetComponent(DialogSystem);
		if (super.selected == 0) {
			dialogSystem.enqueue(new Dialog("All right chumps! Let's do this!"));
			dialogSystem.enqueue(new Dialog("LEEEEEEROY", 1));
			dialogSystem.enqueue(new Dialog("JEEEEEENKINNSSSSSS!!!!",2));
		} else if (super.selected == 1) {
			dialogSystem.enqueue(new Dialog("Well at least i have chicken", 3));
		}
		// Pops off the menu stack
		super.back();
	}
}