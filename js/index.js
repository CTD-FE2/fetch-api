window.onload = () => {
    document.querySelector("#random").onclick = cargarUsuario;
    document.querySelector("#reset").onclick = resetear;
};

function cargarUsuario() {
    fetch('https://randomuser.me/api/')
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            const usuario = data.results[0];
            return {
                nombre: capitalizarTexto(usuario.name.title + " " + usuario.name.first + " " + usuario.name.last),
                mail: usuario.email,
                srcImg: usuario.picture.large
            }
        })
        .then(usuario => {
            console.log(usuario);
            renderizarDatosUsuario(usuario);
        })
        .catch(error => {
            console.error(error);
        });
}

function renderizarDatosUsuario(datos) {
    const usuario = `
        <div class="tarjeta">
            <img src="${datos.srcImg}" alt="">
            <h2>${datos.nombre}</h2>
            <h3>${datos.mail}</h3>
        </div>
    `;
    document.querySelector(".tarjetas").innerHTML += usuario;
}

function resetear() {
    document.querySelector(".tarjetas").innerHTML = "";
}

function capitalizarTexto(texto) {
    return texto.split(" ").map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1)).join(" ");
}