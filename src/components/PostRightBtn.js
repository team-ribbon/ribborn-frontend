import styled from "styled-components";
import { HiOutlineShare, HiOutlineHeart, HiHeart } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { likePostDB } from "../modules/post";

const PostRightBtn = ({ noshare, id, liked, likeCount, lookbook }) => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.isLogin);

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
          <Button>
            <HiOutlineShare size="28" />
          </Button>
        </>
      )}
    </Cover>
  );
};

const Cover = styled.div`
  position: fixed;
  top: 50%;
  right: 200px;
  text-align: center;
`;

const Button = styled.div`
  background-color: rgba(242, 242, 242, 1);
  width: 60px;
  height: 60px;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
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

export default PostRightBtn;
