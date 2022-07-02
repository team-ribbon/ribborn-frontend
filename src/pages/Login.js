import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { loginDB } from "../redux/modules/user";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onValid = (loginObj) => {
    dispatch(loginDB(loginObj.username, loginObj.password)).then((result) => {
      if (!result) {
        setError("loginFail", {
          message: "이메일 또는 비밀번호를 잘못 입력했습니다.",
        });
        return false;
      }
      navigate("/");
    });
    // console.log(loginObj);
  };
  return (
    <Wrap>
      <img
        alt="logo"
        height="200"
        src="https://avatars.githubusercontent.com/u/108117705?s=400&u=958d4ffea3ccaa38263d41a4f76cd00b48a47804&v=4"
      />
      <Form onSubmit={handleSubmit(onValid)}>
        <span>이메일</span>
        <input
          {...register("username", {
            required: "이메일을 입력해주세요.",
          })}
          autoComplete="off"
        />
        <span>{errors?.username?.message}</span>
        <span>비밀번호</span>
        <input
          {...register("password", {
            required: "비밀번호를 입력해주세요.",
          })}
          type="password"
        />
        <span>{errors?.password?.message}</span>
        <span>{errors?.loginFail?.message}</span>
        <button>로그인</button>
      </Form>
      <Link to="/signup/user">이메일 가입</Link>
    </Wrap>
  );
};
const Wrap = styled.div`
  width: 400px;
  margin: 50px auto;
  img {
    margin: 0 30%;
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
export default Login;
