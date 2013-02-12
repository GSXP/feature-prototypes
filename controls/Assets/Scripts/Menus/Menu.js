#pragma strict

class Menu {
	var width = 100;
	var height = 60;
	var menuSystem : MenuSystem = GameObject.Find("GameManager").GetComponent(MenuSystem);
	
	function moveUp(){};
	function moveDown(){};
	function moveLeft(){};
	function moveRight(){};
	function select(){};
	function select(index : int){};
	function back(){
		menuSystem.pop();
	};
	
	function draw() {
		GUI.Box(Rect(getCenterX() - width/2, getCenterY() - height/2, width, height), "Hello There!\nYou forgot to\noverride draw()");
	};
	
	function Update() {};
	
	protected function getCenterX() {
		return Screen.width / 2;
	}
	protected function getCenterY() {
		return Screen.height / 2;
	}
}