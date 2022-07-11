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
    fileRef.current.value = null;
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
          <FileInput>사진을 업로드 해주세요</FileInput>
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
  display: flex;
  flex-direction: column;
`;
const Label = styled.label`
  width: 200px;
`;
const FileInput = styled.div`
  width: 200px;
  height: 100px;
  border: 1px solid black;
  /* display: ${(props) => (props.preview > 1 ? "none" : "flex")}; */
  cursor: pointer;
`;
const PreviewWrap = styled.div`
  position: relative;
  width: 200px;
`;
const Preview = styled.img`
  width: 200px;
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
