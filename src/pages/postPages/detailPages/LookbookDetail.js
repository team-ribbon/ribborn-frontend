import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getLookbookPostDB, cleanUpPost } from "../../../redux/modules/post";

import LookBookPostDetail from "../../../components/postDetail/LookBookPostDetail";

const LookbookDetail = () => {
  const dispatch = useDispatch();
  const params = useParams();
  console.log(params);

  const post = useSelector((state) => state.post.Post);
  const userId = useSelector((state) => state.user.user.id);
  const userType = useSelector((state) => state.user.user.userType);

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
      <LookBookPostDetail
        post={post}
        userId={userId}
        postId={params.postId}
        userType={userType}
      />
    </Template>
  );
};

const Template = styled.div``;

export default LookbookDetail;
