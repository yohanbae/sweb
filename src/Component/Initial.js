import React, {useEffect, useState} from "react";
import styled, {keyframes} from "styled-components";
import FadeIn from 'react-fade-in';
import ori from "../image/ori.png";
import ori_ani from "../image/ori_ani.gif";
import child from "../image/hero_reg.gif";
import firebase from "../base";
import * as faceapi from 'face-api.js';
import Loading from "./Loading";

const TheWrap = styled.div`
    width:100vw; height:100vh;
    display: grid;
    justify-content: center;
    align-items:center;

    background: #fcfa96;
    color:#282828;

`;

const Header = styled.div`
    position: absolute;
    width:calc(100% - 100px);
    height:80px;
    left:0; top:0;  
    padding:0 50px;
    color:#d37846;
    display:grid;
    grid-template-columns: 1fr 150px 30px;
    align-items:center;
    font-family: Cafe;
    font-weight: bold;
    font-size:25px;
`;

const MoneyBox = styled.div`
    position:relative;
    text-align:right;
    padding-right:10px;
`;

const MoneyAni = keyframes`
    from {
        bottom:-20px;
        opacity:1;
        transform:scale(0.7);
    }

    to {
        bottom:-10px;
        opacity:0;
        transform:scale(1);
    }
`;

const MoneyMoving = styled.div`
    width:100%;
    height:20px;
    position:absolute;
    right:10px; bottom:-20px;
    font-size:15px;
    color:#eb551e;
    animation: ${MoneyAni} 1s linear infinite;
`;

const H6 = styled.span`
    padding:0; margin:0; text-align:left;
`;



const Pan = styled.p`
    font-size:20px;
    padding:0 50px;
    font-family: Cafe;
`;

const Logo = styled.img`
    position:absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`;

const TestCamWrap = styled.div`
    width:100%;
    height:10px;
    display:grid;
    justify-content:center;
`;
const TestCam = styled.div`
    width:300px;
    height:10px;
    background:rgba(0,0,0,0.6);
    position:relative;
`;
const TestBar = styled.div`
    position: absolute;
    left:0; top:0;
    height:10px;
    background:#d37846;
    transition:500ms;
`;

const ImgChildWrap = styled.div`
    width: 100%;
    text-align:center;
`;
const ImgChild = styled.img``;


const InputName = styled.input`
    border:none;
    background: white;
    padding:10px 0;
    width:200px;
    font-size: 15px;
    font-family: Cafe;
    text-align:center;
    border-radius:10px;
    margin-top:30px;
`;

const StartButton = styled.button`
    width:200px;
    font-size: 15px;
    font-family: Cafe;
    text-align:center;
    border-radius:10px;
    padding:10px 0px;
`;

const MyVideo = styled.video`
  opacity:0;
  position: absolute;
  left:0;
  top:0;
`;

let camSmile = false;
let timer;
let pager = 1;
let current = 20000;

