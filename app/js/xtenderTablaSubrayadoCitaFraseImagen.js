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
 *----------------------- Funcionalidad de las partes de tabla, subrayado, cita e imagen. -----------------------------
 *---------------------------------------------------------------------------------------------------------------------*/
// Crea el esqueleto de la tabla con indicaciones en comentarios html.
function insertTable(sNumFil, sNumCol) {
    var iNumFil = parseInt(sNumFil);
    var iNumCol = parseInt(sNumCol);
    var sCadTable = '\n<table>\n<tr style="background: #fcdf6a;">\n';
    // Creo encabezado tabla para cada columna.
    for (var i = 1; i <= iNumCol; i++) {
        sCadTable = sCadTable + '<th scope="col" style="border-bottom: 1px solid #000;"> <!-- Escribe aquí encabezado columna '+ i.toString() +' --> </th>\n';
    }
    sCadTable = sCadTable + "</tr>\n";
    // Insertar esqueleto del contenido de la tabla.
    for (var i = 1; i <= iNumFil; i++) {
        sCadTable = sCadTable + '<tr><!--FILA '+ i.toString() +'-->\n';
        if (i%2 == 1) {
            for (var j = 1; j <= iNumCol; j++) {
                sCadTable = sCadTable + '<td><!-- Escribe aquí el contenido de la casilla ('+ i.toString() + "; " + j.toString() +')--></td>\n';
            }
        } else {
            // Si es una fila par coloreamos la fila.
            for (var j = 1; j <= iNumCol; j++) {
                sCadTable = sCadTable + '<td style="background: #fff7bb;"><!-- Escribe aquí el contenido de la casilla ('+ i.toString() + "; " + j.toString() +')--></td>\n';
            }
        }
        sCadTable = sCadTable + "</tr>\n";
    }
    sCadTable = sCadTable + "</table>\n";
    // insertar sCadTable en el textarea idContenidoTextoXtender, para ello usaré insertCodigo, para que todo quede más inofensivo insertaré una cadena vacía por si acaso puede haber algo seleccionado, y en la etiqueta del final del span le añadiré lo de la tabla.
    insertCodigo("", sCadTable);
}

// Inserta un subrayado de color.
function insertSubrayado(sColor) {
    var sCadSubrayado = '<span style="background: #' + sColor + ';">';
    insertCodigo(sCadSubrayado, "</span>");
}

// Selecciona en el input text con id pasada como parámetro, la cadena del color pasado como parámetro.
function selectColorInTextInput(sIdInput, sColor) { //'#txColorSubrayado'
    $(sIdInput)[0].value = sColor;
}

// Inserta una cita.
function insertCita(sColorBackground, bIsEnBloque) {
    var sInitCita = "<";
    var sEndCita = "</";
    if (bIsEnBloque) {
        sEndCita = sEndCita + "blockquote>";
        sInitCita = sInitCita + 'blockquote style="background: #' + sColorBackground + ';color: #402C00;font-style: oblique;">';
    } else {
        sEndCita = sEndCita + "span>";
        sInitCita = sInitCita + 'span style="background: #' + sColorBackground + ';color: #402C00;font-style: oblique;">';
    }
    
    insertCodigo(sInitCita, sEndCita);
}

// Inserta una imagen.
function insertImagen(sTitleImagen, sAltImagen, sLinkImagen, sPieFoto) {
    /* Recuerda: $('input[name=imagenAlign]')[0].checked == CENTRO;  $('input[name=imagenAlign]')[1].checked == IZQUIERDA; $('input[name=imagenAlign]')[2].checked == DERECHA */
    var sRetImagenYPie = "";
    // Alienación de la imagen.
    if ($('input[name=imagenAlign]')[0].checked) {
        sRetImagenYPie = '<div style="text-align:center;"><a href="';
    } else if ($('input[name=imagenAlign]')[1].checked) {
        sRetImagenYPie = '<div style="float:left;padding-right:20px;"><a href="';
    } else {
        sRetImagenYPie = '<div style="float:right;padding-left:20px;"><a href="';
    }
    // Atributos title y alt de imagen.
    var sTitleYAlt = 'alt="'+ sAltImagen +'" title="'+ sTitleImagen +'"';
    // Enlace a la imagen (a), imagen en sí (img de 400 de tamaño) y pie de la imagen (span centrado a la imagen).
    sRetImagenYPie = sRetImagenYPie + sLinkImagen + '"><img ' + sTitleYAlt + ' src="' + sLinkImagen + '" width="300"></a><br /><div style="text-align:center;font-size: 11px;">' + sPieFoto + "</div></div>";
    
    // Inserto la imagen.
    insertCodigo("", sRetImagenYPie);
    
    // Limpiar toda la zona, para poder insertar otra imagen posteriormente.
    $('#txTitleDeImagen')[0].value = "";
    $('#txAltDeImagen')[0].value = "";
    $('#txUrlImagen')[0].value = "";
    $('#idPieDeFoto')[0].value = "";
    $('input[name=imagenAlign]')[0].checked = true;
    $('input[name=imagenAlign]')[1].checked = false;
    $('input[name=imagenAlign]')[2].checked = false;
}

