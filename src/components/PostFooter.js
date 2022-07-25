import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import TimeCalculator from "../shared/TimeCalculator";
import {
  GetCommentDB,
  PostCommentDB,
  deleteCommentDB,
  modifyCommentDB,
} from "../redux/modules/post";

const PostFooter = ({
  commentsList,
  id,
  userId,
  commentCount,
  page,
  inViewRef,
  setPage,
  loadDoneReset,
  setLoading,
  inView,
  loadedEverything,
}) => {
  const inputCurrent = React.useRef(null);
  const modifyInputCurrent = React.useRef(null);
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.isLogin);
  const [changingComment, setChangingComment] = useState(null);

  const sendComment = () => {
    if (inputCurrent.current.value === "") {
      return false;
    }
    if (isLogin) {
      dispatch(PostCommentDB(id, inputCurrent.current.value, page)).then(() => {
        dispatch(loadDoneReset());
        if (page === 0) {
          setLoading(true);
          dispatch(GetCommentDB(id, page, 5)).then((res) => {
            if (inView && !loadedEverything) {
              setPage(page + 1);
            } else {
              setLoading(false);
            }
          });
        } else {
          setPage(0);
        }
      });
      document.getElementById("messageInput").value = "";
    } else {
      alert("댓글을 달려면 로그인을 해주세요!");
    }
  };

  const deleteComment = (commentId) => {
    dispatch(deleteCommentDB(id, commentId)).then(() => {
      dispatch(loadDoneReset());
      if (page === 0) {
        setLoading(true);
        dispatch(GetCommentDB(id, 0, 5)).then((res) => {
          if (inView && !loadedEverything) {
            setPage(page + 1);
          } else {
            setLoading(false);
          }
        });
      } else {
        setPage(0);
      }
    });
  };

  const modifyComment = (commentId) => {
    dispatch(modifyCommentDB(id, commentId, modifyInputCurrent.current.value));
  };

  const borderActive = () => {
    const CommentSection = document.getElementById("commentSection");
    CommentSection.style.border = "1px solid #222222";
  };
  const borderDisAbled = () => {
    const CommentSection = document.getElementById("commentSection");
    CommentSection.style.border = "1px solid #f2f2f2";
  };
  const modifyBorderActive = () => {
    const CommentSection = document.getElementById("modifyCommentSection");
    CommentSection.style.border = "1px solid #222222";
  };
  const modifyBorderDisAbled = () => {
    const CommentSection = document.getElementById("modifyCommentSection");
    CommentSection.style.border = "1px solid #f2f2f2";
  };

  React.useEffect(() => {
    const CommentInput = document.getElementById("messageInput");
    CommentInput.addEventListener("focus", borderActive);
    CommentInput.addEventListener("blur", borderDisAbled);
    return () => {
      CommentInput.removeEventListener("focus", borderActive);
      CommentInput.removeEventListener("blur", borderDisAbled);
    };
  }, []);

  React.useEffect(() => {
    const CommentInput = document.getElementById("modifyMessageInput");
    if (CommentInput) {
      CommentInput.addEventListener("focus", modifyBorderActive);
      CommentInput.addEventListener("blur", modifyBorderDisAbled);
    }
    return () => {
      if (CommentInput) {
        CommentInput.removeEventListener("focus", modifyBorderActive);
        CommentInput.removeEventListener("blur", modifyBorderDisAbled);
      }
    };
  }, [changingComment]);

  const modifyCommentCancel = () => {
    const CommentInput = document.getElementById("modifyMessageInput");
    if (CommentInput) {
      CommentInput.removeEventListener("focus", modifyBorderActive);
      CommentInput.removeEventListener("blur", modifyBorderDisAbled);
    }
  };

  return (
    commentsList && (
      <PostFooterWrap>
        <HR />
        <CommentDiv>
          <CommentCount>댓글 </CommentCount>
          <BoldCommentCount>{commentCount}</BoldCommentCount>
          <MessageCover id="commentSection">
            <MessageInput
              placeholder="기분 좋은 말 한마디는 모두에게 긍정적인 에너지를 줘요 :)"
              id="messageInput"
              ref={inputCurrent}
              autoComplete="off"
            />
            <MessageBtn onClick={sendComment}>입력</MessageBtn>
          </MessageCover>
          {commentsList.map((v, i) => {
            const myComment = userId === v.userid;
            return (
              <Comment
                modify={myComment}
                ref={commentsList.length - 1 === i ? inViewRef : null}
              >
                <CommentFistLine>
                  <CommentNickname>@{v.nickname}</CommentNickname>
                  <CommentContent>{v.comment}</CommentContent>
                  {myComment ? (
                    <>
                      {changingComment === null ? (
                        <CommentModifyBtn
                          onClick={() => {
                            setChangingComment(i);
                          }}
                          left={true}
                        >
                          수정
                        </CommentModifyBtn>
                      ) : null}
                      {changingComment === i ? (
                        <CommentModifyBtn
                          left={true}
                          moreWidth={true}
                          onClick={() => {
                            modifyCommentCancel();
                            setChangingComment(null);
                          }}
                        >
                          수정 취소
                        </CommentModifyBtn>
                      ) : null}
                      <CommentModifyBtn
                        onClick={() => {
                          deleteComment(v.id);
                        }}
                        left={changingComment !== null && changingComment !== i}
                      >
                        삭제
                      </CommentModifyBtn>
                    </>
                  ) : null}
                </CommentFistLine>
                <CreatedAt>{TimeCalculator(v.createAt)}</CreatedAt>
                {changingComment === i ? (
                  <MessageCover id="modifyCommentSection">
                    <MessageInput
                      defaultValue={v.comment}
                      id="modifyMessageInput"
                      ref={modifyInputCurrent}
                      autoComplete="off"
                    />
                    <MessageBtn
                      onClick={() => {
                        modifyComment(v.id);
                        modifyCommentCancel();
                        setChangingComment(null);
                      }}
                    >
                      수정
                    </MessageBtn>
                  </MessageCover>
                ) : null}
              </Comment>
            );
          })}
        </CommentDiv>
      </PostFooterWrap>
    )
  );
};

