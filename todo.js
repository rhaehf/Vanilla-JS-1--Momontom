const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList"),
    finToDoList = document.querySelector(".js-finToDoList");

const PENDING = "PENDING"; // KEY에 나타나는 내용
const FINISHED = "FINISHED";

let toDos = []; //todo를 저장 할 배열
let finToDos = [];

function deleteToDo(event) { // 버튼 클릭시 todo를 삭제
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    //filter: array의 모든 아이템을 통해 함수 실행->true인 아이템을만 가지고 새로운 array 생성
    const cleanToDos = toDos.filter(function (toDo) { // li에 없는 id인 toDos를 체크하려함
        return toDo.id !== parseInt(li.id); // 모든 toDos가 li의 id와 같지 않을 때
    });
    toDos = cleanToDos;
    saveToDos();
}

function deleteFinToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    finToDoList.removeChild(li);
    const cleanToDos = finToDos.filter(function (toDo) {
        // li에 없는 id인 toDos를 체크하려함
        return toDo.id !== parseInt(li.id); // 모든 toDos가 li의 id와 같지 않을 때
    });
    finToDos = cleanToDos;
    saveFinToDos();
}

function finishToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    const text = li.childNodes[0].textContent; // pending todo의 span(내용) 부분
    toDoList.removeChild(li); // html에서 없애줌
    const cleanToDos = toDos.filter(function (toDo) { // li에 없는 id인 toDos를 체크하려함
        return toDo.id !== parseInt(li.id); // 모든 toDos가 li의 id와 같지 않을 때
    });
    toDos = cleanToDos;
    saveToDos();
    //console.log(text); // 선택한 내용 출력
    paintFinToDo(text); // finished에 todo를 그리기 위함
}

function backToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    const text = li.childNodes[0].textContent; // pending todo의 span(내용) 부분
    finToDoList.removeChild(li); // html에서 없애줌
    const cleanToDos = finToDos.filter(function (toDo) { // li에 없는 id인 toDos를 체크하려함
        return toDo.id !== parseInt(li.id); // 모든 toDos가 li의 id와 같지 않을 때
    });
    finToDos = cleanToDos;
    saveFinToDos();
    //console.log(text); // 선택한 내용 출력
    paintToDo(text);
}

function saveFinToDos() {
    localStorage.setItem(FINISHED, JSON.stringify(finToDos));
}

function paintFinToDo(text) {
    const li = document.createElement("li"); //createElement: 문서에 li요소 추가
    const delBtn = document.createElement("button");
    const backBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = finToDos.length + 1;
    span.innerText = text;
    delBtn.innerText = "❌"; // innerTxt: 문자 추가
    backBtn.innerText = "🔁";
    delBtn.addEventListener("click", deleteFinToDo);
    backBtn.addEventListener("click", backToDo);
    li.appendChild(span);
    li.appendChild(delBtn); // appendChild: 무언가를 father 요쇼에 추가
    li.appendChild(backBtn);
    li.id = newId;
    finToDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    finToDos.push(toDoObj);
    saveFinToDos();
}

function saveToDos() { //로컬 스토리지에 todo를 저장
    // 자바스크립트는 local storage에 있는 모든 데이터를 string으로 저장하려함
    localStorage.setItem(PENDING, JSON.stringify(toDos)); //JSON.stringify: 자바스크립트 object를 string으로 바꿔줌
}

function paintToDo(text) { //화면에 todo 리스트를 보여줌
    const li = document.createElement("li"); //createElement: 문서에 li요소 추가
    const delBtn = document.createElement("button");
    const finBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    span.innerText = text;
    delBtn.innerText = "❌"; // innerTxt: 문자 추가
    finBtn.innerText = "✅";
    delBtn.addEventListener("click", deleteToDo);
    finBtn.addEventListener("click", finishToDo);
    li.appendChild(span);
    li.appendChild(delBtn); // appendChild: 무언가를 father 요쇼에 추가
    li.appendChild(finBtn);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault(); //default 동작을 없앰
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = ""; //input 창에 남아있는 글자를 없애서 새로고침한 것처럼 보이게 해줌
}

function loadFinToDos() {
    const loadedFinToDos = localStorage.getItem(FINISHED);
    if (loadedFinToDos !== null) {
        const parsedFinToDos = JSON.parse(loadedFinToDos);
        parsedFinToDos.forEach(function (FintoDo) {
            paintFinToDo(FintoDo.text);
        });
    }
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(PENDING);
    if (loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos); //로컬 스토리지에서 가져온 것(string)을 object화 시킴
        parsedToDos.forEach(function (toDo) { //forEach: 각각에 함수를 실행시켜줌
            paintToDo(toDo.text);
        });
    }
}

function init() {
    loadToDos();
    loadFinToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();