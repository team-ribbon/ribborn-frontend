<h2 align="left"> 리본 종합 패션 공유 사이트</h2>
<img src="https://user-images.githubusercontent.com/105181604/181456826-d342485e-99c7-4f0c-8e28-b8c9870b9195.png">

<br>
<br>
<div align="left">
<h3 align="left">📅프로젝트 기간 : 2022년 6월 24일 ~ 2022년 8월 5일 (6주)</h3>
  <h4 align="left">1주차:
    <span><a href="https://www.notion.so/99-8-08bf4916b9e548279d160ba596f9ac2e">(🔗리본 기획 노션 바로가기)</a></span></h4>
<p align="left">-webRTC를 이용한 화상채팅 및 socket을 통해 실시간 채팅 구현 결정 </p>
</div>
  
<br>
<br>
<h3 align="left">⚒️프로젝트 아키텍처</h3>
  
<br>
<br>

<h3 align="left">📱FE 기술스택</h3>
<div width="100" align="center">
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black">
<img src="https://img.shields.io/badge/html-E34F26?style=for-the-badge&logo=html5&logoColor=white">
<img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
<br>
<img src="https://img.shields.io/badge/StompJS-008000?style=for-the-badge&logo=stompjs&logoColor=white">
<img src="https://img.shields.io/badge/SockJS-008000?style=for-the-badge&logo=sockjs&logoColor=white">
<img src="https://img.shields.io/badge/Styled Components-F893D1?style=for-the-badge&logo=styledComponents&logoColor=white">
<img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white"> 
<br>
<img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white">
<img src="https://img.shields.io/badge/Github-000000?style=for-the-badge&logo=github&logoColor=white">
<img src="https://img.shields.io/badge/Github%20Actions-000000?style=for-the-badge&logo=github-actions&logoColor=white">
<br>
<img src="https://img.shields.io/badge/AWS%20S3-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white"/>
<img src="https://img.shields.io/badge/AWS%20CloudFront-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white"/>
<img src="https://img.shields.io/badge/AWS%20Route%2053-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white"/>

</div>

<br>
<br>
<h3 align="left">💻FE Stack version</h3>
<div align="center">
  
  |name|ver|
|------|---|
| React |18.2.0|
| react-router-dom |6.3.0|
| styled-components |5.3.5|
| styled-reset |4.4.1|
| redux |4.2.0|
| react-redux |8.0.2|
| redux-logger |3.0.6|
| redux-thunk |2.4.1|
| redux-actions |2.6.5|
| immer |9.0.15|
| axios |0.27.2|
| react-hook-form |7.33.0|
| react-icons |4.4.0|
| moment |2.29.4|
| react-intersection-observer |9.3.5|
| net |9.3.5|
| sockjs-client |1.6.1|
| stompjs |2.3.3|

  
</div>

### 📩Git Flow

---

Branch 전략
- master branch: 현재 서비스 중인 브랜치 <br>
- release branch(main): master branch로 가기 전 merge 받아서 테스트해보는 브랜치 <br>
~~- develop branch(현빈, 혜준 브랜치): 각자 개발하는 브랜치~~ <br>
- develop branch(feature/#이슈번호/설명(설명은 필수 아님) 브랜치): 이슈에 대해 개발하는 브랜치 <br>
- hotfix branch(hotfix/#이슈번호/설명(설명은 필수 아님) 브랜치): 긴급한 버그가 생길 시, master branch에서 pull을 해, 해당 버그만 수정하는 브랜치 <br>

### ✨Git 컨벤션

---

```
FEAT:    새로운 기능을 추가할 경우
FIX:     버그를 고친 경우
STYLE:   코드 포맷 변경, 간단한 수정, 코드 변경이 없는 경우
REFACTOR: 프로덕션 코드 리팩토링
DOCS:    문서를 수정한 경우
RENAME:  파일 혹은 폴더명 수정 및 이동
REMOVE:  파일 삭제
CHORE:    빌드 업무 수정(ex> dependency 추가)
```

```bash
type: subject

body

type: subject 커밋 타입과 내용 자세히 적어주기
  ex) FEAT: 로그인 기능 추가

type은 영문 대문자로 적고, 제목은 50자를 넘기지 않는다. 제목에서는 마침표를 쓰지 않는다.
body는 필수 요소가 아니며 제목과 구분되도록 한칸 띄어서 작성한다.
```
  
  <br>
  <br>
 <h3 align="left">🤔FE Trouble Shooting</h3>  
 
  <details>
    <summary>무한스크롤 오류</summary>
      <div markdown="1">
        <br>
      문제 상황: 카테고리나 정렬순을 변경하면 무한스크롤이 작동하지 않고 첫 페이지만 로딩되는 문제 <br> <br>
      문제 이유: 카테고리나 정렬순을 변경하면 useEffect로 page가 0으로 변경되는데, 게시글을 불러오는 useEffect는 의존성배열에 카테고리, 정렬순, page가 모두 포함되어, 카테고리나 정렬순은 변경되었지만 page는 그대로인 요청 하나랑, 카테고리나 정렬순과 함께 page도 0으로 변경된 요청 하나가 감. 카테고리나 정렬순은 변경되었지만 page는 그대로인 요청은 빈배열로 오는 경우가 있고, 그 경우 모든 페이지가 로드되었다고 판단하고 loadedEverything 변수가 true가 되어 더이상 무한스크롤이 작동하지 않음 <br> <br>
      해결 방안: 게시글을 불러오는 useEffect에 의존성배열을 page만 넣고, page가 0일 때 카테고리나 정렬순이 변경되면 게시글을 불러오도록 예외처리해줌
      </div>
   </details>

  <br>
  <br>
  
   <h3 align="left">🙆‍♀️FE 유저피드백 개선사항</h3>  
 
  <details>
    <summary>제목</summary>
      <div markdown="1">
        <br>
      내용
      </div>
   </details>
  
  <br>
  <br>
  
 <h3 align="left">👨‍💻FE Contributions</h3>  
  
|   Name  | GitHub | 자기소개 |
| ----- | --- | --- |
| 김현빈 | https://github.com/treblabin | 자기소개 |
| 차혜준 | https://github.com/nujeyh | 자기소개 |
