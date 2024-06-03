
// 테스트 관련 코드
const startButton = document.getElementById("startButton");
startButton.textContent = "테스트 시작";
startButton.addEventListener("click", function () {
    startTest();
});

function startTest() {
    // 페이지 1 숨기고
    document.getElementById("start-box").style.display = "none";
    // 페이지 2 보이기
    document.getElementById("question-box").style.display = "block";
}

// 질문과 답변을 배열에 객체로 저장
const questions = [
    // E vs I
    {
        question: "새로운 사람들을 만날 때 당신의 기분은 어떤가요?",
        options: [
            { text: "매우 에너지가 넘친다", score: { E: 2, I: 0 } }, 
            { text: "다소 에너지가 넘친다", score: { E: 1, I: 0 } }, 
            { text: "다소 지친다", score: { E: 0, I: 1 } }, 
            { text: "매우 지친다.", score: { E: 0, I: 2 } }
        ]
    },
    {
        question: "하루 일과 후에 가장 즐거운 활동은 무엇인가요?",
        options: [
            { text: "친구들과 어울리기", score: { E: 2, I: 0 } }, 
            { text: "가족과 함께 시간 보내기", score: { E: 1, I: 0 } }, 
            { text: "혼자 산책하기", score: { E: 0, I: 1 } }, 
            { text: "혼자 영화보기", score: { E: 0, I: 2 } }
        ]
    },
    // S vs N
    {
        question: "문제를 해결할 때 당신의 접근 방식은 무엇인가요",
        options: [
            { text: "실제 경험과 사례에 기반하여 해결한다", score: { S: 2, N: 0 } }, 
            { text: "실용적인 방법을 선호한다", score: { S: 1, N: 0 } }, 
            { text: "가능성과 아이디어를 고려한다", score: { S: 0, N: 1 } }, 
            { text: "새로운 접근 방식을 시도한다", score: { S: 0, N: 2 } }
        ]
    },
    {
        question: "새로운 프로젝트를 시작할 때 당신의 주된 초점은 무엇인가요?",
        options: [
            { text: "실현 가능한 계획 세우기", score: { S: 2, N: 0 } }, 
            { text: "세부 사항을 명확히 하기", score: { S: 1, N: 0 } }, 
            { text: "큰 그림을 그리기", score: { S: 0, N: 1 } }, 
            { text: "창의적인 아이디어 모색하기", score: { S: 0, N: 2 } }
        ]
    },
    // T vs F
    {
        question: "친구가 문제를 겪고 있을 때 당신의 반응은 어떤가요?",
        options: [
            { text: "논리적인 조언을 한다", score: { T: 2, F: 0 } }, 
            { text: "해결책을 제안한다", score: { T: 1, F: 0 } }, 
            { text: "공감을 표현한다", score: { T: 0, F: 1 } }, 
            { text: "위로의 말을 건넨다", score: { T: 0, F: 2 } }
        ]
    },
    {
        question: "결정을 내릴 때 당신의 주된 기준은 무엇인가요?",
        options: [
            { text: "논리적 근거와 분석", score: { T: 2, F: 0 } }, 
            { text: "객관적인 사실", score: { T: 1, F: 0 } }, 
            { text: "사람들의 감정과 관계", score: { T: 0, F: 1 } }, 
            { text: "자신의 가치관과 신념", score: { T: 0, F: 2 } }
        ]
    },
    // J vs P
    {
        question: "당신의 생활 방식은 어떤가요?",
        options: [
            { text: "계획적이고 체계적이다", score: { J: 2, P: 0 } }, 
            { text: "미리 준비하고 조직한다", score: { J: 1, P: 0 } }, 
            { text: "상황에 따라 유연하게 대응한다", score: { J: 0, P: 1 } }, 
            { text: "자유롭고 즉흥적이다", score: { J: 0, P: 2 } }
        ]
    },
    {
        question: "갑작스러운 변화에 대한 당신의 반응은 어떤가요?",
        options: [
            { text: "매우 스트레스를 받는다", score: { J: 2, P: 0 } },
            { text: "다소 불안해진다", score: { J: 1, P: 0 } },
            { text: "다소 흥미롭게 느낀다", score: { J: 0, P: 1 } },
            { text: "매우 흥미롭게 느낀다", score: { J: 0, P: 2 } }
        ]
    }
];

let currentQuestion = 0; // 현재 질문 인덱스
let scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 }; // 사용자 점수

// URL의 query string을 파싱하여 객체로 반환하는 함수
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    const query = {};
    for (const [key, value] of params.entries()) {
        query[key] = value;
    }
    return query;
}

// 현재 상태를 query string으로 설정하는 함수
function updateQueryString() {
    const params = new URLSearchParams();
    const url = new URLSearchParams(location.search);
    if(url.get("question") === null ||url.get("question") <8){
        params.set('question', currentQuestion);
        for (const key in scores) {
            params.set(key, scores[key]);
        }
        const newUrl = `${window.location.pathname}?${params.toString()}`;
        window.history.pushState({ path: newUrl }, '', newUrl);
    }
}
    
// URL query string을 읽어 초기 상태를 설정하는 함수
function initializeFromQueryString() {
    const query = getQueryParams();
    if (query.question) {
        currentQuestion = parseInt(query.question);
    }
    for (const key in scores) {
        if (query[key]) {
            scores[key] = parseInt(query[key]);
        }
    }
}

function showQuestion() {
    // 현재 질문 객체 가져오기
    const question = questions[currentQuestion];
    // 질문 텍스트 엘리먼트에 질문 내용 설정
    document.getElementById("question").textContent = question.question;
    // 선택지 버튼 생성 및 이벤트 설정
    for (let i = 0; i < question.options.length; i++) {
        const optionButton = document.getElementById(`option${i + 1}`);
        optionButton.textContent = question.options[i].text;
        optionButton.onclick = () => selectAnswer(question.options[i].score); // 클릭 이벤트에 해당 선택지의 점수 전달
    }
}

// 선택지 클릭 시 호출되는 함수
function selectAnswer(score) {
    // 선택된 선택지의 점수를 각 유형에 추가
    for (let key in score) {
        scores[key] += score[key];
    }
    currentQuestion++; // 다음 질문 인덱스로 이동
    // 모든 질문에 대한 답변이 아직 남아있으면 다음 질문 보여주기, 아니면 결과 페이지로 이동
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        // 결과 페이지로 이동하는 버튼 생성
        const button = document.createElement('button');
        button.id = "answerButton";
        // 버튼 클릭 시 결과 함수 호출
        document.getElementById("question-box").appendChild(button);

        button.addEventListener('click', function () {
            showResult(); // 결과 함수 호출
        });
    }
}

function handleAnswer(score) {
    for (const key in score) {
        scores[key] += score[key];
    }
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    const mbti = `${scores.E > scores.I ? "E" : "I"}${scores.S > scores.N ? "S" : "N"}${scores.T > scores.F ? "T" : "F"}${scores.J > scores.P ? "J" : "P"}`;
    alert(`Your MBTI type is: ${mbti}`);
    window.location.href = `./mbti_result/${mbti}.html`;
}

// 초기화 코드
initializeFromQueryString();
showQuestion();
