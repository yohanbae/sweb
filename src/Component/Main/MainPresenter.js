import React from "react";
import styled, {keyframes} from "styled-components";
import Heart from "../Heart";
import Loading from "../Loading";
import FadeIn from 'react-fade-in';

import { GiShop } from "react-icons/gi";

import hero from "../../image/hero_reg.gif";
import hero_hungry from "../../image/hero_sad.png";
import hero_die from "../../image/hero_die.png";
import hero_rip from "../../image/rip.png";
import hero_zombie from "../../image/hero_zombie.png";
import hero_dance1 from "../../image/hero_dance.gif";
import hero_dance2 from "../../image/hero_smile.gif";
import hero_dance3 from "../../image/hero_money.gif";

import catImg from "../../image/cat.png";
import catImgDance from "../../image/cat_ani.gif";
import catImgHungry from "../../image/cat_hungry.png";
import burittoImg from "../../image/buritto.png";
import burittoImgDance from "../../image/buritto_ani.gif";
import burittoImgHungry from "../../image/buritto_hungry.png";
import oriImg from "../../image/ori.png";
import oriImgDance from "../../image/ori_ani.gif";
import oriImgHungry from "../../image/ori_hungry.png";
import dangImg from "../../image/dang.png";
import dangImgDance from "../../image/dang_ani.gif";
import dangImgHungry from "../../image/dang_hungry.png";
import babyImg from "../../image/baby.png";
import babyImgDance from "../../image/baby_ani.gif";
import babyImgHungry from "../../image/baby_hungry.png";
import nako from "../../image/nako.gif";


const Background = styled.div`
    background:#fcfa96;
    width:100%; min-height:100vh;
`;

//Header Part
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
    @media only screen and (max-width: 500px) {
        width: calc(100% - 20px);
        padding: 0 10px;
        font-size:15px;
    }   
`;

const MoneyBox = styled.div`
    position:relative;
    text-align:right;
    padding-right:10px;
    font-size:25px;
    @media only screen and (max-width: 500px) {
        font-size:15px;
    }   
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

const MoneyMinus = styled.div`
    width:100%;
    height:20px;
    position:absolute;
    right:10px; bottom:-20px;
    font-size:15px;
    color:#eb551e;
    animation: ${MoneyAni} 1s forwards;
`;
//Header Part End


// Upper Part : Title, Status Messge, etc 
const H6 = styled.span`
    padding:0; margin:0; text-align:left;
    cursor: pointer;
`;

const Upper = styled.div`
    width:100%; height:40vh;
    display:grid;
    align-items:flex-end;
    justify-content:center;

`;
const UpperContentWrap = styled.div`
    width:400px;
    padding:0px;
    text-align:center;
`;
const Title = styled.div`
    color:#d37846;
    font-size:70px;
    margin-bottom:10px;
    font-family: 'PollerOne';
    width:100%;
    align-text:center;
    @media only screen and (max-width: 500px) {
        font-size:30px;
    }   
`;
const MsgOne = styled.div`
    height:30px;
    background:white;
    border-radius:20px;
    text-align:center;
    padding:0px;
    margin-bottom:5px;
    font-size:15px;
    color:#282828;
    display:grid;
    align-items:center;
    font-family: Cafe;
    font-weight:bold;

    @media only screen and (max-width: 500px) {
        padding:0;
        font-size:12px;
        width:300px;
    }   

`;
const MsgTwo = styled.div`
font-size:15px;
color:#d37846;
font-family: Cafe;
font-weight: 600;
text-align:center;

@media only screen and (max-width: 500px) {
    font-size:12px;
}   

`;
// Upper Part End


// Bottom Part : Character / Animation / Pets
const Bottom = styled.div`
    width:100%;
    height:60vh;
    position:absolute;
    left:0; bottom:0;

    display:grid;
    align-items: flex-end;
    justify-content: center;
`;


const HeroBox = styled.div`
    width:300px;
    height:250px;
    margin-bottom:50px;
    text-align:center;
    position:relative;
`;

const MainHero = styled.img`
    width:110px;
    height:250px;
    user-select: none;
    user-drag: none;
`;

const MainHeroDying = styled.img`
    width:250px;
    height:250px;
    user-select: none;
    user-drag: none;
    object-fit:contain;
`;

const ControlBox = styled.div`
    width:200px;
    height:400px;
    position:absolute;
    bottom:0; left:0;
`;

const PetBox = styled.div`
    width:100%;
    height:50px;
    position:absolute;
    left:0; bottom:0;

    display:flex;
    justify-content:center;
`;

const PetItem = styled.div`
    margin: 0px;
    width:60px; height:60px;
    display: ${props => props.own ? 'block' : 'none'};
`;
// Bottom Part End

