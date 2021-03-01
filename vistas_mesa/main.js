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

camera.position.x = 0.6;
camera.position.y = 0.7;
camera.position.z = 1.1;
camera.lookAt(0, 0, 0);

var model;
var rotate = false;

loadModel.load("models/table.gltf", function (gltf) {
	model = gltf.scene;
	scene.add(model);

	scene.traverse(function (x) {
		alvo = x;
		if (x.isMesh) {
			x.castShadow = true;
			x.receiveShadow = true;
		}
	});

	clipe = THREE.AnimationClip.findByName(gltf.animations, "CubeAction.001");
	clipe2 = THREE.AnimationClip.findByName(gltf.animations, "Cube.002Action.001");
	clipe3 = THREE.AnimationClip.findByName(gltf.animations, "divanAction");
	clipe4 = THREE.AnimationClip.findByName(gltf.animations, "divan-mattressAction");
	clipe5 = THREE.AnimationClip.findByName(gltf.animations, "bed-mattressAction");
});

//Pontos de luz
var lightLeft = new THREE.PointLight("white", 0.8);
var lightRigth = new THREE.PointLight("white", 0.8);
var ligthUp = new THREE.PointLight("white", 1.5);
var lightDown = new THREE.PointLight("white", 0.5);

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
				camera.position.x = 1;
				camera.position.y = 0.8;
				camera.position.z = 2.3;
				camera.lookAt(0, 0, 0);
				break;

			case "2":
				camera.position.x = -1;
				camera.position.y = 0.8;
				camera.position.z = -2.3;
				camera.lookAt(0, 0, 0);
				break;

			case "3":
				camera.position.x = 0;
				camera.position.y = 2.3;
				camera.position.z = 0;
				camera.lookAt(0, 0, 0);
				break;

			case "4":
				camera.position.x = 0;
				camera.position.y = -2.3;
				camera.position.z = 0;
				camera.lookAt(0, 0, 0);
				break;
		}
	};

	document.getElementById("btn_mudarCor").onclick = function () {
		var selectColor = document.getElementById("colorSelector");
		var color = selectColor.options[selectColor.selectedIndex].value;

		switch (color) {
			case "1":
				alvo.material.color = new THREE.Color("yellow");
				break;

			case "2":
				alvo.material.color = new THREE.Color("blue");
				break;

			case "3":
				alvo.material.color = new THREE.Color("brown");
				break;

			case "4":
				alvo.material.color = new THREE.Color("orange");
				break;

			case "5":
				alvo.material.color = new THREE.Color("purple");
				break;
		}
	};

	document.getElementById("btn_reporCor").onclick = function () {
		alvo.material.color = new THREE.Color(0xffffff);
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

	document.getElementById("btn_reporObjeto").onclick = function () {
		rotate = false;
		camera.position.x = 0.6;
		camera.position.y = 0.7;
		camera.position.z = 1.1;
		camera.lookAt(0, 0, 0);

		document.getElementById("btn_rotation").innerHTML = "Ativar rotação";

		alvo.material.color = new THREE.Color(0xffffff);
	};
} else if (document.getElementById("normalView") != null) {
	document.getElementById("btn_zoomIn").onclick = function () {
		camera.position.z -= 0.1;
		camera.lookAt(0, 0, 0);
	};

	document.getElementById("btn_zoomOut").onclick = function () {
		camera.position.z += 0.1;
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
		
		camera.position.x = 0.6;
		camera.position.y = 0.7;
		camera.position.z = 1.1;
		camera.lookAt(0, 0, 0);

		scene.add(lightLeft);
		scene.add(lightRigth);
		scene.add(lightDown);
		scene.add(ligthUp);

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
	lightLeft.position.set(6, 0, 5);
	scene.add(lightLeft);

	lightRigth.position.set(-6, 0, -5);
	scene.add(lightRigth);

	//Luz cima
	ligthUp.position.set(0, 2, 0);
	scene.add(ligthUp);

	//Luz abaixo
	lightDown.position.set(0, -2, 0);
	scene.add(lightDown);
}

animate();
addLights();