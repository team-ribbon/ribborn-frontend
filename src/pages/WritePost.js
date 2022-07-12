import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import { getTechIntroDB, postDB } from "../modules/post";
import { resetFile } from "../redux/modules/image";

import ImageUpload from "../components/ImageUpload";

const WritePost = () => {
  const info = {
    review: {
      title: "사진 후기 게시물 작성 가이드",
      content: "간단한 자기소개 후...",
    },
    lookbook: {
      title: "룩북 게시물 작성 가이드",
      content: "룩북의 이미지는 최대한...",
    },
    reform: {
      title: "리폼 견적 게시물 작성 가이드",
      content: "간단한 자기소개 후...",
    },
    qna: {
      title: "질문과 답변 게시물 작성 가이드",
      content: "궁금한 내용을 상세히...",
    },
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categoryRef = useRef();
  const regionRef = useRef();
  const titleRef = useRef();
  const contentRef = useRef();
  const introRef = useRef();

  const files = useSelector((state) => state.image.fileList);
  const intro = useSelector((state) => state.post.techIntro);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [introduction, setIntroduction] = useState(intro);

  const { type } = useParams();
  const { id } = useParams();

  const onSubmit = (event) => {
    event.preventDefault();

    if (+categoryRef.current.value === 0) {
      alert("리폼 종류 없음");
      return false;
    }

    if (type === "reform" && +regionRef.current.value === 0) {
      alert("지역 없음");
      return false;
    }

    if (title.length < 1) {
      alert("제목 없음");
      return false;
    }

    if (content.length < 1) {
      alert("내용 없음");
      return false;
    }

    if ((type === "review" || type === "lookbook") && files.length < 1) {
      alert("사진 없음");
      return false;
    }

    // 1번 방법 => api 설계서와 동일하게 보내기
    // const formData = new FormData(event.target);
    // formData.append("postCategory", type);

    // files.forEach((file) => {
    //   formData.append("image", file);
    // });
    // console.log(formData.getAll("image"));

    // 2번 방법 => file, key로 나눠서 보내기
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("file", file);
    });

    let key = {
      category: categoryRef.current.value,
      title: titleRef.current.value,
      content: contentRef.current.value,
    };

    if (type === "reform") {
      key = { ...key, region: regionRef.current.value };
    }
    formData.append("key", JSON.stringify(key));

    // formdata 확인하기
    // console.log(formData.getAll("file"));
    // for (let key of formData.keys()) {
    //   console.log(key, ":", formData.get(key));
    // }
    // for (let v of formData.values()) console.log(v);

    dispatch(postDB(formData, type)).then(() => {
      dispatch(resetFile());
      // navigate("/" + type);
    });
  };

  const onChangeTitle = (event) => {
    setTitle(event.target.value);
    if (title.length > 14) {
      return setTitle((prev) => prev.substring(0, 15));
    }
  };
  const onChangeContent = (event) => {
    setContent(event.target.value);
  };
  const onChangeIntro = (event) => {
    setIntroduction(event.target.value);
    if (content.length > 99) {
      return setIntroduction((prev) => prev.substring(0, 100));
    }
  };

  useEffect(() => {
    // dispatch(getTechIntroDB());
  }, []);
  return (
    <Wrap>
      <Form onSubmit={onSubmit}>
        <FormWrap>
          <SubmitBtnDiv>
            <SubmitBtn type="submit" value="발행" />
          </SubmitBtnDiv>
          <select name="category" defaultValue={0} ref={categoryRef}>
            <option value={0} disabled>
              리폼 종류
            </option>
            <option value="clothes">옷</option>
            <option value="furniture">가구</option>
            <option value="bags">가방</option>
            <option value="shoes">신발</option>
            <option value="goods">기타</option>
          </select>
          {type === "reform" && (
            <select name="region" defaultValue={0} ref={regionRef}>
              <option value={0} disabled>
                지역
              </option>
              <option value="gyeonggi">경기권</option>
              <option value="gangwon">강원도</option>
              <option value="chungcheong">충청권</option>
              <option value="jeolla">전라권</option>
              <option value="gyeongsang">경상권</option>
            </select>
          )}
          <div>{info[type].title}</div>
          <div>{info[type].content}</div>
          {type === "lookbook" && (
            <>
              <textarea
                name="introduction"
                placeholder="브랜드 또는 디자이너에 대한 간단한 소개를 적어주세요."
                value={introduction}
                onChange={onChangeIntro}
                ref={introRef}
              />
              <span>{content.length}/100</span>
            </>
          )}
          <TitleDiv>
            <TitleSpan>제목</TitleSpan>
            <TitleInput
              name="title"
              placeholder="제목을 입력해주세요"
              value={title}
              onChange={onChangeTitle}
              ref={titleRef}
            />
            <TitleLength>{title.length}/15</TitleLength>
          </TitleDiv>
          <TitleSpan>내용</TitleSpan>
          <TextArea
            name="content"
            placeholder="여기에 내용을 적어주세요"
            value={content}
            onChange={onChangeContent}
            ref={contentRef}
          />
          <ImageUpload type={type} />
        </FormWrap>
      </Form>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: ${({ theme }) => theme.width.maxWidth};
  margin: 24px auto;
`;

const Form = styled.form`
  width: 100%;
`;

const FormWrap = styled.div`
  width: 700px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const SubmitBtnDiv = styled.div``;

const SubmitBtn = styled.input`
  margin-left: 530px;
  border-radius: 15px;
  padding: 25px 60px;
  width: 170px;
  height: 74px;
  border: none;
  color: #fff;
  margin-bottom: 100px;
  background-color: ${({ theme }) => theme.colors.orange};
  font-size: ${({ theme }) => theme.fontSizes.l};
  cursor: pointer;
`;

const TitleDiv = styled.div`
  position: relative;
`;

const TitleSpan = styled.span`
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.l};
  line-height: 24px;
  color: #afb0b3;
`;

const TitleInput = styled.input`
  padding-left: 20px;
  border: 1px solid #afb0b3;
  border-radius: 15px;
  width: 700px;
  height: 84px;
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.l};
  line-height: 24px;
`;

const TitleLength = styled.span`
  position: absolute;
  right: 19px;
  top: 56px;
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSizes.l};
  line-height: 24px;
  color: #afb0b3;
`;

const TextArea = styled.textarea`
  padding: 30px 20px;
  width: 700px;
  height: 761px;
  border: 1px solid #afb0b3;
  border-radius: 15px;
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.l};
  line-height: 24px;
`;

export default WritePost;
