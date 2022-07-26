import { useEffect, useRef } from "react";
import styled from "styled-components";

const RuleModal = ({ isModalOn, setIsModalOn, title, content, info }) => {
  const outsideRef = useRef();
  const closeModal = () => {
    setIsModalOn(false);
  };

  useEffect(() => {
    document.body.style.cssText = `
        position: fixed;
        top: -${window.scrollY}px;
        overflow-y: scroll;
        width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  useEffect(() => {
    const clickOutside = (e) => {
      if (
        isModalOn &&
        outsideRef.current &&
        !outsideRef.current.contains(e.target)
      ) {
        setIsModalOn(false);
      }
    };
    document.addEventListener("mousedown", clickOutside);
    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [isModalOn, setIsModalOn]);

  return (
    <Dim isModalOn={isModalOn}>
      <ModalCover ref={outsideRef}>
        <ModalButton onClick={closeModal}>
          <svg
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16 1L1 16M16 16L1 1" stroke="#222222" />
          </svg>
        </ModalButton>
        <Title>{title}</Title>
        {info ? (
          <TextDiv>
            <span>{content[0]}</span> <br /> <br />
            <span>{content[1]}</span> <br />
            <TableWrap>
              <Table>
                <thead>
                  <TR>
                    <TH>서비스</TH>
                    <TH>수집 및 이용목적</TH>
                    <TH>구분</TH>
                    <TH>수집 및 이용 항목</TH>
                    <TH>보유 및 이용기간</TH>
                  </TR>
                </thead>
                <tbody>
                  <TR>
                    <FirstTD>회원 가입</FirstTD>
                    <SecondTD>
                      서비스 이용을 위한 이용자 식별 <br />
                      이용자 개별적 통지 고지
                    </SecondTD>
                    <ThirdTD>필수</ThirdTD>
                    <FourthTD>이메일, 닉네임, 휴대폰 번호</FourthTD>
                    <LastTD rowSpan="4">
                      회원탈퇴시 까지
                      <br />
                      <br />※ 단, 관계 법령 위반에 따른 수사, 조사 등이 진행중인
                      경우에는 해당 수사, 조사 종료 시 까지 보관하며 내부규정
                      위반시에 규정에 따라 일정기간 보관됨.
                    </LastTD>
                  </TR>
                  <TR>
                    <FirstTD>커뮤니티</FirstTD>
                    <SecondTD>게시글 등록</SecondTD>
                    <ThirdTD>필수</ThirdTD>
                    <FourthTD>게시글</FourthTD>
                  </TR>
                  <TR>
                    <FirstTD>견적 요청하기</FirstTD>
                    <SecondTD>견적 요청 게시글 등록</SecondTD>
                    <ThirdTD>필수</ThirdTD>
                    <FourthTD>게시글, 위치정보, 견적 진행상황</FourthTD>
                  </TR>
                  <TR>
                    <FirstTD>채팅</FirstTD>
                    <SecondTD>
                      이용자간 채팅 서비스 제공, 중고거래 분쟁 조정, 법령이나
                      이용약관에 반하여 이용자에게 피해를 줄 수 있는 잘못된
                      이용행위의 방지
                    </SecondTD>
                    <ThirdTD>필수</ThirdTD>
                    <FourthTD>
                      앱 내 채팅 기능을 사용한 채팅 내용, 견적 진행상황
                    </FourthTD>
                  </TR>
                </tbody>
              </Table>
            </TableWrap>
            <span>{content[2]}</span>
            <TableWrap>
              <Table>
                <thead>
                  <TR>
                    <TH>서비스</TH>
                    <TH>수집 및 이용목적</TH>
                    <TH>구분</TH>
                    <TH>수집 및 이용 항목</TH>
                    <TH>보유 및 이용기간</TH>
                  </TR>
                </thead>
                <tbody>
                  <TR>
                    <FirstTD>회원 가입</FirstTD>
                    <SecondTD>
                      서비스 이용을 위한 이용자 식별
                      <br />
                      이용자 개별적 통지 고지
                      <br />
                      일부 정보의 경우, 신뢰를 위해 일반 회원에게 해당 정보 공개
                    </SecondTD>
                    <ThirdTD>필수</ThirdTD>
                    <FourthTD>
                      이메일, 닉네임 또는 업체명, 휴대폰 번호, 사업자등록번호,
                      사업자 위치 및 상세주소, 자기소개
                    </FourthTD>
                    <LastTD rowSpan="4">
                      회원탈퇴시 까지
                      <br />
                      <br />※ 단, 관계 법령 위반에 따른 수사, 조사 등이 진행중인
                      경우에는 해당 수사, 조사 종료 시 까지 보관하며 내부규정
                      위반시에 규정에 따라 일정기간 보관됨.
                    </LastTD>
                  </TR>
                  <TR>
                    <FirstTD>커뮤니티</FirstTD>
                    <SecondTD>게시글 등록</SecondTD>
                    <ThirdTD>필수</ThirdTD>
                    <FourthTD>게시글</FourthTD>
                  </TR>
                  <TR>
                    <FirstTD>룩북</FirstTD>
                    <SecondTD>룩북 게시글 등록</SecondTD>
                    <ThirdTD>필수</ThirdTD>
                    <FourthTD>게시글, 자기소개</FourthTD>
                  </TR>
                  <TR>
                    <FirstTD>채팅</FirstTD>
                    <SecondTD>
                      이용자간 채팅 서비스 제공, 중고거래 분쟁 조정, 법령이나
                      이용약관에 반하여 이용자에게 피해를 줄 수 있는 잘못된
                      이용행위의 방지
                    </SecondTD>
                    <ThirdTD>필수</ThirdTD>
                    <FourthTD>
                      앱 내 채팅 기능을 사용한 채팅 내용, 견적 진행상황
                    </FourthTD>
                  </TR>
                </tbody>
              </Table>
            </TableWrap>
            <span>{content[3]}</span> <br /> <br />
            <span>{content[4]}</span> <br /> <br />
            <TableWrap>
              <SecondTable>
                <thead>
                  <TR>
                    <TH>보존항목</TH>
                    <TH>보유사유</TH>
                    <TH>보유기간</TH>
                  </TR>
                </thead>
                <tbody>
                  <TR>
                    <FourthTD>부정이용기록</FourthTD>
                    <SecondTD>부정 이용 방지</SecondTD>
                    <ThirdTD>10년</ThirdTD>
                  </TR>
                  <TR>
                    <FourthTD>견적 게시물 및 채팅 내용</FourthTD>
                    <SecondTD>거래 관련 사기 방지 및 분쟁 해결</SecondTD>
                    <ThirdTD>5년</ThirdTD>
                  </TR>
                  <TR>
                    <FourthTD>휴대전화번호, 채팅 내용, 견적 게시글</FourthTD>
                    <SecondTD>부정 이용 및 가입방지, 수사 요청시 협조</SecondTD>
                    <ThirdTD>1년</ThirdTD>
                  </TR>
                </tbody>
              </SecondTable>
            </TableWrap>
            <span>{content[5]}</span> <br /> <br /> <br />
            <TableWrap>
              <SecondTable>
                <thead>
                  <TR>
                    <TH>보존항목</TH>
                    <TH>근거법령</TH>
                    <TH>보유기간</TH>
                  </TR>
                </thead>
                <tbody>
                  <TR>
                    <FourthTD>서비스 방문기록</FourthTD>
                    <SecondTD>통신비밀보호법</SecondTD>
                    <ThirdTD>3개월</ThirdTD>
                  </TR>
                </tbody>
              </SecondTable>
            </TableWrap>
            <span>{content[6]}</span> <br /> <br />
            <MarginSpan>{content[7]}</MarginSpan> <br /> <br /> <br />
            <span>{content[8]}</span> <br /> <br />
            <MarginSpan>{content[9]}</MarginSpan> <br />
            <TableWrap>
              <ThirdTable>
                <thead>
                  <TR>
                    <TH>수탁업체</TH>
                    <TH>위탁 업무</TH>
                  </TR>
                </thead>
                <tbody>
                  <TR>
                    <FourthTD>Amazon Web Services, Inc.</FourthTD>
                    <ThirdTD>정보 보관</ThirdTD>
                  </TR>
                </tbody>
              </ThirdTable>
            </TableWrap>
            <br />
            <span>{content[10]}</span> <br /> <br />
            <MarginSpan>{content[11]}</MarginSpan> <br />
            <TableWrap>
              <FourthTable>
                <thead>
                  <TR>
                    <TH>회사명</TH>
                    <TH>위탁업무 및 목적</TH>
                    <TH>연락처</TH>
                    <TH>개인정보 이전국가</TH>
                    <TH>이전되는 항목</TH>
                    <TH>이전 일시 및 방법</TH>
                    <TH>보유 및 이용기간</TH>
                  </TR>
                </thead>
                <tbody>
                  <TR>
                    <FourthTD>Amazon Web Services, Inc.</FourthTD>
                    <FourthTD>
                      Simple Storage Service를 이용한 데이터 저장
                    </FourthTD>
                    <ThirdTD>{"82)02-1544-8667"}</ThirdTD>
                    <ThirdTD>{"미국(Amazon Oregon Region)"}</ThirdTD>
                    <ThirdTD>수집하는 모든 개인정보</ThirdTD>
                    <SecondTD>
                      데이터 수집 후 수분 이내 Amazon 클라우드 컴퓨팅 환경에
                      개인정보 보관
                    </SecondTD>
                    <ThirdTD>회원탈퇴 또는 위탁계약 종료시</ThirdTD>
                  </TR>
                </tbody>
              </FourthTable>
            </TableWrap>
            <br />
            <span>{content[12]}</span> <br /> <br />
            <MarginSpan>{content[13]}</MarginSpan> <br /> <br /> <br />
            <span>{content[14]}</span> <br /> <br />
            <MarginSpan>{content[15]}</MarginSpan> <br />
            <MarginSpan>{content[16]}</MarginSpan> <br /> <br /> <br />
            <span>{content[17]}</span> <br /> <br />
            <MarginSpan>{content[18]}</MarginSpan> <br /> <br />
          </TextDiv>
        ) : (
          <TextArea value={content} disabled></TextArea>
        )}
      </ModalCover>
    </Dim>
  );
};
const Dim = styled.div`
  z-index: 100;
  box-sizing: border-box;
  display: ${({ isModalOn }) => (isModalOn ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
`;
const ModalCover = styled.div`
  z-index: 101;
  max-width: 700px;
  width: calc(100% - 40px);
  height: 600px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 15px;
  padding: 30px 20px;
`;

const ModalButton = styled.span`
  float: right;
  cursor: pointer;
`;

const Title = styled.div`
  text-align: center;
  font-weight: 700;
  margin-bottom: 50px;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  word-break: keep-all;
`;

const TextArea = styled.textarea`
  width: 90%;
  height: calc(100% - 90px);
  margin: 10px auto 0px 5%;
  border: none;
  resize: none;
  &:disabled {
    background-color: #fff;
    color: ${({ theme }) => theme.colors.black};
  }
`;

const TextDiv = styled.div`
  width: 90%;
  height: calc(100% - 90px);
  margin: 10px auto 0px 5%;
  border: none;
  resize: none;
  background-color: #fff;
  color: ${({ theme }) => theme.colors.black};
  span {
    font-size: 13.3px;
    line-height: normal;
  }
  overflow-y: auto;
`;

const MarginSpan = styled.span`
  font-size: 13.3px;
  line-height: normal;
  margin-left: 30px;
`;

const TableWrap = styled.div`
  margin: 18px 0;
  width: 100%;
  overflow: auto;
`;

const Table = styled.table`
  width: 560px;
  border: 1px solid #444444;
  border-collapse: collapse;
`;

const SecondTable = styled.table`
  width: 460px;
  border: 1px solid #444444;
  border-collapse: collapse;
`;

const ThirdTable = styled.table`
  width: 260px;
  border: 1px solid #444444;
  border-collapse: collapse;
`;

const FourthTable = styled.table`
  width: 660px;
  border: 1px solid #444444;
  border-collapse: collapse;
`;

const TH = styled.th`
  border: 0.5px solid #444444;
  font-weight: 700;
  padding: 10px;
  font-size: ${({ theme }) => theme.fontSizes.m};
  word-break: keep-all;
  line-height: 18px;
`;

const TR = styled.tr`
  border: 0.5px solid #444444;
`;

const TD = styled.td`
  border: 0.5px solid #444444;
  padding: 10px;
  font-size: ${({ theme }) => theme.fontSizes.s};
  word-break: keep-all;
  line-height: 15px;
`;

const FirstTD = styled(TD)`
  width: 80px;
`;

const SecondTD = styled(TD)`
  width: 220px;
`;

const ThirdTD = styled(TD)`
  width: 40px;
`;

const FourthTD = styled(TD)`
  width: 120px;
`;

const LastTD = styled(TD)`
  width: 100px;
`;

export default RuleModal;
