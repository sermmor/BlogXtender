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
 *----------------------------- Funcionalidad y demás partes de la parte de Vista Previa ------------------------------
 *---------------------------------------------------------------------------------------------------------------------*/

var rangeTextSelected;
var contenidoNuevo;

function saltoLineaPorBrSinCondicion(sTexto) {
    return sTexto.replace(/(\r\n|\n|\r)/gm, "<br />"); // La primera cadena representan los caracteres salto del línea en distintos navegadores y plataformas. Esto siempre funciona.
}

// Usa los datos de "Color" y el contenido seleccionado para añadir una nueva previsualización a $('#PrevToolsEske')
function actualizarPrevisualizacion() {
    var textDivPrevis = $('#contentXtenderVistaPrevia')[0]; // Texto completo.
    var textSelected = window.getSelection();
    rangeTextSelected = textSelected.getRangeAt(0);
    var sTextSelected = textSelected.toString();
    
    if ((sTextSelected != null) && (sTextSelected != "")) {
        if ($('input[name=subrayadoVistaPrevia]')[1].checked) {
            // Si está el campo color seleccionado creo un span nuevo con el estilo del color, para el div.
            contenidoNuevo = "<span style=\"background-color:" + "#" + $('#txColorSubrayadoVP')[0].value + ";\">" + saltoLineaPorBrSinCondicion(sTextSelected) + "</span>";
            $('#PrevToolsVP')[0].innerHTML = contenidoNuevo;
        } else {
            // Si no está color, añadir al div el estilo de un subrayado normal.
            contenidoNuevo = "<span style=\"text-decoration:underline;\">" + saltoLineaPorBrSinCondicion(sTextSelected) + "</span>";
            $('#PrevToolsVP')[0].innerHTML = contenidoNuevo;
        }
    } else {
        contenidoNuevo = "";
        $('#PrevToolsVP')[0].innerHTML = contenidoNuevo;
    }
}

// Actualiza la vista previa.
function actualizarVistaPrevia() {
    // Se checkeé idPasarABr o no, siempre la vista previa aparecerá con los enter sustituido por etiquetas </br>.
    var valorAnteriorCheckBr = $('#idPasarABr')[0].checked;
    $('#idPasarABr')[0].checked = true;
    // Uno todas las partes y las guardo en la ventana externa.
    var fusion = createCodeEntry();
    // Creado el texto de la vista previa restablezco el valor anterior del check.
    $('#idPasarABr')[0].checked = valorAnteriorCheckBr;
    
    // Guardamos el texto definitivo (variable fusion) en el div.
    $('#contentXtenderVistaPrevia')[0].innerHTML = fusion;
 }
 
// Añade los cambios previsualizados del subrayado.
function aceptarSubrayadoVP() {
    // Borro el contenido seleccionado.
    rangeTextSelected.deleteContents();
    var span = document.createElement("span");
    span.innerHTML = contenidoNuevo;
    // Fragmentamos el span para que quede bien.
    var frag = document.createDocumentFragment(), child;
    while ( (child = span.firstChild) ) {
        frag.appendChild(child);
    }
    // Finalmente insertamos el nuevo nodo con sus respectivos hijos.
    rangeTextSelected.insertNode(frag);
}