const Initial = ({history}) => {
    const [loaded, setLoaded] = useState(false);
    const [phase, setPhase] = useState(1);
    const [money, setMoney] = useState(20000);
    const [smiling, setSmiling] = useState(false);

    const [showHeader, setShowHeader] = useState(false);

    const [testTime, setTestTime] = useState(0);

    const db = firebase.firestore();

    const nextPhase = () => {
        if(phase < 9 && phase !== 3 && phase !== 8){
            setPhase(phase + 1);
            pager++;
        }else if(phase === 3){
            // do nothing
            setShowHeader(true);
        }

        console.log('ddd', pager);
        if(phase === 2) setShowHeader(true);
    }

    const onStart = () => {
        let newId = '_' + Math.random().toString(36).substr(2, 9) + Math.random().toString(36).substr(2, 9) + Math.random().toString(36).substr(2, 9);

        db.collection("smileland").doc(newId).set({
            name: "Tokki",
            money: 20000,
            item: [
                {name: 'cat', own: false},
                {name: 'dog', own: false},
                {name: 'ori', own: false},
                {name: 'monkey', own: false},
                {name: 'baby', own: false},
            ],
            today: new Date()
        });

        localStorage.setItem('smileweb', newId);        
        history.push('/');
    }

    const testPass = () => {
        console.log('testPass', phase, pager);
        if(pager === 3) {
            console.log('stating with phase 3');
            camSmile = true;
            let meme = 0;
            setSmiling(true);
            timer = setInterval(() => {
                meme += 10;
                current += 100;
                setTestTime(meme);
                setMoney(current);
                
                if(meme === 110){
                    setSmiling(false);
                    setPhase(4);
                    clearInterval(timer);
                }
            }, 1000);
        }
    }

    const stopTest = () => {
        console.log('stoped');
        if(pager === 3){
            camSmile = false;
            clearInterval(timer);
            setTestTime(0);
            setSmiling(false);
        }
    }


    const run = video => {
        video.addEventListener('play', () => {
        setInterval(async () => {
            const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()

            if(detections[0]){
                if(detections[0].expressions.happy > 0.5){
                    if(!camSmile) testPass();
                } else {
                    if(camSmile) stopTest();
                }  
            }else{
                if(camSmile) stopTest();
            }
        }, 500)
        });
    }

    useEffect(() => {
        const video = document.getElementById('video');    
    
        const startVideo = () => {    
            navigator.getUserMedia(
            { video: {} },
            stream => (video.srcObject = stream),
            err => console.error(err)
            );
            run(video);
            setLoaded(true);
        } 
    
        if(localStorage.getItem('smileweb')){
            history.push('/');
        }else{            
            Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri('https://sweb-weights.netlify.app/'),
                faceapi.nets.faceLandmark68Net.loadFromUri('https://sweb-weights.netlify.app/'),
                faceapi.nets.faceRecognitionNet.loadFromUri('https://sweb-weights.netlify.app/'),
                faceapi.nets.faceExpressionNet.loadFromUri('https://sweb-weights.netlify.app/')                
                // faceapi.nets.tinyFaceDetector.loadFromUri('https://gitcdn.xyz/repo/justadudewhohacks/face-api.js/master/weights/'),
                // faceapi.nets.faceLandmark68Net.loadFromUri('https://gitcdn.xyz/repo/justadudewhohacks/face-api.js/master/weights/'),
                // faceapi.nets.faceRecognitionNet.loadFromUri('https://gitcdn.xyz/repo/justadudewhohacks/face-api.js/master/weights/'),
                // faceapi.nets.faceExpressionNet.loadFromUri('https://gitcdn.xyz/repo/justadudewhohacks/face-api.js/master/weights/')
            ]).then(startVideo);
        }
    }, []);


    return (
        <div>
            {
                loaded ?
                <TheWrap onClick={() => nextPhase()}>
                    {
                    showHeader ?
                    <Header>
                        <H6>About</H6>
                        <MoneyBox style={{fontSize:'25px'}}>
                            ${money}
                            {smiling ? <MoneyMoving>+ $100</MoneyMoving> : null}                    
                        </MoneyBox>
                        <div></div>
                    </Header>
                    : null
                    }

                    {
                    smiling ? <Logo src={ori_ani} width={100} height={100} /> : <Logo src={ori} width={100} height={100} />
                    }
                    

                    { (phase === 1) ? <FadeIn>
                        <Pan>Welcome to Smileland. Please give us permission to your camera.</Pan>                    
                    </FadeIn> : null }
                    { (phase === 2) ? <FadeIn><Pan>Your smile will give us power in Smileland.</Pan></FadeIn> : null }
                    { (phase === 3) ? <FadeIn>
                        <Pan>Let me test your camera. Please smile at the camera on your computer.</Pan>
                        <TestCamWrap>
                            <TestCam>
                                <TestBar style={{width:`${testTime}%`}}></TestBar>
                            </TestCam>
                        </TestCamWrap>
                        </FadeIn> : null }
                    { (phase === 4) ? <FadeIn><Pan>We earned money as much as you smiled.</Pan></FadeIn> : null }
                    { (phase === 5) ? <FadeIn>
                        <ImgChildWrap>
                            <ImgChild src={child} width={100} height={210} />
                        </ImgChildWrap>
                        <Pan>Alright, we have a boy here.</Pan>
                        </FadeIn> : null }
                    { (phase === 6) ? <FadeIn>
                        <ImgChildWrap>
                            <ImgChild src={child} width={100} height={210} />
                        </ImgChildWrap>
                        <Pan>He needs $30,000 to buy food everyday day.</Pan>
                        </FadeIn> : null }
                    { (phase === 7) ? <FadeIn>
                        <ImgChildWrap>
                            <ImgChild src={child} width={100} height={210} />
                        </ImgChildWrap>
                        <Pan>Please visit here often and smile so the boy can survive!</Pan>
                        </FadeIn> : null }
                    { (phase === 8) ? <><FadeIn>
                        <ImgChildWrap>
                            <ImgChild src={child} width={100} height={210} />
                        </ImgChildWrap>
                        <InputName placeholder="what is his name?" autoFocus />
                        <StartButton style={{marginTop:'20px'}} onClick={()=> onStart()}>start</StartButton>
                        </FadeIn></> : null }
                </TheWrap>
                :
                <Loading />
            }
            <MyVideo id="video" width="10" height="10" autoPlay muted></MyVideo>
        </div>
    );
}

export default Initial;