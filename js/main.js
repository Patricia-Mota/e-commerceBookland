// Proyecto E-commerce Bookland

fetch("./js/libros.json")
  .then((res) => res.json())
  .then((librosDisponibles) => {
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
  });
