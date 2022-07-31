import styled from "styled-components";
import MyPostButtons from "./MyPostButtons";
import Categories from "../shared/Categories";
import TimeCalculator from "../shared/TimeCalculator";
import { TagTextColor } from "../elements/TagTextColor";
import { useNavigate } from "react-router-dom";
import PostRightBtn from "./PostRightBtn";
import React from "react";

const PostDetail = ({ qna, post, userId, postId }) => {
  const scrollEvent = () => {
    document.getElementById("navbar").style.top =
      window.pageYOffset + 100 + "px";
  };
  React.useEffect(() => {
    window.addEventListener("scroll", scrollEvent);
    return () => {
      window.removeEventListener("scroll", scrollEvent);
    };
  }, []);

  const navigate = useNavigate();
  return (
    post && (
      <PostWrap>
        <LeftPostDiv />
        <CenterPostDiv>
          <Community>{qna ? "질문과 답변" : "리폼 후기"}</Community>
          <Title>{post.title}</Title>
          <IDDiv>
            <RowDiv>
              <ID onClick={() => navigate(`/userdetail/${post.userid}`)}>
                @{post.nickname}
              </ID>
              <CircleDiv />
              <Time>{TimeCalculator(post.createAt)}</Time>
            </RowDiv>
            {userId === post.userid ? (
              <RowDiv>
                <MyPostButtons
                  postType={qna ? "qna" : "review"}
                  id={post.userid}
                  postId={post.id}
                />
              </RowDiv>
            ) : null}
          </IDDiv>
          <TagDiv>
            {qna ? (
              Categories.map((v) => {
                return v.value === post.category ? (
                  <Category key={"category" + v.value}>{v.text}</Category>
                ) : null;
              })
            ) : (
              <Tag>
                <TagTextColor>{post.category.toUpperCase()}</TagTextColor>
              </Tag>
            )}
          </TagDiv>
          {post.image[0] !== null ? (
            <Image alt="card" src={post.image[0]} />
          ) : null}
          <TextArea noImage={post.image[0] === null}>
            {post.content.split("\n").map((line) => {
              return (
                <span>
                  {line}
                  <br />
                </span>
              );
            })}
          </TextArea>
          {post.image.map((v, i) => {
            return i !== 0 ? <Image alt="card" src={v} /> : null;
          })}
        </CenterPostDiv>
        <RightPostDiv>
          <Navbar id="navbar">
            <PostRightBtn
              noshare={false}
              id={postId}
              liked={post && post.liked}
              likeCount={post && post.likeCount}
            />
          </Navbar>
          <MobileNavbar>
            <PostRightBtn
              noshare={false}
              id={postId}
              liked={post && post.liked}
              likeCount={post && post.likeCount}
            />
          </MobileNavbar>
        </RightPostDiv>
      </PostWrap>
    )
  );
};

const PostWrap = styled.div`
  max-width: ${({ theme }) => theme.width.maxWidth};
  margin: 0 auto;
  @media ${({ theme }) => theme.device.mobile} and (max-width: 850px) {
    display: grid;
    grid-template-columns: 1fr calc(100vw - 150px) 1fr;
  }
  @media all and (min-width: 850px) {
    display: grid;
    grid-template-columns: 1fr 700px 1fr;
  }
`;

const LeftPostDiv = styled.div`
  @media ${({ theme }) => theme.device.mobile} {
    min-width: 60px;
  }
`;

const CenterPostDiv = styled.div`
  text-align: center;
  margin-top: 60px;
  width: 100%;
  @media ${({ theme }) => theme.device.mobile} and (max-width: 850px) {
    width: calc(100vw - 150px);
    text-align: left;
  }
  @media all and (min-width: 850px) {
    width: 700px;
    text-align: left;
  }
`;

const RightPostDiv = styled.div`
  z-index: 2;
  @media ${({ theme }) => theme.device.mobile} {
    position: relative;
    min-width: 60px;
  }
`;

const Navbar = styled.div`
  height: fit-content;
  position: absolute;
  display: none;
  @media ${({ theme }) => theme.device.mobile} {
    display: initial;
    top: 100px;
    right: 0px;
    width: 100%;
  }
`;

const MobileNavbar = styled.div`
  height: fit-content;
  position: fixed;
  right: 16px;
  bottom: 30%;
  z-index: 2;
  @media ${({ theme }) => theme.device.mobile} {
    display: none;
  }
`;

const Community = styled.p`
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.l};
  line-height: 24px;
  color: #222222;
  margin-bottom: 16px;
`;

const Title = styled.p`
  font-weight: 700;
  font-size: 27px;
  line-height: 36px;
  color: #222222;
`;

const IDDiv = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 16px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  @media ${({ theme }) => theme.device.mobile} {
    justify-content: left;
    flex-direction: row;
  }
`;

const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

const ID = styled.p`
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.m};
  line-height: 18px;
  color: #afb0b3;
  cursor: pointer;
`;

const CircleDiv = styled.div`
  background-color: #afb0b3;
  width: 6px;
  height: 6px;
  border-radius: 6px;
`;

const Time = styled.p`
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.m};
  line-height: 18px;
  color: #afb0b3;
  @media ${({ theme }) => theme.device.mobile} {
    margin-right: 34px;
  }
`;

const TagDiv = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 30px;
  justify-content: center;
  @media ${({ theme }) => theme.device.mobile} {
    justify-content: left;
  }
`;

const Tag = styled.div`
  font-weight: 700;
  padding: 8px 15px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.lighterGray};
`;

const Category = styled.button`
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSizes.s};
  line-height: 14px;
  height: 29px;
  width: 77px;
  background-color: #fafafa;
  border: none;
  border-radius: 8px;
`;

const Image = styled.img`
  width: 100%;
  object-fit: cover;
  margin: 50px auto;
`;

const TextArea = styled.div`
  border: none;
  width: calc(100% - 32px);
  margin: ${(props) => (props.noImage ? "30px auto" : "0 auto")};
  height: auto;
  resize: none;
  overflow: hidden;
  text-align: left;
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.l};
  line-height: 28px;
  @media ${({ theme }) => theme.device.mobile} {
    width: 100%;
  }
`;

export default PostDetail;
