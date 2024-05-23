// tournamentStartButton 요소의 클릭 이벤트 핸들러 등록
const tournamentStartButton = document.getElementById("tournamentStartButton");
tournamentStartButton.textContent = "테스트 시작"; // 버튼 텍스트 설정
tournamentStartButton.addEventListener("click", function() {
    starttournamentTest(); // starttournamentTest 함수 호출
});   

// 페이지 2로 이동하는 함수
function starttournamentTest() {
    // 페이지 1 숨기기
    document.getElementById("tournamentStart-container").style.display = "none";
    // 페이지 2 보이기
    document.getElementById("tournamentQuestion-container").style.display = "block";
}

// DOMContentLoaded 이벤트가 발생했을 때 실행되는 함수
document.addEventListener("DOMContentLoaded", function() {
    // 퀴즈 질문을 담은 배열
    const questionsSecond = [
        {
            question: "What type of activities do you prefer?", // 질문 내용
            options: [ // 선택지 배열
                { src: "./img/image1.jpg", index: 0 }, // 이미지 경로와 인덱스
                { src: "./img/image2.jpg", index: 1 }
            ],
            answer: 1 // 정답의 인덱스
        },
        {
            question: "How do you usually feel in social situations?", // 질문 내용
            options: [ // 선택지 배열
                { src: "./img/image1.jpg", index: 0 }, // 이미지 경로와 인덱스
                { src: "./img/image2.jpg", index: 1 }
            ],
            answer: 1 // 정답의 인덱스
        },
        {
            question: "What type of activities do you prefer?", // 질문 내용
            options: [ // 선택지 배열
                { src: "./img/image1.jpg", index: 0 }, // 이미지 경로와 인덱스
                { src: "./img/image2.jpg", index: 1 }
            ],
            answer: 1 // 정답의 인덱스
        },
    ];
    let currentQuestionIndex = 0; // 현재 질문의 인덱스 초기화
    let score = 0; // 사용자의 점수 초기화

    // 이미지 엘리먼트들과 결과를 표시할 컨테이너들을 가져옴
    const images = document.querySelectorAll(".image");
    const questionContainer = document.getElementById("tournamentQuestion-container");
    const resultContainer = document.getElementById("tournamentResult-container"); // 결과 컨테이너

    // 현재 질문을 화면에 표시하는 함수
    function showCurrentQuestion() {
        const currentQuestion = questionsSecond[currentQuestionIndex]; // 현재 질문 정보 가져오기
        document.getElementById("question2").textContent = currentQuestion.question; // 질문 텍스트 설정
        // 이미지를 설정하고 이벤트 리스너를 추가
        currentQuestion.options.forEach((option, index) => {
            images[index].src = option.src; // 이미지 경로 설정
            images[index].addEventListener("click", () => {
                showPersonalityResult(option.index); // 선택된 이미지의 인덱스를 전달하여 결과 표시
            });
        });
    }

    // 선택된 이미지에 따라 다음 질문으로 이동하거나 결과를 표시하는 함수
    function showPersonalityResult(selectedImageIndex) {
        // 정답 이미지의 인덱스와 현재 질문의 인덱스를 비교하여 점수를 증가시키고 다음 질문으로 이동
        if (selectedImageIndex === questionsSecond[currentQuestionIndex].options.find(option => option.index === questionsSecond[currentQuestionIndex].answer).index) {
            score++; // 정답인 경우 점수 증가
        }
        

        // 모든 질문에 대한 답변이 남아있는지 확인
        if (currentQuestionIndex < questionsSecond.length) {
            showCurrentQuestion(); // 다음 질문을 화면에 표시
            // 결과 컨테이너 숨기고 질문 컨테이너 표시
            resultContainer.style.display = "none";
            questionContainer.style.display = "block";
        } 
        else {
            goToResult(); // 모든 질문에 대한 답변이 끝난 경우 결과 페이지로 이동
        }
    }

    // 결과 페이지로 이동하는 함수
    function goToResult() {
        // 질문 페이지 숨기고 결과 페이지 보이기
        questionContainer.style.display = "none";
        resultContainer.style.display = "block";

        // 결과 계산 및 표시
        let resultText;
        if (score < 3) {
            resultText = "당신은 고양이 상을 좋아합니다.";
        } else if (score < 6) {
            resultText = "당신은 강아지 상을 좋아합니다.";
        } else {
            resultText = "당신은 외향적인 성격입니다.";
        }
        // 결과 텍스트를 결과 페이지에 출력
        document.getElementById("result-text").textContent = resultText;
    }

    // 이미지 클릭에 대한 이벤트 리스너 등록
    images.forEach((image, index) => {
        image.addEventListener("click", function() {
            // 선택된 이미지를 확대하여 전체 화면에 표시하고, 일정 시간 후에 결과를 표시
            const fullscreenImage = image.cloneNode(true);
            fullscreenImage.style.position = "fixed";
            fullscreenImage.style.top = "50%";
            fullscreenImage.style.left = "50%";
            fullscreenImage.style.transform = "translate(-50%, -50%) scale(0.1)";
            fullscreenImage.style.zIndex = "9999";
            fullscreenImage.style.transition = "transform 0.8s ease";
            document.body.appendChild(fullscreenImage);

            // 리플로우 트리거
            fullscreenImage.offsetWidth;

            fullscreenImage.style.transform = "translate(-50%, -50%) scale(4)";
            
            // 일정 시간 후에 전체 화면 이미지 제거하고 성격 결과 표시
            setTimeout(() => {
                document.body.removeChild(fullscreenImage);
                showPersonalityResult(index); // 선택된 이미지의 인덱스에 따라 결과 표시
            }, 1500);

            currentQuestionIndex++;  // 이미지를 클릭할 때마다 질문 인덱스 증가
            // 모든 질문에 대한 답변이 끝난 경우 결과 페이지로 이동
            if (currentQuestionIndex === questionsSecond.length) {
                goToResult();
            }
        });
    });

// 모달 관련 코드
const modal = document.querySelector(".modal");
const copyButton = document.querySelector(".copy-btn");
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
    window.location.href = 'index.html';
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


    // 초기에 첫 번째 질문을 표시
    showCurrentQuestion();
});
