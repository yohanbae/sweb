import React, {useEffect, useState} from "react"
import * as faceapi from 'face-api.js';
import styled from "styled-components";


const MyVideo = styled.video`
  opacity:0;
`;

const Smile = () => {

  const [face, setFace] = useState("hoo");

  useEffect(() => {
    const video = document.getElementById('video');    

    var successCallback = function(error) {
      // user allowed access to camera
      console.log('success');
      run(video);
    };
    var errorCallback = function(error) {
      if (error.name == 'NotAllowedError') {
        // user denied access to camera
        console.log('failed');
      }
    };

    const startVideo = () => {

      navigator.getUserMedia(
      { video: {} },
      stream => (video.srcObject = stream),
      err => console.error(err)
      );
      run(video);
    } 

    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
      faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
      faceapi.nets.faceExpressionNet.loadFromUri('./models')
    ]).then(startVideo);

  }, []);


  const run = video => {
    video.addEventListener('play', () => {
      setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()

        if(detections[0]){
          if(detections[0].expressions.happy > 0.5){
            console.log('smile~~');
            setFace('smile');
          } else {
            setFace('no');          
          }  
        }
      }, 100)
    });

  }


  return(
    <>
    <div id="hoho">hehes {face}</div>
    {/* hide Video forwhile */}
    <MyVideo id="video" width="10" height="10" autoPlay muted></MyVideo>

    </>
    );
}

export default Smile;