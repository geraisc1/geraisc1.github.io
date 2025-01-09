
// Obtenemos los elementos de la galería
const galeria = document.querySelector('.galeria');
const categorias = document.querySelectorAll('.categoria');
const imagenes = document.querySelector('.imagenes');
const containerShow = document.querySelector('.container-img');
const closeIcon =  document.querySelector('.bx-x');
const imgShow = document.querySelector('.img-show');

// Definimos las categorías y sus imágenes
const imagenesPorCategoria = {
    paisajes: [
        { src: 'images/paisaje1.jpg', alt: 'Paisaje 1' },
        { src: 'images/paisaje2.jpg', alt: 'Paisaje 2' },
        { src: 'images/paisaje3.jpg', alt: 'Paisaje 3' },
        { src: 'images/paisaje4.jpg', alt: 'Paisaje 4' },
        { src: 'images/paisaje5.jpg', alt: 'Paisaje 5' },
        { src: 'images/paisaje6.jpg', alt: 'Paisaje 6' },
    ],
    retratos: [
        { src: 'images/retrato1.jpg', alt: 'Retrato 1' },
        { src: 'images/retrato2.jpg', alt: 'Retrato 2' },
        { src: 'images/retrato3.jpg', alt: 'Retrato 3' },
        { src: 'images/retrato4.jpg', alt: 'Retrato 4' },
        { src: 'images/retrato5.jpg', alt: 'Retrato 5' },
        { src: 'images/retrato6.jpg', alt: 'Retrato 6' },
    ],
    abstractos: [
        { src: 'images/abstracto1.jpg', alt: 'Abstracto 1' },
        { src: 'images/abstracto2.jpg', alt: 'Abstracto 2' },
        { src: 'images/abstracto3.jpg', alt: 'Abstracto 3' },
        { src: 'images/abstracto4.jpg', alt: 'Abstracto 4' },
        { src: 'images/abstracto5.jpg', alt: 'Abstracto 5' },
        { src: 'images/abstracto6.jpg', alt: 'Abstracto 6' },
    ],
};

// Agregamos eventos a las categorías
categorias.forEach((categoria) => {
    categoria.addEventListener('click', () => {
        // Obtenemos la categoría seleccionada
        const categoriaSeleccionada = categoria.dataset.categoria;
        
        // Limpiamos las imágenes actuales
        imagenes.innerHTML = '';

        // Agregamos las imágenes de la categoría seleccionada
        imagenesPorCategoria[categoriaSeleccionada].forEach((imagen,index) => {
            const imagenElement = document.createElement('div');            
            imagenElement.classList.add(`img-${index}`);
            imagenElement.addEventListener('click',(e)=>{
                containerShow.classList.toggle('show');
                let ruta = e.target.attributes[0].value;
                imgShow.src = ruta;
            })            
            imagenElement.innerHTML = `<img src="${imagen.src}" alt="${imagen.alt}">`;
            imagenes.appendChild(imagenElement);
        });
    });
});

//Agregar evento click al icono close
closeIcon.addEventListener('click', ()=>{
    containerShow.classList.remove('show');
});

/*window.onload = ()=>{    
    // Obtenemos la categoría seleccionada
    const categoriaSeleccionada = 'paisajes';                
    // Limpiamos las imágenes actuales
    imagenes.innerHTML = '';    
    // Agregamos las imágenes de la categoría seleccionada
    imagenesPorCategoria[categoriaSeleccionada].forEach((imagen,index) => {
        const imagenElement = document.createElement('div');            
        imagenElement.classList.add(`img-${index}`);
        imagenElement.addEventListener('click',(e)=>{
            containerShow.classList.toggle('show');
            let ruta = e.target.attributes[0].value;
            imgShow.src = ruta;
        })            
        imagenElement.innerHTML = `<img src="${imagen.src}" alt="${imagen.alt}">`;
        imagenes.appendChild(imagenElement);                
    });
}
*/