import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getEventPostDB, cleanUpPost } from "../redux/modules/post";

const EventDetail = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const post = useSelector((state) => state.post.Post);
  const isLogin = useSelector((state) => state.user.isLogin);

  useEffect(() => {
    dispatch(getEventPostDB(params.eventId));
  }, []);

  useEffect(() => {
    return () => {
      dispatch(cleanUpPost());
    };
  }, []);

  return <Wrap></Wrap>;
};

const Wrap = styled.div``;

export default EventDetail;
