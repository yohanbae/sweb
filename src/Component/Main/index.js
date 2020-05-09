import React, {useEffect, useState} from "react";
import { toast } from 'react-toastify';
import firebase from "../../base";
import * as faceapi from 'face-api.js';
import MainPresenter from "./MainPresenter";
import styled from "styled-components";

const MyVideo = styled.video`
  opacity:0;
  position:absolute;
  left:0; top:0;
`;

let timer; // Timer for Dancing/MoneySpend
let msgTimer; // Message Timer
let camSmile = false; // Detect Smiling or Not
let uid; // Firebase UID
let money = 0;

const Main = ({history}) => {
    // isLoaded
    const [loaded, setLoaded] = useState(false); 

    // Detect Smiling
    const [smiling, setSmiling] = useState(false);

    // Money Control
    const [minus, setMinus] = useState(false);
    const [spendAmount, setSpendAmount] = useState(0);

    // Message: Current Status, FadeIn/Out Effect
    const [msgOneText, setMsgOneText] = useState([]);
    const [msgFade, setMsgFade] = useState(1);

    // User Status
    const [arrive, setArrive] = useState(true);
    const [hungry, setHungry] = useState(false);
    const [dying, setDying] = useState(false);
    const [zombie, setZombie] = useState(false);

    // Dance Movement Types
    const [dance1, setDance1] = useState(false);
    const [dance2, setDance2] = useState(false);
    const [dance3, setDance3] = useState(false);

    // Items OWN: true/false
    const [ownCat, setOwnCat] = useState(false);
    const [ownOri, setOwnOri] = useState(false);
    const [ownDog, setOwnDog] = useState(false);
    const [ownBaby, setOwnBaby] = useState(false);
    const [ownMonkey, setOwnMonkey] = useState(false);
    
    // Firebase DB
    const db = firebase.firestore();

    // When User status = dead
    const saveDeadMoney = id => db.collection("smileland").doc(id).update({ money: -5000 });

    // when User status = zombie | lose all items
    const saveZombie = id => {
        db.collection("smileland").doc(id).update({
            item: [
                {name:'cat', own:false},
                {name:'dog', own:false},
                {name:'ori', own:false},
                {name:'monkey', own:false},
                {name:'baby', own:false}
            ],
            money: -5000
        });
    }

    const startSmile = () => {
        camSmile = true;
        console.log("start function");
        clearInterval(msgTimer);
        setSmiling(true);

        let rand = Math.floor(Math.random() * 3) + 1;  // generate random numbers 1-3
        if(rand === 1) {
            setDance1(true);
        }else if(rand === 2){
            setDance2(true);
        }else if(rand === 3){
            setDance3(true);
        }

        // let mon = money;
        let i = 0;

        arrive ? setMsgOneText(`쿵~ 쿵~`) : setMsgOneText('부활이 진행중입니다. $0이 될때까지 웃어주세요');
        
        timer = setInterval(() => {            
            money += 100;

            if(arrive){
                if(i === 0){
                    i = 1;
                    setMsgOneText(`짝! 짝~!`);
                }else{
                    i = 0;
                    setMsgOneText(`쿵~ 쿵~`);  
                }
            }
        }, 1000);
    }

    const stopSmile = () => {
        camSmile = false;
        clearInterval(timer);
        
        setSmiling(false);
        setDance1(false);
        setDance2(false);
        setDance3(false);

        if(!arrive) {
            if(money >= 0) {
                onGood();
                generateMsgOne('again');
                db.collection("smileland").doc(uid).update({
                    money: money,
                    today: new Date()
                });       
                toast.success(`부활했습니다`, {hideProgressBar: true});  
            }else{
                if(zombie){
                    generateMsgOne('zombie');
                }else if(!arrive){
                    generateMsgOne('dead');
                }
            }
        }else{
            console.log('no twice', uid);
            db.collection("smileland").doc(uid).update({
                money: money,
                today: new Date()
            });            
            onGood();
            generateMsgOne('good');
        }
    }



    useEffect(() => {
        // Check if User has saved data / User very first time
        if(localStorage.getItem('smileweb')){
            uid = localStorage.getItem('smileweb');
        }else{
            history.push('/initial');
        }


        // If User exist
        let info;
        const video = document.getElementById('video');    
        if(uid){
            db.collection("smileland").doc(uid).get().then(doc => {
                let user = doc.data();
                money = user.money;

                // Check which items user owning
                let theCat = user.item.find(val => val.name === 'cat');
                let theDog = user.item.find(val => val.name === 'dog');
                let theMonkey = user.item.find(val => val.name === 'monkey');
                let theBaby = user.item.find(val => val.name === 'baby');
                let theOri = user.item.find(val => val.name === 'ori');

                if (theCat.own === true) setOwnCat(true);
                if (theDog.own === true) setOwnDog(true);
                if (theMonkey.own === true) setOwnMonkey(true); 
                if (theBaby.own === true) setOwnBaby(true); 
                if (theOri.own === true) setOwnOri(true); 
                // Control Animal END

                // Calculate how many days from last access
                let oldDay = user.today.toDate();
                let today = new Date();
                let Difference_In_Time = today.getTime() - oldDay.getTime(); 
                let lastDate = Math.floor(Difference_In_Time / (1000 * 3600 * 24));

                // Calculate money
                let meMoney = user.money;
                let pastSpend = lastDate * 30000;
                let leftMoney = meMoney - pastSpend;

                if(lastDate === 0) {
                    // If still today, do nothing
                }else{
                    if(leftMoney <= 0){
                        toast.error(`전 재산을 탕진했습니다`, {hideProgressBar: true});                    
                    }else{
                        toast.success(`지난 ${lastDate}일 동안 $${pastSpend} 식비를 지출했습니다`, {hideProgressBar: true});
                    }
                }

                if(leftMoney >= 0){
                    // Good: If has enough money
                    generateMsgOne('good');
                } else if(leftMoney < 0 && leftMoney > -65000) {
                    // Hungry: If didn't access up to 2 days
                    generateMsgOne('hungry');
                    setHungry(true);
                    money = 0;
                    toast.error(`배가 고픕니다. ${lastDate}일째 굶고 있습니다`, {hideProgressBar: true});  
                }else if(leftMoney <= 65000 && leftMoney > -210000) {
                    // Dying: If didn't access up to 6 days
                    generateMsgOne('dying');
                    setDying(true);
                    money = 0;
                    toast.error(`죽어갑니다. ${lastDate}일째 굶고 있습니다`, {hideProgressBar: true});  
                }else if(leftMoney <= -21000 && leftMoney > -420000){
                    // Dead: If didn't access up to 13 days                    
                    generateMsgOne('dead');
                    setArrive(false);
                    money = -500;
                    saveDeadMoney(uid);
                    toast.error(`사망했습니다`, {hideProgressBar: true});  
                }else if(leftMoney <= -420000){
                    // Zombie: If didn't access more than 14 days
                    generateMsgOne('zombie');
                    setZombie(true);
                    setArrive(false);
                    money = -500;
                    saveZombie(uid);
                    toast.error(`좀비가 되었습니다`, {hideProgressBar: true});  
                }

                //Video Control
                const startVideo = () => {
                    navigator.getUserMedia(
                    { video: {} },
                    stream => (video.srcObject = stream),
                    err => console.error(err)
                    );
                    run(video);
                } 
            
                const run = video => {
                    video.addEventListener('play', () => {
                    info = setInterval(async () => {
                        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
                        if(detections[0]){
                            if(detections[0].expressions.happy > 0.5){
                                if(!camSmile) startSmile();
                                } else {
                                    if(camSmile) stopSmile();
                            }
                        }else{
                            if(camSmile) stopSmile();
                        }

                        if(!loaded) setLoaded(true);
                    }, 500)
                    });
                }    


                // Trigger Video when Firebase Data Ready
                Promise.all([
                    // faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
                    // faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
                    // faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
                    // faceapi.nets.faceExpressionNet.loadFromUri('./models')
                    faceapi.nets.tinyFaceDetector.loadFromUri('https://gitcdn.xyz/repo/justadudewhohacks/face-api.js/master/weights/'),
                    faceapi.nets.faceLandmark68Net.loadFromUri('https://gitcdn.xyz/repo/justadudewhohacks/face-api.js/master/weights/'),
                    faceapi.nets.faceRecognitionNet.loadFromUri('https://gitcdn.xyz/repo/justadudewhohacks/face-api.js/master/weights/'),
                    faceapi.nets.faceExpressionNet.loadFromUri('https://gitcdn.xyz/repo/justadudewhohacks/face-api.js/master/weights/')
                ]).then(startVideo);
        

            })
            .catch(err => {
                console.log(err);
            });

        }
        
        // return () => info();
        return function cleanup() {
            console.log('cleaning');
            clearInterval(info);
            uid = null;
        }
    }, []);
    

    // UNNECESSARY FUNCTION : REMOVE THIS FUNCTION FOR FINAL VERSION
    const moneySpend = total => {
        setMinus(true);
        setSpendAmount(total);

        money = money - total

        setTimeout(() => {
            setMinus(false);
        }, 1000);
    }

    const generateMsgOne = (status) => {
        let msg=[];
        if(status === 'good'){
            msg = [
                "하루 식비가 30,000원이 필요합니다",
                "행복합니다",
                "꾸준히 접속해서 아이를 향해 웃어주세요",
                "웹 카메라를 향해 웃는 만큼 돈이 늘어납니다",
                "상단 버튼을 통해 상점을 들어갈 수 있습니다",
                "상점에서 동물친구들을 구매할 수 있습니다"
            ];
        }

        if(status === 'hungry'){
            msg = [
                "배가 고픕니다",
                "하루 식비가 30,000원이 필요합니다",
                "충분히 웃어주세요",
                "웹 카메라를 향해 웃는 만큼 돈이 늘어납니다"
            ];        
        }

        if(status === 'dying'){
            msg = [
                "배가 몹시 고파 죽어갑니다",
                "서둘러 식비를 보충해 주세요",
                "7일 이상 굶을 경우 아이가 사망합니다",
                "아이가 불행합니다"
            ];   
        }

        if(status === 'dead'){
            msg = [
                "굶어죽었습니다. 다시 되살려주세요",
                "재정이 $0이 될때까지 웃으면 부활이 가능합니다",
                "7일 이상 굶을 경우 아이가 사망합니다",
                "아이가 불행합니다"
            ];   
        }

        if(status === 'zombie'){
            msg = [
                "좀비가 되었습니다. 모든 아이템이 사라집니다",
                "재정이 $0이 될때까지 웃으면 부활이 가능합니다"
            ];   
        }

        if(status === 'again'){
            msg = [
                "축하합니다. 아이가 되살아났습니다!",
                "다시 굶기 전에 식비를 충당해주세요.",
                "사망하면서 구입했던 아이템 손실이 있을 수 있습니다",
            ];   
        }

        let total = msg.length - 1;
        let i = 0;
        setMsgOneText(msg[i]);

        msgTimer = setInterval(() => {
            setMsgFade(0);
            setTimeout(() =>{
                setMsgOneText(msg[i]);
                if(i === total) i = -1;
                setMsgFade(1);
            }, 500);
            i++;
        }, 3000);
    }

    const onShop = () => history.push('/shop');
    const onAbout = () => history.push('/about');


// TEST BUTTONS
    const onHungry = () => {
        let date = new Date();
        date.setDate(date.getDate() - 2);
        db.collection("smileland").doc(uid).update({ today: date });
        // setHungry(true);
        // setArrive(true);
        // setDying(false);
        // generateMsgOne('hungry');
    }
    const onDying = () => {
        let date = new Date();
        date.setDate(date.getDate() - 5);
        db.collection("smileland").doc(uid).update({ today: date });
        // setDying(true);
        // setArrive(true);
        // setHungry(false);
        // generateMsgOne('dying');
    }
    const onGood = () => {
        setArrive(true);
        setHungry(false);
        setDying(false);
        // generateMsgOne('good');
        let date = new Date();
        db.collection("smileland").doc(uid).update({
            money: money,
            today: date
        });
    }
    const onDead = () => {
        // setArrive(false);
        // setZombie(false);
        // generateMsgOne('dead');
        let date = new Date();
        date.setDate(date.getDate() - 10);
        db.collection("smileland").doc(uid).update({ today: date });
    }
    const onZombie = () => {
        // setArrive(false);
        // setZombie(true);
        // generateMsgOne('zombie');
        let date = new Date();
        date.setDate(date.getDate() - 20);
        db.collection("smileland").doc(uid).update({ today: date });
    }


    return (
        <div>
        <MainPresenter 
            loaded={loaded}
            money={money}
            smiling={smiling}
            minus={minus}
            spendAmount={spendAmount}

            msgFade={msgFade}
            msgOneText={msgOneText}
            arrive={arrive}
            dance1={dance1}
            dance2={dance2}
            dance3={dance3}
            hungry={hungry}
            dying={dying}
            zombie={zombie}
            ownCat={ownCat}
            ownOri={ownOri}
            ownDog={ownDog}
            ownBaby={ownBaby}
            ownMonkey={ownMonkey}

            onAbout={onAbout}
            onShop={onShop}
            startSmile={startSmile}
            stopSmile={stopSmile}
            moneySpend={moneySpend}
            onHungry={onHungry}
            onDying={onDying}
            onGood={onGood}
            onDead={onDead}
            onZombie={onZombie}
        ></MainPresenter>
        <MyVideo id="video" width="10" height="10" autoPlay muted></MyVideo>
        </div>
    );
}

export default Main;