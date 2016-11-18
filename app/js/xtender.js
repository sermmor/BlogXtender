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
 *----------------------------------- Variables globales y funciones principales --------------------------------------
 *---------------------------------------------------------------------------------------------------------------------*/

$(document).ready(function(){
  $('#contentXtenderVistaPrevia').bind("mouseup", function(){
    actualizarPrevisualizacion(); // Añadimos el contenido de dicho span al div de "Previsualización".
  });
});

// Esconde o muestra el div de la id dada.
function toogleDiv(idDiv) {
    $('#'+idDiv).slideToggle(1000);
}

// Quita las tildes, espacios y caracteres raros.
function formatearTitulo(sTitulo) {
    return sTitulo.split(" ").join("").split("á").join("a").split("é").join("e").split("í").join("i").split("ó").join("o").split("ú").join("u").split("Á").join("A").split("É").join("E").split("Í").join("I").split("Ó").join("O").split("Ú").join("U").split("Ü").join("U").split("ü").join("u").split("ñ").join("ny").split("Ñ").join("NY").split("&").join("y").split("@").join("at").split("(").join("").split(")").join("").split(":").join("").split(";").join("").split(".").join("").split(",").join("").split("/").join("").split("\\").join("").split("¿").join("").split("?").join("").split("¡").join("").split("!").join("").split("\"").join("").split("\'").join("").split("$").join("").split("+").join("").split("-").join("").split("*").join("").split("·").join("").split("#").join("").split("%").join("").split("=").join("").split("<").join("").split(">").join("").split("ç").join("").split("Ç").join("");
}

// Cambia los saltos del línea por etiquetas <br />, usamos esta función tanto para la vista previa como para el dialogo de guardar. Para cargar habrá que usar la función inversa. NOTA: Sólo se pasarán los saltos de línea a br si está activada la casilla idPasarABr.
function intercambiaSaltosPorBr(texto) {
    var ret = texto;
    if ($('#idPasarABr')[0].checked) {
        // Sólo se pasarán los saltos de línea a br si está activada la casilla idPasarABr.
        ret = texto.replace(/(\r\n|\n|\r)/gm, "<br />"); // La primera cadena representan los caracteres salto del línea en distintos navegadores y plataformas. Esto siempre funciona.
    }
    return ret
}

// Devuelve el código de la zona notas, usando como contenido para dicha zona el string sTextoZonaNotas.
function createZonaNotas(sTextoZonaNotas) {
    /*CADENA A CONSEGUIR: <hr />\n
<div style="background-color: #E0F8F7;">\n
<i>Notes:</i><span style="font-size: 11px;"><br />\n

AQUÍ VA sTextoZonaNotas QUE, SEGURAMENTE TERMINA CON BR DE FACTO.

</span><br />\n
</div><br />\n*/
    var ret;
    var sFondoNota = "";
    if (sColorNota != "") {
        var sColorNota = $('#txColorZonaNota')[0].value;
        sFondoNota = 'style="background-color: #' + sColorNota + ';"';
    }
    if ($('#idPasarABr')[0].checked) {
        // Sólo se pasarán los saltos de línea a br si está activada la casilla idPasarABr.
        ret = '<hr />\n<div ' + sFondoNota + '>\n<i>Notes:</i><span style="font-size: 11px;"><br />\n' + sTextoZonaNotas.replace(/(\r\n|\n|\r)/gm, "<br />") + '</span><br />\n</div><br />\n';
    } else {
        ret = '<hr />\n<div ' + sFondoNota + '>\n<i>Notes:</i><span style="font-size: 11px;">\n' + sTextoZonaNotas + '</span>\n</div>\n';
    }
    return ret;
}

// Crea el contenido html de la entrada
function createCodeEntry() {
    // Añadimos el contenido + la zona notas (si no está vacía), separados ambos por un br.
    var mitad = intercambiaSaltosPorBr($('#idContenidoTextoXtender')[0].value);
    var sTitulo = $('#idTituloNota')[0].value;
    var aTextoYNotas = convertirLlavesEnNotas(mitad, sTitulo);

    mitad = aTextoYNotas[0]; // Sustituyo el texto antiguo por el sin llaves.
    var contentNotas = aTextoYNotas[1];

    if ((contentNotas != "") && (contentNotas != null)) {
        mitad = mitad + "<br />\n" + createZonaNotas(contentNotas);
    }
    
    return mitad;
}

// Selecciona un rango del texto del textArea textAreaInput.
function setSelectionRange(textAreaInput, initSel, initEnd) {
    if (textAreaInput.setSelectionRange) {
        textAreaInput.focus();
        textAreaInput.setSelectionRange(initSel, initEnd);
    }
    else if (textAreaInput.createTextRange) {
        var range = textAreaInput.createTextRange();
        range.collapse(true);
        range.moveEnd('character', initEnd);
        range.moveStart('character', initSel);
        range.select();
    }
}

