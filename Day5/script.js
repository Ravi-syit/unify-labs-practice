const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobileNav");
const overlay = document.getElementById("overlay");
const closeNav = document.getElementById("closeNav");
const links = mobileNav.querySelectorAll("a");

/* Open drawer */
hamburger.onclick = () => {
  mobileNav.classList.add("active");
  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
};

/* Close drawer */
function closeDrawer(){
  mobileNav.classList.remove("active");
  overlay.classList.remove("active");
  document.body.style.overflow = "";
}

closeNav.onclick = closeDrawer;
overlay.onclick = closeDrawer;

/* Close on link click */
links.forEach(link=>{
  link.onclick = closeDrawer;
});

/* ESC key support */
document.addEventListener("keydown", e=>{
  if(e.key === "Escape") closeDrawer();
});
