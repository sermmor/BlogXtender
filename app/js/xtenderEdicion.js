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

/*----------------------------------------------------------------------------------------------------------------
 *----------------------------------- Funcionalidad de la parte de Edición ---------------------------------------
 *----------------------------------------------------------------------------------------------------------------*/

function insertComillas() {
    insertCodigo('&#171;', '&#187;');
}

function insertEspacioWP() {
    insertCodigo('', '&nbsp;');
}

function insertCopyRight() {
    insertCodigo('', '&#169;');
}

function insertMarcaRegistrada() {
    insertCodigo('', '&#174;');
}

function insertMarcaRegistradaTM() {
    insertCodigo('', '&#8482;');
}

function insertRayaLarga() {
    insertCodigo('', '&#8212;');
}

function insertNotaMusical1() {
    insertCodigo('', '&#9834;');
}

function insertNotaMusical2() {
    insertCodigo('', '&#9835;');
}

function insertBold() {
    insertCodigo('<span style="font-weight: bold;">', '</span>');
}

function insertItalic() {
    insertCodigo('<span style="font-style: oblique;">', '</span>');
//    insertCodigo('<i>', '</i>');
}

function insertUnderline() {
    insertCodigo('<span style="text-decoration: underline;">', '</span>');
}

function insertSobreSubrayado() {
    insertCodigo('<span style="text-decoration: overline;">', '</span>');
}

function insertTachado() {
    insertCodigo('<span style="text-decoration: line-through;">', '</span>');
}

function insertSuperindice() {
    insertCodigo('<span style="vertical-align: super;">', '</span>');
}

function insertSubindice() {
    insertCodigo('<span style="vertical-align: sub;">', '</span>');
}


function insertEncabezadoH1() {
    insertCodigo("<h1>", "</h1>");
}

function insertEncabezadoH2() {
    insertCodigo("<h2>", "</h2>");
}

function insertEncabezadoH3() {
    insertCodigo("<h3>", "</h3>");
}


function insertParrafo() {
    var sHtmlTab = $('#txHtmlTab')[0].value;
    var stringTextIdent = "";
    if ((sHtmlTab != "0") && (sHtmlTab != "") && (sHtmlTab != null)) {
        stringTextIdent = ' style="text-indent:' + sHtmlTab + 'pt;"';
    }
    var stringInit = '<p' + stringTextIdent + '>';
    insertCodigo(stringInit, "</p>");
}

function insertQuote() {
    var sHtmlTab = $('#txHtmlTab')[0].value;
    var stringTextIdent = "";
    if ((sHtmlTab != "0") && (sHtmlTab != "") && (sHtmlTab != null)) {
        stringTextIdent = ' style="text-indent:' + sHtmlTab + 'pt;"';
    }
    var stringInit = '<blockquote' + stringTextIdent + '>';
    insertCodigo(stringInit, "</blockquote>");
}

function insertDivIzq() {
    var sHtmlTab = $('#txHtmlTab')[0].value;
    var stringTextIdent = "";
    if ((sHtmlTab != "0") && (sHtmlTab != "") && (sHtmlTab != null)) {
        stringTextIdent = "text-indent:" + sHtmlTab + "pt;";
    }
    var stringInit = '<div style="text-align:left;' + stringTextIdent + '\">';
    insertCodigo(stringInit, "</div>");
}

function insertDivDch() {
    var sHtmlTab = $('#txHtmlTab')[0].value;
    var stringTextIdent = "";
    if ((sHtmlTab != "0") && (sHtmlTab != "") && (sHtmlTab != null)) {
        stringTextIdent = "text-indent:" + sHtmlTab + "pt;";
    }
    var stringInit = '<div style="text-align:right;' + stringTextIdent + '\">';
    insertCodigo(stringInit, "</div>");
}

function insertDivCent() {
    var sHtmlTab = $('#txHtmlTab')[0].value;
    var stringTextIdent = "";
    if ((sHtmlTab != "0") && (sHtmlTab != "") && (sHtmlTab != null)) {
        stringTextIdent = "text-indent:" + sHtmlTab + "pt;";
    }
    var stringInit = '<div style="text-align:center;' + stringTextIdent + '\">';
    insertCodigo(stringInit, "</div>");
}

