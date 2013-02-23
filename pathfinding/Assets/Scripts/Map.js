#pragma strict

static var cubes : GameObject[,];
static var width = 44;
static var height = 18;

function Awake () {
	cubes = new GameObject[width, height];
	for (var x = 0; x < width; x++) {
		for (var y = 0; y < height; y++) {
			cubes[x, y] = GameObject.CreatePrimitive(PrimitiveType.Cube);
			cubes[x, y].transform.position = Vector3(x - width/2, y - height/2, 0);
			cubes[x, y].renderer.material.color = Color.white;
			
		}
	}
	for (y = 0; y < height - 5; y++) {
		cubes[5, y].renderer.material.color = Color.red;
	}
	for (y = 6; y < height; y++) {
		cubes[10, y].renderer.material.color = Color.blue;
	}
	
	//cubes[5, 5].renderer.material.color = Color.red;
}

function getTileAt(x, y)
{
	
}

function Update () {

}