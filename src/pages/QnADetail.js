import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";

import {
  getQnAPostDB,
  cleanUpPost,
  loadDoneReset,
  GetCommentDB,
} from "../redux/modules/post";

import PostDetail from "../components/PostDetail";
import PostFooter from "../components/PostFooter";
import PostRightBtn from "../components/PostRightBtn";

const QnADetail = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [page, setPage] = useState(0);
  const [loading, setLoading] = React.useState(true);

  const [inViewRef, inView] = useInView();
  console.log(params);

  const post = useSelector((state) => state.post.Post);
  const commentsList = useSelector((state) => state.post.Comments);
  const userId = useSelector((state) => state.user.user.id);
  const loadedEverything = useSelector((state) => state.post.loadedEverything);

  React.useEffect(() => {
    dispatch(getQnAPostDB(params.postId));
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
      <PostDetail qna={true} post={post} userId={userId} />
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
