const inputValue = document.getElementById("textContent");
const textArea = document.getElementById("textArea");
const submit = document.getElementById("submit");

submit.addEventListener("click", function () {
  const li = document.createElement("li"); // 리스트 항목 생성
  const input = document.createElement("input"); // input 요소 생성
  const del = document.createElement("button");
  input.type = "checkbox"; // type 속성 설정
  del.type = "submit";
  del.textContent = "삭제";
  del.className = "delete";

  li.appendChild(input);

  const label = document.createElement("label"); // label 요소 생성
  label.textContent = inputValue.value; // 입력한 값으로 리스트 항목 설정

  if (inputValue.value.trim() !== "") {
    //빈 값 체크용도
    textArea.appendChild(li);
    li.appendChild(label);
    li.appendChild(del);
    inputValue.value = ""; // 입력 필드 초기화

    input.addEventListener("click", function () {
      if (input.checked) {
        label.classList.add("checked");
      } else {
        label.classList.remove("checked");
      }
    });

    // 삭제 버튼 클릭 시 해당 li 삭제
    del.addEventListener("click", function () {
      if (input.checked) {
        textArea.removeChild(li); // li 요소 삭제
      }
    });
  } else {
    alert("할 일을 입력해주세요."); // 빈 값일 경우 경고창 메세지 출력
  }
});
