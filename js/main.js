// Proyecto E-commerce Bookland

// Preguntarle al usuario qué libro quiere adquirir
let repetir = true;
while (repetir) {
  const seleccionLibro = prompt(
    "¡Hola, bienvenida! Por favor coloca el nombre del libro que quieres adquirir. Tenemos los siguientes títulos disponibles:" +
      "\n" +
      "-¿Por qué dormimos?" +
      "\n" +
      "-Hábitos atómicos" +
      "\n" +
      "-El diseño de las cosas cotidianas" +
      "\n" +
      "-Una chica como ella" +
      "\n" +
      "-Un bárbaro en París"
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

  // Respuesta: Sí - Agradecimiento de compra
  if (decisionCompra == true) {
    alert("¡Gracias por comprar en nuestra tienda en línea!");
    repetir = false;
  }

  // Respuesta: No - ¿Deseas adquirir otro título?
  if (decisionCompra == false) {
    repetir = confirm("¿Deseas adquirir otro título?");
  }
}

// Función para obtener el precio del libro
function obtenerPrecioLibro(libroSeleccionado) {
  if (libroSeleccionado == "¿Por qué dormimos?") {
    return 360;
  } else if (libroSeleccionado == "Hábitos atómicos") {
    return 299;
  } else if (libroSeleccionado == "El diseño de las cosas cotidianas") {
    return 625;
  } else if (libroSeleccionado == "Una chica como ella") {
    return 200;
  } else if (libroSeleccionado == "Un bárbaro en París") {
    return 350;
  }

  return 0;
}
