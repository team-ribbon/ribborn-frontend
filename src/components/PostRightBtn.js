import { useState } from "react";
import styled from "styled-components";
import { HiOutlineShare, HiOutlineHeart, HiHeart } from "react-icons/hi";
import { AiOutlineCopy } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { likePostDB } from "../modules/post";

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
  };
  return (
    <Cover lookbook={lookbook}>
      <Button
        id="likeBtn"
        onClick={() => {
          likeIt();
        }}
      >
        {liked ? (
          <HiHeart size="26" color="#FF8C28" />
        ) : (
          <HiOutlineHeart size="26" />
        )}
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
            <HiOutlineShare size="28" color={shareClicked ? "white" : "#222"} />
          </Button>
          {shareClicked ? (
            <ShareClickedDiv>
              <Button small={true} color="#1977F3" onClick={shareFaceBook}>
                <FaFacebookF size="26" color="white" />
              </Button>
              <Button small={true} color="#322F5A" onClick={copyLink}>
                <AiOutlineCopy size="26" color="white" />
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
  width: ${(props) => (props.small ? "45px" : "60px")};
  height: ${(props) => (props.small ? "45px" : "60px")};
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
  cursor: pointer;
  background-color: ${(props) => props.color}; ;
`;

const LikeCount = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 14px;
`;

const HR = styled.hr`
  width: 33px;
  border-top: 1px solid rgba(175, 176, 178, 1);
  border-bottom: none;
  border-left: none;
  border-right: none;
  margin: 30px auto 30px auto;
`;

const ShareClickedDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 12px;
  gap: 10px;
`;

export default PostRightBtn;
