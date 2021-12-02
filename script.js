

document.body.innerHTML=`

<div class="user-form">
<input class="user-name" placeholder="Enter your Name"/>
<input class="add-user-avatar" placeholder="Enter your image URl"/>
<button onclick="adduser()">Adduser</button>
</div>

<div class="container">
</div>`
async function getuser(){

    const data= await fetch("https://619b264427827600174453fb.mockapi.io/users",
    {method:"GET"}
    );
    const users= await data.json();
     
    const container=document.querySelector(".container")

    users.forEach((data) => {

        container.innerHTML +=`

        <div class="user-container">
        <img src="${data.avatar}" class="user-avatar"/>
         
        <div>
        <p class="username">${data.name}<p>

        <div class="edit-${data.id}">
         <input value="${data.name}" class="edit-${data.id}-user-name" placeholder="enter your name"/> <br>
        <input value="${data.avatar}" class="edit-${data.id}-add-user-avatar" placeholder="enter your url"/>

        </div>
        <div class="buttonEdit">
        <button onclick="toggleredit(${data.id})">Edit</button>
        <button onclick="saveuser(${data.id})">save</button>
        <button onclick="deleteuser(${data.id})">Delete</button>
        </div>

        </div>
        </div>
        
        `   
    });
}
getuser();

async function deleteuser(dataId) {

    console.log("deleting..." ,dataId);

    const data=await fetch("https://619b264427827600174453fb.mockapi.io/users/"+dataId,
    {method:"DELETE"}
    );
  //delete --- refresh user-list....  
}


async function adduser(){
    console.log("adding....")

   const name= document.querySelector(".user-name").value;
   const avatar= document.querySelector(".add-user-avatar").value;
   console.log(name,avatar)

  const data= await fetch("https://619b264427827600174453fb.mockapi.io/users",
  {method:"POST",
  headers: {"Content-Type":"application/json"},
  body:JSON.stringify({name:name,avatar:avatar})  }
  
  );

}
//// add ---- refresh user-list...


function toggleredit(dataId){
    console.log("editing....")

    const toggleruserform=document.querySelector(`.edit-${dataId}`)

    toggleruserform.style.display=

    toggleruserform.style.display==="block"?"none":"block";
  

}

async function saveuser(dataId){

    console.log("saveee.......")

    const name= document.querySelector(`.edit-${dataId}-user-name`).value;
    const avatar= document.querySelector(`.edit-${dataId}-add-user-avatar`).value;
    console.log(name,avatar)
    
 
   const data= await fetch("https://619b264427827600174453fb.mockapi.io/users/"+dataId,
   {method:"PUT",
   headers: {"Content-Type":"application/json"},
   body:JSON.stringify({name:name,avatar:avatar})  }
   
   );

}
