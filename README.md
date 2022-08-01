# 리폼 커뮤니티 리본

<img height="300px" src="https://user-images.githubusercontent.com/105181604/181456826-d342485e-99c7-4f0c-8e28-b8c9870b9195.png">

### [🎀 리본 바로가기 >](https://ribborn.kr)

<br>

----

## 🏗 서비스 아키텍쳐

![SA](https://user-images.githubusercontent.com/102746846/182116929-66a4e502-9c5f-4592-95d4-e5a02398d818.png)

### Front-end 기술 스택

<br>

<div>
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black">
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
<img src="https://img.shields.io/badge/html-E34F26?style=for-the-badge&logo=html5&logoColor=white">
<img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
</div>
<div>
<img src="https://img.shields.io/badge/Styled Components-F893D1?style=for-the-badge&logo=styledComponents&logoColor=white">
<img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white">
<img src="https://img.shields.io/badge/StompJS-008000?style=for-the-badge&logo=stompjs&logoColor=white">
<img src="https://img.shields.io/badge/SockJS-008000?style=for-the-badge&logo=sockjs&logoColor=white">
</div>
<div>
<img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white">
<img src="https://img.shields.io/badge/Github-000000?style=for-the-badge&logo=github&logoColor=white">
<img src="https://img.shields.io/badge/Github%20Actions-000000?style=for-the-badge&logo=github-actions&logoColor=white">
</div>
<div>
<img src="https://img.shields.io/badge/AWS%20S3-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white"/>
<img src="https://img.shields.io/badge/AWS%20CloudFront-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white"/>
<img src="https://img.shields.io/badge/AWS%20Route%2053-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white"/>
</div>

<br>

| Name                        | Version |
| --------------------------- | ------- |
| React                       | 18.2.0  |
| react-router-dom            | 6.3.0   |
| styled-components           | 5.3.5   |
| redux                       | 4.2.0   |
| react-redux                 | 8.0.2   |
| redux-logger                | 3.0.6   |
| redux-thunk                 | 2.4.1   |
| redux-actions               | 2.6.5   |
| immer                       | 9.0.15  |
| axios                       | 0.27.2  |
| moment                      | 2.29.4  |
| react-hook-form             | 7.33.0  |
| react-intersection-observer | 9.3.5   |
| browser-image-compression   | 2.0.0   |
| sockjs-client               | 1.6.1   |
| stompjs                     | 2.3.3   |

<br>

----

## ⭐️ 주요 기능

### ✅ 4종류의 게시판 CRUD

- 리폼 견적 요청, 리폼 후기, 리폼 질문, 디자이너/전문가 룩북 4종류의 게시판 CRUD
- 이미지 업로드, 댓글CRUD, 게시글 좋아요 및 공유 기능

### ✅ 게시글의 인기순, 최신순, 지역, 진행도 정렬 기능

### ✅ 1:1 채팅

- 전문가/디자이너 ←→ 일반 사용자 1:1 채팅방 생성

### ✅ 채팅 알림

- 사용자에게 채팅이 발송된 경우 알림 표시 기능

### ✅ 마이페이지 내 정보 조회/수정 기능

- 본인이 작성한 게시글 / 북마크한 게시글을 확인 가능
- 마이페이지에서 내 정보(닉네임, 개인정보) 변경 기능

### ✅ 모든 페이지 반응형 CSS 적용

<br>

----

## 📅 프로젝트 기간

- 2022.06.24 ~ 2022.08.05 (6주)

### 1주차 [( 리본 기획 노션 > )](https://www.notion.so/796c173690a54a0ca0bba7101e3ec43e)

- 리폼 커뮤니티 리본 기획 확정

### 2주차 [( 리본 API 설계 노션 > )](https://www.notion.so/API-3078c33df93d4bc180531687a99b2757)

- API 및 와이어프레임 설계, 이를 기반으로 주요 기능 구현 시작

### 3주차 [( 리본 MVP 발표 자료 > )](https://drive.google.com/file/d/1L6n1pqvSiUHsvMupHJFCmQKu9-3qasEd/view?usp=sharing)

- CRUD 기능 및 주요 페이지 구현 완료
- 디자인 적용

### 4주차

- 채팅 기능 구현 완료
- 모바일 반응형 뷰 구현
- Github Action을 통한 CI/CD 구현

### 5주차 [( 리본 서비스 바로가기 > )](https://ribborn.kr)

- SSE를 이용한 채팅 알림 기능 구현
- 디자이너 피드백 반영하여 세부 디자인 수정
- 테스트 및 버그 수정
- Route53과 CloudFront를 통한 https 환경 배포

### 6주차

- 유저 테스트 피드백 반영
- refresh token 구현 예정

<br>

----

## ⛓ Git Flow

### master

- 서비스 배포 브랜치

### main

- 배포 전에 테스트를 하기 위한 브랜치

### ~~hyunbeen, hyejun~~

- ~~각자 맡은 기능을 개발하는 브랜치~~ → 멘토링 피드백 수용하여 브랜치 기능별로 생성하는 방식으로 변경

### feature/#이슈번호/설명(선택 사항)

- 단위 기능에 대해 개발하는 브랜치

### hotfix/#이슈번호/설명(선택 사항)

- master 브랜치 배포 후 치명적 버그 발생 시 긴급 수정하는 브랜치.

<br>

---

## 📝 Commit Message Convention

<br>

| Type     | Description                                        |
| -------- | -------------------------------------------------- |
| FEAT     | 새로운 기능을 추가하는 경우                        |
| FIX      | 버그를 고친 경우                                   |
| STYLE    | 코드 포맷 변경, 간단한 수정, 코드 변경이 없는 경우 |
| DOCS     | 문서를 수정한 경우                                 |
| REFACTOR | 프로덕션 코드 리팩토링                             |
| RENAME   | 파일, 폴더명 수정 및 이동한 경우                   |
| REMOVE   | 파일을 삭제한 경우                                 |
| CHORE    | 빌드 업무 수정 (e.g., dependency 추가)             |

<br>

```bash
type: subject

body
--------------------------------------------------------------------
type: subject
    커밋 타입과 내용 작성
    e.g. FEAT: 로그인 기능 추가

- type은 영문 대문자로 적고, 50자를 넘기지 않는다.
- 제목에서는 마침표를 쓰지 않는다.
- body는 선택 사항이며, 제목과 구분되도록 한칸 띄어서 작성한다.
```

<br>

---

 ## 🛠 Trouble Shooting
 
  <details>
    <summary>무한스크롤 오류</summary>
      <div markdown="1">
        <br>
      문제 상황: 카테고리나 정렬순을 변경하면 무한스크롤이 작동하지 않고 첫 페이지만 로딩되는 문제 <br> <br>
      문제 이유: 카테고리나 정렬순을 변경하면 useEffect로 page가 0으로 변경되는데, 게시글을 불러오는 useEffect는 의존성배열에 카테고리, 정렬순, page가 모두 포함되어, 카테고리나 정렬순은 변경되었지만 page는 그대로인 요청 하나랑, 카테고리나 정렬순과 함께 page도 0으로 변경된 요청 하나가 감. 카테고리나 정렬순은 변경되었지만 page는 그대로인 요청은 빈배열로 오는 경우가 있고, 그 경우 모든 페이지가 로드되었다고 판단하고 loadedEverything 변수가 true가 되어 더이상 무한스크롤이 작동하지 않음 <br> <br>
      해결 방안: 게시글을 불러오는 useEffect에 의존성배열을 page만 넣고, page가 0일 때 카테고리나 정렬순이 변경되면 게시글을 불러오도록 예외처리해줌
      </div>
   </details>
   
  <details>
    <summary>용량이 큰 이미지 업로드 시 렉 걸림</summary>
    <div markdown="1">
      문제 상황: 게시물 작성하기 단계에서 용량이 큰 (17MB 이미지로 실험) 이미지를 업로드하는 경우, 클라이언트 측에서 브라우저 성능이 저하되는 문제 <br> <br>
      문제 이유: 이미지 용량이 아무리 커도 압축을 진행하지 않고 그대로 사용하고 있었음. 올린 이미지를 미리보기로 보여주는 div의 key값이 file의 값 자체를 그대로 써서 key가 지나치게 길어짐 <br> <br>
      해결 방안: browser-image-compression을 사용하여 이미지를 2MB 이하로 압축시킴. 이 압축시킨 이미지를 미리보기로 보여주고, 서버에도 요청을 보냄. div의 key값을 변경
    </div>
  </details>

<br>

---

## 👨‍👩‍👧‍👦 유저 피드백 개선사항
 
  <details>
    <summary>커뮤니티랑 룩북 게시판의 차이를 인지하기가 어렵습니다.</summary>
    <div markdown="1">
      <ul>
        <li>각 게시판별 상단에 해당 게시판 사용 안내 문구 추가(구현중)</li>
      </ul>
    </div>
  </details>

  <details>
    <summary>비밀번호 확인이 완료되었는지 유무를 가입하기 버튼을 누르기 전에 판별되었으면 좋겠습니다.</summary>
    <div markdown="1">
      <ul>
        <li>가입하기 버튼을 안 눌러도 비밀번호와 비밀번호 확인이 일치한지 확인(구현중)</li>
      </ul>
  </div>
  </details>

  <details>
    <summary>게시글 작성 시 작성하기 버튼을 누르려면 다시 맨 위로 스크롤 해야해서 불편합니다.</summary>
    <div markdown="1">
      <ul>
        <li>작성하기 버튼 고정되도록 수정(구현중)</li>
      </ul>
    </div>
 </details>
  
 <br>

---

## 👨‍💻 Front-end 팀원 소개

<br>
 
|   Name  | GitHub | 자기소개 |
| ----- | --- | --- |
| 김현빈 | https://github.com/treblabin | 자기소개 |
| 차혜준 | https://github.com/nujeyh | 자기소개 |

<br>

---

## 👨‍💻 Back-end 팀원 소개

### [Back-end GitHub >](https://github.com/team-ribbon/ribborn-backend)

| Name   | GitHub                           |
| ------ | -------------------------------- |
| 박성규 | https://github.com/ParkSungGyu1  |
| 박성렬 | https://github.com/songryel-park |
| 이정우 | https://github.com/lky8967       |
