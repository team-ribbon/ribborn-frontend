import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

// Action
const UPLOAD_FILE = "UPLOAD_FILE";
const DELETE_FILE = "DELETE_FILE";
const UPLOAD_PREVIEW = "UPLOAD_PREVIEW";
const DELETE_PREVIEW = "DELETE_PREVIEW";
const COLLECT_DELETE_INFO = "COLLECT_DELETE_INFO";
const RESET_FILE = "RESET_FILE";

// Action creator
export const uploadFile = createAction(UPLOAD_FILE, (fileObj) => ({ fileObj }));
export const deleteFile = createAction(DELETE_FILE, (index) => ({ index }));
export const uploadPreview = createAction(UPLOAD_PREVIEW, (dataUrl) => ({
  dataUrl,
}));
export const deletePreview = createAction(DELETE_PREVIEW, (index) => ({
  index,
}));
export const collectDeleteInfo = createAction(
  COLLECT_DELETE_INFO,
  (dataUrl) => ({
    dataUrl,
  })
);
export const resetFile = createAction(RESET_FILE, () => {});

// initialState
const initialState = {
  fileList: [],
  previewList: [],
  deleteList: [],
};

// Reducer
export default handleActions(
  {
    [UPLOAD_FILE]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.fileList.push(payload.fileObj);
      }),
    [DELETE_FILE]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.fileList = draft.fileList.filter(
          (file, index) => Number(index) !== Number(payload.index)
        );
      }),
    [UPLOAD_PREVIEW]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.previewList.push(payload.dataUrl);
      }),
    [DELETE_PREVIEW]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.previewList = draft.previewList.filter(
          (file, index) => Number(index) !== Number(payload.index)
        );
      }),
    [COLLECT_DELETE_INFO]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.deleteList.push(payload.dataUrl);
      }),
    [RESET_FILE]: (state) =>
      produce(state, (draft) => {
        draft.fileList = initialState.fileList;
        draft.previewList = initialState.previewList;
      }),
  },
  initialState
);
