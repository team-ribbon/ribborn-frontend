import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import { getTechIntroDB, postDB } from "../redux/modules/post";
import { resetFile } from "../redux/modules/image";
import CategorySelect from "../components/CategorySelect";

import ImageUpload from "../components/ImageUpload";
import RegionSelect from "../components/RegionSelect";
import { ThinArrowSVG, WriteGuideSVG } from "../elements/SVG";
import { HelpText, Input, InputTitle } from "../elements/Inputs";
import { Textarea } from "../elements/Textarea";
import { writeGuide } from "../shared/writeGuide";
import Categories from "../shared/Categories";

// 게시물 작성 페이지
const WritePost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const titleRef = useRef();
  const contentRef = useRef();
  const introRef = useRef();

  const { type } = useParams();
  const files = useSelector((state) => state.image.fileList);
  const intro = useSelector((state) => state.post.techIntro);
  const isLogin = useSelector((state) => state.user.isLogin);

  const [title, setTitle] = useState("");
  const [introduction, setIntroduction] = useState(intro);
  const [category, setCategory] = useState(0);
  const [region, setRegion] = useState(0);
  const [isGuideOn, setIsGuideOn] = useState(true);

  const [error, setError] = useState({
    categoryError: null,
    regionError: null,
    titleError: null,
    fileError: null,
    contentError: null,
  });

  const { titleError, contentError } = error;

  const formData = new FormData();

  const onSubmit = async () => {
    if (+category === 0) {
      setError({ ...error, categoryError: "리폼 종류를 선택해주세요." });
      return false;
    }

    if (type === "reform" && +region === 0) {
      setError({ ...error, regionError: "지역을 선택해주세요." });
      return false;
    }

    if (type !== "lookbook" && title.length < 1) {
      setError({ ...error, titleError: "제목을 입력해주세요." });
      titleRef.current.focus();
      return false;
    }

    if (contentRef.current.value.length < 1) {
      setError({ ...error, contentError: "내용을 입력해주세요." });
      contentRef.current.focus();
      return false;
    }

    if ((type === "review" || type === "lookbook") && files.length < 1) {
      setError({ ...error, fileError: "사진을 선택해주세요." });
      return false;
    }

    files.forEach((file) => {
      formData.append("file", file);
    });

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
    if (error.titleError) {
      setError({ ...error, titleError: null });
    }
  };
  const onChangeIntro = (event) => {
    setIntroduction(event.target.value);
  };

  useEffect(() => {
    dispatch(getTechIntroDB());
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
        <SelectDiv>
          <CategorySelect
            write
            setCategory={setCategory}
            category={category}
            setError={setError}
            error={error}
            defaultValue="리폼 종류"
            optionList={Categories}
          />
          {type === "reform" && (
            <RegionSelect
              write={true}
              setRegion={setRegion}
              region={region}
              setError={setError}
              error={error}
            />
          )}
        </SelectDiv>
        <Guide>
          <GuideTitleDiv onClick={() => setIsGuideOn((prev) => !prev)}>
            <div>
              <WriteGuideSVG />
              <GuideTitle>{writeGuide[type].title}</GuideTitle>
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
              {writeGuide[type].content.map((v, i) => {
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
              maxLength="100"
              placeholder="브랜드 또는 디자이너에 대한 간단한 소개를 적어주세요."
              onChange={onChangeIntro}
              ref={introRef}
              hasCount
            />
            <IntroLength>{introduction?.length}/100</IntroLength>
          </InputWrap>
        )}
        {type !== "lookbook" && (
          <>
            <InputWrap>
              <InputTitle>제목</InputTitle>
              <Input
                name="title"
                placeholder="제목을 입력해주세요"
                maxLength="30"
                onChange={onChangeTitle}
                ref={titleRef}
                invalid={titleError}
                hasCount
              />
              <TitleLength>{title.length}/30</TitleLength>
            </InputWrap>
            {titleError && <ErrorMessage>{titleError}</ErrorMessage>}
          </>
        )}
        <InputWrap>
          <ImageUpload type={type} error={error} setError={setError} />
        </InputWrap>
        <InputWrap>
          <InputTitle>내용</InputTitle>
          <Textarea
            name="content"
            placeholder="여기에 내용을 적어주세요."
            ref={contentRef}
            maxLength="1000"
            height="400px"
            invalid={contentError}
            onChange={() => {
              if (error.contentError) {
                setError({ ...error, contentError: null });
              }
            }}
          />
        </InputWrap>
        {contentError && <ErrorMessage>{contentError}</ErrorMessage>}
        <SubmitBtnDiv>
          <SubmitBtn onClick={onSubmit} type="submit" value="발행" />
        </SubmitBtnDiv>
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
  background-color: ${({ theme }) => theme.colors.orange};
  font-size: ${({ theme }) => theme.fontSizes.l};
  cursor: pointer;
  margin: 50px 0 0 0;
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
const IntroLength = styled.span`
  position: absolute;
  right: 19px;
  top: 45px;
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSizes.l};
  line-height: 24px;
  color: #afb0b3;
  @media screen and (max-width: ${({ theme }) => theme.deviceSizes.mobile}) {
    top: 40px;
    font-size: ${({ theme }) => theme.fontSizes.m};
  }
`;
const InputWrap = styled.div`
  position: relative;
  margin-top: 30px;
`;
const TitleLength = styled.span`
  position: absolute;
  right: 19px;
  top: 45px;
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSizes.l};
  line-height: 24px;
  color: #afb0b3;
  background-color: #fff;
  @media screen and (max-width: ${({ theme }) => theme.deviceSizes.mobile}) {
    top: 40px;
    font-size: ${({ theme }) => theme.fontSizes.m};
  }
`;
const ErrorMessage = styled(HelpText)`
  margin-bottom: 10px;
  margin-left: 5px;
`;

export default WritePost;
