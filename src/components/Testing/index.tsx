// import { Transition, CSSTransition } from "react-transition-group";
// //@ts-ignore
// import { Container, Button, Alert } from "react-bootstrap";

// import { useRef, useState } from "react";

// import "./index.css";

// const duration = 300;

// const defaultStyle = {
//   transition: `opacity ${duration}ms ease-in-out`,
//   opacity: 0,
// };

// const transitionStyles = {
//   entering: { opacity: 1 },
//   entered: { opacity: 1 },
//   exiting: { opacity: 0 },
//   exited: { opacity: 0 },
// };

// function Testing() {
//   const [showMessage, setShowMessage] = useState(false);
//   const [showButton, setShowButton] = useState(true);
//   const [inProp, setInProp] = useState(false);
//   const nodeRef = useRef(null);
//   return (
//     <Container style={{ padding: "2rem" }}>
//       {showButton && (
//         <Button onClick={() => setShowMessage(true)} size="lg">
//           Show Message
//         </Button>
//       )}
//       <CSSTransition
//         in={showMessage}
//         nodeRef={nodeRef}
//         timeout={300}
//         classNames="alert popup-styles"
//         unmountOnExit
//         onEnter={() => setShowButton(false)}
//         onExited={() => setShowButton(true)}
//       >
//         <Alert
//           ref={nodeRef}
//           variant="primary"
//           dismissible
//           onClose={() => setShowMessage(false)}
//         >
//           <Alert.Heading>Animated alert message</Alert.Heading>
//           <p>This alert message is being transitioned in and out of the DOM.</p>
//           <Button variant="primary" onClick={() => setShowMessage(false)}>
//             Close
//           </Button>
//         </Alert>
//       </CSSTransition>
//       {/* <button onClick={() => setInProp(true)}>Click to Enter</button> */}
//     </Container>
//   );
// }

// export default Testing;

// import React, { Component } from "react";
// import Transition from "react-transition-group/Transition";
// import { render } from "react-dom";

// class Testing extends Component {
//   //Initial state
//   state = {
//     show: false,
//   };

//   //Toggle show/hide sidebar
//   toggleShow() {
//     this.setState({
//       show: !this.state.show,
//     });
//   }

//   //Rendering sidebar
//   renderSidebar() {
//     return (
//       <Transition in={this.state.show} timeout={1000}>
//         {(state) => (
//           <div
//             style={{
//               width: "50%",
//               height: "100vh",
//               paddingTop: "10px",
//               background: "green",
//               color: "white",
//               textAlign: "center",
//               transition: "all 1s ease",
//               position: "absolute",
//               top: 0,
//               zIndex: 1,
//               left: state === "entering" || state === "entered" ? 0 : "-50%",
//             }}
//           >
//             Hi, there!
//           </div>
//         )}
//       </Transition>
//     );
//   }

//   render() {
//     return (
//       <React.Fragment>
//         {this.renderSidebar()}

//         <button
//           onClick={() => this.toggleShow()}
//           style={{ float: "right", padding: "40px" }}
//         >
//           Button
//         </button>
//       </React.Fragment>
//     );
//   }
// }

// export default Testing;

// import * as React from "react";
// import Box from "@mui/material/Box";
// import Switch from "@mui/material/Switch";
// import Paper from "@mui/material/Paper";
// import Collapse from "@mui/material/Collapse";
// import FormControlLabel from "@mui/material/FormControlLabel";

// const icon = (
//   <Paper sx={{ m: 1, width: 100, height: 100 }} elevation={4}>
//     <svg>
//       <Box
//         component="polygon"
//         points="0,100 50,00, 100,100"
//         sx={{
//           fill: (theme) => theme.palette.common.white,
//           stroke: (theme) => theme.palette.divider,
//           strokeWidth: 1,
//         }}
//       />
//     </svg>
//   </Paper>
// );

// function Testing() {
//   const [checked, setChecked] = React.useState(false);

//   const handleChange = () => {
//     setChecked((prev) => !prev);
//   };

//   return (
//     <Box sx={{ height: 300 }}>
//       <FormControlLabel
//         control={<Switch checked={checked} onChange={handleChange} />}
//         label="Show"
//       />
//       <Box
//         sx={{
//           "& > :not(style)": {
//             display: "flex",
//             justifyContent: "space-around",
//             height: 120,
//             width: 250,
//           },
//         }}
//       >
//         <div>
//           <Collapse in={checked}>{icon}</Collapse>
//           <Collapse in={checked} collapsedSize={40}>
//             {icon}
//           </Collapse>
//         </div>
//         <div>
//           <Box sx={{ width: "50%" }}>
//             <Collapse orientation="horizontal" in={checked}>
//               {icon}
//             </Collapse>
//           </Box>
//           <Box sx={{ width: "50%" }}>
//             <Collapse orientation="horizontal" in={checked} collapsedSize={40}>
//               {icon}
//             </Collapse>
//           </Box>
//         </div>
//       </Box>
//     </Box>
//   );
// }

