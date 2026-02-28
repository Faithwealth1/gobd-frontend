import React, { useState, useEffect, useRef } from 'react';
import Header from './tools/header';
import Sidebar from './tools/sidebar';
import ResponsiveHeader from './tools/responsiveHeader';
import { useNavigate } from 'react-router-dom';
import Loader from './tools/loader';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles


const Messages = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [newMessageInner, setNewMessageInner] = useState([]);
  const [userId, setUserId] = useState('admin'); // Replace with actual user ID
  const [otherId, setOtherId] = useState(null); // Replace with the ID of the other user
  const [data, setData] = useState({});
  const [customers, setCustomers] = useState([]);
  const [currCustomer, setcurrCustomer] = useState({});
  const [messagesMain, setMessagesMain] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const innerContRef = useRef(null);
    const [showImg, setShowImg] = useState(false);
    const [imgValue, setimgValue] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedRawFiles, setSelectedRawFiles] = useState([]);
   const [isVisible, setIsVisible] = useState(false); // Track visibility for transition
 
   useEffect(() => {
     if (selectedRawFiles.length > 0) {
       setIsVisible(true);
     } else {
       setTimeout(() => setIsVisible(false), 300); // Wait for transition to finish before setting display: none
     }
   }, [selectedRawFiles]);
 
  

  // useEffect(() => {
  //   fetchData();
  //   fetchMessages();

  //   const interval = setInterval(() => {
  //     fetchMessages();
  //   }, 5000); // Check for new messages every 5 seconds

  //   return () => clearInterval(interval); // Cleanup on unmount
  // }, [messages, messagesMain]);

  const fetchData = async () => {
    setLoading(true)
    try {
      // Mock admin data for frontend only
      const mockData = { id: "admin", username: "Admin User" };
      setData(mockData);
      setUserId(mockData.id);
      // No need to fetch messages in mock mode
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  var arr = []

  const fetchMessages = async () => {
    try {
      // Mock messages data for frontend only
      setMessages([]);
      setNewMessageInner([]);
      setCustomers([]);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const fetchMessagesMore = async (myId) => {
    try {
      // Mock messages data for frontend only
      localStorage.setItem("customerName", "User");
      setMessagesMain([]);
      setOtherId(myId);
      return { userName: "User", userPhone: "N/A" };
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  };

  const handleUpload = async () => {
    try {
      if (otherId == null) {
        toast.error("Please select a valid user", {
          position: "top-right",
          autoClose: 2000,
        });
        return;
      }
  
      setLoading(true);

      if (!selectedFiles || selectedFiles.length === 0) {
        toast.error("No files selected!", {
          position: "top-right",
          autoClose: 2000,
        });
        setLoading(false);
        return;
      }

      setLoading(false);

      if (innerContRef.current) {
        innerContRef.current.scrollTop = innerContRef.current.scrollHeight;
      }

      toast.success("Upload successful!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });

      setSelectedRawFiles([]);
    } catch (error) {
      setLoading(false);
      console.error("Error uploading:", error);
  
      toast.error("Error uploading files", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
  };
  
  
    const handleClearall=()=>{
      setSelectedRawFiles([])
      toast.success('Image(s) cleared', {
        position: 'top-right',
        autoClose: 200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      });
    }
    

  const sendMail = async (message, userEmail)=>{
      try {
        // Mock email sending for frontend only
        console.log("Mock email sent to:", userEmail);
      } catch (error) {
        console.error('Error sending email:', error);
        return null;
      }
  }

  const handleSendMessage = async () => {
    const time = new Date().toISOString().slice(0, 19).replace('T', ' ');

    if (!newMessage.trim()) {
      toast.error("Please enter a message", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      return;
    }
    if (otherId == null) {
      toast.error("Please select a valid user", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      return;
    }

    try {
      // Mock message sending for frontend only
      setNewMessage('');
      toast.success("Message sent!", {
        position: "top-right",
        autoClose: 1000,
      });
      if (innerContRef.current) {
            innerContRef.current.scrollTop = innerContRef.current.scrollHeight;
          }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleButtonClick = () => {
    const inputRef = document.createElement('input');
    inputRef.type = 'file';
    inputRef.multiple = true; 
  
    inputRef.addEventListener('change', handleFileChange);
    inputRef.click();
  };
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
  setSelectedRawFiles(files)
  // console.log(files)
    if (files.length > 10) {
      return;
    }else{
const imageArray = [];
files.forEach((file, i) => {
  setFileToBase(file, (dataURI) => {
    // Add the data URI to the image array
    imageArray.push(dataURI);

    // If all images have been processed, update state
    if (imageArray.length === files.length) {
      // console.log(imageArray)
     setSelectedFiles(imageArray);
     if (innerContRef.current) {
      innerContRef.current.scrollTop = innerContRef.current.scrollHeight;
    }
    }
  });
});
    }
  };
  
  // Base64 conversion function for displaying images
  const setFileToBase = (file, callback) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const dataURI = reader.result;
      callback(dataURI); // Call the callback with the base64 encoded string
    };
  };

  const renderFilePreview = (file) => {
    const isImage = file.type.startsWith('image');
    const isVideo = file.type.startsWith('video');

    if (isImage) {
      const imageUrl = URL.createObjectURL(file);
      // console.log(imageUrl)
      return <span className="file img" key={file.name}>
        <img className="img" key={file.name} src={imageUrl} alt="thumbnail" />
      </span>;  // Only render img span for image files
    }

    if (isVideo) {
      const videoUrl = URL.createObjectURL(file);
      // console.log(videoUrl)
      return <span className="file vid" key={file.name}>
          <video className="vid" key={file.name} width="120" height="90" controls poster={videoUrl}>
          <source src={videoUrl} type={file.type} />
        </video>
      </span>;  // Only render vid span for video files
    }

    return null;  // Optionally handle unsupported file types
  };

  
      // unreadMessages.forEach(async(item, i)=>{
      //   var obj = {
      //     messageId:item.id,
      //     userId:item.myId
      //   }
      //   console.log(obj)
      //   const response2 =  await fetch(`${import.meta.env.VITE_API_URL}/messageSeenByUser`, {
      //     method:"PUT",
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify(obj),   
      //   })
      //   if (!response2.ok) throw new Error('Failed to fetch messages');
      
      //   const data2 = await response2.json();
    
      //   console.log(data2)
      // })



  const handleClick = async (id) => {
    // Mock click handler for frontend only
    setOtherId(id);
    const time = new Date().toISOString();

    try {
      // Mock fetch messages for frontend only
      setcurrCustomer(customers.find(user => user.id == id))
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchImg=(img)=>{
    setShowImg(true)
    setimgValue(img)
  }
  

  return (
    <div>
      <ResponsiveHeader />
      <div className="container">
      <ToastContainer />
      {loading ? (
            <Loader/>
          ) : (
            <div>
              {/* Add any additional content you want to show when data is loaded */}
            </div>
          )}
        <div className="containerMessages">
          <div className="headerSection">
            <div className="dm active">DM's</div>
            <div className="notifications">Notifications</div>
          </div>
          <div className="messageSection">
            <div className="messageList">
              <div className="details" ref={innerContRef}>
                {messages.map((item, i) => (
                  <div className="indiv" onClick={() => handleClick(item[0].myId === "admin" ? item[0].otherId : item[0].myId)} key={i}>
                    <div className="image">
                      <img src="/LOGO.png" alt="" />
                    </div>
                    <div className="other">
                      <div className="name">{customers[i]?.username}</div>
                      <div className="messageDetails">{item[0].message}</div>
                    </div>
                    {item.map((item2, ii)=>{
                      if(item2.seen_by_admin !== "SEEN"){
                        arr.push(item2)
                        // console.log(arr)
                      }else{
                          return;
                      }
                   return <div className="num" key={ii}>{arr?.length}</div>
                    })}
                    
                  </div>
                ))}
              </div>
            </div>
            <div className="chatSection">
              <div className="chatCont">
                <div className="messageSection" ref={innerContRef}>
                  {messagesMain
                    .sort((a, b) => new Date(a.timeReceived) - new Date(b.timeReceived))
                    .map((item, i) => {
                      const isError = item.message.includes("An error occurred");
                      const messageClass = isError ? 'errorMessage' : item.role;
                      if(item.message.startsWith("https:")){
                      return(
                      <div className={item.otherId === "admin" ? "reciever" : "sender"} key={i}>
                        <div className={item.otherId === "admin" ? "recieverInner" : "senderInner"}>
                          <img 
                              src={`${item.message}`} 
                              style={{
                                border: "2px solid #ccc", 
                                borderRadius: "10px", 
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                                maxWidth: "50%", 
                                height: "auto",
                                display: "block"
                              }} 
                              alt="Message Image" 
                              onClick={()=>fetchImg(item.message)}
                            />
                               </div>
                      </div>
                    )}else{
                      return(
                        <div className={item.otherId === "admin" ? "reciever" : "sender"} key={i}>
                          <div className={item.otherId === "admin" ? "recieverInner" : "senderInner"}>
                            <img src="" alt="" />
                            <div className="message">{item.message}</div>
                          </div>
                        </div>
                      )
                    }
                  })}
                    <div
        className="image-preview sender"
        style={{
          opacity: isVisible ? 1 : 0,
          visibility: isVisible ? 'visible' : 'hidden',
          display: isVisible ? 'flex' : 'none',
          transition: 'opacity 0.3s ease, visibility 0s 0.3s', // Ensure visibility change happens after opacity
        }}
      >
        <span className="senderInner2">
          <div className="files">
            {selectedRawFiles.map((file) => renderFilePreview(file))}
          </div>
          <button className="sendBut" onClick={handleUpload}>Send Img file(s)</button>
          <button className="sendBut" style={{background:"red"}} onClick={handleClearall}>Clear all</button>
        </span>
      </div>
                </div>
              </div>
              <div className="inputSection">
                {/* <div id="file">@</div> */}
                <i class="bi bi-paperclip" id='file' onClick={handleButtonClick}></i>
                <input type="text" onKeyDown={handleKeyDown} value={newMessage} id="text" placeholder='Send a message...' onChange={(e) => setNewMessage(e.target.value)} />
                <button onClick={handleSendMessage}>Send</button>
              </div>
            </div>
            <div className="chatDetails">
              <div className="userIntro">
                <div className="img"> <img src="/LOGO.png" alt="" /></div>
                <div className="name">{currCustomer?.username}</div>
                <div className="role">User</div>
                <div className="number">{currCustomer?.phone}</div>
              </div>
              {/* <div className="userOther">
                <div className="indiv">
                  <div className="title">Title</div>
                  <div className="subTitle">subTitle</div>
                </div>
                <div className="indiv">
                  <div className="title">Title</div>
                  <div className="subTitle">subTitle</div>
                </div>
                <div className="indiv">
                  <div className="title">Title</div>
                  <div className="subTitle">subTitle</div>
                </div>
                <div className="indiv">
                  <div className="title">Title</div>
                  <div className="subTitle">subTitle</div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
        <div className="biggerPic" style={{display: showImg? "flex":"none"}}>
          <div className="biggerPicWrapper" onClick={()=> setShowImg(false)}></div>
          <div className="img"><img src={imgValue} alt="" /></div>
        </div>
      </div>
    </div>
  );
};

function separateByMyId(arr) {
  const result = {};

  arr.forEach(item => {
    const { myId, otherId } = item;

    // Create a key that considers both myId and otherId
    const key = [myId, otherId].sort().join('-');

    // Initialize an array for this key if it doesn't exist
    if (!result[key]) {
      result[key] = [];
    }

    // Push the current item into the appropriate array
    result[key].push(item);
  });

  // Convert the result object into an array of arrays
  return Object.values(result);
}

export default Messages;