// "Cubre" un trozo de texto seleccionado con una etiqueta de inicio (initEtiq) y otra de fin (endEtiq), lo usan todas las herramientas y otras secciones como subrayado color o citar. Si no hay nada seleccionado añadirá consecutivamente ambas etiquetas.
function insertCodigo(initEtiq, endEtiq) {
    // creamos una variable y le definimos el contenido, en este caso es el textarea del formulario
    var textAreaXternder = $('#idContenidoTextoXtender')[0]; // El primer parametro es para asignar el formulario, el segundo es el nombre del formulario y el tercero es el nombre del textarea.
    // Calculo la posición donde colocaré al final el cursor, la cual es textAreaXternder.selectionEnd + número caracteres initEtiq + número caracteres entEtiq.
    var iFinSeleccion = initEtiq.length + textAreaXternder.selectionEnd + endEtiq.length;
    // Creo el nuevo texto a insertar, fusionando todo con el código.
    if(navigator.appName == 'Microsoft Internet Explorer') { // Si navegador es IE.
        if(seleccionado = document.selection.createRange().text) {
            document.selection.createRange().text = initEtiq + seleccionado + endEtiq;
            textAreaXternder.focus();
        } else {
            textAreaXternder.focus();
            document.selection.createRange().text = initEtiq + endEtiq;
        }
    } else { // Si no es el IE.
        textAreaXternder.value = textAreaXternder.value.substring(0,textAreaXternder.selectionStart) + initEtiq + textAreaXternder.value.substring(textAreaXternder.selectionStart,textAreaXternder.selectionEnd) + endEtiq +textAreaXternder.value.substring(textAreaXternder.selectionEnd,textAreaXternder.value.length) ;
        textAreaXternder.focus();
    }
    // Coloco el cursor del textArea al final de la selección.
    setSelectionRange(textAreaXternder, iFinSeleccion, iFinSeleccion);
}

// Muestra el dialogo de guardar, permite hacerlo tanto como código para insertar en una página web, como código con la página web al completo.
function showExportarDialog() {
    var marcaDeUso = "<br /><br /><i>Created with BlogXtender.</i>";
    
    var principio = '<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN"\n    "http://www.w3.org/TR/xhtmlll/DTD/xhtmlll.dtd">\n<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="es">\n<head>\n    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>\n    <title>BlogXtender - Export</title>\n    <!-- Javascripts -->\n    <script type="text/javascript" src="js/jquery.js"></script>\n    <script type="text/javascript" src="js/eske.js"></script>\n\n</head>\n\n<body>\nCode html embedded (to post in a blog or a website):<br />\n<textarea id="idCodigoCompatible" name="codigoCompatible" rows="15" cols="93">';
    // Crear contenido compatible.
    var contenidoCompatible = createCodeEntry();
    var mitad = '</textarea><br /><br />\nComplete HTML code (for create a webside with it):<br />\n<textarea id="idCodigoNoCompatible" name="codigoNoCompatible" rows="15" cols="93">';
    // Crear contenido no compatible.
    var contenidoNoCompatible = '<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN"\n    "http://www.w3.org/TR/xhtmlll/DTD/xhtmlll.dtd">\n    \n<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="es">\n<head>\n    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>\n    <title></title>    \n</head>\n\n<body>\n';
    contenidoNoCompatible = contenidoNoCompatible + contenidoCompatible;
    contenidoNoCompatible = contenidoNoCompatible + marcaDeUso;
    contenidoNoCompatible = contenidoNoCompatible + "\n</body>\n</html>\n";
    var final = '</textarea><br /><br />\n</body>\n</html>\n';
    
    // Uno todas las partes y las guardo en la ventana externa.
    var windowsSaveOpen = window.open("", "small", "width=800,height=600,toolbar=0,status=0");
    windowsSaveOpen.document.write(principio + contenidoCompatible + mitad + contenidoNoCompatible + final);
    windowsSaveOpen.document.close();
}

// Función que imprime el contenido de la vista previa.
function showImprimirDialog() {
    data = $("#contentXtenderVistaPrevia").html() // CÓDIGO HTML A IMPRIMIR.

    var mywindow = window.open('', 'my div', 'height=400,width=600');
    mywindow.document.write('<html><head><title></title>');
    /*optional stylesheet*/ //mywindow.document.write('<link rel="stylesheet" href="main.css" type="text/css" />');
    mywindow.document.write('</head><body >');
    mywindow.document.write(data);
    mywindow.document.write('</body></html>');

    mywindow.print();
    mywindow.close();

    return true;
}