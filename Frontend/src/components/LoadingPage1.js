import Lottie from 'lottie-react'
import React from 'react'
import loader1 from '../assests/lottie_animations/loading1.json'

export default function LoadingPage1() {
    return (
        <>
            <Lottie animationData={loader1} loop={true} style={{height: '100vh'}} />
        </>
    )
}
