# Boss Creator — Nuzlocke Tracker

Tracker web para crear partidas de Pokémon de generaciones 1–7 y diseñar bosses con equipos personalizados.

## Flujo
1. **New Game** → elegir juego de Gen 1 a Gen 7 → **Create Game**.
2. Dentro de la partida → **Crear boss** → Elite Four / Campeón, Líder de Gimnasio, Rival o Equipo Enemigo.
3. Añadir nombre y foto del boss.
4. Entrar al boss → **Agregar Pokémon** → Pokémon, nivel, habilidad, objeto y 4 movimientos.
5. **Finish** genera la guía visual con movimientos, potencia, categoría, habilidad, objeto y las seis estadísticas.
6. **Editar boss** y **Editar** Pokémon permiten corregir errores.

## Datos
- La lista de Pokémon se limita a los Pokémon de Gen 1–7 y a las Megas/Primal Reversions de la etapa Gen 6–7.
- Los datos de Pokémon se cargan desde PokéAPI en el navegador; cuando existe historial, se usa el valor previo a Gen VIII para aproximar los datos de Gen VII.
- Los movimientos se filtran a los 728 movimientos disponibles hasta Gen VII y sus valores históricos se consultan desde PokéAPI.
- Las estadísticas del PDF proporcionado se usaron como referencia para el formato y los valores de Gen VII.

## Guardado
Las partidas se guardan en `localStorage` del navegador. Las fotos de los bosses se redimensionan y se guardan localmente.

## Publicación
Incluye un workflow de GitHub Pages. En el repositorio, configura **Settings → Pages → Source: GitHub Actions** para publicar la rama `main`.
