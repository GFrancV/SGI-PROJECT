var scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
var camera = new THREE.PerspectiveCamera(
	60,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);
var myCanvas = document.getElementById("myCanvas");
var renderer = new THREE.WebGLRenderer({ canvas: myCanvas });
var controls = new THREE.OrbitControls(camera, renderer.domElement);

var mixer = new THREE.AnimationMixer(scene);
var clock = new THREE.Clock();

var loadModel = new THREE.GLTFLoader();

function resizeRendererToDisplaySize(renderer) {
	const canvas = renderer.domElement;
	const width = canvas.clientWidth;
	const height = canvas.clientHeight;
	const needResize = canvas.width !== width || canvas.height !== height;
	if (needResize) {
		renderer.setSize(width, height, false);
	}
	return needResize;
}

function render(time) {
	time *= 0.001;

	if (resizeRendererToDisplaySize(renderer)) {
		const canvas = renderer.domElement;
		camera.aspect = canvas.clientWidth / canvas.clientHeight;
		camera.updateProjectionMatrix();
	}

	renderer.render(scene, camera);

	requestAnimationFrame(render);
}

requestAnimationFrame(render);

renderer.shadowMap.enabled = true;

camera.position.x = 90;
camera.position.y = 100;
camera.position.z = 200;
camera.lookAt(0, 0, 0);

var model;
var obj = [];

loadModel.load("models/vintage-bed-animation.gltf", function (gltf) {
	model = gltf.scene;
	scene.add(model);

	scene.traverse(function (x) {
		if (x.isMesh) {
			x.castShadow = true;
			x.receiveShadow = true;
		}

		switch (x.name) {
			case "bed-structure":
				objStructure = x;
			case "divan":
				objDivan = x;
		}
	});

	mattress = THREE.AnimationClip.findByName(gltf.animations, "bed-mattressAction.002");
	pillow = THREE.AnimationClip.findByName(gltf.animations, "pillowAction.001");
	divan1 = THREE.AnimationClip.findByName(gltf.animations, "divanAction");
	divan2 = THREE.AnimationClip.findByName(gltf.animations, "divan-mattressAction");
	mattress2 = THREE.AnimationClip.findByName(gltf.animations, "bed-mattressAction");
});

var rotate = false;
var animation = false;

var ligthUp = new THREE.PointLight("white", 1);
var lightLeft = new THREE.PointLight("white", 0.1);
var lightRigth = new THREE.PointLight("white", 0.7);
var lightDown = new THREE.PointLight("white", 0.5);


document.getElementById("btn_ativarAnimação").onclick = function () {
	var selectAnimation = document.getElementById("animationSelector");
	var animate = selectAnimation.options[selectAnimation.selectedIndex].value;

	if (!animation) {
		animation = true;
		document.getElementById("btn_ativarAnimação").innerHTML = "Repor animação";

		switch (animate) {
			case "1":
				var action = mixer.clipAction(divan1);
				action.setLoop(THREE.LoopOnce, 0);
				action.clampWhenFinished = true;
				action.play();
				var action = mixer.clipAction(divan2);
				action.setLoop(THREE.LoopOnce, 0);
				action.clampWhenFinished = true;
				action.play();
				break;

			case "2":
				var action = mixer.clipAction(pillow);
				action.setLoop(THREE.LoopOnce, 0);
				action.clampWhenFinished = true;
				action.play();
				var action = mixer.clipAction(mattress);
				action.setLoop(THREE.LoopOnce, 0);
				action.clampWhenFinished = true;
				action.play();
				break;

			case "3":
				var action = mixer.clipAction(pillow);
				action.setLoop(THREE.LoopOnce, 0);
				action.clampWhenFinished = true;
				action.play();
				break;

			case "4":
				var action = mixer.clipAction(pillow);
				action.setLoop(THREE.LoopOnce, 0);
				action.clampWhenFinished = true;
				action.play();
				var action = mixer.clipAction(mattress2);
				action.setLoop(THREE.LoopOnce, 0);
				action.clampWhenFinished = true;
				action.play();
				var action = mixer.clipAction(divan1);
				action.setLoop(THREE.LoopOnce, 0);
				action.clampWhenFinished = true;
				action.play();
				var action = mixer.clipAction(divan2);
				action.setLoop(THREE.LoopOnce, 0);
				action.clampWhenFinished = true;
				action.play();
				break;
		}
	} else if (animation) {
		animation = false;
		document.getElementById("btn_ativarAnimação").innerHTML = "Ativar animação";

		var action = mixer.clipAction(mattress);
		action.stop();
		var action = mixer.clipAction(pillow);
		action.stop();
		var action = mixer.clipAction(mattress2);
		action.stop();
		var action = mixer.clipAction(divan2);
		action.stop();
		var action = mixer.clipAction(divan1);
		action.stop();
	}
};

document.getElementById("btn_rotation").onclick = function () {
	if (rotate) {
		rotate = false;
		document.getElementById("btn_rotation").innerHTML = "Ativar rotação";
	} else if (!rotate) {
		rotate = true;
		document.getElementById("btn_rotation").innerHTML = "Desativar rotação";
	}
};

