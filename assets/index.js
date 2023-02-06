const links = document.querySelectorAll("ul li a");
const nav = document.querySelector("nav");

const menuIcon = document.querySelector("nav svg");


function clear(){
  links.forEach(l=>l.classList.remove("active"))
}

links.forEach(l=>{
  l.onclick = (e)=>{
    clear()
    e.target.classList.add("active")
  }
})



menuIcon.onclick  = ()=>{
 nav.classList.toggle("expanded")
}