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
 *----------------------------------- Funcionalidad de la parte de Herramientas ---------------------------------------
 *---------------------------------------------------------------------------------------------------------------------*/

// La búsqueda en cuestión no diferencia mayúsculas y minúsculas a la hora de buscar.
function buscaYSelecciona(sTextoABuscar) {
	var sTextoABuscarMinusculas = sTextoABuscar.toLowerCase();
	var sTextAreaXternderMinusculas = $('#idContenidoTextoXtender')[0].value;
	sTextAreaXternderMinusculas = sTextAreaXternderMinusculas.toLowerCase();
	// Ahora que ambos lados están en minúsculas se buscará sin diferencias de usar mayúsculas o minúsculas.
	var iInitSearch = sTextAreaXternderMinusculas.search(sTextoABuscarMinusculas);
	if (iInitSearch != -1) {
		var iEndSearch = iInitSearch + sTextoABuscar.length;
		// Selecciono el rango.
		setSelectionRange($('#idContenidoTextoXtender')[0], iInitSearch, iEndSearch);
	} else {
		setSelectionRange($('#idContenidoTextoXtender')[0], sTextAreaXternderMinusculas.length, sTextAreaXternderMinusculas.length);
	}
}

// Esta función usa funciones de xtenderEdicion.js, hay que exportar dicho *.js para que funcione esta función correctamente.
function reemplazaBuscaYSelecciona(sTextoABuscar, sTextoReemplaza) {
	// Extraigo selección.
	var sTextSelect = extractTextoSeleccionado();
	// Si la cadena actualmente seleccionada no es igual a sTextoABuscar, no reemplazar (NO se distingue mayúsculas y minúsculas).
	if (sTextSelect.toLowerCase() == sTextoABuscar.toLowerCase()) {
		// La cadena es justo la buscada, reemplazar.
		sustituirSeleccionPorTexto(sTextoReemplaza);
	}
	// Por último busco y selecciono.
	buscaYSelecciona(sTextoABuscar);
}

// Busca un punto y aparte en un texto que se ha copiado de un PDF, y lo anota como "*\n".
function vorazColocaPuntoYAparte(sTexto) {
    /* Suele pasar que ".\n" es un punto y aparte. No siempre, pero es una muy buena manera de no pasar tardes poniendo asteriscos (HABEMUS 
    algoritmo abido con probabilidad de error).
    -> CONDICIÓN: número máximo caracteres en las 50 primeras líneas = número máximo de caracteres. Si la línea no supera este máximo menos 
    4 y acaba en ".", reemplazar ".\n" por "*\n", estoy casi seguro que ni Calibre usa un heuristico así. NO ES INFALIBRE, DE AHÍ LO DE "voraz"*/

    // 1 - calcular máximo caracteres en las primeras 50 líneas.
    var iAInspeccionar = 50;
    var iMaxCaracteresXLinea = 0;
    var lTextoSplit = sTexto.split("\n");
    if (lTextoSplit.length < iAInspeccionar) {
        iAInspeccionar = lTextoSplit.length; // Como hay menos de 50 lineas, se inspeccionan todas las del texto.
    }

    for (var i = 0; i < iAInspeccionar; i++) {
        iCandidato = lTextoSplit[i].length;
        if (iCandidato > iMaxCaracteresXLinea) {
            iMaxCaracteresXLinea = iCandidato;
		}
	}
    // 2 - Resto a ese máximo el número que he puesto de rendondeo de fin de línea, que es 4.
    iMaxCaracteresXLinea = iMaxCaracteresXLinea - 4;
    // 3 - Ahora que tenemos el máximo toca colocar los futuros punto y aparte (representados como "*\n").
    var ret = "";
    var frase = "";
    for (var i = 0; i < lTextoSplit.length; i++) {
    	frase = lTextoSplit[i];
        // ¿Acaba en punto? ¿la longitud de la frase es menor que el máximo?
        iLenFrase = frase.length;
        if ((iLenFrase > 0) && (frase[iLenFrase - 1] == ".") && (iLenFrase <= iMaxCaracteresXLinea)) {
            frase = frase + "*"; // Como cumple la condición del ávido Añado el asterisco.
        }
        ret = ret + frase + "\n";
    }

    return ret;
}

// Esta función usa funciones de xtenderEdicion.js, hay que exportar dicho *.js para que funcione esta función correctamente.
function fromPDFFormatToTextFormat() {
	var sTextoSelect = extractTextoSeleccionado();
	// Coloco "*\n" donde podría haber un punto y aparte (siempre se puede poner un * al final de línea manualmente para forzar un punto y aparte).
	sTextoSelect = vorazColocaPuntoYAparte(sTextoSelect);
	// Nos cargamos saltos de línea con línea al final.
	sTextoSelect = sTextoSelect.replace(/-(\r\n|\n|\r)/gm, "");
	// Los saltos de línea que quedan deberían ir separados por espacios, así que los sustituimos por espacios.
	sTextoSelect = sTextoSelect.replace(/(\r\n|\n|\r)/gm, " ");
	// Como sólo se respetan los saltos de línea que acaban en * (convertidos ahoira en " *") hay que crear saltos de línea en dicho sitios.
	sTextoSelect = sTextoSelect.replace(/\* /gm, "\n\n");
	// Quitamos el texto malo e insertamos el texto arreglado.
	sustituirSeleccionPorTexto(sTextoSelect);
}