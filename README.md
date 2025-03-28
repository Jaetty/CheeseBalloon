# CheeseBalloon

<img src='./asset/cheeseballoon.gif'>

## 서비스 설명

#### 치즈벌룬은 2025.02.14로 서비스가 종료되었습니다.
##### 치즈벌룬은 비영리로 운영되었으며, 데이터의 법적 권리를 주장하지 않습니다.

## 📝 기획 의도

##### 치즈벌룬은 인터넷 방송 이용자가 증가하던 2024년의 상황(MAU: 23년 12월 기준 286만 명 → 24년 1월 기준 349만 명)에 맞춰,<br/>이용자들이 플랫폼(SOOP, 치지직) 구분없이 한곳에서 원하는 실시간 방송 정보를 편리하게 확인할 수 있는 **통합 서비스를 제공하기 위해** 제작되었습니다.

##### 자금 사정상 개인 PC를 서버로 하여 제작되었습니다.<br/>따라서, 현실적인 동접 트래픽 한계(500명), 지속 가능성(단순 CRUD 배제), 사용자 유치 가능성을 고려한 결과 해당 서비스가 기획되었습니다.

- pc 성능 : (CPU : I5-7400f, RAM: 16GB, HDD 2TB)
- 서버 구축 : Ubuntu, 포트포워딩, 가비아 DNS 설정

## 🎯 프로젝트 목표 및 성과

##### 치즈벌룬은 일 평균 15만 건, 월평균 1GB의 데이터를 수집하여, 실시간 방송 정보 및 방송인 통계 정보를 제공합니다.<br/> 이에 인터넷 성능과 PC 성능을 고려하여, 높은 트래픽 획득보다 실질적으로 운영 가능한 범위의 서비스 제공을 목표로 하였습니다.

> **목표 이용자** : 주간 200명 이상 <br/>
> **최대 이용자** : 주간 621명 (홍보 당시) <br/>
> **최대 동접 이용자** : 200명 (홍보 당시) <br/>
> **실제 평균 이용자** : 주간 40명 (홍보 제외 기준) <br/>
```
@ 홍보는 인터넷 방송과 관련된 커뮤니티 사이트에서 익명으로 수행했습니다.
```
<br/>

> **서비스 종료일 기준** : 59명<br/>

<img src='./asset/02_15_viwer.png'><br/>

- Locust 기준 성능 테스트(Redis 적용 전) 결과:
  - 100명: 평균 응답속도 60ms
  - 200명: 평균 응답속도 250ms
  - 300명: 평균 응답속도 450ms
  - 400명: 평균 응답속도 800ms (1초 이내, 성능 한계 도달)
  - Redis 적용 후 (Rollback으로 인해 기록 유실) : 60ms

<br/>

## 🧩 배운 점

```
이용자의 피드백을 통해 서비스가 니즈를 충족시키지 못했다는 점을 알았고,
이용자를 고정시킬 콘텐츠 제작(팬 게임)이 무산되어 최소 목표치를 달성하지 못했습니다.
```

- 인터넷 커뮤니티 이용자를 대상으로 한 피드백을 통해 **사용자 중심 기획**이 얼마나 중요한지 체감했습니다.
- Java 기반의 Spring Boot 프로젝트에서 **헥사고날 아키텍처**를 도입해보며 새로운 아키텍처 패턴을 실제로 적용하고 장단점을 분석해볼 수 있었습니다. (DDD는 초기엔 적용했으나 시간 상 보류했습니다.)
- 부하 테스트 도구인 **Locust**를 활용해 실제 서비스를 목표로 한 API 응답 속도를 측정하고 성능을 개선하는 경험을 할 수 있었습니다.
- 사이드 프로젝트는 처음이었기에, **시간을 효율적으로 쓰는 방법**과 **작은 목표를 나누는 중요성**을 배웠습니다.
- 캠프나 학교와 달리, 사이드 프로젝트에서는 **각자의 일정 속에서 팀을 리딩하는 것**이 훨씬 어렵다는 걸 느꼈고, 어떻게 동기부여를 하고 목표를 조율해야 하는지를 고민하게 됐습니다.
- 운영 2개월 차에 렌더링 속도가 800ms ~ 1.5초의 성능(100명 기준)으로 악화된 문제를 90% 개선(DB 최적화, 로직, 코드 수정)하며 **효율적인 시스템 설계의 중요성**을 배웠습니다.