function insertDivJust() {
    var sHtmlTab = $('#txHtmlTab')[0].value;
    var stringTextIdent = "";
    if ((sHtmlTab != "0") && (sHtmlTab != "") && (sHtmlTab != null)) {
        stringTextIdent = "text-indent:" + sHtmlTab + "pt;";
    }
    var stringInit = '<div style="text-align:justify;' + stringTextIdent + '\">';
    insertCodigo(stringInit, "</div>");
}


function insertLink() {
    // Para el link uso el valor de txHtmlLink
    var stringValueHref = 'href="' + $('#txHtmlLink')[0].value + '"';
    var stringInit = "<a " + stringValueHref + " target='_blank'>"; // Para que se abra el enlace en otra pestaña pongo el _blank
    insertCodigo(stringInit, "</a>");
    $('#txHtmlLink')[0].value = "http://";
}


function insertElementList() {
    insertCodigo("<li>", "</li>");
}

function insertNoOrderList() {
    insertCodigo("<ul>\n    <li>", "</li>\n</ul>");
}

function insertOrderList() {
    insertCodigo("<ol>\n    <li>", "</li>\n</ol>");
}

function insert2Columnas() {
    // Inserto el código para dividir en dos columnas.
    insertCodigo("", "<table><tr><td>\n\n</td><td>\n\n</td></tr></table>");
}

/*function callToEske() {
    // Como la aplicación eske+ no está subida a internet, la tenemos en el directorio others de la aplicación presente.
    var squema = window.open("others/eske+/index.html", "esquema");
}*/

function extractTextoSeleccionado() {
    var textAreaXternder = "";

    if(navigator.appName == 'Microsoft Internet Explorer') { // Si navegador es IE.
        textAreaXternder = document.selection.createRange().text;
    } else { // Si no es el IE.
        var textAreaXternder = $('#idContenidoTextoXtender')[0];
        textAreaXternder = textAreaXternder.value.substring(textAreaXternder.selectionStart,textAreaXternder.selectionEnd);
    }

    return textAreaXternder;
}

function sustituirSeleccionPorTexto(textToInsert) {
    var textAreaXternder = $('#idContenidoTextoXtender')[0];
    var iFinSeleccion = textAreaXternder.selectionStart + textToInsert.length;

    if(navigator.appName == 'Microsoft Internet Explorer') { // Si navegador es IE.
        document.selection.createRange().text = textToInsert;
    } else { // Si no es el IE.
        textAreaXternder.value = textAreaXternder.value.substring(0,textAreaXternder.selectionStart) + textToInsert +textAreaXternder.value.substring(textAreaXternder.selectionEnd,textAreaXternder.value.length) ;
    }
    textAreaXternder.focus();
    // Coloco el cursor del textArea al final de la selección.

    setSelectionRange(textAreaXternder, iFinSeleccion, iFinSeleccion);
}

function insertNoOrderListTransf() {
    /* Extraigo el texto. */
    var sElTexto = extractTextoSeleccionado();

    /* Realizo la sustitución de guiones por código HTML. */
    sElTexto = sElTexto.replace(/- /gi,'    </li><li>');
    sElTexto = '<ul>\n' + sElTexto + '\n</ul>';
    /* Quito el primer </li>, ya que, si lo dejamos, daría error.*/
    sElTexto = sElTexto.replace('</li>','');

    /* Inserto el nuevo texto PERO ELIMINANDO LO ANTIGUO. */
    sustituirSeleccionPorTexto(sElTexto);
}

function insertOrderListTransf() {
    /* Extraigo el texto. */
    var sElTexto = extractTextoSeleccionado();

    /* Realizo la sustitución de guiones por código HTML. */
    sElTexto = sElTexto.replace(/#- /gi,'    </li><li>');
    sElTexto = '<ol>\n' + sElTexto + '\n</ol>';
    /* Quito el primer </li>, ya que, si lo dejamos, daría error.*/
    sElTexto = sElTexto.replace('</li>','');

    /* Inserto el nuevo texto PERO ELIMINANDO LO ANTIGUO. */
    sustituirSeleccionPorTexto(sElTexto);
}

function toMayusculas() {
    sustituirSeleccionPorTexto(extractTextoSeleccionado().toUpperCase());
}

function toMinusculas() {
    sustituirSeleccionPorTexto(extractTextoSeleccionado().toLowerCase());
}
