"use client";

import React, { useState } from "react";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import styled, { keyframes } from "styled-components";

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
  40% {transform: translateY(-30px);}
  60% {transform: translateY(-15px);}
`;

const StyledHeartIcon = styled.div<{ animate: boolean; isFilled: boolean }>`
  cursor: pointer;
  transition: all 0.3s ease;
  animation: ${(props) => (props.animate ? bounce : "none")} 1s;

  .anticon {
    font-size: 24px;
    color: ${(props) => (props.isFilled ? "#fff" : "#000")};
  }

  &:hover {
    transform: scale(1.1);
  }

  ${(props) =>
    props.isFilled &&
    `
    background-color: #ffd700;
    border-radius: 50%;
    padding: 8px;
  `}
`;

interface HeartIconProps {
  isSaved: boolean;
  onClick: () => void;
}

const HeartIcon: React.FC<HeartIconProps> = ({ isSaved, onClick }) => {
  const [animate, setAnimate] = useState(false);

  const handleClick = () => {
    setAnimate(true);
    onClick();
    setTimeout(() => setAnimate(false), 1000);
  };

  return (
    <StyledHeartIcon animate={animate} isFilled={isSaved} onClick={handleClick}>
      {isSaved ? <HeartFilled /> : <HeartOutlined />}
    </StyledHeartIcon>
  );
};

export default HeartIcon;