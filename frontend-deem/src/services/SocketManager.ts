import  { Manager } from 'socket.io-client'; // Import the socket.io client library


export const SocketManager =new Manager("http://localhost:3000");
export const socketNamespace = (id:string)=>{
    return SocketManager.socket(`/doc-${id}`);
}
    
