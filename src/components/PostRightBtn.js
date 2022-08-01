import { useState, useEffect } from "react";
import styled from "styled-components";
import { FaFacebookF } from "react-icons/fa";
import {
  LikeHeartSVG,
  OrangeHeartSVG,
  ShareSVG,
  ShareClickedSVG,
  LinkSVG,
} from "../elements/SVG";
import { useDispatch, useSelector } from "react-redux";
import { likePostDB } from "../redux/modules/post";

const PostRightBtn = ({ noshare, id, liked, likeCount, lookbook }) => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.isLogin);
  const [shareClicked, setShareClicked] = useState(false);

  const likeIt = () => {
    if (isLogin) {
      document.getElementById("likeBtn").disabled = true;
      dispatch(likePostDB(id, !liked)).then(() => {
        document.getElementById("likeBtn").disabled = false;
      });
    } else {
      alert("좋아요를 누르려면 로그인을 해주세요!");
    }
  };
  const shareFaceBook = () => {
    const sendUrl = window.document.location.href;
    window.open("http://www.facebook.com/sharer/sharer.php?u=" + sendUrl);
  };

  const copyLink = () => {
    let textarea = document.createElement("textarea");
    document.body.appendChild(textarea);
    const sendUrl = window.document.location.href;
    textarea.value = sendUrl;
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    alert("URL이 복사되었습니다.");
  };

  useEffect(() => {
    initKakao();
  }, []);

  const initKakao = () => {
    if (window.Kakao) {
      const kakao = window.Kakao;
      if (!kakao.isInitialized()) {
        kakao.init(process.env.REACT_APP_KAKAO_TOKEN);
      }
    }
  };

  const shareKakao = () => {
    const url = window.location.href;
    window.Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: "✂️ 리폼 견적 · 커뮤니티는 리본 🎀",
        description: "리폼 견적 요청부터 후기까지 모두 리본!",
        imageUrl:
          "https://user-images.githubusercontent.com/105181604/181456826-d342485e-99c7-4f0c-8e28-b8c9870b9195.png",
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },
    });
  };

  return (
    <Cover lookbook={lookbook}>
      <Button
        id="likeBtn"
        onClick={() => {
          likeIt();
        }}
      >
        {liked ? <OrangeHeartSVG /> : <LikeHeartSVG />}
      </Button>
      <LikeCount>{likeCount}</LikeCount>
      {!noshare && (
        <>
          <HR />
          <Button
            color={shareClicked ? "#322F5A" : "F2F2F2"}
            onClick={() => {
              setShareClicked(!shareClicked);
            }}
          >
            {shareClicked ? <ShareClickedSVG /> : <ShareSVG />}
          </Button>
          {shareClicked ? (
            <ShareClickedDiv>
              <Button
                small={true}
                color="#FAE301"
                onClick={() => {
                  shareKakao();
                  setShareClicked(false);
                }}
              >
                <KakaoImg src="https://w.namu.la/s/059f8bf3e629d3f2e343fe3f3f10809022d58800962db675d233429660bf98d9ceccd60e23b1324d090c87485833b10c2c4503c93a230003ba67d5fcafa52793e30f5abff4d86607618c1355222157b79e7b06a3c9588ab45ae83da6fb545875" />
              </Button>
              <Button
                small={true}
                color="#1977F3"
                onClick={() => {
                  shareFaceBook();
                  setShareClicked(false);
                }}
              >
                <FaFacebookF size="22" color="white" />
              </Button>
              <Button
                small={true}
                color="#322F5A"
                onClick={() => {
                  copyLink();
                  setShareClicked(false);
                }}
              >
                <LinkSVG />
              </Button>
            </ShareClickedDiv>
          ) : null}
        </>
      )}
    </Cover>
  );
};

const Cover = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  margin-top: 50px;
`;

const Button = styled.div`
  background-color: rgba(242, 242, 242, 1);
  width: ${(props) => (props.small ? "38px" : "50px")};
  height: ${(props) => (props.small ? "38px" : "50px")};
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
  cursor: pointer;
  background-color: ${(props) => props.color};
  z-index: 20;
`;

const LikeCount = styled.span`
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.m};
  line-height: 14px;
  z-index: 20;
`;

const HR = styled.hr`
  width: 33px;
  border-top: 1px solid rgba(175, 176, 178, 1);
  border-bottom: none;
  border-left: none;
  border-right: none;
  margin: 30px auto 30px auto;
  z-index: 20;
`;

const ShareClickedDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 12px;
  gap: 10px;
  z-index: 20;
`;

const KakaoImg = styled.img`
  width: 25px;
  height: 25px;
`;

export default PostRightBtn;
