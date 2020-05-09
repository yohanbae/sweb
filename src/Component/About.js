import React from "react";
import styled, {keyframes} from "styled-components";
import { GiShop } from "react-icons/gi";

import ori from "../image/ori.png";
import cat from "../image/cat.png";

const Background = styled.div`
    background:#fcfa96;
    width:100%; min-height:100vh;
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


const H6 = styled.span`
    padding:0; margin:0; text-align:left;
`;

const Upper = styled.div`
    width:100%; height:40vh;
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


const Bottom = styled.div`
    width:calc(100%);
    position:absolute;
    left:0; top:50%;
    background:#fcfa96;
    padding-bottom:50px;
    display:grid;
    grid-template-columns: 1fr 500px 1fr;
    grid-column-gap: 60px;
    grid-row-gap: 30px;

    @media only screen and (max-width: 500px) {
        grid-template-columns: 20px 1fr 20px;
        grid-column-gap: 0px;
        grid-row-gap: 0px;
    }   
`;

const AboutContent= styled.div`
    font-family: Cafe;
    font-size:20px;
    color:#d37846;
    font-weight:300;

    @media only screen and (max-width: 500px) {
        font-size:15px;
    }   
`;

const H5 = styled.h5`
    font-family: Cafe;
    font-size:15px;
    color:#d37846;
    padding:0; margin:0;

    @media only screen and (max-width: 500px) {
        font-size:12px;
    }   
`;

const ContactWrap = styled.div`
    display:grid;
    grid-template-columns: 1fr 100px;
    align-items:center;
`;

const ImageRotate = keyframes`
    0% { transform: rotate(-10deg) }
    50% { transform: rotate(10deg) }
    100% { transform: rotate(-10deg) }
`;

const TheImg = styled.img`
    animation: ${ImageRotate} 5s infinite;
`;

const About = ({history}) => {
    const onShop = () => history.push('/shop');    
    const onAbout = () => history.push('/about');    
    const onMain = () => history.push('/');    

    return (
        <Background>

            <Header>
                <H6 onClick={()=>onAbout()}>About</H6>
                <MoneyBox>
                </MoneyBox>
                <GiShop style={{cursor:'pointer'}} onClick={()=> onShop()}/>
            </Header>

            <Upper>
                <UpperContentWrap>
                    <Title onClick={()=>onMain()}>Smile Land</Title>
                    <MsgOne>어바웃 스마일랜드</MsgOne>
                    <MsgTwo></MsgTwo>
                </UpperContentWrap>
            </Upper>

            <Bottom>
                <div></div>
                <AboutContent>
                    본 앱은 미소를 훈련하기 위한 용도로 제작되었습니다. 앱을 통
                    해서 아이들도 양육하고 얼굴근육을 활용해서 이쁜 얼굴을 만
                    들어보세요.
                    <div style={{textAlign:'center', marginTop:'50px', marginBottom:'50px'}}>
                        <TheImg alt="" src={ori} style={{width:'50px', height:'50px', margin:'0'}} />
                    </div>

                    <ContactWrap>
                        <div>
                            <H5>HANISON ! hanison.dev@gmail.com</H5>
                        </div>
                        <img alt="" src={cat} style={{width:'60px', height:'60px', margin:'0'}} />
                    </ContactWrap>
                </AboutContent>
                <div></div>

            </Bottom>

        </Background>
    )

}
export default About;