// export default Testing;

// import * as React from "react";
// import Button from "@mui/material/Button";
// import Collapse from "@mui/material/Collapse";
// import IconButton from "@mui/material/IconButton";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemText from "@mui/material/ListItemText";
// // import DeleteIcon from '@mui/icons-material/Delete';
// import { TransitionGroup } from "react-transition-group";
// import { MdDelete } from "react-icons/md";

// const FRUITS = [
//   "🍏 Apple",
//   "🍌 Banana",
//   "🍍 Pineapple",
//   "🥥 Coconut",
//   "🍉 Watermelon",
//   "🍒 Strawberry",
// ];

// interface RenderItemOptions {
//   item: string;
//   handleRemoveFruit: (item: string) => void;
// }

// function renderItem({ item, handleRemoveFruit }: RenderItemOptions) {
//   return (
//     <ListItem
//       className="w-[20vw]"
//       secondaryAction={
//         <IconButton
//           edge="end"
//           aria-label="delete"
//           title="Delete"
//           onClick={() => handleRemoveFruit(item)}
//         >
//           <MdDelete />
//         </IconButton>
//       }
//     >
//       <ListItemText primary={item} />
//     </ListItem>
//   );
// }

// export default function Testing() {
//   const [fruitsInBasket, setFruitsInBasket] = React.useState(
//     FRUITS.slice(0, 3)
//   );

//   const handleAddFruit = () => {
//     const nextHiddenItem = FRUITS.find((i) => !fruitsInBasket.includes(i));
//     if (nextHiddenItem) {
//       setFruitsInBasket((prev) => [...prev, nextHiddenItem]);
//     }
//   };

//   const handleRemoveFruit = (item: string) => {
//     setFruitsInBasket((prev) => [...prev.filter((i) => i !== item)]);
//   };

//   const addFruitButton = (
//     <Button
//       variant="contained"
//       disabled={fruitsInBasket.length >= FRUITS.length}
//       onClick={handleAddFruit}
//     >
//       Add fruit to basket
//     </Button>
//   );

//   return (
//     <div>
//       {addFruitButton}
//       <List sx={{ mt: 1 }}>
//         <TransitionGroup className="w-[20vw]">
//           {fruitsInBasket.map((item) => (
//             <Collapse key={item} className="border-2">
//               {renderItem({ item, handleRemoveFruit })}
//             </Collapse>
//           ))}
//         </TransitionGroup>
//       </List>
//     </div>
//   );
// }

// import React, { Component } from "react";
// import ReactDOM from "react-dom";
// import cx from "classnames";
// import { CSSTransition } from "react-transition-group";
// import "./index.css";

// class Testing extends Component {
//   state = {
//     showList: true,
//     highlightedHobby: false,
//   };
//   switch = () => {
//     this.setState((prevState) => ({
//       //@ts-ignore
//       showList: !prevState.showList,
//     }));
//   };
//   listSwitch = () => {
//     this.setState((state) => ({
//       //@ts-ignore
//       highlightedHobby: !state.highlightedHobby,
//     }));
//   };
//   render() {
//     return (
//       <div className="container">
//         <button className="display" onClick={this.switch}>
//           Obinna
//         </button>
//         <CSSTransition
//           in={this.state.showList}
//           timeout={400}
//           classNames="list-transition"
//           unmountOnExit
//           appear
//           onEntered={this.listSwitch}
//           onExit={this.listSwitch}
//         >
//           <div className="list-body">
//             <ul className="list">
//               <li
//                 className={cx("list-item", {
//                   "list-item--active": this.state.highlightedHobby,
//                 })}
//               >
//                 Writing JavaScript
//               </li>
//               <li className="list-item"> Running</li>
//               <li className="list-item"> Technical Writing</li>
//               <li className="list-item"> Writing Clean code</li>
//             </ul>
//           </div>
//         </CSSTransition>
//       </div>
//     );
//   }
// }

// export default Testing;

// import React, { useState } from "react";
// import { Alert, Button } from "react-bootstrap";
// import { Transition } from "react-transition-group";
// import "./index.css";
// //@ts-ignore
// function Title({ title }) {
//   return <div className="text">{title}</div>;
// }

// const duration = 300;

// const defaultStyle = {
//   transition: `opacity ${duration}ms ease-in-out`,
//   opacity: 0,
// };

