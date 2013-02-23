#pragma strict

class MainMenu extends ListMenu {

	function MainMenu() {
		super(["Spells","Options","Resume","Switch Scene","Exit"]);
	}

	function draw() {
		super.width = Screen.width / 3;
		super.height = Screen.height / 3 * 2;
		
		var gridWidth = super.width / 4 * 3;
		var gridHeight = super.height / 4 * 3;
		
		GUI.Box(Rect(getCenterX() - super.width / 2, getCenterY() - super.height / 2, width, height), "Main Menu");
		
		super.drawButtonList(Rect(getCenterX() - gridWidth/2, getCenterY() - gridHeight/2, gridWidth, gridHeight), .2);
	}
	
	function select() {
		switch (selected) {
		case 0:
			openSpells();
			break;
		case 1:
			openOptions();
			break;
		case 2:
			resume();
			break;
		case 3:
			switchScene();
			break;
		case 4:
			exit();
			break;
		}
	}
	
	function openSpells() {
		super.menuSystem.push(new Menu());
	}
	
	function openOptions() {
		super.menuSystem.push(new Menu());
	}
	
	function resume() {
		super.back();
	}
	
	function exit() {
		Application.Quit();
	}
	
	function switchScene() {
		if(Application.loadedLevelName != "scene1"){
			Application.LoadLevel("scene1");
		}else{
			Application.LoadLevel("ControlPrototype");
		}
	}

}