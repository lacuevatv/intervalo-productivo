# intervalo productivo
(Sitio auto administrable)

## Versiones:
- 1.0 15/9/18:  
* Instalación administrador
* Modificación del front para recibir data de administrador:
- Se pasa lo html a php y se arma un header y footer estático
- Se arman las funciones para pedir datos en base de datos
- Nueva carpeta contenido donde se guarda todo lo subido dinámicamente

## Estructura
* .htaccess redirige todo a index
* index.php solo sirve como roter y busca la pagina en pages
* en index una función parsea el url luego del host y la carpeta definida en config que contiene el sitio (si no hay ninguna carpeta la omite) : dominio.com/carpeta-definida/pagina-actual/ Luego del dominio y la carpeta definida, lo que sigue es la pagina a buscar, esta pagina se busca en la carpeta pages, por defecto, esa página es inicio, pero sino busca las otras

## Instalación:
### Front:
* Javascript: archivo propio: custom.js, se edita la variable baseUrl si esta instalado en otra carpeta
* Archivo '/inc/config.php', se edita el nombre de base de datos y si está instalado en otra carpeta se define en la CONSTANTE Carpeta servidor: '/nombre-carpeta'
* No olvidar subir el archivo oculto .httaccess y si no está instalado en la raís del sitio hay que modificar: RewriteBase y cambiar la / por /nombre-carpeta

### Administrador:
* Primero poner nombre, usuario y password de base de datos
* si cambias el nombre de la carpeta "contenido" también deberías cmabiar la CONSTANTE ahí
* Podés poner la carpeta que quieras, pero en el archivo /inc/config.php deberías editar la CONSTANTE "URLADMINISTRADOR" para ponerle el nombre de la carpeta  
* Más abajo, si querés cambiar el nombre de usuario, en la variable usertype, le podés poner el nombre que quieras, el status no se puede cambiar.  
* Javascript: archivo: '/assets/js/admin-script.js', hay que modificar las primeras variables: 'baseUrl' y 'administradorUrl'  

## Notas:
La estructura funciona con permalinks y redireccionamiento a través de htaccess.
Todos llegan al index.php y desde ahí se redirecciona a las pages correspondientes

### Librerias utilizadas

#### PHP version 5.6

#### MySQL version 5.6
