import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ArrowLeftSVG, ArrowRightSVG } from "../elements/SVG";
import CardB from "./CardB";

// 메인 > 놓치면 안되는 리폼 디자이너 섹션
const DesignSection = ({ postList }) => {
  const scrollRef = useRef(null);
  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState();
  const navigate = useNavigate();

  const onDragStart = (e) => {
    e.preventDefault();
    setIsDrag(true);
    setStartX(e.pageX + scrollRef.current.scrollLeft);
  };

  const onDragEnd = () => {
    setIsDrag(false);
  };

  const onDragMove = (e) => {
    if (isDrag) {
      const { scrollWidth, clientWidth, scrollLeft } = scrollRef.current;

      scrollRef.current.scrollLeft = startX - e.pageX;

      if (scrollLeft === 0) {
        setStartX(e.pageX);
      } else if (scrollWidth <= clientWidth + scrollLeft) {
        setStartX(e.pageX + scrollLeft);
      }
    }
  };

  return (
    <Wrap>
      <TopWrap>
        <DesktopTitle>놓치면 안되는 리폼 디자이너 🔥</DesktopTitle>
        <MobileTitle>놓치면 안되는</MobileTitle>
        <MobileTitle> 리폼 디자이너 🔥</MobileTitle>
        <More
          onClick={() => {
            navigate("/lookbook");
          }}
        >
          더보기
        </More>
      </TopWrap>
      <SliderWrap>
        <Slider
          onMouseDown={onDragStart}
          onMouseMove={onDragMove}
          onMouseUp={onDragEnd}
          onMouseLeave={onDragEnd}
          ref={scrollRef}
        >
          <Box />
          {postList.map((postObj) => {
            return (
              <PostWrap>
                <CardB postObj={postObj} isMain hot ket={postObj.id} />
              </PostWrap>
            );
          })}
        </Slider>

        <ArrowLeft
          onClick={() => {
            scrollRef.current.scrollLeft -= 500;
          }}
        >
          <ArrowLeftSVG />
        </ArrowLeft>
        <ArrowRight
          onClick={() => {
            scrollRef.current.scrollLeft += 500;
          }}
        >
          <ArrowRightSVG />
        </ArrowRight>
      </SliderWrap>
    </Wrap>
  );
};

const Wrap = styled.section`
  max-width: ${({ theme }) => theme.width.maxWidth};
  background-color: ${({ theme }) => theme.colors.darkBlue};
  height: 776px;
  margin: 70px auto 90px auto;
  z-index: -10;
`;
const TopWrap = styled.div`
  display: flex;
  padding: 100px 40px 50px 40px;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-left: 50px;
`;
const DesktopTitle = styled.div`
  display: none;
  color: #fff;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  line-height: 32px;
  font-weight: 700;
  width: 380px;
  margin: 0 auto;
  @media all and (min-width: 563px) {
    display: inherit;
  }
`;
const MobileTitle = styled.div`
  color: #fff;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 700;
  line-height: 32px;
  width: 380px;
  @media all and (min-width: 563px) {
    display: none;
  }
`;
const More = styled.div`
  color: ${({ theme }) => theme.colors.orange};
  font-size: ${({ theme }) => theme.fontSizes.l};
  font-weight: 700;
  line-height: 24px;
  cursor: pointer;
`;
const SliderWrap = styled.div`
  position: relative;
`;
const Box = styled.div`
  content: "";
  width: 120px;
  display: inline-block;
`;
const Slider = styled.div`
  height: 450px;
  width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;

  scroll-behavior: smooth;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const PostWrap = styled.div`
  display: inline-block;
  width: 80%;
  margin-right: 40px;
  @media all and (min-width: 500px) {
    width: 450px;
  }
`;
const ArrowLeft = styled.div`
  z-index: 1;
  position: absolute;
  top: 35vw;
  padding: 0 40px;
  @media all and (min-width: 500px) {
    top: 43%;
  }
`;
const ArrowRight = styled(ArrowLeft)`
  right: 0;
`;

export default DesignSection;
