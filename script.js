let body = document.querySelector("body");
let addBtn = document.querySelector("button");
let ol = document.querySelector("ol");
let input = document.querySelector("input");
let select = document.querySelector("select");
let taskCard  = document.querySelector(".Task-Card");

addBtn.addEventListener("click", function() {
  let li =  document.createElement("li");
  li.innerText = input.value;

  let delBtn = document.createElement("button");
  delBtn.innerText = "Remove Task";

  ol.appendChild(li);
  li.appendChild(delBtn);
  input.value = "";

  let priority = document.createElement("p");
  p.innerText = select.value;
  li.appendChild(priority);
  
});

ol.addEventListener("click", function(event){
  if(event.target.nodeName == "BUTTON"){
    let delTask = event.target.parentElement;
    delTask.remove();
  }
});

taskCard.addEventListener("mouseEnter", {
})

