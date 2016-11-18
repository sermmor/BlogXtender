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

// Limpia el formulario de enlazar noticia en la zona de notas.
function limpiaEnlazarNoticiasInNotas() {
    $('#txTituloNoticiaNota')[0].value = "";
    $('#txEnlaceNoticiaNota')[0].value = "http://";
    $('#txAutorNoticiaNota')[0].value = "";
    $('#txMedioNoticiaNota')[0].value = "";
    $('#txFechaNoticiaNota')[0].value = "";
}

// Función para insertar una noticia como nota en el texto.
function insertLinkNoticiaInNotas() {
    /* Las noticias se insertarán en el siguiente formato:
    {<i><a href="[LINK_NOTICIA]">[TITULO_NOTICIA]</a>, [AUTOR_NOTICIA] ([MEDIO], [FECHA])</i>}
    p.e.: {<i><a href="http://elpais.com/elpais/2012/09/07/gente/1347025151_151246.html">Angela fue una chica divertida</a>, Juan Jesús Aznarez (El País, 8 SEP 2012)</i>} */
    var sNoticia = "{<i><a href=\"" + $('#txEnlaceNoticiaNota')[0].value + "\" target='_blank'>" + $('#txTituloNoticiaNota')[0].value + "</a>, " + $('#txAutorNoticiaNota')[0].value + " (" + $('#txMedioNoticiaNota')[0].value + ", " + $('#txFechaNoticiaNota')[0].value + ")</i>.}";
    
    // Inserto la noticia en el texto.
    insertCodigo(sNoticia, "");
    // Finalmente limpio el contenido de la sección de enlazar noticia.
    limpiaEnlazarNoticiasInNotas();
}

/* Convierte todos los textos entre llaves en notas. Conseguimos con esto el texto sin notas por un lado, y las notas 
por otro lado. Devuelve ambos datos en un Array. */
function convertirLlavesEnNotas(sTextoCompleto, sTitulo) {
    var aTextoYNotas = new Array();
    aTextoYNotas[0] = sTextoCompleto;
    aTextoYNotas[1] = "";
    
    if ((sTitulo != "") && (sTitulo != null) && ($('#idPasarANotas')[0].checked)) {
        var sTodaNota = "";
        var sFormatTitulo = formatearTitulo(sTitulo);
        var lTextoConLlaves = sTextoCompleto.split("{");
        var iPosCierreLlaves = -1;
        var sNotaN = "";
        var sTextoSinNotas = lTextoConLlaves[0];
        // No tenemos en cuenta el primer elemento (0) porque no contendrá nunca notas.
        var lNotaYNoNota = "";
        for (var i = 1; i < lTextoConLlaves.length; i++) {
            var sNumNota = i.toString();
            lNotaYNoNota = lTextoConLlaves[i].split("}");
            // Preparar para añadir a nota.
            var sNotaCode = '<a href=\"#' + sFormatTitulo + 'Ref' + sNumNota + '\" id=\"' + sFormatTitulo + 'CN' + sNumNota + '\">[' + sNumNota + ']</a> ' + lNotaYNoNota[0] + '\n';
            // Añadir a nota.
            sTodaNota = sTodaNota + sNotaCode;
            // Preparar para añadir a cuerpo.
            var sNotaTextCode = '<a id=\"' + sFormatTitulo + 'Ref' + sNumNota + '\" href=\"#' + sFormatTitulo + 'CN' + sNumNota + '\">[' + sNumNota + ']</a>';
            // Añadir a cuerpo.
            sTextoSinNotas = sTextoSinNotas + sNotaTextCode + lNotaYNoNota[1];
        }
        if (lTextoConLlaves.length > 1) {
            // Añado los resultados al array a devolver.
            aTextoYNotas[0] = sTextoSinNotas;
            aTextoYNotas[1] = sTodaNota;
        }
    }
    return aTextoYNotas;
}

//--------------------------- Pasar de texto con notas a texto con llaves.

function averiguarTitulo(sTextoCompleto) {
    // Hay que buscar algo como {Ref1" href="#} (sin llaves) y devolver lo que se encuentre desde esa posición hasta {CN1">[1]</a>}.
    var sComienzo = "Ref1\" href=\"#"; // Sólo tendrá una ocurrencia.
    var sFin = "CN1\">[1]</a>"; // Tendrá dos ocurrencias.
    var iComienzoTitulo = sTextoCompleto.indexOf(sComienzo) + sComienzo.length;
    var iFinTitulo = sTextoCompleto.indexOf(sFin);
    return sTextoCompleto.substring(iComienzoTitulo, iFinTitulo);
}

