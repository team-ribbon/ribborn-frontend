import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import {
  EditPostDB,
  getReviewPostDB,
  getQnAPostDB,
  getReformPostDB,
  getLookbookPostDB,
} from "../redux/modules/post";
import { resetFile, uploadPreview } from "../redux/modules/image";
import CategorySelect from "../components/CategorySelect";

import ImageUpload from "../components/ImageUpload";
import RegionSelect from "../components/RegionSelect";
import React from "react";

const EditPost = () => {
  const info = {
    review: {
      title: "리폼 후기 게시물 작성 가이드",
      content: [
        "간단한 자기 소개 후 디자이너의 작품을 소개해주세요",
        "사진 속 제품 정보를 본문에 최대한 적어주세요",
        "사진 첨부 시 용량은 장당 최대 20MB까지 업로드할 수 있고, png, jpg, jpeg, webp 포맷을 지원해요",
        "정보를 많이 입력할수록 검색 결과에 많이 노출되어 조회수가 올라가요",
        "글 작성과 이미지 업로드 시, 타인의 지식재산권을 침해하지 않도록 유의해주세요",
        "본문에 악의성 내용이 포함되어있으면 안내없이 해당 글이 관리자에 의해 삭제될 수 있어요",
      ],
    },
    lookbook: {
      title: "룩북 게시물 작성 가이드",
      content: [
        "사진 가이드",
        "- 작품이 한 눈에 잘 보이는 풀샷으로 찍어주세요",
        "- 수직/수평이 잘 맞게 작품을 찍어주세요",
        "- 필터 효과보단 선명하고 자연스러운 사진으로 찍어주세요",
        "- 다양한 각도로 작품을 보여주면, 디자이너님의 작품을 더욱 잘 이해할 수 있어요",
        "사진 속 제품 정보를 본문에 최대한 적어주세요",
        "사진 첨부 시 용량은 장당 최대 20MB까지 업로드할 수 있고, png, jpg, jpeg, webp 포맷을 지원해요",
        "글 작성과 이미지 업로드 시, 타인의 지식재산권을 침해하지 않도록 유의해주세요",
        "본문에 악의성 내용이 포함되어있으면 안내없이 해당 글이 관리자에 의해 삭제될 수 있어요",
      ],
    },
    reform: {
      title: "리폼 견적 게시물 작성 가이드",
      content: [
        "사진 속 제품 정보를 본문에 최대한 적어주세요 (재질, 사이즈, 에로사항 등)",
        "사진 첨부 시 용량은 장당 최대 20MB까지 업로드할 수 있고, png, jpg, jpeg, webp 포맷을 지원해요",
        "정보를 많이 입력할수록 검색 결과에 많이 노출되어 조회수가 올라가요",
        "글 작성과 이미지 업로드 시, 타인의 지식재산권을 침해하지 않도록 유의해주세요",
        "본문에 악의성 내용이 포함되어있으면 안내없이 해당 글이 관리자에 의해 삭제될 수 있어요",
      ],
    },
    qna: {
      title: "질문과 답변 게시물 작성 가이드",
      content: [
        "궁금한 내용을 상세히 적어주세요",
        "사진 첨부 시 용량은 장당 최대 20MB까지 업로드할 수 있고, png, jpg, jpeg, webp 포맷을 지원해요",
        "정보를 많이 입력할수록 검색 결과에 많이 노출되어 조회수가 올라가요",
        "글 작성과 이미지 업로드 시, 타인의 지식재산권을 침해하지 않도록 유의해주세요",
        "본문에 악의성 내용이 포함되어있으면 안내없이 해당 글이 관리자에 의해 삭제될 수 있어요",
      ],
    },
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const titleRef = useRef();
  const contentRef = useRef();
  const introRef = useRef();

  const files = useSelector((state) => state.image.fileList);
  const previewList = useSelector((state) => state.image.previewList);
  const deleteImage = useSelector((state) => state.image.deleteList);
  const post = useSelector((state) => state.post.Post);
  const isLogin = useSelector((state) => state.user.isLogin);

  const [title, setTitle] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [category, setCategory] = useState(0);
  const [region, setRegion] = useState(0);
  const [imageNotLoaded, setImageNotLoaded] = useState(true);

  const { type } = useParams();
  const { id } = useParams();

  React.useEffect(() => {
    if (!isLogin) {
      navigate("/");
    }
  }, [isLogin]);

  React.useEffect(() => {
    if (post) {
      if (document.getElementById("introductionInput")) {
        setIntroduction(post.introduction);
      }
      if (document.getElementById("titleInput")) {
        setTitle(post.title);
      }
      if (document.getElementById("contentInput")) {
        document.getElementById("contentInput").value = post.content;
      }
      if (post.category) {
        setCategory(post.category);
      }
      if (post.region) {
        setRegion(post.region);
      }
      if (imageNotLoaded && post.image) {
        post.image.forEach((imageLink) => {
          dispatch(uploadPreview(imageLink));
        });
        setImageNotLoaded(false);
      }
    }
  }, []);

  let frm = new FormData();

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

    if ((type === "review" || type === "lookbook") && imageUrl.length < 1) {
        alert("사진 없음");
        return false;
    }

    // 1번 방법 => api 설계서와 동일하게 보내기
    // const frm = new frm(event.target);
    // frm.append("postCategory", type);

    // files.forEach((file) => {
    //   frm.append("file", file);
    // });
    // console.log(frm.getAll("file"));

    // 2번 방법 => file, key로 나눠서 보내기
    files.forEach((file) => {
      frm.append("file", file);
    });
    console.log(files);

    let imageUrl = [];

    previewList.forEach((previewUrl) => {
      if (previewUrl.slice(0, 4) === "data") {
        imageUrl.push("");
      } else {
        imageUrl.push(previewUrl);
      }
    });

    let key = {
      postCategory: type,
      category: category,
      content: contentRef.current.value,
    };
    if (imageUrl.length > 0) {
      key = { ...key, imageUrl: imageUrl };
    }
    if (files.length === 0 || deleteImage.length > 0) {
      key = { ...key, deleteImage: deleteImage };
    }
    if (type === "reform") {
      key = { ...key, region: region, process: "before" };
    }
    if (type !== "lookbook") {
      key = { ...key, title: titleRef.current.value };
    }
    if (type === "lookbook") {
      key = { ...key, introduction: introRef.current.value };
    }

    console.log(key);

    frm.append(
      "key",
      new Blob([JSON.stringify(key)], { type: "application/json" })
    );
    // frm.append("key", JSON.stringify(key));

    // formdata 확인하기
    // console.log(frm.getAll("file"));
    // for (let key of frm.keys()) {
    //   console.log(key, ":", frm.get(key));
    // }
    // for (let v of frm.values()) console.log(v);

    await dispatch(EditPostDB(frm, type, id)).then(() => {
      dispatch(resetFile());
      navigate("/" + type);
    });
  };

  const onChangeTitle = (event) => {
    setTitle(event.target.value);
    if (title.length > 14) {
      return setTitle((prev) => prev.substring(0, 15));
    }
  };
  const onChangeIntro = (event) => {
    setIntroduction(event.target.value);
    if (introduction.length > 99) {
      return setIntroduction((prev) => prev.substring(0, 100));
    }
  };

  useEffect(() => {
    if (type === "lookbook") {
      dispatch(getLookbookPostDB(id));
    }
    if (type === "reform") {
      dispatch(getReformPostDB(id));
    }
    if (type === "qna") {
      dispatch(getQnAPostDB(id));
    }
    if (type === "review") {
      dispatch(getReviewPostDB(id));
    }
  }, []);

  useEffect(() => {
    return () => {
      dispatch(resetFile());
    };
  }, []);

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
          <CategorySelect setCategory={setCategory} category={category} />
          {type === "reform" && (
            <RegionSelect write={true} setRegion={setRegion} region={region} />
          )}
        </SelectDiv>
        <GuideTitleDiv>
          <GreenBox></GreenBox>
          <GuideTitle>{info[type].title}</GuideTitle>
          <GuideSubTitle>
            원할한 게시물 발행을 위해 꼭 읽어주세요!
          </GuideSubTitle>
        </GuideTitleDiv>
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
        {type === "lookbook" && (
          <IntroDiv>
            <IntroTextArea
              id="introductionInput"
              name="introduction"
              placeholder="브랜드 또는 디자이너에 대한 간단한 소개를 적어주세요."
              value={introduction}
              onChange={onChangeIntro}
              ref={introRef}
            />
            <IntroLength>
              {introduction ? introduction.length : 0}/100
            </IntroLength>
          </IntroDiv>
        )}
        {type !== "lookbook" && (
          <TitleDiv>
            <TitleSpan>제목</TitleSpan>
            <TitleInput
              id="titleInput"
              name="title"
              placeholder="제목을 입력해주세요"
              value={title}
              onChange={onChangeTitle}
              ref={titleRef}
            />
            <TitleLength>{title.length}/15</TitleLength>
          </TitleDiv>
        )}
        <ImageUpload edit={true} type={type} />
        <TitleSpan>내용</TitleSpan>
        <TextArea
          id="contentInput"
          name="content"
          placeholder="여기에 내용을 적어주세요"
          ref={contentRef}
        />
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

const GuideTitleDiv = styled.div`
  margin: 24px auto 16px auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 76px;
  background: #f2f2f2;
  border-radius: 8px;
`;

const GreenBox = styled.div`
  display: none;
  width: 28px;
  height: 28px;
  background: rgba(0, 174, 30, 0.43);
  border-radius: 5px;
  margin: auto 14px auto 20px;
  @media ${({ theme }) => theme.device.mobile} {
    display: inherit;
  }
`;

const GuideTitle = styled.span`
  word-break: keep-all;
  margin-left: 10px;
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.l};
  line-height: 20px;
  @media all and (min-width: 600px) {
    font-size: ${({ theme }) => theme.fontSizes.l};
    line-height: 24px;
  }
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
  margin-bottom: 52px;
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
  bottom: 22px;
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSizes.l};
  line-height: 24px;
  color: #afb0b3;
`;

const TitleDiv = styled.div`
  position: relative;
`;

const TitleSpan = styled.span`
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.l};
  line-height: 24px;
  color: #afb0b3;
  margin-top: 10px;
`;

const TitleInput = styled.input`
  padding-left: 20px;
  border: 1px solid #afb0b3;
  border-radius: 15px;
  width: 100%;
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
  width: 100%;
  height: 761px;
  border: 1px solid #afb0b3;
  border-radius: 15px;
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.l};
  line-height: 24px;
  resize: none;
`;

export default EditPost;
