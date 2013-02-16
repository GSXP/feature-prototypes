#pragma strict

function Start () {

}

function FixedUpdate () {

	if (Input.GetMouseButton(0)) {
		// Follow Mouse
		var dest : Vector3 = Camera.main.ScreenToWorldPoint(Input.mousePosition);
		dest.z = 0;
		gameObject.transform.position = dest;
	} else {
		// You've let go!
		// Transfer Coords
		GameObject.Find("Player").GetComponent(Spells).castOtherAtLocation(transform.position);
		Destroy(gameObject);
	}
	
}