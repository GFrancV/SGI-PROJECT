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

var alvo;

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

camera.position.x = 0.9;
camera.position.y = 1;
camera.position.z = 1.5;
camera.lookAt(0, 0, 0);

var model;
var obj = [];
var sofa;

loadModel.load("models/vista-sofa-aumentada.gltf", function (gltf) {
	model = gltf.scene;
	scene.add(model);

	scene.traverse(function (x) 
	{
		if (x.isMesh) {
			x.castShadow = true;
			x.receiveShadow = true;
		}

		if(x.name == "Cube001")
		{
			sofa = x;
		}
	});

    back=THREE.AnimationClip.findByName(gltf.animations,"Cube.009Action");
    back2=THREE.AnimationClip.findByName(gltf.animations,"Cube.008Action");
    back3=THREE.AnimationClip.findByName(gltf.animations,"Cube.007Action");
    cushion=THREE.AnimationClip.findByName(gltf.animations,"Cube.005Action");
    cushion2=THREE.AnimationClip.findByName(gltf.animations,"Cube.006Action");
    cushion3=THREE.AnimationClip.findByName(gltf.animations,"Cube.002Action");
    cushionAll=THREE.AnimationClip.findByName(gltf.animations,"Cube.005Action.001");
    cushionAll2=THREE.AnimationClip.findByName(gltf.animations,"Cube.006Action.001");
    cushionAll3=THREE.AnimationClip.findByName(gltf.animations,"Cube.002Action.001");
});

var rotate = false;
var animation = false;

var ligthUp = new THREE.PointLight("white", 1);
var lightLeft = new THREE.PointLight("white", 0.1);
var lightRigth = new THREE.PointLight("white", 0.7);
var lightDown = new THREE.PointLight("white", 0.5);

