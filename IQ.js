document.addEventListener('DOMContentLoaded', () => {
    let currentQuestion = 0;
    let score = 10; // 기본 점수 초기화
    let timerInterval;
    const questions = document.querySelectorAll('.question');
    const startButton = document.getElementById('startIQ');
    const timerDisplay = document.getElementById('timer');
    const resultDisplay = document.getElementById('result');
    const IQscoreDisplay = document.getElementById('IQscore');
    const totalTime = 300; // 5분 = 300초
    let timeRemaining = totalTime;

    // 타이머 시작 함수
    function startTimer() {
        timerInterval = setInterval(() => {
            if (timeRemaining > 0) {
                timeRemaining--;
                const minutes = Math.floor(timeRemaining / 60);
                const seconds = timeRemaining % 60;
                timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
                // 시간이 흐를 때마다 막대의 너비를 줄이기
                const percentage = (timeRemaining / totalTime) * 100;
                document.getElementById('timeBar').style.width = `${percentage}%`; // timeBar 요소의 width 조절
            } else {
                clearInterval(timerInterval);
                submitIQTest();
            }
        }, 1000);
    }

    // 다음 질문으로 넘어가는 함수
    function showNextQuestion() {
        if (currentQuestion < questions.length - 1) {
            questions[currentQuestion].style.display = 'none';
            currentQuestion++;
            questions[currentQuestion].style.display = 'block';
        } else {
            submitIQTest();
        }
    }

    // 각 질문의 점수를 추적
    function calculateScore() {
        questions.forEach((question) => {
            const selectedOption = question.querySelector('input[type="radio"]:checked');
            if (selectedOption) {
                let optionValue = parseInt(selectedOption.value);
                if (!isNaN(optionValue)) {
                    score += optionValue;
                } else {
                    console.error(`Invalid value: ${selectedOption.value}`);
                }
            } else {
                // 정답을 체크하지 않은 문제를 빗금 처리
                question.style.backgroundColor = '#e0e0e0'; // 빗금 처리 대신 회색 배경으로 표시
            }
        });
    }

    // IQ 테스트 제출 함수
    function submitIQTest() {
        clearInterval(timerInterval);
        calculateScore();

        // 남은 시간에 따라 추가 점수 부여
        if (timeRemaining >= 240) score += 20;
        else if (timeRemaining >= 180) score += 10;
        else if (timeRemaining >= 120) score += 5;

        questions.forEach(question => {
            question.style.display = 'none'; // 모든 질문을 숨김
        });

        resultDisplay.style.display = 'block';
        IQscoreDisplay.textContent = score;
        document.body.classList.add('started');
    }

    // 시작 버튼 클릭 이벤트
    startButton.addEventListener('click', () => {
        document.getElementById('IQstart').style.display = 'none';
        document.getElementById('header').style.display = 'block';
        questions[currentQuestion].style.display = 'block';
        startTimer();
    });

    // 다음 버튼 클릭 이벤트
    document.querySelectorAll('.nextBtn').forEach(button => {
        button.addEventListener('click', showNextQuestion);
    });

    // 제출 버튼 클릭 이벤트
    document.getElementById('submitIQ').addEventListener('click', submitIQTest);
    
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
       window.location.href = 'index.html';
   });

   // 닫기 버튼을 눌렀을 때 모달 팝업이 닫힘
   refreshButton.addEventListener("click", function () {
        // index.html로 이동
        window.location.href = 'IQ.html';
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
});

 
