import React from "react";
import styled, {keyframes } from "styled-components";

const Box = styled.div`
  height: 300px;
  width: 200px;
  position:absolute;
`;


const grow = keyframes`
  from {
    transform: scale(0.1) rotate(-40deg);
    bottom:20px;
    opacity:1;
  }

  to {
    transform: scale(0.4) rotate(40deg);
    bottom:100px;
    opacity:0;
  }
`;
const grow2 = keyframes`
  from {
    transform: scale(0.1) rotate(-40deg);
    bottom:0;
    opacity:1;
  }

  to {
    transform: scale(0.6) rotate(40deg);
    bottom:100px;
    opacity:0;
  }
`;
const grow3 = keyframes`
  from {
    transform: scale(0.1) rotate(-40deg);
    bottom:20;
    opacity:1;
  }

  to {
    transform: scale(0.4) rotate(40deg);
    bottom:100px;
    opacity:0;
  }
`;

const HeartShape = styled.div`
    position: absolute;
    width: 100px;
    height: 90px;

    left:0; bottom:0;
    animation: ${grow} 2s linear infinite;

    &:before{
        position: absolute;
        content: "";
        left: 50px;
        top: 0;
        width: 50px;
        height: 80px;
        background: red;
        -moz-border-radius: 50px 50px 0 0;
        border-radius: 50px 50px 0 0;
        -webkit-transform: rotate(-45deg);
           -moz-transform: rotate(-45deg);
            -ms-transform: rotate(-45deg);
             -o-transform: rotate(-45deg);
                transform: rotate(-45deg);
        -webkit-transform-origin: 0 100%;
           -moz-transform-origin: 0 100%;
            -ms-transform-origin: 0 100%;
             -o-transform-origin: 0 100%;
                transform-origin: 0 100%;
    }

    &:after{
        position: absolute;
        content: "";
        left: 50px;
        top: 0;
        width: 50px;
        height: 80px;
        background: red;
        -moz-border-radius: 50px 50px 0 0;
        border-radius: 50px 50px 0 0;
        -webkit-transform: rotate(-45deg);
           -moz-transform: rotate(-45deg);
            -ms-transform: rotate(-45deg);
             -o-transform: rotate(-45deg);
                transform: rotate(-45deg);
        -webkit-transform-origin: 0 100%;
           -moz-transform-origin: 0 100%;
            -ms-transform-origin: 0 100%;
             -o-transform-origin: 0 100%;
                transform-origin: 0 100%;        

        left: 0;
        -webkit-transform: rotate(45deg);
           -moz-transform: rotate(45deg);
            -ms-transform: rotate(45deg);
             -o-transform: rotate(45deg);
                transform: rotate(45deg);
        -webkit-transform-origin: 100% 100%;
           -moz-transform-origin: 100% 100%;
            -ms-transform-origin: 100% 100%;
             -o-transform-origin: 100% 100%;
                transform-origin :100% 100%;        
    }
`;



const Heart1 = styled(HeartShape)`
    left:30px; bottom:20;
    animation: ${grow} 2s linear infinite;
    &:before{
        background:#dec81f;
    }
    &:after{
        background:#dec81f;
    }
`;
const Heart2 = styled(HeartShape)`
    left:50px; bottom:0;
    animation: ${grow2} 2s linear infinite;
    &:before{
        background:#ed2a07;
    }
    &:after{
        background:#ed2a07;
    }


`;
const Heart3 = styled(HeartShape)`
    left:70px; bottom:20;
    animation: ${grow3} 2s linear infinite;
    &:before{
        background: #0cc94b;
    }
    &:after{
        background: #0cc94b;
    }

`;

const Heart = ({Left, Bottom, Type=1}) => {
    return(
        <div>
        {
        (Type === 1) ?
        <Box style={{ left:`${Left}px`, bottom:`${Bottom}px` }} >
        <Heart1 />
        <Heart2 />
        <Heart3 />
        </Box>
        :
        <Box style={{ left:`${Left}px`, bottom:`${Bottom}px` }} >
        <Heart1 />
        <Heart2 />
        <Heart3 />
        </Box>        
        }
        </div>
    );

}


export default Heart;