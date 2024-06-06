// patch.js
document.addEventListener("DOMContentLoaded", function() {
    const postList = document.getElementById('postList');

    // 글 목록
    const posts = [
        { id: 1, title: "5/20 패치내역", file: "./patchnote/post1.txt" },
        { id: 2, title: "5/26 패치내역", file: "./patchnote/post2.txt" },
        { id: 3, title: "5/27 패치내역", file: "./patchnote/post3.txt" },
        { id: 4, title: "6/3 패치내역", file: "./patchnote/post4.txt" }
    ];

    // 현재 열린 파일을 저장할 변수
    let currentOpenElement = null;

    // 글 목록을 페이지에 추가
    posts.forEach(post => {
        const li = document.createElement('li');
        li.textContent = post.title;
        li.addEventListener('click', () => loadPost(post.file, li));
        postList.appendChild(li);
    });

    // 텍스트 파일을 로드하여 내용 표시
    function loadPost(file, element) {
        // 이미 열려있는 항목이 있으면 닫기
        if (currentOpenElement) {
            currentOpenElement.nextElementSibling?.remove();
            if (currentOpenElement === element) {
                currentOpenElement = null;
                return;
            }
        }

        fetch(file)
            .then(response => response.text())
            .then(data => {
                const formattedData = data.replace(/\n/g, '<br>'); // 줄바꿈을 <br>로 변환
                const contentDiv = document.createElement('div');
                contentDiv.className = 'postContent';
                contentDiv.innerHTML = `<p>${formattedData}</p>`;

                element.insertAdjacentElement('afterend', contentDiv);
                currentOpenElement = element;

                // 내용을 클릭하면 닫히는 기능 추가
                contentDiv.addEventListener('click', () => {
                    contentDiv.remove();
                    currentOpenElement = null;
                });
            })
            .catch(error => {
                const errorDiv = document.createElement('div');
                errorDiv.className = 'postContent';
                errorDiv.innerHTML = `<p>글을 불러오는 데 오류가 발생했습니다.</p>`;
                element.insertAdjacentElement('afterend', errorDiv);
                currentOpenElement = element;

                errorDiv.addEventListener('click', () => {
                    errorDiv.remove();
                    currentOpenElement = null;
                });

                console.error('Error:', error);
            });
    }
});