export default({
    loaded,
    money,
    smiling,
    minus,
    spendAmount,

    msgFade,
    msgOneText,
    arrive,
    dance1,
    dance2,
    dance3,
    hungry,
    dying,
    zombie,
    ownCat,
    ownOri,
    ownDog,
    ownBaby,
    ownMonkey,
    
    onAbout,
    onShop,
    startSmile,
    stopSmile,
    moneySpend,
    onHungry,
    onDying,
    onGood,
    onDead,
    onZombie,
    onReset,
    onDasu
    }) => {
        return (
    <FadeIn>
    <Background>
        {
            loaded ?
            <>
            <Header>
                <H6 onClick={() => onAbout()}>About</H6>
                <MoneyBox>
                    ${money}
                    {smiling ? <MoneyMoving>+ $100</MoneyMoving> : null}                    
                    {minus ? <MoneyMinus>- ${spendAmount}</MoneyMinus> : null}  
                </MoneyBox>
                <GiShop style={{cursor:'pointer'}} onClick={()=> onShop()}/>
            </Header>

            <Upper>
                <UpperContentWrap>
                    <Title>Smile Land</Title>
                    <MsgOne><div style={{opacity:`${msgFade}`, transition:'500ms'}}>{msgOneText}</div></MsgOne>
                    <MsgTwo>Smile at the camera</MsgTwo>
                </UpperContentWrap>
            </Upper>

            <Bottom>
                <HeroBox>
                    {
                        smiling ?
                        <>
                        <Heart Left={-20} Bottom={80} />
                        <Heart Left={120} Bottom={100} />
                        </>
                        : null
                    }


                    {
                        arrive ?
                            smiling ? 
                                dance1 ? <MainHero alt="" src={hero_dance1} /> :
                                dance2 ? <MainHero alt="" src={hero_dance2} /> : 
                                dance3 ? <MainHero alt="" src={hero_dance3} /> : null                                
                            : 
                                hungry ? <MainHero alt="" src={hero_hungry} /> :
                                    dying ? <MainHeroDying alt="" src={hero_die} /> : 
                                    <MainHero src={hero} />
                        : 
                            smiling ?
                            <div><img src={nako} style={{marginTop:'50px'}} width={100} height={80} alt="" /></div>
                            :
                                zombie ? <MainHero src={hero_zombie} alt="" /> :
                                <MainHero src={hero_rip} alt="" />
                    }

                    <PetBox>
                    <PetItem>cat</PetItem>
                        <PetItem own={ownCat}>
                            {
                                arrive ?
                                    smiling ?
                                        <img src={catImgDance} width={60} height={60} alt="" />                                    
                                    : 
                                        hungry ? <img src={catImgHungry} width={60} height={60} alt="" /> :
                                        dying ? <img src={catImgHungry} width={60} height={60} alt="" /> : 
                                        <img src={catImg} width={60} height={60} alt="" />            
                                :  <img src={catImgHungry} width={60} height={60} alt="" />
                            }
                        </PetItem>
                        <PetItem own={ownOri}>
                            {
                            arrive ?
                                smiling ?
                                    <img src={oriImgDance} width={60} height={60} alt="" />                                    
                                : 
                                    hungry ? <img src={oriImgHungry} width={60} height={60} alt="" /> :
                                    dying ? <img src={oriImgHungry} width={60} height={60} alt="" /> : 
                                    <img src={oriImg} width={60} height={60} alt="" />            
                            :  <img src={oriImgHungry} width={60} height={60} alt="" />
                            }
                        </PetItem>
                        <PetItem own={ownDog}>
                        {
                            arrive ?
                                smiling ?
                                    <img src={dangImgDance} width={60} height={60} alt="" />                                    
                                : 
                                    hungry ? <img src={dangImgHungry} width={60} height={60} alt="" /> :
                                    dying ? <img src={dangImgHungry} width={60} height={60} alt="" /> : 
                                    <img src={dangImg} width={60} height={60} alt="" />            
                            :  <img src={dangImgHungry} width={60} height={60} alt="" />
                            }
                        </PetItem>
                        <PetItem own={ownBaby}>
                        {
                            arrive ?
                                smiling ?
                                    <img src={babyImgDance} width={60} height={60} alt="" />                                    
                                : 
                                    hungry ? <img src={babyImgHungry} width={60} height={60} alt="" /> :
                                    dying ? <img src={babyImgHungry} width={60} height={60} alt="" /> : 
                                    <img src={babyImg} width={60} height={60} alt="" />            
                            :  <img src={babyImgHungry} width={60} height={60} alt="" />
                            }
                        </PetItem>
                        <PetItem own={ownMonkey}>
                        {
                            arrive ?
                                smiling ?
                                    <img src={burittoImgDance} width={60} height={60} alt="" />                                    
                                : 
                                    hungry ? <img src={burittoImgHungry} width={60} height={60} alt="" /> :
                                    dying ? <img src={burittoImgHungry} width={60} height={60} alt="" /> : 
                                    <img src={burittoImg} width={60} height={60} alt="" />            
                            :  <img src={burittoImgHungry} width={60} height={60} alt="" />
                            }
                        </PetItem>
                    </PetBox>
                </HeroBox>
            </Bottom>

            </>
            : <Loading />
        }

    </Background>
    </FadeIn>
    );
};