document.addEventListener('DOMContentLoaded', () => {
    let currentQuestion = 0;
    let score = 10; // 기본 점수
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

    // IQ 테스트 제출 함수
    function submitIQTest() {
        clearInterval(timerInterval);
        let selectedOptions = document.querySelectorAll('input[type="radio"]:checked');
        selectedOptions.forEach(option => {
            score += parseInt(option.value);
        });

        if (timeRemaining >= 240) score += 20;
        else if (timeRemaining >= 180) score += 10;
        else if (timeRemaining >= 120) score += 5;

        questions[currentQuestion].style.display = 'none';
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
