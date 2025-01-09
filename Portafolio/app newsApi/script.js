let categoryActive = document.querySelector('.todas');
let categories = document.querySelectorAll('.category');
let menuBtn = document.querySelector('.bx-menu');
let containerMenu =  document.querySelector('.navbar-categories');
let category;

function service(name){
    // Obtener noticias de la API
    //API KEy: c26570f510004b67bcbedc22aec59b14    
    let url = `https://newsapi.org/v2/top-headlines?category=${name}&country=us&apiKey=c26570f510004b67bcbedc22aec59b14`;
    fetch(url)
    .then(response => response.json())
    .then(data => {
        // Mostrar noticias en la lista
        const listaNoticias = document.querySelector('.noticias__container');
        listaNoticias.innerHTML = '';
        console.log(data);        
        data.articles.forEach(noticia => {
            console.log(noticia);
            if(noticia.title == "[Removed]" || noticia.url == "[Removed]" || noticia.urlToImage == null){
                console.log('Error del servidor');                
            }else{
                const box =  document.createElement('div');
                box.classList.add('box');
                let date = new Date(noticia.publishedAt);
                box.innerHTML =`                
                    <img src="${noticia. urlToImage}">
                    <a href=${noticia.url} target="_blank">${noticia.title}</a>
                    <p>${(date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear()}</p>`
                listaNoticias.appendChild(box);
            }                        
        })
    })
}

window.onload = ()=>{
    service('general');
    categoryActive.classList.add('active');
    
} 
window.onscroll =()=>{
    containerMenu.classList.remove('menu');
}

categories.forEach(item => {
    //console.log(item);    
    item.addEventListener('click',(e)=>{
        categoryActive.classList.remove('active');
        categories.forEach(cat =>{
            cat.classList.remove('active');
        });         
        let name = e.target.innerHTML;
        service(name);
        e.target.classList.add('active');
        containerMenu.classList.remove('menu');
    });
});

menuBtn.addEventListener('click',()=>{
    console.log('click');    
    containerMenu.classList.toggle('menu');
});

