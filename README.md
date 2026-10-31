# Entre líneas · PEC2

Sitio web de unas jornadas literarias ficticias dirigido al público joven, desarrollado por **Alejandro Ramón Albaladejo Beltrán** para la PEC2 de Herramientas HTML y CSS II.

Parte de [UOC Boilerplate 3.14.0](https://github.com/uoc-advanced-html-css/uoc-boilerplate/), de Jordi Tarrida. Se mantienen su estructura y configuración de Parcel, ampliadas para el proyecto.

## Páginas

- `src/index.html`: portada tipo póster con CSS Grid y alternativa con Flexbox mediante `@supports`.
- `src/ponentes.html`: nueve ponentes ficticios en una retícula Flexbox.
- `src/jornadas.html`: artículo con fotografías, listas, citas y pseudoclases funcionales.
- `src/participa.html`: formulario, galería, juego de autores y libros, vídeo y mapa.

La cabecera y el pie se comparten mediante los parciales de `src/views/`. Los estilos y scripts están en `src/assets/`.

## Instalación y desarrollo

La versión de Node.js indicada en `.nvmrc` es **24.13.1**. Si utilizas nvm, ejecuta `nvm install` y `nvm use` desde la raíz del proyecto.

```bash
npm ci
npm run dev
```

Abre <http://localhost:8123/>. Para detener el servidor, pulsa Ctrl + C.

## Validación y compilación

```bash
npm run lint:css
npm run build
```

`build` limpia los archivos generados, ejecuta Stylelint y compila con Parcel. El resultado listo para publicar se guarda en `dist/`, incluidas las cuatro páginas enlazadas desde la portada.

El script heredado `npm test` solo muestra un mensaje informativo; no ejecuta pruebas del sitio.

## Tecnologías

- Sass: variables, anidado, función `to-rem()`, parciales e importación con `@use`.
- Metodología BEM y separación de estructura y apariencia.
- Bootstrap 5.3.8 personalizado mediante variables Sass.
- Font Awesome Free 7.3.1.
- Stylelint con reglas de SCSS, nomenclatura BEM y orden de bloques.
- Container queries en las cuatro páginas y capas de cascada.

Las versiones instaladas se fijan en `package-lock.json`.

## Publicación en GitHub y Netlify

El repositorio debe contener el código fuente, los archivos de configuración y el archivo de bloqueo de dependencias. `.gitignore` excluye `node_modules/`, las cachés, `dist/` y los archivos de entorno locales.

`netlify.toml` configura:

- Comando de compilación: `npm run build`.
- Carpeta de publicación: `dist`.

Netlify puede utilizar la versión de Node.js declarada en `.nvmrc`. Antes del despliegue, activa la detección de formularios de Netlify Forms. Tras publicar, comprueba que se detecta `consultas-entre-lineas` y que se recibe una consulta de prueba. El formulario muestra un aviso en local y conserva el mensaje si falla un envío.

Repositorio: <https://github.com/Alexoaab/entre-lineas>.

Sitio en Netlify: pendiente de publicación.

## Accesibilidad y recursos

El sitio incorpora navegación por teclado, foco visible, enlace para saltar al contenido, etiquetas de formulario, mensajes de estado, textos alternativos y un vídeo con subtítulos y transcripción. Las pruebas automáticas no sustituyen la comprobación manual con lectores de pantalla y distintos navegadores.

Los créditos de la web y `recursos-originales/` recogen procedencia, autoría, licencias y originales. Los retratos de ponentes se generaron con ChatGPT/OpenAI; sus nombres y biografías son ficticios. Las fotografías de autores del juego conservan sus atribuciones y licencias. Las tarjetas de los libros son diseños propios y no reproducen cubiertas comerciales.

UOC Boilerplate declara licencia MIT en su `package.json`. Las dependencias y los recursos gráficos mantienen sus licencias respectivas; la licencia de la plantilla no sustituye las de esos recursos.

## Entrega académica

Para la entrega final deben incluirse `src/`, `dist/` recién compilada, los archivos de configuración de la raíz —también los ocultos—, los originales de los recursos y la memoria. No debe incluirse `node_modules/`.

El vídeo de los tres consejos incluido en Participa es contenido de la web. El vídeo técnico de presentación de la PEC, con pantalla, voz y webcam, se prepara por separado.