const PostFooterWrap = styled.div`
  margin-top: 70px;
  justify-content: center;
`;

const CommentCount = styled.span`
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
`;

const BoldCommentCount = styled.span`
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
`;

const HR = styled.div`
  margin: 0 auto 30px auto;
  width: 700px;
  border-top: 1px solid #f2f2f2;
  @media ${({ theme }) => theme.device.mobile} {
    display: inherit;
  }
`;

const CommentDiv = styled.div`
  width: calc(100% - 20px);
  margin: ${(props) =>
    props.modify ? "0px auto 19px auto" : "0px auto 30px auto"};
  @media ${({ theme }) => theme.device.mobile} {
    width: 700px;
  }
`;

const MessageCover = styled.section`
  width: 100%;
  height: 46px;
  margin: 16px auto 0px auto;
  position: relative;
  border: none;
  background: #ffffff;
  border: 1px solid #f2f2f2;
  border-radius: 8px;
`;

const MessageInput = styled.input`
  position: absolute;
  top: 50%;
  left: 7px;
  height: 46px;
  width: calc(100% - 72px);
  border: transparent;
  background-color: transparent;
  transform: translate(0%, -50%);
  font-size: 11px;
  &:focus {
    outline: none;
    box-shadow: none;
  }
  &::placeholder {
    color: ${({ theme }) => theme.colors.gray};
  }
  @media ${({ theme }) => theme.device.mobile} {
    font-size: ${({ theme }) => theme.fontSizes.m};
  }
`;

const MessageBtn = styled.button`
  border: none;
  background-color: transparent;
  width: 50px;
  height: 30px;
  width: fit-content;
  color: #afb0b3;
  position: absolute;
  font-weight: 700;
  font-size: 15px;
  line-height: 18px;
  right: 15px;
  top: 50%;
  transform: translate(0%, -50%);
  :hover {
    cursor: pointer;
  }
`;

const Comment = styled.div`
  margin: 30px auto 0px auto;
`;

const CommentFistLine = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  margin-bottom: 16px;
`;

const CommentNickname = styled.span`
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
  color: #222222;
`;

const CommentContent = styled.span`
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  margin-left: 16px;
  color: #222222;
`;

const CommentModifyBtn = styled.button`
  width: ${(props) => (props.moreWidth ? "86px" : "68px")};
  height: 29px;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  border: 1px solid #222222;
  border-radius: 8px;
  background-color: transparent;
  margin-left: ${(props) => (props.left ? "auto" : "12px")};
  :hover {
    cursor: pointer;
  }
`;

const CreatedAt = styled.span`
  font-weight: 400;
  font-size: 11px;
  line-height: 14px;
  color: #afb0b3;
`;

export default PostFooter;
