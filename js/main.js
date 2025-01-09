let menu = document.querySelector('.menu-icon');
let navbar = document.querySelector('.navbar');

menu.addEventListener('click',()=>{
    navbar.classList.toggle('open-menu');
    menu.classList.toggle('move');
})
window.onscroll = () =>{
  navbar.classList.remove('open-menu');
  menu.classList.remove('move');
}

/* Swiper Slide*/
var swiper = new Swiper(".reviews__content", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  // Email Js
const validate = () =>{
  let name = document.querySelector('.name');
  let email = document.querySelector('.email');
  let msg = document.querySelector('.message');
  let sendBtn = document.querySelector('.send__btn');

  sendBtn.addEventListener('click',(e) => {
    e.preventDefault();
    if(name.value === '' || email.value === '' || msg.value === ''){
      emptyerror();
    }else{
      sendmail(name.value,email.value,msg.value);
      success();
    }
  })
}
validate();

const sendmail = (name,email,msg) => {
  emailjs.send("service_il8z9bc","template_71nk09n",{
    from_name: email,
    to_name: name,
    message: msg,
    });
}

const emptyerror = () =>{
  Swal.fire({
    icon: "error",
    title: "Oh No...",
    text: "Fields cannot be empty!",
  });
}

const success = () =>{
  Swal.fire({
    icon: "success",
    title: "Email sent successfully",
    text: "We try to reply in 24 hours",
  });
}

//Header Background Change On Scroll
let header = document.querySelector('header');

window.addEventListener('scroll', () => {
  header.classList.toggle('header-active', window.scrollY > 0);
})

//Scroll Top 
let scrollTop = document.querySelector('.scroll__top');

window.addEventListener('scroll', () => {
  scrollTop.classList.toggle('scroll-active', window.scrollY >= 400);
})

