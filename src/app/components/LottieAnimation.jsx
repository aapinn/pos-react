import React from "react";
import { Lottie } from "lottie-react";

const LottieAnimation = ({ animationData }) => {
    if (!animationData) return null;

    return (
        <div style={{ width: 400, height: 400 }}>
            <Lottie animationData={animationData} loop={true} />
        </div>
    );
};

export default LottieAnimation;