function montarTextoNota(lIniNota, iNumeroNota) {
    return lIniNota[0] + iNumeroNota.toString() + lIniNota[1] + iNumeroNota.toString() + lIniNota[2]  + iNumeroNota.toString() + lIniNota[3];
}

function extraerNotas(sTextoCompleto, sTitulo) {
    var listaNotas = [];
    var lIniNota = ["<a href=\"#" + sTitulo + "Ref", "\" id=\"" + sTitulo + "CN", "\">[", "]</a> "];
    var iNumeroNota = 1;

    var bSeguir = true;

    // Montar nota.
    var sNotaCode = montarTextoNota(lIniNota, iNumeroNota);
    while (bSeguir) {
        iNumeroNota++;
        var iComienzoNota = sTextoCompleto.indexOf(sNotaCode) + sNotaCode.length;
        var sNotaToAdd = "";
        var sNotaCode = montarTextoNota(lIniNota, iNumeroNota);
        var iFinNota = sTextoCompleto.indexOf(sNotaCode);
        if (iFinNota > 0) {
            // Hay más notas.
            iFinNota = iFinNota - 1; // Verdadero fin de la nota (resto 1 para que no esté el enter).
            var sNotaToAdd = sTextoCompleto.substring(iComienzoNota, iFinNota);
        } else {
            // Estamos en la última nota.
            sNotaCode = '</span>\n</div>\n';
            iFinNota = sTextoCompleto.length - sNotaCode.length;
            var sNotaToAdd = sTextoCompleto.substring(iComienzoNota, iFinNota - 1);// Resto uno para eliminar el enter final.
            // Ya hemos terminado de añadir notas.
            bSeguir = false;
        }
        // Añado nota (resto dos porque comienza en uno, además de que ya he incrementado el contador antes).
        listaNotas[iNumeroNota - 2] = sNotaToAdd;
    }

    return listaNotas;
}

function getTextoSinZonaNotas(sTextoCompleto, sTitulo) {
    // Para ir bien pero bien seguros, busco donde está la primera nota. El número de caracteres desde <hr /> hasta la primera nota son 93.
    var sTextoPrimeraNota = "<a href=\"#" + sTitulo + "Ref1\" id=\"" + sTitulo + "CN1\">[1]</a> "; // Primera nota.
    var iPosZonaNotas = sTextoCompleto.indexOf(sTextoPrimeraNota) - 93; //93 son los caracteres que hay desde <hr /> hasta 1ª nota.
    return sTextoCompleto.substring(0, iPosZonaNotas);
}

function insertarLlavesNotasEnTexto(sTextoCompleto, sTitulo, listaNotas) {
    // A base de split del código de la nota y concatena con nota de listaNotas.
    var lIniNota = ["<a id=\"" + sTitulo + "Ref", "\" href=\"#" + sTitulo + "CN", "\">[", "]</a>"];
    var sNota = "";
    var lTextoRes = [];
    var sTextoResultado = sTextoCompleto;

    for (var i = 1; i < listaNotas.length + 1; i++) {
        // Sólo puede haber una coincidencia de sNotaCode en el texto y hay tantas notas como longitud tenga listaNotas.
        lTextoRes = sTextoResultado.split(montarTextoNota(lIniNota, i)); // Partimos el texto en dos y eliminamos la nota HTML.
        sTextoResultado = lTextoRes[0] + "{" + listaNotas[i-1] + "}" + lTextoRes[1];
    }

    return sTextoResultado;
}

function convertirTextoConNotasEnLlaves(sTextoCompleto) {
    var sComienzo = "Ref1\" href=\"#"; // Si hay notas, esto sólo tendrá una ocurrencia.
    var iComienzoTitulo = sTextoCompleto.indexOf(sComienzo);
    var sTextoResultado = sTextoCompleto;
    if (iComienzoTitulo > 0) {
        $('#idPasarANotas')[0].checked = true;
        var sTitulo = averiguarTitulo(sTextoCompleto);
        $('#idTituloNota')[0].value = sTitulo;

        var listaNotas = extraerNotas(sTextoCompleto, sTitulo);

        var sTextoSinZonaNotas = getTextoSinZonaNotas(sTextoCompleto, sTitulo);

        var sTextoLlaves = insertarLlavesNotasEnTexto(sTextoSinZonaNotas, sTitulo, listaNotas);

        sTextoResultado = sTextoLlaves;
    }
    return sTextoResultado;
}

function importarNotas() {
    $('#idContenidoTextoXtender')[0].value = convertirTextoConNotasEnLlaves($('#idContenidoTextoXtender')[0].value);
}