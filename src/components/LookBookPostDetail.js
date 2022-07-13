import styled from "styled-components";
import MyPostButtons from "./MyPostButtons";
import TimeCalculator from "../shared/TimeCalculator";
import InfoSection from "./InfoSection";
import { MainBtn } from "../elements/Buttons";

const LookBookPostDetail = ({ post, userId }) => {
  return (
    post && (
      <Wrap>
        <HeaderWrap>
          <TitleWrap>
            <Title weight={700}>{post.nickname}</Title>
            <Title weight={400}>님의 작업</Title>
          </TitleWrap>
          <Date>
            {post.createAt &&
              (+post.createAt.slice(11, 13) >= 15
                ? post.createAt.slice(0, 8) + (+post.createAt.slice(8, 10) + 1)
                : post.createAt.slice(0, 10))}
          </Date>
          <MyButtonsWrap>
            {userId === post.userid ? (
              <MyPostButtons postType="lookbook" id={post.id} />
            ) : null}
          </MyButtonsWrap>
        </HeaderWrap>
        <BodyWrap>
          <LeftPostDiv />
          <CenterPostDiv>
            <Image
              first={true}
              alt="card"
              src={
                post.image[0] !== null
                  ? post.image[0]
                  : "http://openimage.interpark.com/goods_image_big/1/4/1/9/9090461419_l.jpg"
              }
            />
            <TextArea noImage={post.image[0] === null}>{post.content}</TextArea>
            <Grid>
              {post.image.map((v, i) => {
                return i !== 0 ? <Image alt="card" src={v} /> : null;
              })}
            </Grid>
          </CenterPostDiv>
          <RightPostDiv>
            <InfoSection
              reform={false}
              region={post.addressCategory}
              category={post.category}
            />
            <ChattingBtn>채팅하기</ChattingBtn>
          </RightPostDiv>
        </BodyWrap>
      </Wrap>
    )
  );
};

const Wrap = styled.div`
  margin-top: 60px;
`;

const HeaderWrap = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
`;

const Community = styled.p`
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  color: #222222;
`;

const TitleWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Title = styled.p`
  font-weight: ${(props) => props.weight};
  font-size: 45px;
  line-height: 60px;
  margin-left: ${(props) => (props.weight === 400 ? "10px" : 0)}; ;
`;

const Date = styled.span`
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.l};
  line-height: 24px;
  margin-top: 16px;
`;

const ChattingBtn = styled(MainBtn)`
  margin: 30px 0 0 16px;
  width: 314px;
`;

const BodyWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const LeftPostDiv = styled.div`
  width: 314px;
`;

const RightPostDiv = styled.div``;

const MyButtonsWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 16px;
  margin-top: 30px;
`;

const CenterPostDiv = styled.div`
  width: 700px;
  text-align: center;
`;

const Image = styled.img`
  width: 100%;
  object-fit: cover;
  margin: ${(props) => (props.first ? "0" : "50px 0")};
`;

const Grid = styled.div`
  display: grid;
  grid-gap: 40px;
  grid-template-columns: 1fr 1fr;
  margin: 20px 0;
`;

const TextArea = styled.div`
  border: none;
  width: 100%;
  height: auto;
  padding: 40px 20px;
  resize: none;
  overflow: hidden;
  font-weight: 400;
  font-size: 18px;
  line-height: 28px;
  background-color: #222;
  color: #fff;
`;

export default LookBookPostDetail;
