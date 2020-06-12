import React from "react";
import styled, {keyframes} from "styled-components";

import { GiShop } from "react-icons/gi";

import Loading from "../Loading";

import ori from "../../image/ori.png";
import cat from "../../image/cat.png";
import dang from "../../image/dang.png";
import baby from "../../image/baby.png";
import buritto from "../../image/buritto.png";


const Background = styled.div`
    background:#fcfa96;
    width:100%; min-height:100vh;
`;

// Header Part
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

const MoneyMinus = styled.div`
    width:100%;
    height:20px;
    position:absolute;
    right:10px; bottom:-20px;
    font-size:15px;
    color:#eb551e;
    animation: ${MoneyAni} 1s forwards;
`;
// Header End


// Upper Part: Title, Status
const H6 = styled.span`
    padding:0; 
    margin:0; 
    text-align:left;
    cursor:pointer;
`;

const Upper = styled.div`
    width:100%; 
    height:40vh;
    display:grid;
    align-items:flex-end;
    justify-content:center;

`;
const UpperContentWrap = styled.div`
    padding:0 20px;
    text-align:center;
`;
const Title = styled.div`
    color:#d37846;
    font-size:70px;
    margin-bottom:10px;
    font-family: 'PollerOne';
    cursor:pointer;

    @media only screen and (max-width: 500px) {
        font-size:30px;
    }   
`;
const MsgOne = styled.div`
    height:30px;
    background:white;
    border-radius:20px;
    text-align:center;
    padding:0px 90px;
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


// Bottom Part
const Bottom = styled.div`
    width:calc(100% - 20%);
    position:absolute;
    left:0; top:50%;
    background:#fcfa96;

    padding:0px 10%;
    padding-bottom:50px;
    display:grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 60px;
    grid-row-gap: 30px;

    @media only screen and (max-width: 500px) {
        grid-template-columns: 1fr 1fr;
        grid-row-gap: 50px;
    }   
`;

const ItemBox = styled.div`
    height:250px;
    width:100%;
    position:relative;
    display:grid;
    grid-template-columns: 1fr 1fr;
    align-items:center;
    justify-content:center;

    @media only screen and (max-width: 500px) {
        grid-template-columns: 1fr;
        height:auto;
    }       
`;

const ItemOrder = styled.button`
    width:100%; height:30px;
    position:absolute;
    left:0; bottom:0;
    display: grid;
    align-items: center;
    background: #d37846;
    border:none;
    border-radius:10px;
    cursor:pointer;
    color: ${props => props.sold ? 'darkgray' : 'white'};

    @media only screen and (max-width: 500px) {
        position:relative;
    }   
`;

const ControlBox = styled.div`
    width:200px;
    height:400px;
    position:absolute;
    bottom:0; left:0;
`;


const SepWrap = styled.div`
    width:100%;
    text-align:center;
    @media only screen and (max-width: 500px) {
    }   
`;

const ImageRotate = keyframes`
    0% { transform: rotate(-10deg) }
    50% { transform: rotate(10deg) }
    100% { transform: rotate(-10deg) }
`;

const ItemImage = styled.img`
    width:80px; height:80px;
    filter: ${props => props.sold ? 'brightness(30%)' : 'brightness(100%)'};
    animation: ${ImageRotate} 5s infinite;
`;

const H5 = styled.h5`
    margin:0; padding:0;
    font-size:15px;
    @media only screen and (max-width: 500px) {
        font-size:12px;
    }   
`;

const BackgroundDark = styled.div`
    width:100vw; height:100vh;
    background:rgba(0,0,0,0);
    position:fixed;
    left:0; top:0;
    z-index:99;
`;
const OrderWrap = styled.div`
    width:100vw;
    height:200px;
    position:fixed;
    top:40%;
    left:0;
    background:#d37846;
    z-index:999;
    display:grid;
    align-items:center;
    justify-content:center;
`;

const OrderContents = styled.div`
    display:grid;
    grid-template-columns:1fr 150px 150px 150px;
    grid-gap:20px;

    @media only screen and (max-width: 500px) {
        grid-template-columns:1fr;
    }   
`;


const OrderAsk = styled.div`
    font-size:20px;
    color:white;
    padding:5px;

    @media only screen and (max-width: 500px) {
        padding:0; font-size:15px;
    }   