// const transitionStyles = {
//   entered: { opacity: 1 },
//   exited: { opacity: 0 },
// };

// export default function Testing() {
//   const [inProp, setInProp] = useState(false);

//   return (
//     <>
//       <Title title="Fade Transition" />
//       <Transition in={inProp} timeout={duration}>
//         {(state) => (
//           <>
//             <div
//               style={{
//                 ...defaultStyle,
//                 //@ts-ignore
//                 ...transitionStyles[state],
//               }}
//             >
//               <Alert variant="primary">
//                 {inProp ? "Hello!" : "I'm fading!"}
//               </Alert>
//             </div>
//             <Button onClick={() => setInProp(!inProp)}>
//               Click to Fade {inProp ? "Out" : "In"}
//             </Button>
//           </>
//         )}
//       </Transition>
//     </>
//   );
// }

// import { useState } from "react";
// import Button from "react-bootstrap/Button";
// import Card from "react-bootstrap/Card";
// import Collapse from "react-bootstrap/Collapse";

// function Testing() {
//   const [open, setOpen] = useState(false);

//   return (
//     <>
//       <Button
//         onClick={() => setOpen(!open)}
//         aria-controls="example-collapse-text"
//         aria-expanded={open}
//       >
//         click
//       </Button>
//       <div style={{ minHeight: "150px" }}>
//         <Collapse in={open} dimension="width">
//           <div id="example-collapse-text">
//             <Card body style={{ width: "400px" }}>
//               Anim pariatur cliche reprehenderit, enim eiusmod high life
//               accusamus terry richardson ad squid. Nihil anim keffiyeh
//               helvetica, craft beer labore wes anderson cred nesciunt sapiente
//               ea proident.
//             </Card>
//           </div>
//         </Collapse>
//       </div>
//     </>
//   );
// }

// export default Testing;

// import React, { useState, createRef } from "react";
// import { createRoot } from "react-dom/client";
// //@ts-ignore
// import { Container, ListGroup, Button } from "react-bootstrap";
// import { CSSTransition, TransitionGroup } from "react-transition-group";
// import { v4 as uuid } from "uuid";

// import "bootstrap/dist/css/bootstrap.min.css";
// import "./index.css";

// function Testing() {
//   const [items, setItems] = useState(() => [
//     {
//       id: uuid(),
//       text: "Buy eggs",
//       nodeRef: createRef(),
//     },
//     {
//       id: uuid(),
//       text: "Pay bills",
//       nodeRef: createRef(),
//     },
//     {
//       id: uuid(),
//       text: "Invite friends over",
//       nodeRef: createRef(),
//     },
//     {
//       id: uuid(),
//       text: "Fix the TV",
//       nodeRef: createRef(),
//     },
//   ]);
//   return (
//     <Container style={{ marginTop: "2rem" }}>
//       <ListGroup style={{ marginBottom: "1rem" }}>
//         <TransitionGroup className="todo-list">
//           {items.map(({ id, text, nodeRef }) => (
//             <CSSTransition
//               key={id}
//               //@ts-ignore
//               nodeRef={nodeRef}
//               timeout={500}
//               classNames="item"
//             >
//               <ListGroup.Item
//                 //@ts-ignore
//                 ref={nodeRef}
//               >
//                 <Button
//                   className="remove-btn"
//                   variant="danger"
//                   size="sm"
//                   onClick={() =>
//                     setItems((items) => items.filter((item) => item.id !== id))
//                   }
//                 >
//                   &times;
//                 </Button>
//                 {text}
//               </ListGroup.Item>
//             </CSSTransition>
//           ))}
//         </TransitionGroup>
//       </ListGroup>
//       <Button
//         onClick={() => {
//           const text = prompt("Enter some text");
//           if (text) {
//             console.log(text);
//             setItems((items) => [
//               ...items,
//               {
//                 id: uuid(),
//                 text,
//                 nodeRef: createRef(),
//               },
//             ]);
//           }
//         }}
//       >
//         Add Item
//       </Button>
//     </Container>
//   );
// }

// export default Testing;

// import React, { useState } from "react";

// const Testing = () => {
//   const [video, setVideo] = useState<string | undefined>(undefined);
//   const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);

//   const setVideoFromBrowser = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files[0]) {
//       setVideo(URL.createObjectURL(event.target.files[0]));
//     }
//   };

//   const startVideoStream = async () => {
//     let videoDevices = [];
//     navigator.mediaDevices.enumerateDevices().then((deviceInfos) => {
//       videoDevices = deviceInfos.filter((d) => d.kind === "videoinput");
//       // setDevices(videoDevices);
//     });
//     if (videoDevices.length > 0) {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           audio: true,
//           video: { deviceId: devices[0].deviceId },
//         });
//         handleSuccess(stream);
//       } catch (err) {
//         console.error("Error accessing user media:", err);
//       }
//     }
//   };

