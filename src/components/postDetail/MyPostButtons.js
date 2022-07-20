import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { deletePostDB } from "../../redux/modules/post";

const MyPostButtons = ({ id, postType }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const deletePost = () => {
    dispatch(deletePostDB(id)).then((res) => {
      navigate(`/${postType}`);
    });
  };

  return (
    <>
      <Link to={`/edit/${postType}/${id}`}>
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
  font-size: 14px;
  line-height: 18px;
  background-color: transparent;
  :hover {
    cursor: pointer;
  }
`;

export default MyPostButtons;
