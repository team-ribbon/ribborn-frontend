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
            <ID onClick={() => navigate(`/userdetail/${post.userid}`)}>
              @{post.nickname}
            </ID>
            <CircleDiv />
            <Time>{TimeCalculator(post.createAt)}</Time>
            {userId === post.userid ? (
              <MyPostButtons postType={qna ? "qna" : "review"} id={post.id} />
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
          <TextArea noImage={post.image[0] === null}>{post.content}</TextArea>
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
        </RightPostDiv>
      </PostWrap>
    )
  );
};

const PostWrap = styled.div`
  max-width: ${({ theme }) => theme.width.maxWidth};
  display: grid;
  grid-template-columns: 1fr 700px 1fr;
  margin: 0 auto;
`;

const LeftPostDiv = styled.div`
  min-width: 60px;
`;

const CenterPostDiv = styled.div`
  margin-top: 60px;
  width: 700px;
`;

const RightPostDiv = styled.div`
  position: relative;
  min-width: 60px;
`;

const Navbar = styled.div`
  position: absolute;
  top: 100px;
  width: 100%;
`;

const Community = styled.p`
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  color: #222222;
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
`;

const ID = styled.p`
  font-weight: 400;
  font-size: 14px;
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
  font-size: 14px;
  line-height: 18px;
  color: #afb0b3;
  margin-right: 34px;
`;

const TagDiv = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 30px;
`;

const Tag = styled.div`
  font-weight: 700;
  padding: 8px 15px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.lighterGray};
`;

const Category = styled.button`
  font-weight: 700;
  font-size: 11px;
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
  width: 100%;
  height: auto;
  resize: none;
  overflow: hidden;
  font-weight: 400;
  font-size: 18px;
  line-height: 28px;
  margin-top: ${(props) => (props.noImage ? "30px" : "")};
`;

export default PostDetail;
