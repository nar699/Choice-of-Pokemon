var scene; 
var renderer;
var camera;

function createRenderer() {
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
}

function createCamera() {
    camera = new THREE.PerspectiveCamera(
                45,
                window.innerWidth / window.innerHeight,
                0.1,
                10000);

    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 50;

    camera.lookAt(scene.position);

    cameraControl = new THREE.OrbitControls(camera);
}

// create the Earth Material and loa dthe textures
function createEarthMaterial() {

    var earthTexture = new THREE.Texture();
    var loader = new THREE.ImageLoader();
    loader.load('earth/earthmap2k.jpg', function(image) {
            earthTexture.image = image;
            earthTexture.needsUpdate = true;
        });

    var normalMap = new THREE.Texture();
    var loader = new THREE.ImageLoader();
    loader.load('earth/earth_normalmap_flat2k.jpg', function(image) {
            normalMap.image = image;
            normalMap.needsUpdate = true;
    });

    var specularMap = new THREE.Texture();
    var loader = new THREE.ImageLoader();
    loader.load('earth/earthspec2k.jpg', function(image) {
            specularMap.image = image;
            specularMap.needsUpdate = true;
        });


    var earthMaterial = new THREE.MeshPhongMaterial();
    earthMaterial.map = earthTexture;
    
    earthMaterial.normalMap = normalMap;
    earthMaterial.normalScale = new THREE.Vector2(1.0, 1.0);

    earthMaterial.specularMap = specularMap;
    earthMaterial.specular = new THREE.Color(0x262626);

    return earthMaterial;
}

function createEarth() {   
    var sphereGeometry = new THREE.SphereGeometry(15, 30, 30);
    var sphereMaterial = createEarthMaterial();
    var earthMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    earthMesh.name = 'earth';
    scene.add(earthMesh);
}

function createCloudsMaterial() {
    var cloudsTexture = new THREE.Texture();
    var loader = new THREE.ImageLoader();
    loader.load('earth/fair_clouds_1k.png', function(image) {
        cloudsTexture.image = image;
        cloudsTexture.needsUpdate = true;
    });

    var cloudsMaterial = new THREE.MeshPhongMaterial();
    cloudsMaterial.map = cloudsTexture;
    cloudsMaterial.transparent = true
    return cloudsMaterial;
}

function createClouds() {
    var sphereGeometry = new THREE.SphereGeometry(15.5, 30, 30);
    var sphereMaterial = createCloudsMaterial();
    
    var cloudsMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
    cloudsMesh.name = 'clouds';
    scene.add(cloudsMesh);
}


function createBox() {
    var boxGeometry = new THREE.BoxGeometry(6,4,6);
    var boxMaterial = new THREE.MeshLambertMaterial({
                                color: 'red'
                            });
    var box = new THREE.Mesh(boxGeometry, boxMaterial);
    box.castShadow = true;
    scene.add(box);
}

function createPlane() {
    var planeGeometry = new THREE.PlaneGeometry(20, 20);
     var planeMaterial = new THREE.MeshLambertMaterial({
                                color: 0xcccccc
                                });
    //var planeMaterial = createEarthMaterial();

    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.y = -2;
    scene.add(plane);
}

function createLight() {
    var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 5, 10);  //100,10,-50
    directionalLight.name = 'directional';
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    var ambientLight = new THREE.AmbientLight(0x111111);
    scene.add(ambientLight);
}


function createEnvironment() {
    var envGeometry = new THREE.SphereGeometry(90,32,32);
    var envMaterial = new THREE.MeshBasicMaterial();
    envMaterial.map = THREE.ImageUtils.loadTexture(fondo);
    envMaterial.side = THREE.BackSide;
    var mesh = new THREE.Mesh(envGeometry, envMaterial);
    scene.add(mesh);
}

function loadOBJ(){
  var Texture = new THREE.Texture();
    var loader = new THREE.ImageLoader();
    loader.load(textureobj, function(image) {
    Texture.image = image;
    Texture.needsUpdate = true;
    });

    var Material = new THREE.MeshPhongMaterial();
    Material.map = Texture;
	
	var loader = new THREE.OBJLoader();
	
	loader.load(obj, function(object){
		
		object.traverse(function(child){
			if(child instanceof THREE.Mesh){
				child.material = Material;
				child.receiveShadow = true;
				child.castShadow = true;
                //child.name= "pokemon";
			}
		});
        
        object.scale.set(10,10,10);
       
        object.name = "pokemon";
		scene.add(object);
	});
	
}

