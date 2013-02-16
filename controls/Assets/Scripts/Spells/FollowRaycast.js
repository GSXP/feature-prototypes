#pragma strict

private var player : GameObject;
var width : float = .5;
function Start () {
	player = GameObject.Find("Player");
	//player.GetComponent(Movement).dancing = true;
}

function FixedUpdate () {
	if (Input.GetAxis("Fire1")) {
		var hit : RaycastHit;
		Debug.DrawRay(player.transform.position, player.GetComponent(Movement).face * 100);
		if(Physics.SphereCast(player.transform.position, width, player.GetComponent(Movement).face, hit)) {
			gameObject.renderer.enabled = true;
			gameObject.transform.position = hit.collider.transform.position;
		}
	} else {
		// You've let go!
		// Transfer Coords
		GameObject.Find("Player").GetComponent(Spells).castOtherAtLocation(transform.position);
		Destroy(gameObject);
		//player.GetComponent(Movement).dancing = false;
	}
}