var _cubeGroup = new THREE.Group();
var tex = new THREE.TextureLoader().load( '../Assets/matCap4.jpg' );
var mat = new THREE.MeshMatcapMaterial({matcap:tex});
var _cubesArray = [];
var _thousandIsDone = false;
var _offsetTimer = 0;
var _animCubeOffset = 3;
var _cubeCounter = 0;
var count = 0;

function cubeFractalInit(number) {
  camera.position.z = 27;
  camera.position.y = -9.6;
  camera.position.x = 0;

  scene.add(_cubeGroup);
  generateThousandCubes(number);


}

function cubeFractalRender(speed, countDiv) {
  _offsetTimer += dt*speed;

  // thousand units
  if(_thousandIsDone != true) {
    for(var i = 0; i <  _cubesArray.length; i++) {
      if(_offsetTimer > _animCubeOffset) {
       _cubeGroup.add( _cubesArray[_cubeCounter]);
       count += _cubesArray[_cubeCounter].userData.unit;
       countDiv.innerHTML = count;
        _cubeCounter += 1;
        _offsetTimer = 0;
        // camera.rotation.x += 0.01;
      }
    }
  }

    // _cubeGroup.rotation.y -= 0.001;
    // _cubeGroup.rotation.x += 0.001;

    if(_cubeGroup.children.length === _cubesArray.length) {
      _thousandIsDone = true;
    }

}

function generateThousandCubes (number) {
  var scale = 1;
  var spacing = 1.1;
  var cubeSize = 10;
  var cubeGeoUnits = new THREE.CubeGeometry(scale, scale, scale);
  var cubeGeoThousands = new THREE.CubeGeometry(scale*cubeSize, scale*cubeSize, scale*cubeSize);

  var countString = number.toString();
  var numberOfDigits = countString.length;
  var units = countString[numberOfDigits-1];
  var tens = countString[numberOfDigits-2];
  var hundreds = countString[numberOfDigits-3];
  var thousands = countString[numberOfDigits-4];
  var tenThousands = countString[numberOfDigits-5];
  var hundredThousands = countString[numberOfDigits-6];
  var offsetHundreds = scale* spacing;
  var offsetThousands = scale* spacing*cubeSize + cubeSize;


  //HUNDREDS
   for(let i = 0; i<hundreds; i++) {
    for(let j = 0; j< cubeSize; j++) {
      for(let k = 0; k < cubeSize; k++) {
        var cube = new THREE.Mesh(cubeGeoUnits, mat);
        cube.userData.unit = 1;
        cube.position.x = (j- cubeSize/2)* offsetHundreds;
        cube.position.y = (i  - cubeSize*2)* offsetHundreds;
        cube.position.z = (k- cubeSize/2)* offsetHundreds;
        _cubesArray.push(cube);
      }
    }
  }

  //TENS
  for(let j = 0;j<tens;j++) {
    for(let k = 0; k<cubeSize; k++) {
      var cube = new THREE.Mesh(cubeGeoUnits, mat);
        cube.userData.unit = 1;
        cube.position.x = (j- cubeSize/2)* offsetHundreds;
        cube.position.y = (hundreds-cubeSize*2)* offsetHundreds;
        cube.position.z = (k- cubeSize/2)* offsetHundreds;
        _cubesArray.push(cube);
    }
  }

//UNITS
  for(let k = 0; k<units; k++) {
    var cube = new THREE.Mesh(cubeGeoUnits, mat);
    cube.userData.unit = 1;
    cube.position.x = (tens- cubeSize/2)* offsetHundreds;
    cube.position.y =( hundreds-cubeSize*2)* offsetHundreds;
    cube.position.z = (k - cubeSize/2)* offsetHundreds;
    _cubesArray.push(cube);
  }


   for(let i = 0; i< hundredThousands; i++) {
    for(let j= 0; j < cubeSize; j++) {
      for(let k= 0; k < cubeSize; k++) {
        var cube = new THREE.Mesh(cubeGeoThousands, mat);
        cube.userData.unit = 1000;
        cube.position.x = j*offsetThousands;
        cube.position.y = i*offsetThousands;
        cube.position.z = k*offsetThousands ;
        _cubesArray.push(cube);
      }
    }
  }

  for(let j = 0; j< tenThousands; j++) {
    for(let k= 0; k < cubeSize; k++) {
    var cube = new THREE.Mesh(cubeGeoThousands, mat);
    cube.userData.unit = 1000;
    cube.position.x = j*offsetThousands;
    cube.position.y = hundredThousands*offsetThousands;
    cube.position.z = k*offsetThousands;
    _cubesArray.push(cube);
    }
  }

  for(let k = 0; k< thousands; k++) {
    var cube = new THREE.Mesh(cubeGeoThousands, mat);
    cube.userData.unit = 1000;
    cube.position.x = tenThousands*offsetThousands;
    cube.position.y = hundredThousands*offsetThousands;
    cube.position.z = k*offsetThousands;
    _cubesArray.push(cube);
  }
}
