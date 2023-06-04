// Proyecto E-commerce Bookland

const librosDisponibles = [
  {
    id: "b0001",
    nombre: "¿Por qué dormimos?",
    autor: "Matthew Walker",
    precio: 360,
    imagen: "../assets/img/Libros/por-que-dormimos.jpeg",
  },
  {
    id: "b0002",
    nombre: "Hábitos atómicos",
    autor: "James Clear",
    precio: 299,
    imagen: "../assets/img/Header/atomic-habits-img-2.png",
  },
  {
    id: "b0003",
    nombre: "El diseño de las cosas cotidianas",
    autor: "Donald A. Norman",
    precio: 625,
    imagen: "../assets/img/Libros/the-design-of-everyday-things.jpeg",
  },
  {
    id: "b0004",
    nombre: "Una chica como ella",
    autor: "Marc Levy",
    precio: 200,
    imagen: "../assets/img/Libros/una-chica-como-ella.jpeg",
  },
  {
    id: "b0005",
    nombre: "Un bárbaro en París",
    autor: "Un bárbaro en París",
    precio: 350,
    imagen: "../assets/img/Libros/un-barbaro-en-paris.jpeg",
  },
  {
    id: "b0006",
    nombre: "Tres meses",
    autor: "Joana Marcús",
    precio: 370,
    imagen: "../assets/img/Libros/tres-meses.png",
  },
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let totalSuma = 0;
for (let libroEnCarrito of carrito) {
  totalSuma = totalSuma + libroEnCarrito.cantidad;
}
const totalCarrito = document.querySelector("#total-carrito");
totalCarrito.innerText = totalSuma;

librosDisponibles.forEach((libro) => {
  const libroForm = document.querySelector(`#${libro.id}`);
  libroForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const cantidad = parseInt(e.target.cantidadLibros.value);
    carrito.push({
      id: libro.id,
      nombre: libro.nombre,
      autor: libro.autor,
      precio: libro.precio,
      imagen: libro.imagen,
      cantidad: cantidad,
    });

    let totalSuma = 0;
    for (let libroEnCarrito of carrito) {
      totalSuma = totalSuma + libroEnCarrito.cantidad;
    }
    const totalCarrito = document.querySelector("#total-carrito");
    totalCarrito.innerText = totalSuma;
    localStorage.setItem("carrito", JSON.stringify(carrito));
  });
});

// Preguntarle al usuario qué libro quiere adquirir
let totalAcumulado = 0;
let repetir = false;
while (repetir) {
  const nombresLibros = librosDisponibles.map((libro) => libro.nombre);
  let listaDeLibros = nombresLibros.join("\n- ");
  listaDeLibros = "\n- " + listaDeLibros;

  const seleccionLibro = prompt(
    "¡Hola, bienvenida! Por favor coloca el nombre del libro que quieres adquirir. Tenemos los siguientes títulos disponibles:" +
      listaDeLibros
  );

  // Precios de cada libro
  let precioLibro = obtenerPrecioLibro(seleccionLibro);

  // Mostrando al usuarix el precio del libro que escribió
  let decisionCompra = confirm(
    "¡Excelente! El precio del libro que seleccionaste es de $" +
      precioLibro +
      ".00 MXN" +
      "\n" +
      "¿Deseas adquirirlo?"
  );

  // Respuesta: Sí - Sumar al total
  if (decisionCompra == true) {
    totalAcumulado = suma(totalAcumulado, precioLibro);
    repetir = confirm(
      "Su total actual es de: $" +
        totalAcumulado +
        ".00 MXN. ¿Deseas adquirir otro título?"
    );
  }

  // Respuesta: No - ¿Deseas adquirir otro título?
  if (decisionCompra == false) {
    repetir = confirm("¿Deseas adquirir otro título?");
  }
}

// Función para obtener el precio del libro
function obtenerPrecioLibro(libroSeleccionado) {
  const libroEncontrado = librosDisponibles.find(
    (libro) => libro.nombre === libroSeleccionado
  );

  if (libroEncontrado) {
    return libroEncontrado.precio;
  } else {
    return 0;
  }
}

function suma(totalAcumulado, precioLibro) {
  return totalAcumulado + precioLibro;
}
