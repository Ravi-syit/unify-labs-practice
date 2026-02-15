document.querySelectorAll("input").forEach(input=>{
input.addEventListener("invalid",()=>{
input.style.borderColor="#ef4444";
});
});
