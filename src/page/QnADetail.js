import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getQnAPostDB, cleanUpPost } from "../modules/post";

import PostDetail from "../components/PostDetail";
import PostFooter from "../components/PostFooter";
import PostRightBtn from "../components/PostRightBtn";

const QnADetail = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [page, setPage] = useState(0);
  console.log(params);

  const post = useSelector((state) => state.post.Post);
  const commentsList = useSelector((state) => state.post.Comments);
  const userId = useSelector((state) => state.user.user.id);

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
      <PostDetail qna={true} post={post} userId={userId} />
      <PostFooter
        id={params.postId}
        commentsList={commentsList}
        userId={userId}
        commentCount={post && post.commentCount}
        page={page}
      />
      <PostRightBtn
        noshare={true}
        id={params.postId}
        liked={post && post.liked}
        likeCount={post && post.likeCount}
      />
    </Template>
  );
};

const Template = styled.div``;

export default QnADetail;
