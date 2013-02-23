#pragma strict

var state;
var valArray : double[,];
var destArray : double[,];
var target : Vector3;

function Start () {

	state = "idle";
	renderer.material.color = Color.yellow;
	transform.position = Vector3(-Map.width/2 + 1, 0, -2);
	
	valArray = getVals();
	//Calculate optimal path
	
	var one = new pathEntry(0, 0, 10, null);
	var two = new pathEntry(0, 0, 20, null);
	
}

function getVals () {
	valArray = new double[Map.width, Map.height];
	for (var x = 0; x < Map.width; x++) {
		for (var y = 0; y < Map.height; y++) {
			switch(Map.cubes[x, y].renderer.material.color)
			{
				case Color.white:
					valArray[x, y] = 1;
					break;
				case Color.red:
					valArray[x, y] = 15;
					break;
				case Color.blue:
					valArray[x, y] = 3;
					break;
				default:
					valArray[x, y] = Mathf.Infinity;
			}
		}
	}
	return valArray;
}

function GetMapLocation (x : double, y : double) {
	return Map.cubes[x + Map.width/2 + 0.5, y + Map.height/2 + 0.5].renderer.material.color;
}

function distanceTo (X1 : int, Y1 : int, X2 : int, Y2 : int){
	return X1 < X2 ? X2 - X1 : X1 - X2 + Y1 < Y2 ? Y2 - Y1 : Y1 - Y2;
}

function Update () {
	var movement = 0.1;
	switch(GetMapLocation(transform.position.x, transform.position.y))
	{
		case Color.white:
			break;
		case Color.blue:
			movement = 0.03;
			renderer.material.color = Color.yellow;
			break;
		case Color.red:
			movement = 0.01;
			renderer.material.color = Color.red;
			break;
		default:
			movement = 0;
			break;
	}
	switch(state)
	{
		case "idle":
			if(Input.GetMouseButtonDown(0))
			{
				state = "moving";
				target = Camera.main.ScreenToWorldPoint( Input.mousePosition);
				target.x = Mathf.Floor(target.x + 0.5);
				target.y = Mathf.Floor(target.y + 0.5);
				target.z = -2;
				
				//Calculate Path
				var curLoc = transform.position;
				curLoc.x = Mathf.Floor(curLoc.x);
				curLoc.y = Mathf.Floor(curLoc.y);
				var visitArray = new Array();
				var visitedArray = new Array();

				//!
			}
			break;
		case "moving":
			if(transform.position.y > target.y)
				transform.position.y -= Mathf.Min(transform.position.y - target.y, movement);
			else if(transform.position.y < target.y)
				transform.position.y += Mathf.Min(target.y - transform.position.y, movement);
			else if(transform.position.x > target.x)
				transform.position.x -= Mathf.Min(transform.position.x - target.x, movement);
			else if (transform.position.x < target.x)
				transform.position.x += Mathf.Min(target.x - transform.position.x, movement);
			else if (transform.position == target)
				state = "idle";
			break;
	}
}

class pathEntry { // implements System.IComparable {
	public var x : int;
	public var y : int;
	public var score : double;
	public var parent: pathEntry;
	
	public function pathEntry(inX : int, inY : int, inScore : double, inPar : pathEntry){
		x = inX;
		y = inY;
		score = inScore;
		this.parent = inPar;
	}
	
	function CompareTo(inPath : pathEntry) : int {
		return score.CompareTo(inPath.score);
	}
}