import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";

import {
  getReviewPostDB,
  cleanUpPost,
  loadDoneReset,
  GetCommentDB,
} from "../redux/modules/post";

import PostDetail from "../components/PostDetail";
import PostFooter from "../components/PostFooter";

const ReviewDetail = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [page, setPage] = useState(0);
  const [loading, setLoading] = React.useState(true);

  const [inViewRef, inView] = useInView();

  const post = useSelector((state) => state.post.Post);
  const commentsList = useSelector((state) => state.post.Comments);
  const userId = useSelector((state) => state.user.user?.id);
  const loadedEverything = useSelector((state) => state.post.loadedEverything);

  React.useEffect(() => {
    dispatch(getReviewPostDB(params.postId));
  }, []);

  React.useEffect(() => {
    if (inView && !loading && !loadedEverything) {
      setPage(page + 1);
    }
  }, [inView, loading]);

  React.useEffect(() => {
    return () => {
      dispatch(cleanUpPost());
    };
  }, []);

  React.useEffect(() => {
    setLoading(true);
    dispatch(GetCommentDB(params.postId, page, 5)).then((res) => {
      setLoading(false);
    });
  }, [page]);

  return (
    <Template>
      <PostDetail post={post} userId={userId} postId={params.postId} />
      <PostFooter
        id={params.postId}
        commentsList={commentsList}
        userId={userId}
        commentCount={post && post.commentCount}
        page={page}
        inViewRef={inViewRef}
        setPage={setPage}
        loadDoneReset={loadDoneReset}
        setLoading={setLoading}
        inView={inView}
        loadedEverything={loadedEverything}
      />
    </Template>
  );
};

const Template = styled.div``;

export default ReviewDetail;
