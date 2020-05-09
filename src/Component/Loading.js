import React from "react";
import styled from "styled-components";
import dang from "../image/dang_ani.gif";

const Wrap = styled.div`
    width:100vw; 
    height:100vh;
    display:grid;
    justify-content:center;
    align-items:center;
`;

const Loading = () => {
    return (
        <Wrap>
            <img alt="loading" src={dang} height={100} width={100} />
        </Wrap>
    );
}
export default Loading;