import styled from "styled-components";
import CardA from "../components/CardA";
import CardB from "../components/CardB";
import NoPost from "../components/NoPost";
import TextCard from "../components/TextCard";
import { Category, SubBtn } from "../elements/Buttons";

const UserPost = ({
  category,
  setCategory,
  user,
  qna,
  lookbook,
  review,
  reform,
  categoriedPosts,
  myPage,
}) => {
  const postCategory = [
    {
      text: "전체",
      value: "all",
    },
    {
      text: "후기",
      value: "review",
    },
    {
      text: "질문과 답변",
      value: "qna",
    },
    {
      text: "견적",
      value: "reform",
    },
    {
      text: "룩북",
      value: "lookbook",
    },
  ];
  return (
    <UserPostDiv>
      <Category category={category} userpage={true}>
        {postCategory.map((v, i) => {
          return user && user.userType === 1 ? (
            i !== 3 ? (
              <UserCategoryBtn
                onClick={() => {
                  setCategory(v.value);
                }}
                id={v.value}
              >
                {v.text}
              </UserCategoryBtn>
            ) : null
          ) : i !== 4 ? (
            <UserCategoryBtn
              onClick={() => {
                setCategory(v.value);
              }}
              id={v.value}
            >
              {v.text}
            </UserCategoryBtn>
          ) : null;
        })}
      </Category>
      {category === "all" ? (
        <PostDiv>
          {user && user !== null && +user.userType === 1 ? (
            <PostCollection>
              <PostCollectionTitleDiv>
                <CategoryTitle>{user.nickname}님의 룩북</CategoryTitle>
                <SeeMore
                  onClick={() => {
                    setCategory("lookbook");
                  }}
                >
                  더보기
                </SeeMore>
              </PostCollectionTitleDiv>
              <Grid>
                {lookbook && lookbook.length === 0 ? (
                  <NoPost category="lookbook" myPage={myPage} />
                ) : (
                  lookbook.slice(0, 3).map((thisPost) => {
                    return (
                      <CardB
                        key={"lookbook" + thisPost.id}
                        postObj={thisPost}
                      />
                    );
                  })
                )}
              </Grid>
            </PostCollection>
          ) : null}
          <PostCollection>
            <PostCollectionTitleDiv>
              <CategoryTitle>{user && user.nickname}님이 쓴 후기</CategoryTitle>
              <SeeMore
                onClick={() => {
                  setCategory("review");
                }}
              >
                더보기
              </SeeMore>
            </PostCollectionTitleDiv>
            <Grid>
              {review && review.length === 0 ? (
                <NoPost category="review" myPage={myPage} />
              ) : (
                review &&
                review.slice(0, 3).map((thisPost) => {
                  return (
                    <CardA
                      key={"review" + thisPost.id}
                      postObj={thisPost}
                      type="A"
                    />
                  );
                })
              )}
            </Grid>
          </PostCollection>
          <PostCollection>
            <PostCollectionTitleDiv>
              <CategoryTitle>
                {user && user.nickname}님의 질문과 답변
              </CategoryTitle>
              <SeeMore
                onClick={() => {
                  setCategory("qna");
                }}
              >
                더보기
              </SeeMore>
            </PostCollectionTitleDiv>
            <TextCardDiv>
              {qna && qna.length === 0 ? (
                <NoPost category="qna" myPage={myPage} />
              ) : (
                qna &&
                qna.slice(0, 3).map((thisPost) => {
                  return (
                    <TextCard
                      key={"qna" + thisPost.id}
                      postObj={thisPost}
                      noWriter={true}
                    />
                  );
                })
              )}
            </TextCardDiv>
          </PostCollection>
          {user && +user.userType === 0 ? (
            <PostCollection>
              <PostCollectionTitleDiv>
                <CategoryTitle>{user.nickname}님의 견적</CategoryTitle>
                <SeeMore
                  onClick={() => {
                    setCategory("reform");
                  }}
                >
                  더보기
                </SeeMore>
              </PostCollectionTitleDiv>
              <TextCardDiv>
                {reform && reform.length === 0 ? (
                  <NoPost category="reform" myPage={myPage} />
                ) : (
                  reform &&
                  reform.slice(0, 3).map((thisPost) => {
                    return (
                      <TextCard
                        key={"reform" + thisPost.id}
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
        </PostDiv>
      ) : (
        <PostDiv>
          <MarginDiv />
          {user !== null && +user.userType === 1
            ? category === "lookbook" && (
                <PostCollection>
                  <CategoryTitle>{user.nickname}님의 룩북</CategoryTitle>
                  <Grid>
                    {categoriedPosts && categoriedPosts.length === 0 ? (
                      <NoPost category="lookbook" myPage={myPage} />
                    ) : (
                      categoriedPosts &&
                      categoriedPosts.map((thisPost) => {
                        return (
                          <CardB
                            key={"lookbook" + thisPost.id}
                            postObj={thisPost}
                          />
                        );
                      })
                    )}
                  </Grid>
                </PostCollection>
              )
            : null}
          {category === "review" && (
            <PostCollection>
              <CategoryTitle>
                {user === null ? null : user.nickname}님이 쓴 후기
              </CategoryTitle>
              <Grid>
                {categoriedPosts && categoriedPosts.length === 0 ? (
                  <NoPost category="review" myPage={myPage} />
                ) : (
                  categoriedPosts &&
                  categoriedPosts.map((thisPost) => {
                    return (
                      <CardA
                        key={"review" + thisPost.id}
                        postObj={thisPost}
                        type="A"
                      />
                    );
                  })
                )}
              </Grid>
            </PostCollection>
          )}
          {category === "qna" && (
            <PostCollection>
              <CategoryTitle>
                {user === null ? null : user.nickname}님의 질문과 답변
              </CategoryTitle>
              <TextCardDiv>
                {categoriedPosts && categoriedPosts.length === 0 ? (
                  <NoPost category="qna" myPage={myPage} />
                ) : (
                  categoriedPosts &&
                  category === "qna" &&
                  categoriedPosts.map((thisPost) => {
                    return (
                      <TextCard
                        key={"qna" + thisPost.id}
                        postObj={thisPost}
                        noWriter={true}
                      />
                    );
                  })
                )}
              </TextCardDiv>
            </PostCollection>
          )}
          {user !== null && +user.userType === 0
            ? category === "reform" && (
                <PostCollection>
                  <CategoryTitle>{user.nickname}님의 견적</CategoryTitle>
                  <TextCardDiv>
                    {categoriedPosts && categoriedPosts.length === 0 ? (
                      <NoPost category="reform" myPage={myPage} />
                    ) : (
                      categoriedPosts &&
                      category === "reform" &&
                      categoriedPosts.map((thisPost) => {
                        return (
                          <TextCard
                            key={"reform" + thisPost.id}
                            postObj={thisPost}
                            noWriter={true}
                            reform={true}
                          />
                        );
                      })
                    )}
                  </TextCardDiv>
                </PostCollection>
              )
            : null}
        </PostDiv>
      )}
    </UserPostDiv>
  );
};

const UserPostDiv = styled.div`
  margin-top: 30px;
  width: 100%;
  display: flex;
  flex-direction: column;
  @media ${({ theme }) => theme.device.mobile} {
    margin-top: 0px;
    margin-left: 37px;
    width: calc(90vw - 200px);
  }
  @media all and (min-width: 768px) and (max-width: 1000px) {
    margin-top: 0px;
    margin-left: 37px;
    width: 100%;
  }
`;

const UserCategoryBtn = styled(SubBtn)`
  margin-right: 10px;
  @media ${({ theme }) => theme.device.mobile} {
    margin-right: 20px;
  }
  @media all and (min-width: 768px) and (max-width: 1000px) {
    padding: 20px 30px;
    margin-top: 30px;
  }
`;

const PostCollection = styled.div`
  width: 100%;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const PostDiv = styled.div``;

const MarginDiv = styled.div`
  height: 49px;
`;

const TextCardDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 20px;
`;

const PostCollectionTitleDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 49px;
`;

const CategoryTitle = styled.span`
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSizes.l};
  line-height: 24px;
`;

const SeeMore = styled.span`
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSizes.m};
  line-height: 24px;
  color: ${({ theme }) => theme.colors.red};
  margin-left: auto;
  cursor: pointer;
`;

const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr;
  margin: 20px auto;
  @media all and (min-width: 850px) {
    grid-gap: 20px;
    grid-template-columns: 1fr 1fr;
  }
  @media all and (min-width: 1000px) {
    grid-gap: 40px;
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

export default UserPost;
