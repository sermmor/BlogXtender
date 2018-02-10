/** 
 * Copyright (C) 2012  Sergio Martín Moreno
 * 
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
 */

/*---------------------------------------------------------------------------------------------------------------------
 *--------------------------------------- MANEJADORES DE ATAJO DE TECLADO ---------------------------------------------
 *---------------------------------------------------------------------------------------------------------------------*/
// Se usa el plugin shortcut.js de JQuery, ya que son atajos de teclado que usan combinaciones de letras. Usaré combinaciones con la tecla Alt en su mayoría. Con la tecla Ctrl procuraré usar sólo los típicos para negrita (Ctrl+N), doblada (Ctrl+I) y demás.

// Tras esta última mejora, esto puede ayudar a hacer una especie de plugins/macros (dada una combinación de teclas, hace un algo repetitivo dentro de un function).

// El tema va así [COLECCIÓN DE ATAJOS] ={entro dentro de un elemento cualquiera}=> [COMBINACION_TECLAS, FUNCIÓN_A_LANZAR] ={dentro de COMBINACIÓN_TECLAS}=> [Tecla1, Tecla2]
var todoAtajo = [
                [["Alt", "h"], function() {toogleDiv('idHerramientas');}], // Alt+H = Abrir y cerrar Herramientas.
                [["Alt", "e"], function() {toogleDiv('idEdicion');}], // Alt+E = Abrir y cerrar Herramientas.
                [["Alt", "t"], function() {toogleDiv('idTabla');}], // Alt+T = Abrir y cerrar Tabla.
                [["Alt", "s"], function() {toogleDiv('idSubrayadoColor');}], // Alt+S = Abrir y cerrar Subrayado Color.
                [["Alt", "c"], function() {toogleDiv('idCitar');}], // Alt+C = Abrir y cerrar Citar.
                [["Alt", "f"], function() {toogleDiv('idFraseLateral');}], // Alt+F = Abrir y cerrar Frase Lateral.
                [["Alt", "y"], function() {toogleDiv('idYoutubeInsert');}], // Alt+Y = Abrir y cerrar sección para insertar Youtube.
                [["Alt", "i"], function() {toogleDiv('idImagen');}], // Alt+I = Abrir y cerrar Imagen.
                [["Alt", "l"], function() {toogleDiv('idListImagenes');}], // Alt+L = Abrir y cerrar Lista imágenes.
                [["Alt", "z"], function() {toogleDiv('idZonaNotas');}], // Alt+Z = Abrir y cerrar Zona notas.
                [["Ctrl", "b"], function() {insertBold();}], // Ctrl+B = Acción de botón negrita.
                [["Ctrl", "i"], function() {insertItalic();}] // Ctrl+I = Acción de botón doblada.
                ];



// Asigno todos los atajos guardados en todoAtajo.
for (var i = 0; i < todoAtajo.length; i++) {
    shortcut.add(todoAtajo[i][0][0]+"+"+todoAtajo[i][0][1], todoAtajo[i][1]);
}

