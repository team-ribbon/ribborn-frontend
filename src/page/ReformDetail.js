import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getReformPostDB, cleanUpPost } from "../modules/post";

import ReformPostDetail from "../components/ReformPostDetail";

const ReformDetail = () => {
  const dispatch = useDispatch();
  const params = useParams();
  console.log(params);

  const post = useSelector((state) => state.post.Post);
  const userId = useSelector((state) => state.user.user.id);

  React.useEffect(() => {
    dispatch(getReformPostDB(params.postId));
  }, []);

  React.useEffect(() => {
    return () => {
      dispatch(cleanUpPost());
    };
  }, []);

  return (
    <Template>
      <ReformPostDetail post={post} userId={userId} />
    </Template>
  );
};

const Template = styled.div``;

export default ReformDetail;
