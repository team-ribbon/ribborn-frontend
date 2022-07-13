import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getLookbookPostDB, cleanUpPost } from "../modules/post";

import LookBookPostDetail from "../components/LookBookPostDetail";
import PostRightBtn from "../components/PostRightBtn";

const LookBookDetail = () => {
  const dispatch = useDispatch();
  const params = useParams();
  console.log(params);

  const post = useSelector((state) => state.post.Post);
  const userId = useSelector((state) => state.user.user.id);

  React.useEffect(() => {
    dispatch(getLookbookPostDB(params.postId));
  }, []);

  React.useEffect(() => {
    return () => {
      dispatch(cleanUpPost());
    };
  }, []);

  return (
    <Template>
      <LookBookPostDetail post={post} userId={userId} />
      <PostRightBtn
        noshare={false}
        id={params.postId}
        liked={post && post.liked}
        likeCount={post && post.likeCount}
        lookbook={true}
      />
    </Template>
  );
};

const Template = styled.div``;

export default LookBookDetail;
