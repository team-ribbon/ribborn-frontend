import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getQnAPostDB, cleanUpPost } from "../modules/post";

import PostRightBtn from "../elements/PostRightBtn";

const LookBookDetail = () => {
  const dispatch = useDispatch();
  const params = useParams();
  console.log(params);

  const post = useSelector((state) => state.post.Comments);
  const commentsList = useSelector((state) => state.post.Post);

  React.useEffect(() => {
    dispatch(getQnAPostDB(params.postId));
  }, []);

  React.useEffect(() => {
    return () => {
      dispatch(cleanUpPost());
    };
  }, []);

  return (
    <Template>
      <PostDetail />
      <MyPostChange />
      <PostFooter />
      <PostRightBtn />
    </Template>
  );
};

const Template = styled.div``;

export default LookBookDetail;