var obj;
var textureobj;
var fondo;
  
//called ONCE at start of app
function init() {


    scene = new THREE.Scene();

    createRenderer();
    createCamera();
   
    //createBox();
    //createPlane();

    //createEarth();
    //createClouds();
    obj = "/pokemon/source/multi.obj";
    textureobj = '/pokemon/textures/pokeball.png';
    fondo = '/pokemon/fondo/pokeball.jpg';
    createEnvironment();
    loadOBJ();
    createLight();
    document.body.appendChild(renderer.domElement);
    render();
    
}

var trobat=false;
var start_left = true;
var start_right = false;
var pokeball = true;

//called automatically 60fps
function render() {
        
    //this allows you to rotate scene with mouse
    cameraControl.update();
    if(scene.getObjectByName("pokemon")){
		     
                if(tecla1 == true){
                    obj = "/pokemon/source/poliwag.obj";
                    textureobj = '/pokemon/textures/Lambert_Base_Color.png';
                    fondo = '/pokemon/fondo/poli.png';
                    trobat = true;
                    tecla1 = false;
                    pokeball = false;
                  
                }

                if(tecla2 == true){
                    obj = "/pokemon/source/momon1.obj";
                    textureobj = '/pokemon/textures/momom.png';
                    fondo = '/pokemon/fondo/togepi.jpg';
                    trobat = true;
                    tecla2 = false;
                   pokeball = false;
	            }

                if(tecla3 == true){
                    obj = "/pokemon/source/geodu.obj";
                    textureobj = '/pokemon/textures/Geodude_D.png';
                    fondo = '/pokemon/fondo/geodude.jpg';
                    trobat = true;
                    tecla3 = false;
                    pokeball = false;

	            }
                if(teclab == true){
                    obj = "/pokemon/source/multi.obj";
                    textureobj = '/pokemon/textures/pokeball.png';
                    fondo = '/pokemon/fondo/pokeball.jpg';
                    trobat = true;
                    teclab = false;
                    pokeball = true;
                }

                if(trobat == true){
                     scene.remove(scene.getObjectByName('pokemon'));
                     scene.remove(scene.mesh);
                     loadOBJ();
                     createEnvironment();
                     trobat = false;
                }
    }
   
    if(scene.getObjectByName("pokemon") && start_left == true && pokeball == false && freeze == false){
		        scene.getObjectByName("pokemon").rotation.y -= 0.005;
    }

    if(scene.getObjectByName("pokemon") && start_right == true && pokeball == false && freeze == false){
		        scene.getObjectByName("pokemon").rotation.y += 0.005;
    }

    if(moveLeft == true && pokeball == false && freeze == false){
        scene.getObjectByName("pokemon").rotation.y -= 0.01;
        start_left = true;
        start_right = false;
    }

    if(moveRight == true && pokeball == false && freeze == false){
        scene.getObjectByName("pokemon").rotation.y += 0.01;
        start_left = false;
        start_right = true;
    }
 
    renderer.render(scene, camera);

    requestAnimationFrame(render);
}

init();

var tecla1 = false;
var tecla2 = false;
var tecla3 = false;
var teclab = false;

window.addEventListener("keydown", function(e) {
    switch(e.key){
        case '1':
            tecla1 = true;
        break;

        case '2':
            tecla2 = true;
        break;

        case '3':
            tecla3 = true;
        break;

        case 'b':
            teclab = true;
        break;   
    }

});



var moveLeft = false;
var moveRight = false;
window.addEventListener("keydown", function(e) {
    switch(e.key){
        case 'a':
           moveLeft = true;
        break;

        case 'd':
            moveRight = true;
            //pokeball = false;
        break;
    }

});

window.addEventListener("keyup", function(e) {
    switch(e.key){
        case 'a':
           moveLeft = false;
        break;

        case 'd':
            moveRight = false;
        break;
    }

});

var freeze = false;
document.getElementById("stop").addEventListener("mousedown",function(e){
    scene.getObjectByName("pokemon").rotation.y =0;
    freeze = true;
});

document.getElementById("run").addEventListener("mousedown",function(e){
    if(pokeball == false){
    scene.getObjectByName("pokemon").rotation.y +=5;
    }
    freeze = false;
});