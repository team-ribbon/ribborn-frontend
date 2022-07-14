import styled from "styled-components";
import CardA from "../components/CardA";
import CardB from "../components/CardB";
import NoPost from "../components/NoPost";
import TextCard from "../components/TextCard";

const UserPost = ({ user, qna, lookbook, review, reform }) => {
  return (
    <UserPostDiv>
      {user !== null && +user.userType === 1 ? (
        <PostCollection>
          <h3>{user.nickname}님의 룩북</h3>
          <CardDiv>
            {lookbook === null ? (
              <NoPost category="lookbook" />
            ) : (
              lookbook.slice(0, 3).map((thisPost) => {
                return (
                  <CardB
                    key={"lookbook" + thisPost.postId}
                    postObj={thisPost}
                    noWriter={true}
                    noComment={true}
                  />
                );
              })
            )}
          </CardDiv>
        </PostCollection>
      ) : null}
      <PostCollection>
        <h3>{user === null ? null : user.nickname}님이 쓴 후기</h3>
        <CardDiv>
          {review === null ? (
            <NoPost category="review" />
          ) : (
            review.slice(0, 3).map((thisPost) => {
              return (
                <CardA
                  key={"review" + thisPost.postId}
                  postObj={thisPost}
                  noWriter={true}
                />
              );
            })
          )}
        </CardDiv>
      </PostCollection>
      <PostCollection>
        <h3>{user === null ? null : user.nickname}님의 질문과 답변</h3>
        <TextCardDiv>
          {qna === null ? (
            <NoPost category="qna" />
          ) : (
            qna.slice(0, 3).map((thisPost) => {
              return (
                <TextCard
                  key={"qna" + thisPost.postId}
                  postObj={thisPost}
                  noWriter={true}
                />
              );
            })
          )}
        </TextCardDiv>
      </PostCollection>
      {user !== null && +user.userType === 0 ? (
        <PostCollection>
          <h3>{user.nickname}님의 견적</h3>
          <TextCardDiv>
            {reform === null ? (
              <NoPost category="reform" />
            ) : (
              reform.slice(0, 3).map((thisPost) => {
                return (
                  <TextCard
                    key={"reform" + thisPost.postId}
                    postObj={thisPost}
                    noWriter={true}
                    reform={true}
                  />
                );
              })
            )}
          </TextCardDiv>
        </PostCollection>
      ) : null}
    </UserPostDiv>
  );
};

const UserPostDiv = styled.div`
  width: calc(90vw - 200px);
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const PostCollection = styled.div`
  width: 100%;
  padding: 0px 30px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CardDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 50px;
  margin-top: 40px;
  height: 250px;
  width: 100%;
`;

const TextCardDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 40px;
`;

export default UserPost;
