let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function showTime(){
    const date = new Date();
    return date.getHours() + "Hrs:" + date.getMinutes()+ "Mins:" + date.getSeconds()+ "Secs";
}

function makeAJAXCall(methodType, url, callback, async = true, data = null){
    let xhr= new XMLHttpRequest();
    xhr.onreadystatechange = function (){
        // console.log("State Changed Called. Ready State: " +
        //             xhr.readyState+ "Status:"+xhr.status);
        if(xhr.readyState === 4){
            if(xhr.status === 200 || xhr.status === 201){
                callback(xhr.responseText);
            } else if (xhr.status >= 400) {
                console.log("Handle 400 Client Error or 500 Server Error");
            }
        }
    }
    xhr.open(methodType, url, async);
    if(data){
        console.log(JSON.stringify(data));
        xhr.setRequestHeader("Content-Type","application/json");
        xhr.send(JSON.stringify(data));
    } else xhr.send();
    console.log(methodType+" request sent to server");
}

const getURL = " http://127.0.0.1:3000/employees";
function getUserDetails(data){
    console.log("Get User Data at: "+showTime()+"Data: " +data)
}
makeAJAXCall("GET",getURL,getUserDetails,true);
console.log("Made GET AJAX Call To Server at:"+showTime());

const deleteURL = " http://localhost:3000/employees/7"
function userDeleted(data){
    console.log("User Deleted at: "+showTime()+"Data:" +data)
}
makeAJAXCall("DELETE",deleteURL,userDeleted,false);
console.log("DELETE at:"+showTime());

const postURL = " http://localhost:3000/employees";
const emplData = {"name":"Harry","Salary":"50000"};
function userAdded(data){
    console.log("User Added at :"+showTime+"Data:"+data)
} 
makeAJAXCall("POST",postURL,userAdded,true,emplData);
console.log("CREATED at:"+showTime());