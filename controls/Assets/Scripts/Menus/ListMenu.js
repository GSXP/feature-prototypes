#pragma strict

class ListMenu extends Menu {
	
	protected var choices : String[];
	protected var selected : int;
	
	function ListMenu(choices : String[]) {
		this.choices = choices;
		selected = -1;
	}
	
	protected function drawButtonList(area : Rect, spacing : float) {
		var mousePos : Vector2 = Event.current.mousePosition;
		
		var buttonHeight : float = area.height * (1 - spacing) / choices.Length;
		var buttonSpace : float = area.height * (spacing) / (choices.Length - 1);
		
		var chosen : boolean = false;
		var buttonRect : Rect;
		for (var i : int = 0; i < choices.Length; i++) {
			GUI.SetNextControlName(choices[i]);
			buttonRect = Rect(area.x, area.y + i * (buttonHeight + buttonSpace), area.width, buttonHeight);
			chosen = GUI.Button(buttonRect, choices[i]);
			if (buttonRect.Contains(mousePos)) {
				selected = i;
			}
			if (chosen)
				select();
		}
		
		if (selected >= 0 && selected < choices.Length)
			GUI.FocusControl(choices[selected]);
		else {
			GUI.SetNextControlName("");
			GUI.FocusControl("");
		}
	}
	
	function moveUp() {
		selected--;
		if (selected < 0)
			selected = choices.Length - 1;
	}
	
	function moveDown() {
		selected++;
		if (selected > choices.Length - 1)
			selected = 0;
	}
}