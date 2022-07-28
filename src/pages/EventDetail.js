import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  ParticipateEventDB,
  getEventPostDB,
  cleanUpPost,
} from "../redux/modules/post";
import { FixedSizeMainBtn } from "../elements/Buttons";

const EventDetail = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const post = useSelector((state) => state.post.Post);
  const isLogin = useSelector((state) => state.user.isLogin);

  useEffect(() => {
    dispatch(getEventPostDB(params.eventId));
  }, []);

  useEffect(() => {
    return () => {
      dispatch(cleanUpPost());
    };
  }, []);

  const participateEvent = () => {
    dispatch(ParticipateEventDB());
  };

  return (
    <Wrap>
      {post && (
        <ImageWrap>
          <EventImage src={post.image} />
          {!isLogin && <EventButton>이벤트 참여하기</EventButton>}
          {isLogin && post.participation === "true" && (
            <ExpiredEventButton>이미 참여한 이벤트에요!</ExpiredEventButton>
          )}
          {isLogin && post.participation === "false" && (
            <EventButton onClick={participateEvent}>
              이벤트 참여하기
            </EventButton>
          )}
          {isLogin && post.participation === "now" && (
            <ExpiredEventButton>이벤트에 참여하였습니다!</ExpiredEventButton>
          )}
          {(!isLogin ||
            !(
              post.participation === "true" || post.participation === "now"
            )) && (
            <SVGWrap>
              <svg
                width="100%"
                viewBox="0 0 447 290"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_f_907_3824)">
                  <ellipse
                    cx="223.5"
                    cy="145"
                    rx="123.5"
                    ry="45"
                    fill="url(#paint0_linear_907_3824)"
                    fillOpacity="0.73"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_f_907_3824"
                    x="0"
                    y="0"
                    width="447"
                    height="290"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="BackgroundImageFix"
                      result="shape"
                    />
                    <feGaussianBlur
                      stdDeviation="50"
                      result="effect1_foregroundBlur_907_3824"
                    />
                  </filter>
                  <linearGradient
                    id="paint0_linear_907_3824"
                    x1="281"
                    y1="199"
                    x2="165.5"
                    y2="157"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#EB6D00" />
                    <stop offset="1" stopColor="#FFE600" />
                  </linearGradient>
                </defs>
              </svg>
            </SVGWrap>
          )}
        </ImageWrap>
      )}
    </Wrap>
  );
};

const Wrap = styled.div``;

const ImageWrap = styled.div`
  max-width: 732px;
  margin: 0 auto;
  padding: 0 16px;
  position: relative;
  @media ${({ theme }) => theme.device.mobile} {
    max-width: 780px;
    padding: 0 40px;
  }
`;

const EventImage = styled.img`
  width: 100%;
`;

const EventButton = styled(FixedSizeMainBtn)`
  z-index: 10;
  position: absolute;
  bottom: calc(17.88% - 20px);
  left: 21.4%;
  width: 57.2%;
  padding: 10px 0;
  font-weight: 700;
  line-height: 171.34%;
  @media all and (min-width: 330px) {
    bottom: calc(17.88% - 10px);
    padding: 15px 0;
  }
  @media all and (min-width: 450px) {
    font-size: ${({ theme }) => theme.fontSizes.l};
    bottom: 17.88%;
    padding: 20px 0;
  }
  @media ${({ theme }) => theme.device.mobile} {
    font-size: ${({ theme }) => theme.fontSizes.xl};
    bottom: 17.88%;
    padding: 25px 0;
  }
`;

const ExpiredEventButton = styled(EventButton)`
  background-color: ${({ theme }) => theme.colors.gray};
  font-size: ${({ theme }) => theme.fontSizes.s};
  cursor: default;
  &:hover {
    opacity: 1;
  }
  @media all and (min-width: 330px) {
    font-size: ${({ theme }) => theme.fontSizes.m};
  }
  @media all and (min-width: 450px) {
    font-size: ${({ theme }) => theme.fontSizes.l};
  }
  @media ${({ theme }) => theme.device.mobile} {
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }
`;

const SVGWrap = styled.div`
  position: absolute;
  bottom: calc(13% - 20px);
  left: 18%;
  width: 64%;
  @media all and (min-width: 330px) {
    bottom: calc(13% - 10px);
  }
  @media all and (min-width: 450px) {
    bottom: 13%;
  }
  @media ${({ theme }) => theme.device.mobile} {
    bottom: 13%;
  }
`;

export default EventDetail;
