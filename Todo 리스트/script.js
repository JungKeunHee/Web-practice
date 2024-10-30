const inputValue = document.getElementById("textContent"); // 할일 값 인풋 요소
const textArea = document.getElementById("textArea"); // 할 일이 추가 될 영역 요소
const submit = document.getElementById("submit"); // 등록하기 요소
const date = document.getElementById("date"); // 날짜 요소
const selectAllButton = document.getElementById("selectAll"); // 전체선택 버튼
const deleteAllButton = document.getElementById("deleteAll"); // 전체삭제 버튼

let allChecked = false; // 체크 상태를 저장하는 변수

// 등록하기 이벤트 시작
submit.addEventListener("click", function () {
  const li = document.createElement("li"); // 리스트 항목 생성
  const input = document.createElement("input"); // input 요소 생성
  const del = document.createElement("button"); // 삭제 버튼 생성
  const update = document.createElement("button"); // 수정 버튼 생성
  input.type = "checkbox"; // type 속성 설정
  del.type = "button"; // 삭제 버튼의 type을 "button"으로 설정
  del.textContent = "삭제"; // 버튼 생성될 때 기본 값
  del.className = "delete"; // 버튼 클래스 이름 생성
  update.type = "button"; // 수정 버튼의 type을 "button"으로 설정
  update.textContent = "수정"; // 버튼 생성될 때 기본 값
  update.className = "update"; // 버튼 클래스 이름 생성

  li.appendChild(input); // li 자식 요소로 input(체크박스) 추가

  const label = document.createElement("label"); // label 요소 생성
  label.textContent = inputValue.value; // 입력한 값으로 리스트 항목 설정

  // 날짜 선택 여부 확인
  if (date.value === "") {
    alert("날짜를 선택해주세요."); // 날짜가 선택되지 않은 경우 경고창 메세지 출력
    return; // 함수 종료
  }

  if (inputValue.value.trim() !== "") {
    // 현재 날짜와 시간 가져오기
    const now = new Date();
    const formattedDate = `${date.value} ${now.getHours()}:${
      now.getMinutes() < 10 ? "0" : ""
    }${now.getMinutes()}`; // 날짜와 시간 포맷팅

    const dateTime = document.createElement("span"); // 날짜와 시간을 표시할 span 요소 생성
    dateTime.textContent = formattedDate; // 포맷된 날짜와 시간을 표시
    textArea.appendChild(li);
    li.appendChild(label);
    li.appendChild(dateTime); // 날짜와 시간을 리스트 항목에 추가
    li.appendChild(update); // 수정 버튼 추가
    li.appendChild(del); // 삭제 버튼 추가

    inputValue.value = ""; // 입력 필드 초기화
    date.value = ""; // 날짜 선택 초기화

    input.addEventListener("click", function () {
      if (input.checked) {
        label.classList.add("checked");
      } else {
        label.classList.remove("checked");
      }
    });

    // 수정 버튼 클릭 시 내용 수정
    update.addEventListener("click", function () {
      const newInput = document.createElement("input"); // 새 입력 필드 생성
      newInput.type = "text"; // type을 text로 설정
      newInput.value = label.textContent; // 기존 텍스트로 초기화
      newInput.className = "editInput"; // 클래스 추가
      newInput.style.width = "70%"; // 입력 필드 너비 조정

      // 기존 요소들 제거
      li.replaceChild(newInput, label); // label을 입력 필드로 대체

      // 수정 버튼과 삭제 버튼 숨기기
      update.style.display = "none";
      del.style.display = "none";

      const confirmButton = document.createElement("button"); // 확인 버튼 생성
      confirmButton.textContent = "확인"; // 버튼 텍스트 설정
      confirmButton.type = "button"; // type을 button으로 설정
      confirmButton.className = "confirm";

      li.appendChild(confirmButton); // 확인 버튼 추가

      // 확인 버튼 클릭 시 수정된 내용 적용
      confirmButton.addEventListener("click", function () {
        label.textContent = newInput.value; // 수정된 내용으로 라벨 업데이트
        li.replaceChild(label, newInput); // 입력 필드를 라벨로 대체
        update.style.display = "inline"; // 수정 버튼 다시 보이기
        del.style.display = "inline"; // 삭제 버튼 다시 보이기
        li.removeChild(confirmButton); // 확인 버튼 제거
      });
    });

    // 삭제 버튼 클릭 시 해당 li 삭제
    del.addEventListener("click", function () {
      if (input.checked) {
        textArea.removeChild(li); // li 요소 삭제
      } else {
        alert("체크박스를 체크해주세요.");
      }
    });
  } else {
    alert("할 일을 입력해주세요."); // 빈 값일 경우 경고창 메세지 출력
  }
});

// 전체선택 기능
selectAllButton.addEventListener("click", function () {
  const checkboxes = textArea.querySelectorAll("input[type='checkbox']");

  allChecked = !allChecked; // 상태 반전

  checkboxes.forEach((checkbox) => {
    checkbox.checked = allChecked; // 모든 체크박스 체크 또는 체크 해제
    checkbox.dispatchEvent(new Event("click")); // 클릭 이벤트 발생시켜 라벨 스타일 변경
  });
});

// 전체삭제 기능
deleteAllButton.addEventListener("click", function () {
  const checkboxes = textArea.querySelectorAll("input[type='checkbox']");
  let hasChecked = false; // 체크된 항목 여부

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      hasChecked = true; // 체크된 항목이 있음을 표시
      const li = checkbox.parentElement; // 체크된 항목의 부모 li 요소 찾기
      textArea.removeChild(li); // li 요소 삭제
    }
  });

  // 체크된 항목이 없을 경우 알림 표시
  if (!hasChecked) {
    alert("체크박스를 먼저 확인해주세요.");
  }
});
