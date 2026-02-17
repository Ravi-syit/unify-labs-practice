// Example GPU animation trigger

document.querySelectorAll(".card").forEach(card=>{
card.addEventListener("mouseenter",()=>{
card.style.transform="translateY(-8px)";
});

card.addEventListener("mouseleave",()=>{
card.style.transform="translateY(0)";
});
});
