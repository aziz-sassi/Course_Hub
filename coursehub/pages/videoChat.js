import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import React, { useEffect, useRef, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Peer from "simple-peer";
import io from "socket.io-client";
import { FcVideoCall, FcEndCall } from "react-icons/fc";
import { FiPhoneCall } from "react-icons/fi";

import emailjs from "emailjs-com";

const socket = io.connect("http://localhost:4200");

const Chat = () => {
  const [me, setMe] = useState("");
  const [stream, setStream] = useState("");
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setidToCall] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        myVideo.current.srcObject = stream;
      });

    socket.on("me", (id) => {
      setMe(id);
    });

    socket.on("callUser", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });
  }, []);

  const callUser = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name: name,
      });
    });

    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: caller });
    });

    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "gmail",
        "template_fj1xp4e",
        e.target,
        "user_UzMl7QfuqJZRbXB7KItH6"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );

    e.target.reset();
  };

  return (
    <>
      <div className="p-4 text-center">
        <div className="flex justify-between p-2">
          <div>
            {stream && (
              <video
                playsInline
                muted
                ref={myVideo}
                autoPlay
                className="w-50"
              />
            )}
          </div>
          <div>
            {callAccepted && !callEnded ? (
              <video playsInline ref={userVideo} autoPlay className="w-50" />
            ) : null}
          </div>
        </div>
        <div className="p-2 text-center gap-2 flex justify-center">
          <TextField
            className="p-2"
            label="Enter your name"
            variant="filled"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="p-2">
            <CopyToClipboard text={me} className="p-4">
              <Button variant="contained" className="p-4 ">
                Copy your ID
              </Button>
            </CopyToClipboard>
          </div>

          <TextField
            className="p-2"
            label="Paste ID to call"
            variant="filled"
            value={idToCall}
            onChange={(e) => setidToCall(e.target.value)}
          />
        </div>
        <div className="text-center justify-self-center">
          {callAccepted && !callEnded ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                color: "#32CD32",
              }}
            >
              <FcEndCall size={30} onClick={leaveCall}></FcEndCall>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                color: "#32CD32",
              }}
            >
              <FiPhoneCall
                size={40}
                onClick={() => callUser(idToCall)}
              ></FiPhoneCall>
            </div>
          )}
        </div>
        <div className="text-center">
          {receivingCall && !callAccepted ? (
            <div>
              <h1>{name} is calling...</h1>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <FcVideoCall size={50} onClick={answerCall}>
                  Answer
                </FcVideoCall>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div className="min-h-screen  py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-2xl font-semibold">
                  Send you Call-ID here
                </h1>
              </div>
              <form onSubmit={sendEmail}>
                <div className="divide-y divide-gray-200">
                  <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <div className="relative">
                      <input
                        name="from_name"
                        type="text"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Enter your name"
                      />
                      <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                        Sender name
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        name="to_name"
                        type="text"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                      />
                      <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                        Receiver name
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        id="email"
                        name="user_email"
                        type="text"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Email address"
                      />
                      <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                        Receiver Email Address
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        id="password"
                        name="message"
                        type="password"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Call ID"
                      />
                      <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                        Call-ID
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        type="submit"
                        className="bg-blue-500 text-white rounded-md px-2 py-1"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <a className="place-self-center" href={`/feedback`}>
          <button
            // onClick={}
            className="py-3 my-8 px-4  place-self-center text-lg bg-gradient-to-r from-blue-300 to-blue-600 rounded-xl text-white"
          >
            give your feedback
          </button>
        </a>
      </div>
    </>
  );
};

export default Chat;
