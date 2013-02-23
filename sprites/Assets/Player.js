#pragma strict

private var spriteManager:SpriteManager;
private var playerSprite:Sprite;
private var runAnimation:UVAnimation = new UVAnimation();
private var idleAnimation:UVAnimation = new UVAnimation();

private var WorldWidthOfSprite = 8/3; //ratio to object width
private var WorldHeightOfSprite = 1.2; //ratio to object height
private var XonTheTexture = 0; //initial x on sprite, animation changes this
private var YonTheTexture = 400; //initial y on sprite, animation changes this
private var WidthOnTheTexture = 100; //width of sprite viewport
private var HeightOnTheTexture = 100; //height of sprite viewport
private var width = 104;
private var height = 170;

function Start()
{
	var ref:GameObject = GameObject.Find("SpriteManager"); //reference to the SpriteManager gameObject, use the name you gave it in step 2.
	spriteManager = ref.GetComponent("LinkedSpriteManager") as SpriteManager; //get the actual SpriteManager component
	
	playerSprite = spriteManager.AddSprite(gameObject, WorldWidthOfSprite, WorldHeightOfSprite, XonTheTexture, YonTheTexture, WidthOnTheTexture, HeightOnTheTexture, false);

	//Run animation
    var startPosUV = spriteManager.PixelCoordToUVCoord(-27, 414);
    var spriteSize = spriteManager.PixelSpaceToUVSpace(width, height);
    runAnimation.BuildUVAnim(startPosUV, spriteSize, 4, 1, 4, 10); //4 rows, 1 column, 4 cells, 10fps
	runAnimation.loopCycles = -1; //continuously run anim  
	playerSprite.AddAnimation(runAnimation);
	
	//idle animation
	startPosUV = spriteManager.PixelCoordToUVCoord(405, 308);
	spriteSize = spriteManager.PixelSpaceToUVSpace(width, height);
    idleAnimation.BuildUVAnim(startPosUV, spriteSize, 4, 1, 1, 10);
    idleAnimation.loopCycles = -1; //continuously run anim  
    playerSprite.AddAnimation(idleAnimation);

	//playerSprite.PlayAnim(runAnimation); //runs animation
	//playerSprite.PlayAnim(idleAnimation);	
}

private var animateState = "idle";
private var animate = false;

function Update () {
	var speed = Time.deltaTime * 8; //units/s
		
	if (Input.GetKey ("up")) {
    	transform.position.x += speed;
    	animateState = "up";
    }

	if (Input.GetKey ("down")) {
    	transform.position.x -= speed;
    	animateState = "down";
    }
    	
    if (Input.GetKey ("left")) {
    	transform.position.z += speed;
    	    	
    	if(animateState!="right")
    		transform.rotation = Quaternion.Euler(90, 90,0); //flip object to play original animation
    		
    	animateState = "left";
    }
    	
    if (Input.GetKey ("right")) {
    	transform.position.z -= speed;   
    	   	
    	if(animateState!="left")
    		transform.rotation = Quaternion.Euler(270, 270,0); //flip object to play reverse animation
    		
    	animateState = "right";  
    }
	
	if (Input.GetKey ("space")) {
		//rigidbody.AddForce(Vector3.up *10);
		animateState = "jumping";
  	}
 
	if(Input.anyKey == false) {
    	playerSprite.PlayAnim(idleAnimation);
    	animate = false;
	} else if(animateState != "idle" && animate==false) {
		playerSprite.PlayAnim(runAnimation);
		animate = true;
	}
	
	if(){
		camera.transform.position.x += 100;
	}
}

//used to position sprite on object
/*function Draw() {
	var UV:Vector2;
	if(Input.GetKeyDown("1")) {
		UV = spriteManager.PixelSpaceToUVSpace(++WidthOnTheTexture,HeightOnThxeTexture);
		playerSprite.uvDimensions = UV;
		Debug.Log (WidthOnTheTexture+''+HeightOnTheTexture);
	}
	
	if(Input.GetKeyDown("2")) {
		UV = spriteManager.PixelSpaceToUVSpace(WidthOnTheTexture,++HeightOnTheTexture);
		playerSprite.uvDimensions = UV;
		Debug.Log (WidthOnTheTexture+''+HeightOnTheTexture);
	}
	
	if(Input.GetKeyDown("3")) {			
		x += 10;
		animate = true;			
	}
	
	if(Input.GetKeyDown("4")) {			
		x -= 10;
		animate = true;			
	}
	
	if(Input.GetKeyDown("5")) {			
		y += 10;
		animate = true;			
	}
	
	if(Input.GetKeyDown("6")) {			
		y -= 10;
		animate = true;			
	}

	if(animate) {
	
		//var startPosUV = spriteManager.PixelCoordToUVCoord(x, y);
		//var spriteSize = spriteManager.PixelSpaceToUVSpace(width, height);
	
		//currentAnimation.BuildUVAnim(startPosUV, spriteSize, 3, 1, 3, 10);
		//Debug.Log (x+'-'+y+','+width+'-'+height);
		animationChanged = true;
		animate = false;
	}
}*/