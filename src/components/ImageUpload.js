import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import {
  deleteFile,
  deletePreview,
  uploadFile,
  uploadPreview,
} from "../redux/modules/image";

const ImageUpload = ({ type }) => {
  const dispatch = useDispatch();

  const fileRef = useRef();
  const fileList = useSelector((state) => state.image.fileList);
  const previewList = useSelector((state) => state.image.previewList);

  const onChangeFile = (event) => {
    const { files } = event.target;

    const maxFileCnt = type === "lookbook" ? 20 : 5;
    const uploadFileCnt = fileList.length;
    const currentFileCnt = files.length;
    const remainFileCnt = maxFileCnt - uploadFileCnt;

    if (currentFileCnt > remainFileCnt) {
      alert(`사진은 최대 ${maxFileCnt}장까지 업로드 가능합니다.`);
      fileRef.current.value = null;
      return false;
    }

    for (let i = 0; i < currentFileCnt; i++) {
      const file = files[i];

      if (validation(file)) {
        dispatch(uploadFile(file));
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          dispatch(uploadPreview(reader.result));
        };
        fileRef.current.value = null;
      }
    }
    function validation(obj) {
      const fileTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

      if (obj.name.length > 100) {
        alert("파일명이 100자 이상인 파일은 업로드할 수 없습니다.");
        return false;
      } else if (obj.size > 100 * 1024 * 1024) {
        alert("100MB까지 업로드 가능합니다.");
        return false;
      } else if (obj.name.lastIndexOf(".") === -1) {
        alert("JPEG, JPG, PNG, WEBP 파일만 업로드 가능합니다.");
        return false;
      } else if (!fileTypes.includes(obj.type)) {
        alert("JPEG, JPG, PNG, WEBP 파일만 업로드 가능합니다.");
        return false;
      } else {
        return true;
      }
    }
  };

  const onClickDelete = (event) => {
    dispatch(deleteFile(event.target.id));
    dispatch(deletePreview(event.target.id));
  };
  return (
    <div>
      <Wrap>
        <input
          id="file"
          type="file"
          accept=".png, .jpg, .jpeg, .webp"
          multiple
          onChange={onChangeFile}
          style={{ display: "none" }}
          ref={fileRef}
        />

        <Label htmlFor="file">
          <FileInput>
            <FileInputPlus>+</FileInputPlus>
            <FileInputText>사진 추가하기</FileInputText>
          </FileInput>
          <FileText>*권장 사이즈: 700*508 (1:1.3비율)</FileText>
        </Label>
        {previewList.map((file, index) => {
          return (
            <PreviewWrap key={Date.now() + file}>
              <Preview src={file} />
              <DeleteButton id={index} onClick={onClickDelete}>
                삭제
              </DeleteButton>
            </PreviewWrap>
          );
        })}
      </Wrap>
    </div>
  );
};
const Wrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;
const Label = styled.label`
  position: absolute;
  left: -264px;
  width: 240px;
  top: 32px;
`;
const FileInput = styled.div`
  margin-left: 49px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 191px;
  height: 64px;
  border: 1px solid #afb0b3;
  border-radius: 15px;
  /* display: ${(props) => (props.preview > 1 ? "none" : "flex")}; */
  cursor: pointer;
`;
const FileInputPlus = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  margin-right: 10px;
  height: 32px;
`;
const FileInputText = styled.span`
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.l};
  line-height: 24px;
`;
const FileText = styled.span`
  font-weight: 700;
  font-size: 15px;
  line-height: 28px;
  text-align: right;
  color: rgba(34, 34, 34, 0.7);
`;
const PreviewWrap = styled.div`
  margin-top: 34px;
  position: relative;
  width: 100%;
`;
const Preview = styled.img`
  width: 100%;
`;
const DeleteButton = styled.span`
  background-color: #fff;
  padding: 5px;

  position: absolute;
  bottom: 3px;
  right: 0;
  cursor: pointer;
`;
export default ImageUpload;
