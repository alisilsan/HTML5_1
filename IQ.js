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
                timeBar.style.width = `${percentage}%`;
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
        questions.forEach((question, index) => {
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
    }

    // 시작 버튼 클릭 이벤트
    const header = document.getElementById('header');
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
});
