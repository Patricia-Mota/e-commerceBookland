const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let totalSuma = 0;
for (let libroEnCarrito of carrito) {
  totalSuma = totalSuma + libroEnCarrito.cantidad;
}
const totalCarrito = document.querySelector("#total-carrito");
totalCarrito.innerText = totalSuma;

let precioSubtotal = 0;
for (let libroEnCarrito of carrito) {
  const cantidadDeLibros = libroEnCarrito.cantidad;
  const precioDeLibro = libroEnCarrito.precio;
  precioSubtotal = precioSubtotal + precioDeLibro * cantidadDeLibros;
}
const precioSubTotalSpan = document.querySelector("#subtotal");
precioSubTotalSpan.innerText = `${new Intl.NumberFormat("es-mx", {
  style: "currency",
  currency: "mxn",
}).format(precioSubtotal)} MXN`;

const iva = precioSubtotal * 0.16;
const ivaSpan = document.querySelector("#iva");
ivaSpan.innerText = `${new Intl.NumberFormat("es-mx", {
  style: "currency",
  currency: "mxn",
}).format(iva)} MXN`;

const precioTotal = precioSubtotal + iva;
const totalSpan = document.querySelector("#total");
totalSpan.innerText = `${new Intl.NumberFormat("es-mx", {
  style: "currency",
  currency: "mxn",
}).format(precioTotal)} MXN`;

carrito.forEach((libro) => {
  const contenedorListLibros = document.querySelector("#lista-libros");
  const rowLibro = document.createElement("div");

  const rowLibroImg = document.createElement("img");
  rowLibroImg.src = libro.imagen;
  rowLibroImg.alt = libro.nombre;

  const rowLibroTitle = document.createElement("h3");
  rowLibroTitle.innerText = libro.nombre;

  const rowLibroAuthor = document.createElement("p");
  rowLibroAuthor.innerText = libro.autor;

  const rowLibroUnitPrice = document.createElement("p");
  rowLibroUnitPrice.innerText = `$${libro.precio} MXN`;

  const rowLibroQuantity = document.createElement("input");
  rowLibroQuantity.min = 1;
  rowLibroQuantity.max = 1;
  rowLibroQuantity.value = libro.cantidad;

  const rowLibroDelete = document.createElement("button");
  rowLibroDelete.innerText = "Eliminar";

  const rowLibroTotal = document.createElement("p");
  rowLibroTotal.innerText = `$${libro.precio * libro.cantidad} MXN`;

  rowLibro.appendChild(rowLibroImg);
  rowLibro.appendChild(rowLibroTitle);
  rowLibro.appendChild(rowLibroAuthor);
  rowLibro.appendChild(rowLibroUnitPrice);
  rowLibro.appendChild(rowLibroQuantity);
  rowLibro.appendChild(rowLibroDelete);
  rowLibro.appendChild(rowLibroTotal);

  contenedorListLibros.appendChild(rowLibro);
});