document.getElementById("btn_ativarAnimacao").onclick = function () {
	var selectAnimation = document.getElementById("animationSelector");
	var animate = selectAnimation.options[selectAnimation.selectedIndex].value;

	if (!animation) {
        animation = true;
        document.getElementById("btn_ativarAnimacao").innerHTML = "Repor animação";

        switch (animate) {
          case "1":
            var action = mixer.clipAction(back);
            action.setLoop(THREE.LoopOnce, 0);
            action.clampWhenFinished = true;
            action.play();
            var action = mixer.clipAction(back2);
            action.setLoop(THREE.LoopOnce, 0);
            action.clampWhenFinished = true;
            action.play();
            var action = mixer.clipAction(back3);
            action.setLoop(THREE.LoopOnce, 0);
            action.clampWhenFinished = true;
            action.play();
            break;

          case "2":
            var action = mixer.clipAction(cushion);
            action.setLoop(THREE.LoopOnce, 0);
            action.clampWhenFinished = true;
            action.play();
            var action = mixer.clipAction(cushion2);
            action.setLoop(THREE.LoopOnce, 0);
            action.clampWhenFinished = true;
            action.play();
            var action = mixer.clipAction(cushion3);
            action.setLoop(THREE.LoopOnce, 0);
            action.clampWhenFinished = true;
            action.play();
            break;

          case "3":
            var action = mixer.clipAction(cushionAll);
            action.setLoop(THREE.LoopOnce, 0);
            action.clampWhenFinished = true;
            action.play();
            var action = mixer.clipAction(cushionAll2);
            action.setLoop(THREE.LoopOnce, 0);
            action.clampWhenFinished = true;
            action.play();
            var action = mixer.clipAction(cushionAll3);
            action.setLoop(THREE.LoopOnce, 0);
            action.clampWhenFinished = true;
            action.play();
            var action = mixer.clipAction(back);
            action.setLoop(THREE.LoopOnce, 0);
            action.clampWhenFinished = true;
            action.play();
            var action = mixer.clipAction(back2);
            action.setLoop(THREE.LoopOnce, 0);
            action.clampWhenFinished = true;
            action.play();
            var action = mixer.clipAction(back3);
            action.setLoop(THREE.LoopOnce, 0);
            action.clampWhenFinished = true;
            action.play();
            break;
        }
      } else if (animation) {
        animation = false;
        document.getElementById("btn_ativarAnimacao").innerHTML =
          "Ativar animação";

        var action = mixer.clipAction(back);
        action.stop();
        var action = mixer.clipAction(back2);
        action.stop();
        var action = mixer.clipAction(back3);
        action.stop();
        var action = mixer.clipAction(cushion);
        action.stop();
        var action = mixer.clipAction(cushion2);
        action.stop();
        var action = mixer.clipAction(cushion3);
        action.stop();
        var action = mixer.clipAction(cushionAll);
        action.stop();
        var action = mixer.clipAction(cushionAll2);
        action.stop();
        var action = mixer.clipAction(cushionAll3);
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
				camera.position.x = -3;
				camera.position.y = 0;
				camera.position.z = 0;
				camera.lookAt(0, 0, 0);
				break;

			case "2":
				camera.position.x = 3;
				camera.position.y = 0;
				camera.position.z = 0;
				camera.lookAt(0, 0, 0);
				break;

			case "3":
				camera.position.x = 0;
				camera.position.y = 3;
				camera.position.z = 0;
				camera.lookAt(0, 0, 0);
				break;

			case "4":
				camera.position.x = 0;
				camera.position.y = -3;
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
				sofa.material.color = new THREE.Color("yellow");
				break;

			case "2":
				sofa.material.color = new THREE.Color("blue");
				break;

			case "3":
				sofa.material.color = new THREE.Color("brown");
				break;

			case "4":
				sofa.material.color = new THREE.Color("orange");
				break;
			
			case "5":
				sofa.material.color = new THREE.Color("purple");
				break;
			
			case "6":
				sofa.material.color = new THREE.Color("green");
				break;
			
			case "7":
				sofa.material.color = new THREE.Color("red");
				break;				
		}
	};

	document.getElementById("btn_reporCor").onclick = function () {
		sofa.material.color = new THREE.Color(0x424242);
	};

	document.getElementById("btn_reporObjeto").onclick = function () {
		rotate = false;
		animation = false;
	
		sofa.material.color = new THREE.Color(0x424242);
	
		document.getElementById("btn_ativarAnimacao").innerHTML = "Ativar animação";
		var action = mixer.clipAction(back);
        action.stop();
        var action = mixer.clipAction(back2);
        action.stop();
        var action = mixer.clipAction(back3);
        action.stop();
        var action = mixer.clipAction(cushion);
        action.stop();
        var action = mixer.clipAction(cushion2);
        action.stop();
        var action = mixer.clipAction(cushion3);
        action.stop();
        var action = mixer.clipAction(cushionAll);
        action.stop();
        var action = mixer.clipAction(cushionAll2);
        action.stop();
        var action = mixer.clipAction(cushionAll3);
        action.stop();
	
		document.getElementById("btn_rotation").innerHTML = "Ativar rotação";          
        camera.position.x = 0.9;
		camera.position.y = 1;
		camera.position.z = 1.5;
		camera.lookAt(0, 0, 0);
	};
}
else if (document.getElementById("normalView") != null){
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
		
		camera.position.x = 0.9;
		camera.position.y = 1;
		camera.position.z = 1.5;
		camera.lookAt(0, 0, 0);

		scene.add(lightLeft);
		scene.add(lightRigth);
		scene.add(lightDown);
		scene.add(ligthUp);

		document.getElementById("btn_ativarAnimação").innerHTML = "Ativar animação";
		var action = mixer.clipAction(back);
        action.stop();
        var action = mixer.clipAction(back2);
        action.stop();
        var action = mixer.clipAction(back3);
        action.stop();
        var action = mixer.clipAction(cushion);
        action.stop();
        var action = mixer.clipAction(cushion2);
        action.stop();
        var action = mixer.clipAction(cushion3);
        action.stop();
        var action = mixer.clipAction(cushionAll);
        action.stop();
        var action = mixer.clipAction(cushionAll2);
        action.stop();
        var action = mixer.clipAction(cushionAll3);
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

	
	ligthUp.position.set(1, 4, 300);
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