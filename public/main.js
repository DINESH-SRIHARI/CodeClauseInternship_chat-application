const socket=io()
let livepep=document.getElementById('livepeople')
let messageall=document.getElementById('message')
const nameinput=document.getElementById('name')
let messageform=document.getElementById('message-form')
let messageinput=document.getElementById('message-input');
let typing=document.getElementById('typing')
messageform.addEventListener('submit',(e)=>{
    e.preventDefault()
    sendMessage()
})
socket.on('total',(data)=>{
    livepep.innerText=data
})

function sendMessage(){
    console.log(messageinput.value);
    const content={
        name:nameinput.value,
        message:messageinput.value,
        date:new Date()
    }
    socket.emit('message',content)
    commitmess(true,content)
    messageinput.value=""
}
socket.on('chatting',(value)=>{
    console.log(value)
    commitmess(false,value)
})
function commitmess(type,data){
    const ele=`
    <div class="${type?'rightt':'left'}">
                <p class="${type?'rp':'lp'}">${data.message}</p>
                <p  class="${type?'sendr':'sendl'}">${data.name} ${moment(data.date).fromNow()}</p>
            </div>
    `
    messageall.innerHTML+=ele
    scroll()
}
function scroll(){
    messageall.scrollTo(0,messageall.scrollHeight);
}
messageinput.addEventListener('focus',(e)=>{
    socket.emit('type',{
        name:nameinput
    })
})
messageinput.addEventListener('keypress',(e)=>{
    socket.emit('type',{
        name:nameinput
    })
})
messageinput.addEventListener('blur',(e)=>{
    socket.emit('type',{
        name:nameinput.value
    })
})

socket.on('start',(data)=>{
    
        typing.innerHTML=data.name+" is typing...";
        scroll()

    
   
})
function clearFeedback() {
    document.querySelectorAll('p.typ').forEach((element) => {
      element.parentNode.removeChild(element)
    })
  }