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
 *----------------------------- Funcionalidad de la parte de Lista de imágenes ----------------------------------------
 *---------------------------------------------------------------------------------------------------------------------*/
var listImagenesToAdd = new Array();
var listPieFoto = new Array();

// Actualiza el div, añadiendo una miniatura de la imagen a las listas, y añade el enlace de la imagen a la lista.
function addListImagenes(sUrlImage, sPieFoto) {
    // Añadir a las listas.
    listImagenesToAdd[listImagenesToAdd.length] = sUrlImage;
    listPieFoto[listPieFoto.length] = sPieFoto;
    
    // Añadir imagen al div $('#idListImages')[0].
    var htmlNewElementoAAnyadir = '<img style="margin:3px;" width="50" src="' + sUrlImage + '" />';
    var $ultimoAnyadido = $(htmlNewElementoAAnyadir);
    $ultimoAnyadido.appendTo('#idListImages');
}

// Inserta la lista de imágenes. 
function insertListImagenes(sHtmlTab) {
    // Si no hay título o la lista está vacía, no se añade lista al contenido.
    if ((sHtmlTab != "") && (sHtmlTab != null) && (listImagenesToAdd.length != 0)) {
        var htmlNewElemToAdd = '<div style="width: 400; border: 1px solid #CCC;text-align:center;">';
        var sHtmlTabForm = formatearTitulo(sHtmlTab);
        // Crear cadena lista javascript con todos los elementos de la listImagenesToAdd y lo mismo para listPieFoto.
        var sListImagenesToAdd = "";
        var nameListImagenesToAdd = 'listaImagenes' + sHtmlTabForm;
        var sListPieFoto = "";
        var nameListPieFoto = 'listaPieFoto' + sHtmlTabForm;
        for (var i = 0; i < listImagenesToAdd.length; i++) {
            sListImagenesToAdd = sListImagenesToAdd + nameListImagenesToAdd + "[" + i + "] = '" + listImagenesToAdd[i] + "';";
            sListPieFoto = sListPieFoto + nameListPieFoto + "[" + i + "] = '" + listPieFoto[i] + "';";
        }
        sListImagenesToAdd = sListImagenesToAdd;
        sListPieFoto = sListPieFoto;
        var nameFunctionChangeImageAndPie = "changeImageAndPie" + sHtmlTabForm;
        // Javascript inicial con la inicialización de las listas y la función para dar funcionalidad al código.
        htmlNewElemToAdd = htmlNewElemToAdd + '<script type="text/javascript">';
        htmlNewElemToAdd = htmlNewElemToAdd + 'var ' + nameListImagenesToAdd + ' =  new Array();' + sListImagenesToAdd;
        htmlNewElemToAdd = htmlNewElemToAdd + 'var ' + nameListPieFoto + ' =  new Array();' + sListPieFoto;
        htmlNewElemToAdd = htmlNewElemToAdd + 'var iIter' + sHtmlTabForm + ' = 0;';
        // Y la función...
        htmlNewElemToAdd = htmlNewElemToAdd + 'function '+ nameFunctionChangeImageAndPie +'() {';
        htmlNewElemToAdd = htmlNewElemToAdd + 'if (iIter' + sHtmlTabForm + ' >= ' + nameListImagenesToAdd + '.length - 1) { iIter'+ sHtmlTabForm +' = -1; }';
        htmlNewElemToAdd = htmlNewElemToAdd + 'iIter'+ sHtmlTabForm +' = iIter'+ sHtmlTabForm +' + 1;';
        htmlNewElemToAdd = htmlNewElemToAdd + 'document.nameImg' + sHtmlTabForm + '.src = ' + nameListImagenesToAdd + '[iIter' + sHtmlTabForm + '];';
        htmlNewElemToAdd = htmlNewElemToAdd + 'document.getElementById("namePie' + sHtmlTabForm + '").innerHTML = ' + nameListPieFoto + '[iIter' + sHtmlTabForm + '];';
        htmlNewElemToAdd = htmlNewElemToAdd + '}';
        // Y la función para las miniaturas...
        htmlNewElemToAdd = htmlNewElemToAdd + 'function '+ nameFunctionChangeImageAndPie +'Min(iIndex) {';
        htmlNewElemToAdd = htmlNewElemToAdd + 'iIter'+ sHtmlTabForm +' = iIndex;';
        htmlNewElemToAdd = htmlNewElemToAdd + 'document.nameImg' + sHtmlTabForm + '.src = ' + nameListImagenesToAdd + '[iIndex];';
        htmlNewElemToAdd = htmlNewElemToAdd + 'document.getElementById("namePie' + sHtmlTabForm + '").innerHTML = ' + nameListPieFoto + '[iIndex];';
        htmlNewElemToAdd = htmlNewElemToAdd + '}';
        htmlNewElemToAdd = htmlNewElemToAdd + '</script>';
        
        // Div con javascript dentro para pasar a siguiente imagen (y de forma circular usando la función), al pulsar encima de la imagen.
        htmlNewElemToAdd = htmlNewElemToAdd + '<div style="cursor:pointer;" onclick="' + nameFunctionChangeImageAndPie +'();">';
        // La primera imagen de la lista aparecerá en grande y cierro el div que contiene el evento.
        htmlNewElemToAdd = htmlNewElemToAdd + '<img style="margin:7px;" name="nameImg' + sHtmlTabForm + '" height="200" src="' + listImagenesToAdd[0] + '" /></div><br />';
        // El pie de imagen primero de la lista.
        htmlNewElemToAdd = htmlNewElemToAdd + '<div id="namePie' + sHtmlTabForm + '" style="text-align:center;">' + listPieFoto[0] + '</div><br />';
        
        // Y el div con el resto de las imágenes y el evento para pasar por ellas.
        htmlNewElemToAdd = htmlNewElemToAdd + '<div style="margin:7px;width: 350;height: 150px;border: 1px solid #CCC;overflow: auto;">';
        for (var i = 0; i < listImagenesToAdd.length; i++) {
            htmlNewElemToAdd = htmlNewElemToAdd + '<img style="margin:7px;" width="150" src="' + listImagenesToAdd[i] + '" title="' + listPieFoto[i] + '" onclick="' + nameFunctionChangeImageAndPie + 'Min(' + i +');" />';
        }
        // Cierre del div de las miniaturas.
        htmlNewElemToAdd = htmlNewElemToAdd + "</div>";
        // Cierre del div de todo el elemento.
        htmlNewElemToAdd = htmlNewElemToAdd + "</div>";
        // Inserto la lista de imágenes (todo el html+javascript).
        insertCodigo("", htmlNewElemToAdd);
    }
    // Limpiar toda la listas, los elementos del "formulario" y el div.
    listImagenesToAdd = new Array();
    listPieFoto = new Array();
    $('#txTitleListImages')[0].value = "";
    $('#txUrlImagenToList')[0].value = "";
    $('#idPieDeFotoToList')[0].value = "";
    $('#idListImages')[0].innerHTML = "";
}

