import { useEffect, useState } from "react"
import { useParams } from "react-router";
import {  socketNamespace } from "../services/SocketManager";


function Document() {
  const [documentName, setdocumentName] = useState<string>('file1')
  const [users, setUsers] = useState([])
  const [postContent, setPostContent] = useState('SOme random textttt'); // Declare a state variable...


  const { id } = useParams();
  
  //Connect to socket for the specific document id
  const socket = socketNamespace(id!);
  
  useEffect(() => {   
     
        function newUserConnected(...args) {
            //check if am the socketId
            setUsers(args[1])
        } 

        function newText(newValue) {
          
          if (newValue!==postContent) {
            setPostContent(newValue)            
          }
            //check if am the socketId
        }

        socket.on('NEW:USER',newUserConnected)
        socket.on('UPDATED:TEXT',newText)
        // TODO: listen to users cursors updates on this document
        // socket.on('CURSOR:POSITION',newText)
  


    return () => {
      // socket.off('connect', onConnect);
      // socket.off('disconnect', onDisconnect);
      socket.off('NEW:USER', newUserConnected);
      socket.off('UPDATED:TEXT', newText);
    };
  },[]);

  useEffect(() => {   
     //Axios get document content get(/document/:id)
  },[]);

  const onUserUpdate = (e)=>{
    const content = e.target.value;
    
    socket.emit('UPDATE:TEXT',content);
    setPostContent(content)

  }


  return (
    <div id='Document' className="flex flex-col">
    <div id='topBarContainer' className="flex flex-row basis-1/3">
        <div id='topBarNameContainer' className="basis-2/3 justify-start">
        <span> {documentName}</span>
        </div>
        <div id='topBarUserLogged' className="basis-1/3 justify-start">
        <span>{users}</span>
        </div>
    </div>
    <div id='editor' className="flex justify-items-start">
    <textarea id="textId" onChange={(e)=>onUserUpdate(e)}
        name="postContent"
        value={postContent}
        rows={50}
        cols={200}
      />
    </div>
    </div>

  )
}

export default Document
