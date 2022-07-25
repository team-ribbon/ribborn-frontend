import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import { getTechIntroDB, postDB } from "../redux/modules/post";
import { resetFile } from "../redux/modules/image";
import CategorySelect from "../components/CategorySelect";

import ImageUpload from "../components/ImageUpload";
import RegionSelect from "../components/RegionSelect";
import React from "react";
import { ThinArrowSVG, WriteGuideSVG } from "../elements/SVG";
import { Input, InputTitle } from "../elements/Inputs";
import { Textarea } from "../elements/Textarea";

const WritePost = () => {
  const info = {
    review: {
      title: "리폼 후기 게시물 작성 가이드",
      content: [
        "간단한 자기소개 후 디자이너의 작품을 소개해주세요.",
        "사진 속 작품 정보를 본문에 최대한 적어주세요.",
        "사진 첨부 시 용량은 장당 최대 20MB까지 업로드할 수 있고, png, jpg, jpeg, webp 포맷을 지원해요.",
        "정보를 많이 입력할수록 검색 결과에 많이 노출되어 조회수가 올라가요.",
        "글 작성과 이미지 업로드 시, 타인의 지식재산권을 침해하지 않도록 유의해주세요.",
        "본문에 악의성 내용이 포함되어있으면 안내없이 해당 글이 관리자에 의해 삭제될 수 있어요.",
      ],
    },
    lookbook: {
      title: "룩북 게시물 작성 가이드",
      content: [
        "사진 가이드",
        "- 작품이 한 눈에 잘 보이는 풀샷으로 찍어주세요.",
        "- 수직/수평이 잘 맞게 작품을 찍어주세요.",
        "- 필터 효과보단 선명하고 자연스러운 사진으로 찍어주세요.",
        "- 다양한 각도로 작품을 보여주면, 디자이너님의 작품을 더욱 잘 이해할 수 있어요.",
        "사진 속 작품 정보를 본문에 최대한 적어주세요.",
        "사진 첨부 시 용량은 장당 최대 20MB까지 업로드할 수 있고, png, jpg, jpeg, webp 포맷을 지원해요.",
        "글 작성과 이미지 업로드 시, 타인의 지식재산권을 침해하지 않도록 유의해주세요.",
        "본문에 악의성 내용이 포함되어있으면 안내없이 해당 글이 관리자에 의해 삭제될 수 있어요.",
      ],
    },
    reform: {
      title: "리폼 견적 게시물 작성 가이드",
      content: [
        "사진 속 상품 정보를 본문에 최대한 적어주세요 (재질, 사이즈, 애로 사항 등)",
        "사진 첨부 시 용량은 장당 최대 20MB까지 업로드할 수 있고, png, jpg, jpeg, webp 포맷을 지원해요.",
        "정보를 많이 입력할수록 검색 결과에 많이 노출되어 조회수가 올라가요.",
        "글 작성과 이미지 업로드 시, 타인의 지식재산권을 침해하지 않도록 유의해주세요.",
        "본문에 악의성 내용이 포함되어있으면 안내없이 해당 글이 관리자에 의해 삭제될 수 있어요.",
      ],
    },
    qna: {
      title: "질문과 답변 게시물 작성 가이드",
      content: [
        "궁금한 내용을 상세히 적어주세요.",
        "사진 첨부 시 용량은 장당 최대 20MB까지 업로드할 수 있고, png, jpg, jpeg, webp 포맷을 지원해요.",
        "정보를 많이 입력할수록 검색 결과에 많이 노출되어 조회수가 올라가요.",
        "글 작성과 이미지 업로드 시, 타인의 지식재산권을 침해하지 않도록 유의해주세요.",
        "본문에 악의성 내용이 포함되어있으면 안내없이 해당 글이 관리자에 의해 삭제될 수 있어요.",
      ],
    },
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const titleRef = useRef();
  const contentRef = useRef();
  const introRef = useRef();

  const files = useSelector((state) => state.image.fileList);
  const intro = useSelector((state) => state.post.techIntro);
  const isLogin = useSelector((state) => state.user.isLogin);

  const [title, setTitle] = useState("");
  const [introduction, setIntroduction] = useState(intro);
  const [category, setCategory] = useState(0);
  const [region, setRegion] = useState(0);
  const [isGuideOn, setIsGuideOn] = useState(true);

  const { type } = useParams();

  const formData = new FormData();

  const onSubmit = async () => {
    if (+category === 0) {
      alert("리폼 종류 없음");
      return false;
    }

    if (type === "reform" && +region === 0) {
      alert("지역 없음");
      return false;
    }

    if (type !== "lookbook" && title.length < 1) {
      alert("제목 없음");
      return false;
    }

    if (contentRef.current.value.length < 1) {
      alert("내용 없음");
      return false;
    }

    if ((type === "review" || type === "lookbook") && files.length < 1) {
      alert("사진 없음");
      return false;
    }

    files.forEach((file) => {
      formData.append("file", file);
    });
    console.log(files);

    let key = {
      postCategory: type,
      category: category,
      content: contentRef.current.value,
    };

    if (type === "reform") {
      key = { ...key, region: region, process: "before" };
    }
    if (type !== "lookbook") {
      key = { ...key, title: titleRef.current.value };
    }
    if (type === "lookbook") {
      key = { ...key, introduction: introRef.current.value };
    }

    formData.append(
      "key",
      new Blob([JSON.stringify(key)], { type: "application/json" })
    );

    await dispatch(postDB(formData, type)).then(() => {
      dispatch(resetFile());
      navigate("/complete");
    });
  };

  const onChangeTitle = (event) => {
    setTitle(event.target.value);
    if (title.length > 29) {
      return setTitle((prev) => prev.substring(0, 30));
    }
  };
  const onChangeIntro = (event) => {
    setIntroduction(event.target.value);
    if (introduction.length > 99) {
      return setIntroduction((prev) => prev.substring(0, 100));
    }
  };

  useEffect(() => {
    dispatch(getTechIntroDB());
  }, []);

  useEffect(() => {
    setIntroduction(intro);
  }, [intro]);

  useEffect(() => {
    return () => {
      dispatch(resetFile());
    };
  }, []);

  useEffect(() => {
    if (!isLogin) {
      navigate("/");
    }
  }, [isLogin]);

  return (
    <Wrap>
      <FormWrap>
        <SubmitBtnDiv>
          <SubmitBtn
            onClick={() => {
              onSubmit();
            }}
            type="submit"
            value="발행"
          />
        </SubmitBtnDiv>
        <SelectDiv>
          <CategorySelect
            write={true}
            setCategory={setCategory}
            category={category}
          />
          {type === "reform" && (
            <RegionSelect write={true} setRegion={setRegion} region={region} />
          )}
        </SelectDiv>
        <Guide>
          <GuideTitleDiv onClick={() => setIsGuideOn((prev) => !prev)}>
            <div>
              <WriteGuideSVG />
              <GuideTitle>{info[type].title}</GuideTitle>
              <GuideSubTitle>
                원활한 게시물 발행을 위해 꼭 읽어주세요!
              </GuideSubTitle>
            </div>
            <Arrow isGuideOn={isGuideOn}>
              <ThinArrowSVG />
            </Arrow>
          </GuideTitleDiv>
          {isGuideOn && (
            <GuideContentDiv>
              {info[type].content.map((v, i) => {
                return (
                  <div>
                    <GuideContent
                      indent={v.slice(0, 1) === "-"}
                      key={"guideContent" + i}
                    >
                      {v.slice(0, 1) === "-" ? v : "· " + v}
                    </GuideContent>
                  </div>
                );
              })}
            </GuideContentDiv>
          )}
        </Guide>
        {type === "lookbook" && (
          <InputWrap>
            <InputTitle>자기소개</InputTitle>
            <Input
              id="introduction"
              name="introduction"
              placeholder="브랜드 또는 디자이너에 대한 간단한 소개를 적어주세요."
              value={introduction}
              onChange={onChangeIntro}
              ref={introRef}
              hasCount
            />
            <IntroLength>{introduction && introduction.length}/100</IntroLength>
          </InputWrap>
        )}
        {type !== "lookbook" && (
          <InputWrap>
            <InputTitle>제목</InputTitle>
            <Input
              name="title"
              placeholder="제목을 입력해주세요"
              value={title}
              onChange={onChangeTitle}
              ref={titleRef}
            />
            <TitleLength>{title.length}/30</TitleLength>
          </InputWrap>
        )}
        <InputWrap>
          <ImageUpload type={type} />
        </InputWrap>
        <InputWrap>
          <InputTitle>내용</InputTitle>
          <Textarea
            name="content"
            placeholder="여기에 내용을 적어주세요."
            ref={contentRef}
            maxLength="1000"
            height="400px"
          />
        </InputWrap>
      </FormWrap>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: ${({ theme }) => theme.width.maxWidth};
  margin: 24px auto;
  @media all and (min-width: 1250px) {
    min-width: 1230px;
  }
`;

const FormWrap = styled.div`
  width: calc(100vw - 40px);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  @media ${({ theme }) => theme.device.mobile} {
    width: 700px;
  }
`;

const SubmitBtnDiv = styled.div`
  margin-left: auto;
  width: fit-content;
`;

const SubmitBtn = styled.input`
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

const SelectDiv = styled.div`
  display: flex;
  flex-direction: row;
`;
const Guide = styled.div`
  margin-bottom: 30px;
`;
const GuideTitleDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 24px auto 16px auto;
  padding-left: 20px;
  width: 100%;
  height: 76px;
  background: #f2f2f2;
  border-radius: 8px;
  cursor: pointer;
  div {
    display: flex;
    align-items: center;
    padding-right: 20px;
  }
`;

const GuideTitle = styled.span`
  word-break: keep-all;
  margin-left: 20px;
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.m};
  line-height: 20px;
  @media all and (min-width: 600px) {
    font-size: ${({ theme }) => theme.fontSizes.l};
    line-height: 24px;
  }
`;
const Arrow = styled.span`
  transform: ${({ isGuideOn }) =>
    isGuideOn ? "rotate(180deg)" : "rotate(0deg)"};
  margin-right: 20px;
`;

const GuideSubTitle = styled.span`
  word-break: keep-all;
  margin-left: 15px;
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.s};
  line-height: 15px;
  color: #afb0b3;
  @media all and (min-width: 600px) {
    font-size: ${({ theme }) => theme.fontSizes.m};
  }
`;
const GuideContentDiv = styled.div`
  width: 100%;
  background: #fafafa;
  border-radius: 8px;
  padding: 20px;
`;
const GuideContent = styled.span`
  word-break: keep-all;
  font-weight: 400;
  line-height: ${({ theme }) => theme.fontSizes.s};
  line-height: 22px;
  color: rgba(34, 34, 34, 0.7);
  margin-left: ${(props) => (props.indent ? "20px" : "")};
  @media all and (min-width: 600px) {
    font-size: ${({ theme }) => theme.fontSizes.m};
    line-height: 28px;
  }
`;
const IntroDiv = styled.div`
  position: relative;
`;
const IntroTextArea = styled.textarea`
  padding: 30px 20px;
  width: 100%;
  height: 208px;
  border: 1px solid #afb0b3;
  border-radius: 15px;
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.l};
  line-height: 24px;
  resize: none;
`;
const IntroLength = styled.span`
  position: absolute;
  right: 19px;
  bottom: 25px;
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSizes.l};
  line-height: 24px;
  color: #afb0b3;
`;
const InputWrap = styled.div`
  position: relative;
  margin-top: 30px;
`;
const TitleLength = styled.span`
  position: absolute;
  right: 19px;
  top: 56px;
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSizes.l};
  line-height: 24px;
  color: #afb0b3;
  background-color: #fff;
`;

export default WritePost;
