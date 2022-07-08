import styled from "styled-components";

const PostDetail = () => {
  return (
    <CenterPostDiv>
      <p>사진 후기</p>
      <p>제목입니당</p>
      <IDDiv>
        <p>ID 나는야 라채채</p>
        <p>1일 전</p>
      </IDDiv>
      <TagDiv>
        <BoxDiv />
        <p>옷 리폼</p>
      </TagDiv>
      <Image
        alt="card"
        src="https://cdn.imweb.me/upload/S20210826c6fa6a96dcb7a/e66c8a02c98ec.png"
      />
      <TextArea>
        저는 블라블라 이런 내용이 들어가요 저는 블라블라 이런 내용이 들어가요
        저는 블라블라 이런 내용이 들어가요 저는 블라블라 이런 내용이 들어가요
        저는 블라블라 이런 내용이 들어가요 저는 블라블라 이런 내용이 들어가요
        저는 블라블라 이런 내용이 들어가요 저는 블라블라 이런 내용이 들어가요
        저는 블라블라 이런 내용이 들어가요 저는 블라블라 이런 내용이 들어가요
        저는 블라블라 이런 내용이 들어가요저는 블라블라 이런 내용이
        들어가요(본문 내용)
      </TextArea>
      <Image
        alt="card"
        src="https://cdn.imweb.me/upload/S20210826c6fa6a96dcb7a/e66c8a02c98ec.png"
      />
      <Image
        alt="card"
        src="https://cdn.imweb.me/upload/S20210826c6fa6a96dcb7a/e66c8a02c98ec.png"
      />
    </CenterPostDiv>
  );
};

const CenterPostDiv = styled.div`
  width: 400px;
  margin-left: calc(50vw - 200px);
`;

const IDDiv = styled.div`
  display: flex;
  gap: 30px;
`;

const TagDiv = styled.div`
  display: flex;
  gap: 10px;
`;

const BoxDiv = styled.div`
  width: 20px;
  height: 20px;
  background-color: #ccc;
`;

const Image = styled.img`
  width: 400px;
  object-fit: cover;
  margin: 20px auto;
`;

const TextArea = styled.div`
  padding: 50px;
  border: 1px solid #ccc;
  width: 100%;
  height: auto;
  resize: none;
  overflow: hidden;
`;

export default PostDetail;
