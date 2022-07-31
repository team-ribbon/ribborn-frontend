import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
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
    dispatch(deleteCommentDB(id, commentId, page)).then(() => {
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

  const modifyComment = (commentId, currentComment) => {
    if (modifyInputCurrent.current.value === "") {
      return false;
    }
    if (modifyInputCurrent.current.value === currentComment) {
      return false;
    }
    dispatch(
      modifyCommentDB(id, commentId, modifyInputCurrent.current.value, page)
    );
  };

  const borderActive = () => {
    const commentInputButton = document.getElementById("commentInputButton");
    const CommentSection = document.getElementById("commentSection");
    commentInputButton.style.color = "#222222";
    CommentSection.style.border = "1px solid #222222";
  };
  const borderDisAbled = () => {
    const commentInputButton = document.getElementById("commentInputButton");
    const CommentSection = document.getElementById("commentSection");
    commentInputButton.style.color = "#afb0b3";
    CommentSection.style.border = "1px solid #f2f2f2";
  };
  const modifyBorderActive = () => {
    const CommentSection = document.getElementById("modifyCommentSection");
    const modifyMessageButton = document.getElementById("modifyMessageButton");
    const modifyMessageCancelButton = document.getElementById(
      "modifyMessageCancelButton"
    );
    CommentSection.style.border = "1px solid #222222";
    modifyMessageButton.style.color = "#222222";
    modifyMessageCancelButton.style.color = "#222222";
  };
  const modifyBorderDisAbled = () => {
    const CommentSection = document.getElementById("modifyCommentSection");
    const modifyMessageButton = document.getElementById("modifyMessageButton");
    const modifyMessageCancelButton = document.getElementById(
      "modifyMessageCancelButton"
    );
    CommentSection.style.border = "1px solid #f2f2f2";
    modifyMessageButton.style.color = "#afb0b3";
    modifyMessageCancelButton.style.color = "#afb0b3";
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
          {isLogin ? (
            <MessageCover id="commentSection">
              <MessageInput
                maxLength="100"
                placeholder="기분 좋은 말 한마디는 모두에게 긍정적인 에너지를 줘요 :)"
                id="messageInput"
                ref={inputCurrent}
                autoComplete="off"
              />
              <MessageBtn id="commentInputButton" onClick={sendComment}>
                입력
              </MessageBtn>
            </MessageCover>
          ) : (
            <MessageCover id="commentSection">
              <MessageInput
                disabled
                placeholder="댓글을 달려면 로그인을 해주세요!"
                id="messageInput"
                ref={inputCurrent}
                autoComplete="off"
              />
              <MessageBtn
                id="commentInputButton"
                onClick={() => {
                  navigate("/login");
                }}
              >
                입력
              </MessageBtn>
            </MessageCover>
          )}
          {commentsList.map((v, i) => {
            const myComment = userId === v.userid;
            return (
              <Comment
                modify={myComment}
                ref={commentsList.length - 1 === i ? inViewRef : null}
              >
                <CommentFistLine>
                  <CommentNickname>@{v.nickname}</CommentNickname>
                  {changingComment === i ? (
                    <ModifyMessageCover id="modifyCommentSection">
                      <ModifyMessageInput
                        defaultValue={v.comment}
                        id="modifyMessageInput"
                        ref={modifyInputCurrent}
                        autoComplete="off"
                      />
                      <LeftMessageBtn
                        id="modifyMessageCancelButton"
                        onClick={() => {
                          modifyCommentCancel();
                          setChangingComment(null);
                        }}
                      >
                        취소
                      </LeftMessageBtn>
                      <MessageBtn
                        id="modifyMessageButton"
                        onClick={() => {
                          modifyComment(v.id, v.comment);
                          modifyCommentCancel();
                          setChangingComment(null);
                        }}
                      >
                        수정
                      </MessageBtn>
                    </ModifyMessageCover>
                  ) : (
                    <CommentContent myComment={myComment}>
                      {v.comment}
                    </CommentContent>
                  )}
                  {myComment && changingComment !== i && (
                    <DesktopMyCommentDiv>
                      <CommentModifyBtn
                        onClick={() => {
                          setChangingComment(i);
                        }}
                        left={true}
                      >
                        수정
                      </CommentModifyBtn>
                      <CommentModifyBtn
                        onClick={() => {
                          deleteComment(v.id);
                        }}
                        left={changingComment !== null && changingComment !== i}
                      >
                        삭제
                      </CommentModifyBtn>
                    </DesktopMyCommentDiv>
                  )}
                </CommentFistLine>
                <CreatedAt>{TimeCalculator(v.createAt)}</CreatedAt>
                {myComment && changingComment !== i && (
                  <MobileMyCommentDiv>
                    <CommentModifyBtn
                      onClick={() => {
                        setChangingComment(i);
                      }}
                      left={true}
                    >
                      수정
                    </CommentModifyBtn>
                    <CommentModifyBtn
                      onClick={() => {
                        deleteComment(v.id);
                      }}
                      left={changingComment !== null && changingComment !== i}
                    >
                      삭제
                    </CommentModifyBtn>
                  </MobileMyCommentDiv>
                )}
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
  font-size: ${({ theme }) => theme.fontSizes.l};
  line-height: 24px;
`;

const BoldCommentCount = styled.span`
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
`;

const HR = styled.div`
  margin: 0 auto 30px auto;
  max-width: 700px;
  border-top: 1px solid #f2f2f2;
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
  z-index: 0;
  width: 100%;
  height: 46px;
  margin: 16px auto 0px auto;
  position: relative;
  border: none;
  background: #ffffff;
  border: 1px solid #f2f2f2;
  border-radius: 8px;
`;

const ModifyMessageCover = styled.section`
  width: calc(100% - 6px);
  height: 46px;
  margin: 0 auto 0 0;
  position: relative;
  border: none;
  background: #ffffff;
  border: 1px solid #f2f2f2;
  border-radius: 8px;
  @media ${({ theme }) => theme.device.mobile} {
    width: calc(100% - 112px);
    margin: -47px 0 0px auto;
    transform: translate(0%, 50%);
  }
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
  font-size: ${({ theme }) => theme.fontSizes.s};
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

const ModifyMessageInput = styled.input`
  position: absolute;
  top: 50%;
  left: 7px;
  height: 46px;
  width: calc(100% - 130px);
  border: transparent;
  background-color: transparent;
  transform: translate(0%, -50%);
  font-size: ${({ theme }) => theme.fontSizes.s};
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

const LeftMessageBtn = styled.button`
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
  right: 73px;
  top: 50%;
  transform: translate(0%, -50%);
  :hover {
    cursor: pointer;
  }
`;

const Comment = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px auto 0px 6px;
  @media ${({ theme }) => theme.device.mobile} {
    margin: 30px auto 0px auto;
  }
`;

const CommentFistLine = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  min-height: 45px;
  vertical-align: middle;
  gap: 6px;
  margin-bottom: 6px;
  @media ${({ theme }) => theme.device.mobile} {
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 0px;
  }
`;

const CommentNickname = styled.span`
  width: 100%;
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSizes.m};
  line-height: 18px;
  color: #222222;
  @media ${({ theme }) => theme.device.mobile} {
    width: 100px;
  }
`;

const CommentContent = styled.span`
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.s};
  line-height: 18px;
  color: #222222;
  width: calc(100% - 6px);
  @media ${({ theme }) => theme.device.mobile} {
    font-size: ${({ theme }) => theme.fontSizes.m};
    margin-left: 16px;
    width: ${(props) =>
      props.myComment ? "calc(100% - 276px)" : "calc(100% - 116px)"};
  }
`;

const CommentModifyBtn = styled.button`
  width: 48px;
  height: 29px;
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.s};
  line-height: 14px;
  border: 1px solid #222222;
  border-radius: 8px;
  background-color: transparent;
  margin-left: ${(props) => (props.left ? "auto" : "16px")};
  :hover {
    cursor: pointer;
  }
  @media ${({ theme }) => theme.device.mobile} {
    margin-left: ${(props) => (props.left ? "auto" : "12px")};
    width: ${(props) => (props.moreWidth ? "86px" : "68px")};
    font-size: ${({ theme }) => theme.fontSizes.m};
    line-height: 18px;
  }
`;

const CreatedAt = styled.span`
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.s};
  line-height: 14px;
  color: #afb0b3;
  margin-top: 6px;
  @media ${({ theme }) => theme.device.mobile} {
    margin-top: 0px;
  }
`;

const DesktopMyCommentDiv = styled.div`
  display: none;
  @media ${({ theme }) => theme.device.mobile} {
    display: initial;
  }
`;

const MobileMyCommentDiv = styled.div`
  display: initial;
  margin-top: 6px;
  @media ${({ theme }) => theme.device.mobile} {
    display: none;
  }
`;

export default PostFooter;
