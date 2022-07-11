import styled from "styled-components";
import { HiOutlineShare, HiOutlineHeart } from "react-icons/hi";

const PostRightBtn = () => {
  return (
    <Cover>
      <Button>
        <HiOutlineHeart size="26" />
      </Button>
      <p>56</p>
      <HR />
      <Button>
        <HiOutlineShare size="28" />
      </Button>
    </Cover>
  );
};

const Cover = styled.div`
  position: absolute;
  top: 50%;
  right: 200px;
  text-align: center;
`;

const Button = styled.div`
  background-color: rgba(242, 242, 242, 1);
  width: 60px;
  height: 60px;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
`;

const HR = styled.hr`
  width: 33px;
  border-top: 1px solid rgba(175, 176, 178, 1);
  border-bottom: none;
  border-left: none;
  border-right: none;
  margin: 30px auto 30px auto;
`;

export default PostRightBtn;