// Trocea una lista lateral en varios trozos de iNumeroPalabras número de palabras por cada línea
function troceaFraseLateral(sFraseLateral, iNumeroPalabras) {
    var aTrozos = sFraseLateral.split(" ");
    var sFraseTrozos = "";
    var iIndexTrozo = 1;
    for (trozo in aTrozos) {
        if (iIndexTrozo == iNumeroPalabras) {
            sFraseTrozos = sFraseTrozos + aTrozos[trozo] + "\n";
            iIndexTrozo = 1;
        } else {
            sFraseTrozos = sFraseTrozos + aTrozos[trozo] + " ";
        }
        iIndexTrozo = iIndexTrozo + 1;
    }
    
    return sFraseTrozos;
}

// Inserta una frase lateral.
function insertFraseLateral(sFraseLateral) {
    // Alienación de la frase lateral.
    var sCodigo = "";
    var sFinalCodigo = "</span>";
    if ($('input[name=FraseLateralAlign]')[0].checked) {
        sCodigo = '<div style="text-align:center;';
        sFinalCodigo = "</div>";
    } else if ($('input[name=FraseLateralAlign]')[1].checked) {
        sCodigo = '<span style="float:left;padding-right:20px;padding-top:20px;padding-bottom:20px;';
    } else {
        sCodigo = '<span style="float:right;padding-left:20px;padding-top:20px;padding-bottom:20px;';
    }
    // Añado el tipo de letra.
    sCodigo = sCodigo + "font-size: 16pt;font-style: oblique;" + '">';
    // Concateno todo.
    var sFraseConCodigo = sCodigo + troceaFraseLateral(sFraseLateral, 4) + sFinalCodigo;
    
    // Inserto la frase lateral.
    insertCodigo("", sFraseConCodigo);
    
    // Limpiar toda la zona, para poder insertar otra frase lateral posteriormente.
    $('#idTextoFraseLateral')[0].value = "";
    $('input[name=FraseLateralAlign]')[0].checked = true;
    $('input[name=FraseLateralAlign]')[1].checked = false;
    $('input[name=FraseLateralAlign]')[2].checked = false;
}

// Inserta un código de insercción de youtube con alineación y pie de video.
function insertYoutubeCode(sCodigoYoutube, sPieDeVideo) {
    // Alienación de la frase lateral.
    var sCodigo = "";
    var sFinalCodigo = "</span>";
    if ($('input[name=YoutubeInsertAlign]')[0].checked) {
        sCodigo = '<div style="text-align:center;">';
        sFinalCodigo = "</div>";
    } else if ($('input[name=YoutubeInsertAlign]')[1].checked) {
        sCodigo = '<span style="float:left;padding-right:20px;padding-top:20px;padding-bottom:20px;">';
    } else {
        sCodigo = '<span style="float:right;padding-left:20px;padding-top:20px;padding-bottom:20px;">';
    }
    
    // Añado el código de insercción de youtube y tipo de letra.
    sCodigo = sCodigo + sCodigoYoutube +  '<br /><div style="text-align:center;font-size: 11px;">' + sPieDeVideo;
    
    // Concateno todo.
    sCodigo = sCodigo + "</div>" + sFinalCodigo;
    
    // Inserto la frase lateral.
    insertCodigo("", sCodigo);
    
    // Limpiar toda la zona, para poder insertar otra frase lateral posteriormente.
    $('#txYoutubeInsertCode')[0].value = "";
    $('#idPieYoutubeInsert')[0].value = "";
    $('input[name=YoutubeInsertAlign]')[0].checked = true;
    $('input[name=YoutubeInsertAlign]')[1].checked = false;
    $('input[name=YoutubeInsertAlign]')[2].checked = false;
}

