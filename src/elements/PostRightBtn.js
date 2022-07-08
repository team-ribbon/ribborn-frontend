import styled from "styled-components";
import { HiOutlineShare, HiOutlineHeart } from "react-icons/hi";

const PostRightBtn = () => {
  return (
    <Cover>
      <Button>
        <HiOutlineShare size="28" />
      </Button>
      <Button>
        <HiOutlineHeart size="24" />
        <p>56</p>
      </Button>
    </Cover>
  );
};

const Cover = styled.div`
  position: absolute;
  top: 50%;
  right: 100px;
`;

const Button = styled.div`
  background-color: #ddd;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

export default PostRightBtn;