//   const handleSuccess = (stream: MediaStream) => {
//     const videoElement = document.getElementById("player") as HTMLVideoElement;
//     if (videoElement) {
//       videoElement.srcObject = stream;
//     }
//   };

//   console.log(video);

//   return (
//     <>
//       <input
//         type="file"
//         accept="video/*"
//         capture="user"
//         id="recorder"
//         onChange={setVideoFromBrowser}
//       />
//       <button onClick={startVideoStream}>Start Video Stream</button>
//       <video
//         id="player"
//         src={video}
//         controls
//         className="w-[100%] indent-1 h-[100%]"
//       ></video>
//     </>
//   );
// };

// export default Testing;

// import React, { useState, useRef } from "react";
// const [video, setVideo] = useState<string | undefined>(undefined);

// const Testing = () => {
//   const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
//   const mediaRecorder = useRef<MediaRecorder | null>(null);

//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getDisplayMedia({
//         video: true,
//       });
//       setMediaStream(stream);

//       const recorder = new MediaRecorder(stream);
//       recorder.ondataavailable = handleDataAvailable;
//       recorder.start();

//       mediaRecorder.current = recorder;
//     } catch (error) {
//       console.error("Error accessing screen capture:", error);
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorder.current && mediaStream) {
//       mediaRecorder.current.stop();
//       mediaStream.getTracks().forEach((track) => track.stop());
//     }
//   };

//   const handleDataAvailable = (event: BlobEvent) => {
//     const blob = new Blob([event.data], { type: "video/webm" });
//     // Handle the recorded data (e.g., save to server, display to user)
//     // For simplicity, let's just provide a download link

//     const downloadLink = document.createElement("a");
//     downloadLink.href = URL.createObjectURL(blob);
//     downloadLink.download = "recorded-screen.webm";
//     document.body.appendChild(downloadLink);
//     downloadLink.click();
//     document.body.removeChild(downloadLink);
//   };

//   return (
//     <div>
//       <button onClick={startRecording}>Start Recording</button>
//       <br />
//       <button onClick={stopRecording}>Stop Recording</button>

//       <video
//         id="player"
//         src={video}
//         controls
//         className="w-[100%] indent-1 h-[100%]"
//       ></video>
//     </div>
//   );
// };

// export default Testing;

import React, { useState, useRef } from "react";

const Testing = () => {
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [recordedVideo, setRecordedVideo] = useState<string | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        // video: true,
        audio: true,
        video: {
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          frameRate: { ideal: 30 },
          displaySurface: "monitor",
        },
      });
      setMediaStream(stream);

      const recorder = new MediaRecorder(stream, {
        mimeType: "video/webm",
        videoBitsPerSecond: 49 * 1024 * 1024, // Adjust the bitrate for better clarity
      });

      const recordedChunks: Blob[] = [];
      recorder.ondataavailable = (event: BlobEvent) => {
        recordedChunks.push(event.data);
      };

      recorder.onstop = () => {
        const recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
        const recordedUrl = URL.createObjectURL(recordedBlob);
        const downloadLink = document.createElement("a");
        downloadLink.href = recordedUrl;
        downloadLink.download = "recorded-screen.webm";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        setRecordedVideo(recordedUrl);
      };
      recorder.start();

      mediaRecorder.current = recorder;
    } catch (error) {
      console.error("Error accessing screen capture:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && mediaStream) {
      mediaRecorder.current.stop();
      mediaStream.getTracks().forEach((track) => track.stop());
    }
  };

  const setVideoFromBrowser = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setRecordedVideo(URL.createObjectURL(event.target.files[0]));
    }
  };

  console.log(recordedVideo);

  return (
    <div>
      <button
        onClick={startRecording}
        className="bg-blue-500 m-2 h-10 p-2 rounded-md text-white mb-2 text-center mr-4"
      >
        Start Recording
      </button>

      <button
        onClick={stopRecording}
        className="bg-blue-500 m-2 h-10 p-2 rounded-md text-white mb-2 text-center mr-4"
      >
        Stop Recording
      </button>
      <input
        type="file"
        accept="video/*"
        capture="user"
        id="recorder"
        onChange={setVideoFromBrowser}
      />
      {recordedVideo && (
        <div className="border border-red-100">
          <video
            id="player"
            src={recordedVideo}
            controls
            className="w-[100%] indent-1 h-[100%]"
          ></video>
        </div>
      )}
    </div>
  );
};

export default Testing;
