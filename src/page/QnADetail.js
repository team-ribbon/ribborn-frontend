import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getQnAPostDB } from "../modules/post";

import PostDetail from "../components/PostDetail";
import PostFooter from "../components/PostFooter";
import PostRightBtn from "../elements/PostRightBtn";

const QnADetail = () => {
  const dispatch = useDispatch();
  const params = useParams();
  console.log(params);

  const post = useSelector((state) => state.post.Post);
  const commentsList = useSelector((state) => state.post.Comments);

  React.useEffect(() => {
    dispatch(getQnAPostDB(params.postId));
  }, []);

  // React.useEffect(() => {
  //   return () => {
  //     dispatch(cleanUpPost());
  //   };
  // }, []);

  return (
    <Template>
      <PostDetail post={post} />
      <PostFooter id={params.postId} commentsList={commentsList} />
      <PostRightBtn noshare={true} id={params.postId} />
    </Template>
  );
};

const Template = styled.div``;

export default QnADetail;
