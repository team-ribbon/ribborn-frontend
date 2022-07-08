import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { getQnAPostDB, cleanUpPost } from "../modules/post";

import PostDetail from "../components/PostDetail";
import MyPostChange from "../components/MyPostChange";
import PostFooter from "../components/PostFooter";
import PostRightBtn from "../elements/PostRightBtn";

const QnADetail = () => {
  const dispatch = useDispatch();
  const params = useParams();
  console.log(params);

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

export default QnADetail;
