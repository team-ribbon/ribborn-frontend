import React, { useEffect } from "react";

function VideoChat() {
  const [voiceMuted, setVoiceMuted] = React.useState(false);
  const [cameraOff, setCameraOff] = React.useState(false);
  const [cameras, setCameras] = React.useState([]);
  const [screenShare, setScreenShare] = React.useState(false);

  let myStream;

  async function getMedia(cameraId) {
    if (screenShare === false) {
      try {
        const myScreen = document.getElementById("myFace");
        myStream = await navigator.mediaDevices
          .getUserMedia({
            audio: !voiceMuted,
            video: cameraOff
              ? false
              : cameraId === null || cameraId === undefined
              ? { facingMode: "user" }
              : { deviceId: cameraId },
          })
          .then((res) => {
            myScreen.srcObject = res;
            myStream = res;
            document.getElementById(
              "option" + myStream.getVideoTracks()[0].label
            ).selected = "selected";
          });
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        const myScreen = document.getElementById("myFace");
        myStream = await navigator.mediaDevices
          .getDisplayMedia({
            audio: !voiceMuted,
            video: !cameraOff,
          })
          .then((res) => {
            myScreen.srcObject = res;
            myStream = res;
          });
      } catch (e) {
        console.log(e);
      }
    }
  }

  async function getCameras() {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const tempCameras = devices.filter(
        (device) => device.kind === "videoinput"
      );
      setCameras(tempCameras);
    } catch (e) {
      console.log(e);
    }
  }

  React.useEffect(() => {
    getMedia();
    getCameras();
  }, [screenShare]);

  const muteClick = () => {
    const myFace = document.getElementById("myFace");
    setVoiceMuted(!voiceMuted);
    myFace.srcObject.getAudioTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });
  };

  const offCameraClick = () => {
    const myFace = document.getElementById("myFace");
    setCameraOff(!cameraOff);
    myFace.srcObject.getVideoTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });
  };

  const changeSelect = (e) => {
    getMedia(e.target.value);
  };

  const screenShareBtn = () => {
    setScreenShare(!screenShare);
  };

  return (
    <div>
      <h1>My Video</h1>
      <div id="myStream">
        <div
          style={{
            background: "black",
            width: "fit-content",
            height: "fit-content",
          }}
        >
          <video
            id="myFace"
            autoPlay
            playsInline
            width="400px"
            height="300px"
            muted
          />
        </div>
        <button
          id="mute"
          onClick={() => {
            muteClick();
          }}
        >
          {voiceMuted ? "음소거 해제" : "음소거"}
        </button>
        <button
          id="camera"
          onClick={() => {
            offCameraClick();
          }}
        >
          {cameraOff ? "카메라 켜기" : "카메라 끄기"}
        </button>
        <button onClick={screenShareBtn}>
          {screenShare ? "화면공유 끄기" : "화면공유"}
        </button>
        {screenShare ? null : (
          <div>
            카메라 선택:
            <select onChange={changeSelect}>
              {cameras.map((v, i) => {
                return (
                  <option key={i} value={v.deviceId} id={"option" + v.label}>
                    {v.label}
                  </option>
                );
              })}
            </select>
          </div>
        )}
      </div>
    </div>
  );
}

export default VideoChat;
