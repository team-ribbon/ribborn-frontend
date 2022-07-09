import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

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

  const selectRef = useRef();
  const files = useSelector((state) => state.image.fileList);
  const intro = useSelector((state) => state.post.techIntro);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [introduction, setIntroduction] = useState(intro);
  const { type } = useParams();

  const onSubmit = (event) => {
    event.preventDefault();

    if (+selectRef.current.value === 0) {
      alert("리폼 종류");
      return false;
    }

    if (title.length < 1) {
      alert("제목");
      return false;
    }

    if (content.length < 1) {
      alert("내용");
      return false;
    }

    if ((type === "review" || type === "lookbook") && files.length < 1) {
      alert("사진");
      return false;
    }

    const formData = new FormData(event.target);
    formData.append("postCategory", type);

    // string
    // formData.append("image", files);

    files.forEach((file) => {
      formData.append("image", file);
      formData.append("image", "url");
    });

    console.log(formData.getAll("image"));
    // for (let key of formData.keys()) {
    //   console.log(key, ":", formData.get(key));
    // }
    // for (let v of formData.values()) console.log(v);

    // dispatch(postDB(formData, type)).then(() => {
    //   dispatch(resetFile());
    //   navigate("/" + type);
    // });
  };

  const onChangeTitle = (event) => {
    setTitle(event.target.value);
    if (title.length > 14) {
      return setTitle((prev) => prev.substring(0, 15));
    }
  };
  const onChangeContent = (event) => {
    setContent(event.target.value);
    if (content.length > 99) {
      return setContent((prev) => prev.substring(0, 100));
    }
  };
  const onChangeIntro = (event) => {
    setIntroduction(event.target.value);
    if (content.length > 99) {
      return setIntroduction((prev) => prev.substring(0, 100));
    }
  };

  useEffect(() => {
    dispatch(getTechIntroDB());
  }, []);
  return (
    <form onSubmit={onSubmit}>
      <select name="category" defaultValue={0} ref={selectRef}>
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
        <select name="region" defaultValue={0} ref={selectRef}>
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
          />
          <span>{content.length}/100</span>
        </>
      )}

      <input
        name="title"
        placeholder="제목을 입력해주세요."
        value={title}
        onChange={onChangeTitle}
      />
      <span>{title.length}/15</span>

      <textarea
        name="content"
        placeholder="내용을 입력해주세요."
        value={content}
        onChange={onChangeContent}
      />
      <span>{content.length}/100</span>

      <ImageUpload type={type} />

      <input type="submit" value="발행" />
    </form>
  );
};

export default WritePost;