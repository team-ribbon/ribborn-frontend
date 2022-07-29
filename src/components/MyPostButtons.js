import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { deletePostDB } from "../redux/modules/post";
import AlertModal from "./AlertModal";

const MyPostButtons = ({ id, postId, postType }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const confirmRef = useRef(false);
  const [isModalOn, setIsModalOn] = useState(false);

  const deletePost = () => {
    setIsModalOn(true);
  };

  useEffect(() => {
    if (confirmRef.current) {
      dispatch(deletePostDB(postId)).then(() => {
        navigate(`/${postType}`);
      });
    }
  }, [confirmRef.current]);

  return (
    <>
      {isModalOn && (
        <AlertModal
          ref={confirmRef}
          isModalOn={isModalOn}
          setIsModalOn={setIsModalOn}
          title="게시물을 삭제하시겠어요?"
          content="삭제 후에는 복구할 수 없습니다."
          leftButton="아니요, 안 할래요."
          rightButton="네, 할게요."
        />
      )}
      <Link to={`/edit/${postType}/${postId}`}>
        <MyPostButton>수정</MyPostButton>
      </Link>
      <MyPostButton onClick={deletePost}>삭제</MyPostButton>
    </>
  );
};

const MyPostButton = styled.button`
  width: 95px;
  height: 40px;
  border: 1px solid #222222;
  border-radius: 8px;
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.m};
  line-height: 18px;
  background-color: transparent;
  :hover {
    cursor: pointer;
  }
`;

export default MyPostButtons;