if (document.getElementById("normalView") == null) {
	document.getElementById("btn_mudarVisualizacao").onclick = function () {
		var cameraSelector = document.getElementById("cameraSelector");
		var perspective = cameraSelector.options[cameraSelector.selectedIndex].value;

		switch (perspective) {
			case "1":
				camera.position.x = 200;
				camera.position.y = 100;
				camera.position.z = 200;
				camera.lookAt(0, 0, 0);
				break;

			case "2":
				camera.position.x = 200;
				camera.position.y = 100;
				camera.position.z = -200;
				camera.lookAt(0, 0, 0);
				break;

			case "3":
				camera.position.x = 10;
				camera.position.y = 250;
				camera.position.z = 0;
				camera.lookAt(0, 0, 0);
				break;

			case "4":
				camera.position.x = 10;
				camera.position.y = -250;
				camera.position.z = 0;
				camera.lookAt(0, 0, 0);
				break;
		}
	};

	document.getElementById("btn_mudarCor").onclick = function () {
		var selectColor = document.getElementById("colorSelector");
		var color = selectColor.options[selectColor.selectedIndex].value;

		switch (color) 
		{
			case "1":
				objDivan.material.color = new THREE.Color("yellow");
				objStructure.material.color = new THREE.Color("yellow");
				break;

			case "2":
				objDivan.material.color = new THREE.Color("blue");
				objStructure.material.color = new THREE.Color("blue");
				break;

			case "3":
				objDivan.material.color = new THREE.Color("brown");
				objStructure.material.color = new THREE.Color("brown");
				break;

			case "4":
				objDivan.material.color = new THREE.Color("orange");
				objStructure.material.color = new THREE.Color("orange");
				break;
			
			case "5":
				objDivan.material.color = new THREE.Color("purple");
				objStructure.material.color = new THREE.Color("purple");
				break;
			
			case "6":
				objDivan.material.color = new THREE.Color("green");
				objStructure.material.color = new THREE.Color("green");
				break;

			
			case "7":
				objDivan.material.color = new THREE.Color("red");
				objStructure.material.color = new THREE.Color("red");
				break;				
		}
	};

	document.getElementById("btn_reporCor").onclick = function () {
		objDivan.material.color = new THREE.Color(0xffffff);
		objStructure.material.color = new THREE.Color(0xffffff);
	};

	document.getElementById("btn_reporObjeto").onclick = function () {
		rotate = false;
		animation = false;
	
		objDivan.material.color = new THREE.Color(0xffffff);
		objStructure.material.color = new THREE.Color(0xffffff);
	
		document.getElementById("btn_ativarAnimação").innerHTML = "Ativar animação";
		var action = mixer.clipAction(mattress);
		action.stop();
		var action = mixer.clipAction(pillow);
		action.stop();
		var action = mixer.clipAction(mattress2);
		action.stop();
		var action = mixer.clipAction(divan2);
		action.stop();
		var action = mixer.clipAction(divan1);
		action.stop();
	
		document.getElementById("btn_rotation").innerHTML = "Ativar rotação";
		camera.position.x = 90;
		camera.position.y = 100;
		camera.position.z = 200;
		camera.lookAt(0, 0, 0);
	};
}
else if (document.getElementById("normalView") != null){
	document.getElementById("btn_zoomIn").onclick = function () {
		camera.position.z -= 10;
		camera.lookAt(0, 0, 0);
	};

	document.getElementById("btn_zoomOut").onclick = function () {
		camera.position.z += 10;
		camera.lookAt(0, 0, 0);
	};

	document.getElementById("btn_changeLight").onclick = function () {
		var lightSelector = document.getElementById("lightSelector");
		var light = lightSelector.options[lightSelector.selectedIndex].value;

		switch (light) {
			case "1":
				scene.remove(lightLeft);
				break;

			case "2":
				scene.remove(lightRigth);
				break;

			case "3":
				scene.remove(ligthUp);
				break;

			case "4":
				scene.remove(lightDown);
				break;
		}
	};

	document.getElementById("btn_resetLight").onclick = function () {
		scene.add(lightLeft);
		scene.add(lightRigth);
		scene.add(lightDown);
		scene.add(ligthUp);
	};

	document.getElementById("btn_reporObjeto").onclick = function () {
		rotate = false;
		
		camera.position.x = 90;
		camera.position.y = 100;
		camera.position.z = 200;
		camera.lookAt(0, 0, 0);

		scene.add(lightLeft);
		scene.add(lightRigth);
		scene.add(lightDown);
		scene.add(ligthUp);

		document.getElementById("btn_ativarAnimação").innerHTML = "Ativar animação";
		var action = mixer.clipAction(mattress);
		action.stop();
		var action = mixer.clipAction(pillow);
		action.stop();
		var action = mixer.clipAction(mattress2);
		action.stop();
		var action = mixer.clipAction(divan2);
		action.stop();
		var action = mixer.clipAction(divan1);
		action.stop();

		document.getElementById("btn_rotation").innerHTML = "Ativar rotação";
	};
}

var animate = function () {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
	mixer.update(clock.getDelta());
	if (model) {
		if (rotate) model.rotation.y += 0.01;
	}
};

function addLights() {
	var pointLight = new THREE.PointLight("white", 0.5);
	pointLight.position.set(500, 80, 10);
	pointLight.castShadow = true;
	scene.add(pointLight);

	
	ligthUp.position.set(100, 400, 300);
	scene.add(ligthUp);

	//Luz da esquerda
	lightLeft.position.set(0, 0, 300);
	scene.add(lightLeft);

	//Luz da direita
	lightRigth.position.set(300, 300, -300);
	scene.add(lightRigth);

	//Luz de baixo
	lightDown.position.set(-300, -300, -300);
	scene.add(lightDown);
}

animate();
addLights();