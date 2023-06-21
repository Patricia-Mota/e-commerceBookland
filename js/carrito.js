emailjs.init("KKnHOiLUbVkoNqm-r");

const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function renderList() {
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

  carrito.forEach((libro, index) => {
    const contenedorListLibros = document.querySelector("#lista-libros");
    const rowLibro = document.createElement("div");
    rowLibro.className = "libroDatosWrapper";

    const rowLibroImg = document.createElement("img");
    rowLibroImg.src = libro.imagen;
    rowLibroImg.alt = libro.nombre;
    rowLibroImg.className = "imgLibroAComprar";

    const rowLibroTitle = document.createElement("h3");
    rowLibroTitle.innerText = libro.nombre;
    rowLibroTitle.className = "titleLibro";

    const rowLibroAuthor = document.createElement("p");
    rowLibroAuthor.innerText = libro.autor;
    rowLibroAuthor.className = "autorLibro";

    const rowLibroUnitPrice = document.createElement("p");
    rowLibroUnitPrice.innerText = `$${libro.precio} MXN`;
    rowLibroUnitPrice.className = "costosLibros";

    const rowLibroQuantity = document.createElement("input");
    rowLibroQuantity.type = "number";
    rowLibroQuantity.min = 1;
    rowLibroQuantity.value = libro.cantidad;
    rowLibroQuantity.className = "cantidadLibros";

    const rowLibroDelete = document.createElement("button");
    rowLibroDelete.innerText = "Eliminar";
    rowLibroDelete.className = "boton";
    rowLibroDelete.addEventListener("click", (e) => {
      carrito.splice(index, 1);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      contenedorListLibros.innerHTML = "";
      renderList();
    });

    const rowLibroTotal = document.createElement("p");
    rowLibroTotal.innerText = `$${libro.precio * libro.cantidad} MXN`;
    rowLibroTotal.className = "costosLibros";

    rowLibro.appendChild(rowLibroImg);
    rowLibro.appendChild(rowLibroTitle);
    rowLibro.appendChild(rowLibroAuthor);
    rowLibro.appendChild(rowLibroUnitPrice);
    rowLibro.appendChild(rowLibroQuantity);
    rowLibro.appendChild(rowLibroDelete);
    rowLibro.appendChild(rowLibroTotal);

    contenedorListLibros.appendChild(rowLibro);
  });
}

renderList();

const formPagar = document.querySelector("#form-pagar");
formPagar.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.querySelector("#to-email").value;

  const precioSubTotal = document.querySelector("#subtotal").innerText;
  const iva = document.querySelector("#iva").innerText;
  const total = document.querySelector("#total").innerText;
  const resumen = `Subtotal: ${precioSubTotal}
  IVA: ${iva}
  Total: ${total}`;

  const templateParams = {
    to_email: email,
    resumen_compra: resumen,
  };
  await emailjs.send("facturas_test", "facturas_test", templateParams);
  alert("¡Gracias por tu compra! Te hemos enviado un correo de confirmación");
});
