let menuIcon = document.querySelector(".menu-icon");
menuIcon.addEventListener("click",()=>{
    menuIcon.classList.toggle("active")
})

let text = document.querySelector(".text p");

text.innerHTML = text.innerHTML.split("").map((char,i)=>
    `<b style="transform:rotate(${i * 6.3}deg")>${char}</b>`
).join("")

const buttons = document.querySelectorAll('.about-btn button');
const contents = document.querySelectorAll('.content');

buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        contents.forEach(content => content.style.display = 'none');
        contents[index].style.display = 'block';
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});

var mixer = mixitup('.portfolio-gallery', {
    selectors:{
        target: '.portfolio-box'
    },
    animation:{
        duration: 500
    }
})

var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    autoplay: {
        delay:3000,
        disableOnInteraction:false,
    },
    breakpoints:{
        576:{
            slidesPerView:2,
            spaceBetween:10,
        },
        1200:{
            slidesPerView:3,
            spaceBetween:20,
        },
    }
});

const firstSkill = document.querySelector(".skill:first-child");
const skCounters = document.querySelectorAll(".counter span");
const progressBars = document.querySelectorAll(".skills svg circle");

window.addEventListener("scroll",()=>{
    if(!skillsPlayed)
    skillsCounter();
})

function hasReached(el){
    let topPosition = el.getBoundingClientRect().top;
    if(window.innerHeight >= topPosition + el.offsetHeight) return true; return false;
}

function updateCount(num,maxNum){
    let currentNum = +num.innerText;

    if(currentNum < maxNum){
        num.innerText = currentNum +1;
        setTimeout(()=>{
            updateCount(num, maxNum)
        },12)
    }
}

let skillsPlayed = false;

function skillsCounter(){
    if(!hasReached(firstSkill))return;
    skillsPlayed = true;
    skCounters.forEach((counter, i)=>{
        let target = +counter.dataset.target;
        let strokeValue = 465 - 465 * (target / 100);
        progressBars[i].style.setProperty("--target", strokeValue);

        setTimeout(()=>{
            updateCount(counter,target);
        },400)
    });
    progressBars.forEach(p => p.style.animation = "progress 2s ease-in-out forwards")
}

let calcScrollValue = ()=>{
    let scrollProgress = document.getElementById("progress");
    let pos = document.documentElement.scrollTop;

    let calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrollValue = Math.round((pos * 100)/calcHeight);

    if(pos > 100){
        scrollProgress.style.display = "grid";
    }else{
        scrollProgress.style.display ="none";
    }

    scrollProgress.addEventListener("click",()=>{
        document.documentElement.scrollTop = 0;
    });

    scrollProgress.style.background = `conic-gradient(#fff ${scrollValue}%,#e6006d ${scrollValue}%)`;
}
window.onscroll = calcScrollValue;
window.onload = calcScrollValue;