#pragma strict

function Start () {
	
	for (var y = 0; y < 5; y++) {
		for (var x = 0; x < 5; x++) {
			var cube = GameObject.CreatePrimitive(PrimitiveType.Cube);
			cube.AddComponent(Rigidbody);
			if((x + y) % 1 == 1)
				cube.renderer.material.color = Color.blue;
			else
				cube.renderer.material.color = Color.white;
			cube.transform.position = Vector3(x, y, 0);
		}
	}
}

function Update () {

}