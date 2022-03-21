import React, { useState, useEffect, useRef } from 'react'
import './video-call.scss'
import { useNavigate, useParams } from 'react-router-dom'
import Waiting from '../partials/video-call/waiting/waiting'
import InCall from '../partials/video-call/in-call/in-call'
import $ from 'jquery'
import styled from "styled-components";
import Peer from 'simple-peer'

const Video = styled.video`
  width: 100%;
`;

function VideoCall() {

    const callStatusLocal = localStorage.getItem('callStatus')
    const {receiverId} = useParams()
    //callStatus la null
    //-------------------state--------------------//
    const [inCall, setInCall] = useState(callStatusLocal)
    const [stream, setStream] = useState()
    const [receiver, setReceiver] = useState(receiverId)

    //--------------------ref----------------------//
    const userVideo = useRef();
    const partnerVideo = useRef();

    //-------------------videos--------------------//
    let UserVideo;
    if (stream) {
        UserVideo = (
            <video playsInline muted ref={userVideo} autoPlay ></video>
        );
    }

    let PartnerVideo;
    //khi co nguoi nhan cuoc goi thi partner video moi duoc tao
    if (inCall == 1) {
        PartnerVideo = (
            <Video playsInline ref={partnerVideo} autoPlay />
        );
    }

    //-------------check status call-----------------//
    if (inCall == -1) {
        localStorage.removeItem('callId')
        localStorage.removeItem('callStatus')
        localStorage.removeItem('callType')
        window.close();
    }

    //-------------------others----------------------//
    const navigate = useNavigate()

    //------------------life cycle-------------------//
    useEffect(() => {
        if (!localStorage.getItem('accessToken')) {
            navigate('/')
        }
    })

    useEffect(() => {
        if (callStatusLocal == 1) {
            setInCall(1)
        } else if (callStatusLocal == -1) {
            setInCall(-1)
        } else
            setInCall(0)

    }, [callStatusLocal])

    useEffect(() => {
        //animation
        if (inCall) {

            $('.video-call-background').animate({
                width: '15rem',
                height: '10rem',
                right: '4rem',
                bottom: '4rem',
                borderRadius: '1rem'
            })
        } else {
            $('.video-call-background').animate({
                width: '100%',
                height: '100%',
                right: '0',
                bottom: '0',
                borderRadius: '0'
            })
        }

        //set peer
        //get stream from camera and mic
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        }).then(streamData => {
            setStream(streamData)
            if (userVideo) {
                userVideo.current.srcObject = streamData;
            }
        })
    }, [inCall])

    useEffect(() => {
        if (inCall == 1) {
            var peer1 = new Peer({initiator: true, stream: stream})
            var peer2 = new Peer()

            peer1.on('signal', data => {
                peer2.signal(data)
            })

            peer2.on('signal', data => {
                peer1.signal(data)
            })

            peer2.on('stream', userVideoStream => {
                // got remote video stream, now let's show it in a video tag
                if (partnerVideo) {
                    partnerVideo.current.srcObject = userVideoStream;
                }
            })
        }
    }, [stream])

    return (
        <div className="video-call-wrapper">

            <div className="video-call-background-partner">
                {PartnerVideo}
            </div>
            <div className="video-call-background">
                {UserVideo}
            </div>
            {inCall ? <InCall></InCall> : <Waiting receiverId={receiverId}></Waiting>}

        </div>
    )
}

export default VideoCall