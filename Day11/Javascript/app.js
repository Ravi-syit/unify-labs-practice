// PARTICLES
const particleContainer = document.querySelector(".particles");

for(let i=0;i<30;i++){
  const p=document.createElement("span");
  p.style.left=Math.random()*100+"%";
  p.style.animationDuration=10+Math.random()*20+"s";
  particleContainer.appendChild(p);
}

// MODAL

const modal=document.getElementById("modal");
document.getElementById("notifyBtn").onclick=()=>modal.style.display="flex";
document.getElementById("closeModal").onclick=()=>modal.style.display="none";