### 1️⃣ 프로젝트 개요

> 개발기간 : 2024.01.05 ~ 2024.05.16

> 운영기간 : 2024.06.18 ~ 2025.02.14


#### 팀원

| 팀원 | 역할 |
| --- | --- |
| 하상재 | 팀장, BE, CI/CD, Server, DB |
| 정경훈 | Crawling, BE, DB |
| 권혁근 | BE, DB |
| 이승민 | FE |
| 최창근 | FE, 디자인 |
| 배우찬 | FE |



### 2️⃣ 서비스 기능 소개

### 메인화면
<img src="./asset/gif_main2.gif" alt="메인화면">

### 공지사항
<img src="./asset/gif_notice.gif" alt="공지사항">

### 방송 랭킹
<img src="./asset/gif_ranking1.gif"><br/><img src="./asset/gif_ranking2.gif" alt="방송랭킹">

### 방송인 통계
<img src="./asset/gif_detail1.gif" alt="실시간 방송">

### 실시간 방송
<img src="./asset/gif_live.gif" alt="실시간 방송">

### 검색 결과
<img src="./asset/gif_search.gif" alt="검색 결과">

### 로그인
<img src="./asset/gif_google_login.gif" alt="구글 로그인"><br/><img src="./asset/gif_kakao_login.gif" alt="카카오 로그인">

### 마이페이지
<img src="./asset/gif_mypage.gif" alt="마이페이지">


### 3️⃣ 기술 스택

### 백엔드 스택
<img src="https://img.shields.io/badge/java-007396?style=for-the-badge&logo=java&logoColor=white"> <img src="https://img.shields.io/badge/gradle-02303A?style=for-the-badge&logo=gradle&logoColor=white"> <img src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white"> <img src="https://img.shields.io/badge/python-3776AB?style=for-the-badge&logo=python&logoColor=white"> <img src="https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white">

### 프론트 스택
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=black"> <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white"> <img src="https://img.shields.io/badge/next.js-61DAFB?style=for-the-badge&logo=nextdotjs&logoColor=white">

### 서버 스택
<img src="https://img.shields.io/badge/ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white"> <img src="https://img.shields.io/badge/nginx-009639?style=for-the-badge&logo=nginx&logoColor=white"> <img src="https://img.shields.io/badge/jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=white"> <img src="https://img.shields.io/badge/minio-C72E49?style=for-the-badge&logo=minio&logoColor=white"> <img src="https://img.shields.io/badge/mariadb-003545?style=for-the-badge&logo=mariadb&logoColor=white"> <img src="https://img.shields.io/badge/redis-FF4438?style=for-the-badge&logo=redis&logoColor=white">

### 모니터링 스택
<img src="https://img.shields.io/badge/elasticsearch-005571?style=for-the-badge&logo=elasticsearch&logoColor=white"> <img src="https://img.shields.io/badge/logstash-005571?style=for-the-badge&logo=logstash&logoColor=white"> <img src="https://img.shields.io/badge/kibana-005571?style=for-the-badge&logo=kibana&logoColor=white"> <img src="https://img.shields.io/badge/googleanalytics-E37400?style=for-the-badge&logo=googleanalytics&logoColor=white">

### 협업툴

<img src="https://img.shields.io/badge/confluence-0052CC?style=for-the-badge&logo=confluence&logoColor=white"> <img src="https://img.shields.io/badge/jira-0052CC?style=for-the-badge&logo=jira&logoColor=white"> <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"> <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">

### 4️⃣ 아키텍처
<img src="./asset/architecture.png">

### 5️⃣ ERD
<img src="./asset/ERD.png">