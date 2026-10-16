/*
esperemos que la la pagina este lista
Esto garantiza que el codigo de javacscrip se ejecute unicamnete cuando tood el HTML ha sido completamente por el navegador, sin importar si el scrip


*/
document.addEventListener('DOMContentLoaded', () => {
    const formLogin = document.getElementById('formLogin');
    const mensaje = document.getElementById('divMensaje');
    if (formLogin){
        //escuchamos estrictamente el events Submit del formulario
        formLogin.addEventListener('submit',async (e) => {
            //3. evitamos que la pagina se recarge 
            e.preventDefault();
            const usuario = document.getElementById('txtUsuario').value.trim();
            const password = document.getElementById('txtPassword').value.trim();
            
            //Comprobación dinamica en Fronted (Ahorra peticiones innecesarias)
            if (usuario === "" || password === ""){
                mensaje.textContent = "Por favor, llena todos los campos."
                return;
            }

            mensaje.textContent = "Procesando...";

            try {
                const respuesta = await fetch('../../backend/api/login-proceso.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ usuario, password })
                })

                const datos = await respuesta.json();

                if (datos.status === 'success') {
                    //El servidor nos dice a donde redirigir segun el rol
                    window.location.href = datos.redirect;
                } else {
                    mensaje.textContent = datos.message;
                }

            } catch (error) {
                mensaje.textContent = "Error al conectar con el servidor.";
            }
            
        } );
    }
});

/*document.getElementById('formLogin').addEventListener('submit', async (e) =>{
        e.preventDefault();//Detener el envio tradicional de HTML

        const usuario = document.getElementById('txtUsuario').value.trim();
        const password = document.getElementById('txtPassword').value.trim();
        const mensaje = document.getElementById('divMensaje');

        //Comprobación dinamica en Fronted (Ahorra peticiones innecesarias)
        if (usuario === "" || password === ""){
            mensaje.textContent = "Por favor, llena todos los campos."
            return;
        }

        mensaje.textContent = "Procesando...";

        try {
            const respuesta = await fetch('../../backend/api/login-proceso.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ usuario, password })
            })

            const datos = await respuesta.json();

            if (datos.status === 'success') {
                //El servidor nos dice a donde redirigir segun el rol
                window.location.href = datos.redirect;
            } else {
                mensaje.textContent = datos.message;
            }

        } catch (error) {
            mensaje.textContent = "Error al conectar con el servidor.";
        }
    });
    */
