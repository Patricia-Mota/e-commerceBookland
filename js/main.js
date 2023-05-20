// Proyecto E-commerce Bookland

const librosDisponibles = [
  {
    nombre: "¿Por qué dormimos?",
    precio: 360,
  },
  {
    nombre: "Hábitos atómicos",
    precio: 299,
  },
  {
    nombre: "El diseño de las cosas cotidianas",
    precio: 625,
  },
  {
    nombre: "Una chica como ella",
    precio: 200,
  },
  {
    nombre: "Un bárbaro en París",
    precio: 350,
  },
];

// Preguntarle al usuario qué libro quiere adquirir
let totalAcumulado = 0;
let repetir = true;
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

alert(
  "¡Gracias por comprar en nuestra tienda en línea! Su total fue de: $" +
    totalAcumulado +
    ".00 MXN"
);

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
