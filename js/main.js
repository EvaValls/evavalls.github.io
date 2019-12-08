import * as THREE from '../libs/build/three.module.js';
import { ColladaLoader } from '../libs/loaders/ColladaLoader.js';
import { OrbitControls } from '../libs/controls/OrbitControls.js';
var container, clock;
var camera, scene, renderer, mixer,robot;
init();
animate();
function init() {
    container = document.getElementById( 'container' );

    camera = new THREE.PerspectiveCamera( 45, container.offsetWidth / container.offsetHeight, 0.1, 2000 );
    camera.position.set( 8, 10, 8 );
    camera.lookAt( 0, 3, 0 );

    scene = new THREE.Scene();

    clock = new THREE.Clock();

    // loading manager

    var loadingManager = new THREE.LoadingManager( function () {

        scene.add( robot );

    } );

    // collada

    var loader = new ColladaLoader( loadingManager );
    loader.load( 'robot.dae', function ( collada ) {

        robot = collada.scene;
        var meshes = robot.children;
        for(var i in meshes)
        {
            if(meshes[i].isMesh)
                meshes[i].material.side = THREE.DoubleSide;
        }

    } );

    //

    var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
    scene.add( ambientLight );

    var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.8 );
    directionalLight.position.set( 1, 1, 0 ).normalize();
    scene.add( directionalLight );

    //

    renderer = new THREE.WebGLRenderer({alpha:true});
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( container.offsetWidth, container.offsetHeight );
    container.appendChild( renderer.domElement );

    //


    //

    window.addEventListener( 'resize', onWindowResize, false );
}
function onWindowResize() {
    camera.aspect = container.offsetWidth/container.offsetHeight //window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.offsetWidth, container.offsetHeight)//( window.innerWidth, window.innerHeight );
}
function animate() {
    requestAnimationFrame( animate );
    render();
  
}
function render() {
    var delta = clock.getDelta();
    if ( mixer !== undefined ) {
        mixer.update( delta );
    }
    renderer.render( scene, camera );
}