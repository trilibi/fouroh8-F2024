// 자바스크립트로 href 클릭 시 알람 표시
document.addEventListener('DOMContentLoaded', function () {
    // 'myLink' ID를 가진 링크 클릭 시 동작
    const myLink = document.getElementById('myLink');
    myLink.addEventListener('click', function (event) {
        event.preventDefault(); // 기본 동작을 막음 (링크 이동 방지)
        alert('링크가 클릭되었습니다!');
    });
});
