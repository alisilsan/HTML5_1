// 모달 관련 코드
const modal = document.querySelector(".modal");
const copyButton = document.querySelector(".copy-btn");
const refreshButton = document.querySelector(".refresh_btn");
const modalOpen = document.querySelector(".modal_btn");
const modalClose = document.querySelector(".close_btn");
const modalReset = document.querySelector(".reset_btn");
const urlInput = document.getElementById("urlInput");
const nowUrl = window.location.href;

// 열기 버튼을 눌렀을 때 모달 팝업이 열림
modalOpen.addEventListener("click", function () {
    // 'on' class 추가
    modal.classList.add("on");
});

// 닫기 버튼을 눌렀을 때 모달 팝업이 닫힘
modalClose.addEventListener("click", function () {
    // 'on' class 제거
    modal.classList.remove("on");
});

// 닫기 버튼을 눌렀을 때 모달 팝업이 닫힘
modalReset.addEventListener("click", function () {
    // index.html로 이동
    window.location.href = "../index.html";
});

// 닫기 버튼을 눌렀을 때 모달 팝업이 닫힘
refreshButton.addEventListener("click", function () {
    // index.html로 이동
    window.location.href = "../mbti.html";
});

// 현재 페이지의 URL 가져와서 input 태그의 값으로 설정
urlInput.value = nowUrl;

copyButton.addEventListener("click", copyUrl);

// 주소 복사 스크립트
function copyUrl() {
    navigator.clipboard.writeText(nowUrl).then(() => {
        alert("주소가 복사되었습니다!");
    });
}

// 모달 외부 클릭 시 모달 닫힘 스크립트
document.addEventListener("click", function (event) {
    if (!event.target.closest(".modal_btn") && !event.target.closest(".modal") && !event.target.closest(".close_btn")) {
        modal.classList.remove("on");
    }
});