`;

const OrderButton = styled.div`
    font-size:20px;
    background:white;
    border-radius:5px;
    text-align:center;
    color:#d37846;
    padding:5px;
    cursor:pointer;

    @media only screen and (max-width: 500px) {
        padding:5px; font-size:12px;
    }   
`;

// Bottom End

export default({
    loaded,
    showOrder,
    showNoMoney,
    money,
    minus,
    spendAmount,
    ownOri,
    ownCat,
    ownDog,
    ownBaby,
    ownMonkey,
    
    displayOrderClose,
    placeOrder,
    displayNoMoneyClose,
    onAbout,
    onShop,
    onMain,
    onOrder,
    moneySpend
    }) => {
        return (
    <Background>
            
    { loaded ?
    <>
    {
        showOrder ?
        <>
        <BackgroundDark onClick={()=>displayOrderClose()}></BackgroundDark>
        <OrderWrap>
            <OrderContents>
                <OrderAsk>Purchase this item?</OrderAsk>
                <div></div>
                <OrderButton onClick={() => placeOrder()} >Purchase</OrderButton>
                <OrderButton onClick={() => displayOrderClose()}>Cancel</OrderButton>
            </OrderContents>
        </OrderWrap>
        </>
        :
        null
    }

    {
        showNoMoney ?
        <>
        <BackgroundDark onClick={()=>displayNoMoneyClose()}></BackgroundDark>
        <OrderWrap>
            <OrderAsk>Not enough money</OrderAsk>
        </OrderWrap>
        </>
        :
        null
    }            

    <Header>
        <H6 onClick={()=> onAbout()}>About</H6>
        <MoneyBox>
            ${money}
            {minus ? <MoneyMinus>- ${spendAmount}</MoneyMinus> : null}  
        </MoneyBox>
        <GiShop style={{cursor:'pointer'}} onClick={()=> onShop()}/>
    </Header>

    <Upper>
        <UpperContentWrap>
            <Title onClick={()=> onMain()}>Smile Land</Title>
            <MsgOne>Item Shop</MsgOne>
            <MsgTwo>Order your favorite item</MsgTwo>
        </UpperContentWrap>
    </Upper>

    <Bottom>
        <ItemBox>
            <SepWrap>
                <ItemImage src={ori} sold={ownOri} />
            </SepWrap>
            <SepWrap>
                <H5>Baby Duck</H5>
                <H5>$10,000</H5>
            </SepWrap>
            <ItemOrder onClick={()=> onOrder("ori", 10000)} disabled={ownOri} sold={ownOri}>Order</ItemOrder>
        </ItemBox>
        <ItemBox>
            <SepWrap>
                <ItemImage src={cat} sold={ownCat} />
            </SepWrap>
            <SepWrap>
                <H5>Baby Kat</H5>
                <H5>$500</H5>
            </SepWrap>
            <ItemOrder onClick={()=> onOrder("cat", 500)} disabled={ownCat} sold={ownCat}>Order</ItemOrder>
        </ItemBox>             
        <ItemBox>
            <SepWrap>
                <ItemImage src={dang} sold={ownDog} />
            </SepWrap>
            <SepWrap>
                <H5>Puppy</H5>
                <H5>$7,000</H5>
            </SepWrap>
            <ItemOrder onClick={()=> onOrder("dog", 7000)} disabled={ownDog} sold={ownDog}>Order</ItemOrder>
        </ItemBox>
        <ItemBox>
            <SepWrap>
                <ItemImage src={baby} sold={ownBaby} />
            </SepWrap>
            <SepWrap>
                <H5>Baby</H5>
                <H5>$1,000</H5>
            </SepWrap>
            <ItemOrder onClick={()=> onOrder("baby", 1000)} disabled={ownBaby} sold={ownBaby}>Order</ItemOrder>
        </ItemBox>     
        <ItemBox>
            <SepWrap>
                <ItemImage src={buritto} sold={ownMonkey}/>
            </SepWrap>
            <SepWrap>
                <H5>buritto Boy</H5>
                <H5>$20,000</H5>
            </SepWrap>
            <ItemOrder onClick={()=> onOrder("monkey", 20000)} disabled={ownMonkey} sold={ownMonkey}>Order</ItemOrder>
        </ItemBox>

    </Bottom>

    </>
    : <Loading /> }

    </Background>
);
}