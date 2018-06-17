// 1. 일반 호출 this
function defaultThis() {
    console.log(this); // this === window
}

defaultThis();

'use strict'
function strictModeThis() {
    console.log(this); // undefined
}

strictModeThis();

function outerFuncion() {
    console.log('outer', this); // this === window
    function innerFunction() {
        console.log('inner', this); // this === window
    }

    innerFunction();
}

outerFunction();

function outerCallback() {
    console.log('outer', this); // this === window
    return () => {
        console.log('inner', this); // this === window
    }
}

let callback = outerCallback();
callback();

// 2. method 호출 this
let object1 = {
    name: 'object1',
    method: function method() { // Arrow function 사용 시 this는 window 객체를 바라본다.
        console.log(this) // 해당 object
    }
}

object1.method();

let object2 = {
    name: 'object2',
    method: object1.method
}

object2.method();

let method = object1.method; // function assign 이기에 this === window
method();

// 3. call, apply, and bind
let commonObject = {
    name: 'common'
}

function commonFunction(...parameter) {
    console.log(this);
    console.log(parameter);
}

commonFunction.call(commonObject, 1, 2, 3, 4); // 호출된 function 내부의 this는 첫 번째 인자로 넘겨준 object를 바라본다.
commonFunction.apply(commonObject, [1, 2, 3, 4]); // call은 parameter의 수가 지정되 있지 않지만 apply는 this가 바라볼 object + 1개의 parameter만 받을 수 있다.
let bind = commonFunction.bind(commonObject);

bind(); // this는 commonFunction.bind(commonObject)로 넘겨준 object를 바라본다.
bind(1, 2, 3, 4); // parameter를 여러 개 받을 수 있다.

// 4. new keyword
new defaultThis(); // 새로운 object를 만든다.

function getNewValue(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
}

let newVal = new getNewValue('shawn', '28', 'programmer'); // 함수 내부의 this값에 할당되는 데이터를 가지고 새로운 object를 만든다.
console.log(newVal);





