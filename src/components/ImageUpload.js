import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { HelpText as Help } from "../elements/Inputs";

import {
  deleteFile,
  deletePreview,
  collectDeleteInfo,
  uploadFile,
  uploadPreview,
} from "../redux/modules/image";

const ImageUpload = ({ type, edit, error, setError }) => {
  const dispatch = useDispatch();

  const fileRef = useRef();
  const fileList = useSelector((state) => state.image.fileList);
  const previewList = useSelector((state) => state.image.previewList);

  const onChangeFile = (event) => {
    setError({ ...error, fileError: null });
    const { files } = event.target;

    const maxFileCnt = type === "lookbook" ? 20 : 5;
    const uploadFileCnt = previewList.length;
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
      }
    }
    function validation(obj) {
      const fileTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

      if (obj.name.length > 100) {
        alert("파일명이 100자 이상인 파일은 업로드할 수 없습니다.");
        fileRef.current.value = null;
        return false;
      } else if (obj.size > 20 * 1024 * 1024) {
        alert("20MB까지 업로드 가능합니다.");
        fileRef.current.value = null;
        return false;
      } else if (obj.name.lastIndexOf(".") === -1) {
        alert("JPEG, JPG, PNG, WEBP 파일만 업로드 가능합니다.");
        fileRef.current.value = null;
        return false;
      } else if (!fileTypes.includes(obj.type)) {
        alert("JPEG, JPG, PNG, WEBP 파일만 업로드 가능합니다.");
        fileRef.current.value = null;
        return false;
      } else {
        return true;
      }
    }
    fileRef.current.value = null;
  };

  const onClickEditDelete = (file, index) => {
    if (file.slice(0, 4) === "data") {
      dispatch(deleteFile(index.toString()));
    } else {
      dispatch(collectDeleteInfo(file));
    }
    dispatch(deletePreview(index.toString()));
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
          <FileInput invalid={error.fileError}>
            <FileInputPlus>+</FileInputPlus>
            <FileInputText>사진 추가하기</FileInputText>
          </FileInput>
          {error.fileError && <HelpText>{error.fileError}</HelpText>}
          <FileText>*권장 사이즈: 700*508 (1:1.3비율)</FileText>
        </Label>
        {previewList.map((file, index) => {
          return (
            <PreviewWrap key={Date.now() + file}>
              <Preview src={file} />
              {edit ? (
                <DeleteButton
                  id={index}
                  onClick={() => {
                    onClickEditDelete(file, index);
                  }}
                >
                  삭제
                </DeleteButton>
              ) : (
                <DeleteButton id={index} onClick={onClickDelete}>
                  삭제
                </DeleteButton>
              )}
            </PreviewWrap>
          );
        })}
      </Wrap>
    </div>
  );
};
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
`;
const Label = styled.label`
  margin: 20px 0 10px 0;
  width: fit-content;
  @media all and (min-width: 1250px) {
    position: absolute;
    left: -230px;
    top: 35px;
  }
`;
const FileInput = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 191px;
  height: 64px;
  border: 1px solid
    ${({ invalid, theme }) => (invalid ? theme.colors.orange : "#afb0b3")};
  color: ${({ invalid, theme }) => invalid && theme.colors.orange};
  border-radius: 15px;
  cursor: pointer;
`;
const FileInputPlus = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  margin-right: 10px;
  font-weight: 100;
`;
const FileInputText = styled.span`
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSizes.l};
  line-height: 24px;
`;
const FileText = styled.span`
  font-weight: 700;
  font-size: 14px;
  line-height: 28px;
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
  padding: 20px;
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: rgba(34, 34, 34, 0.7);
  border-radius: 15px;
  color: #fff;
  font-size: ${({ theme }) => theme.fontSizes.l};
  cursor: pointer;
`;
const HelpText = styled(Help)`
  margin-bottom: 5px;
`;
export default ImageUpload;
