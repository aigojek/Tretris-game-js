let siatka = 
[
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"],
    ["16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"],
    ["31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45"],
    ["46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60"],
    ["61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75"],
    ["76", "77", "78", "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90"],
    ["91", "92", "93", "94", "95", "96", "97", "98", "99", "100", "101", "102", "103", "104", "105"],
    ["106", "107", "108", "109", "110", "111", "112", "113", "114", "115", "116", "117", "118", "119", "120"],
    ["121", "122", "123", "124", "125", "126", "127", "128", "129", "130", "131", "132", "133", "134", "135"],
    ["136", "137", "138", "139", "140", "141", "142", "143", "144", "145", "146", "147", "148", "149", "150"]
]

let col, row, int1, linia_sprawdz, dst_dol, dst_lew, dst_pra, ksztalt = "k1", wariant = "1", wynik = 0, mnoznik = 0, ende = 1, prze = 1;
let los = Math.round(Math.random() * 6) + 1, los_next = Math.round(Math.random() * 6) + 1, los_swap = Math.round(Math.random() * 6) + 1;
let segment_spadanie = "<div class='segment spadanie ziel'></div>";
let best = "kiedys zrobie"

function najlepszy_wynik()
{
    $("#bs").html(best)
}

function silnik()
{
    if($(".spadanie").parent().attr("id") >= 1 && $(".spadanie").parent().attr("id") <= 15)
    {
        col = 0;
    }else if($(".spadanie").parent().attr("id") >= 16 && $(".spadanie").parent().attr("id") <= 30)
    {
        col = 1;
    }else if($(".spadanie").parent().attr("id") >= 31 && $(".spadanie").parent().attr("id") <= 45)
    {
        col = 2;
    }else if($(".spadanie").parent().attr("id") >= 46 && $(".spadanie").parent().attr("id") <= 60)
    {
        col = 3;
    }else if($(".spadanie").parent().attr("id") >= 61 && $(".spadanie").parent().attr("id") <= 75)
    {
        col = 4;
    }else if($(".spadanie").parent().attr("id") >= 76 && $(".spadanie").parent().attr("id") <= 90)
    {
        col = 5;
    }else if($(".spadanie").parent().attr("id") >= 91 && $(".spadanie").parent().attr("id") <= 105)
    {
        col = 6;
    }else if($(".spadanie").parent().attr("id") >= 101 && $(".spadanie").parent().attr("id") <= 120)
    {
        col = 7;
    }else if($(".spadanie").parent().attr("id") >= 121 && $(".spadanie").parent().attr("id") <= 135)
    {
        col = 8;
    }else if($(".spadanie").parent().attr("id") >= 136 && $(".spadanie").parent().attr("id") <= 150)
    {
        col = 9;
    }
    row = siatka[col].indexOf($(".spadanie").parent().attr("id"))
}

function znajdz_w_siatce(y)
{
    for(let x = 0; x < siatka.length; x++)
    {
        for(let z = 0; z < siatka[x].length; z++)
        {
            if(y == siatka[x][z])
            {
                col = x;
                row = z;
            }
        }
    }
}

function kierunki()
{
    let segmenty = $(".spadanie").parent()
    for(let i = 0; i < segmenty.length; i++)
    {
        silnik()
        znajdz_w_siatce($(segmenty[i]).attr("id"))
        if(row + 1 <= 14)
        {
            dst_dol = Number(siatka[col][row + 1])
        }
        if(col - 1 >= 0)
        {
            dst_lew = Number(siatka[col - 1][row])
        }
        if(col + 1 <= 9)
        {
            dst_pra = Number(siatka[col + 1][row])
        }
        
        if($("#" + dst_dol).children().length == 0 || !$("#" + dst_dol).children().hasClass("blok"))
        {
            $("#" + dst_dol).addClass("dostepne_dol")
        }

        if(col - 1 >= 0 || !$("#" + dst_lew).children().hasClass("blok"))
        {
            $("#" + dst_lew).addClass("dostepne_lewo")
        }
        if(col + 1 <= 9 || !$("#" + dst_pra).children().hasClass("blok"))
        {
            $("#" + dst_pra).addClass("dostepne_prawo")
        }
    }
    kolizje()
}

function kolizje()
{
    let segmenty = $(".spadanie").parent()
    for(let i = 0; i <= segmenty.length; i++)
    {
        znajdz_w_siatce($(segmenty[i]).attr("id"))
        if(col - 1 < 0)
        {
            $(".siatka").removeClass("dostepne_lewo")
            if($("#" + siatka[col + 1][row]).children().length != 0 && !$("#" + siatka[col + 1][row]).children().hasClass("spadanie"))
            {
                $(".siatka").removeClass("dostepne_prawo")
            }
            continue;
        }
        if(col + 1 > 9)
        {
            $(".siatka").removeClass("dostepne_prawo")
            if($("#" + siatka[col - 1][row]).children().length != 0 && !$("#" + siatka[col - 1][row]).children().hasClass("spadanie"))
            {
                $(".siatka").removeClass("dostepne_lewo")
            }
            continue;
        }

        if($("#" + siatka[col - 1][row]).children().length != 0 && !$("#" + siatka[col - 1][row]).children().hasClass("spadanie"))
        {
            $(".siatka").removeClass("dostepne_lewo")
        }
        if($("#" + siatka[col + 1][row]).children().length != 0 && !$("#" + siatka[col + 1][row]).children().hasClass("spadanie"))
        {
            $(".siatka").removeClass("dostepne_prawo")
        }
    }
}

function usun_klasy()
{
    $(".siatka").removeClass("dostepne_dol")
    $(".siatka").removeClass("dostepne_lewo")
    $(".siatka").removeClass("dostepne_prawo")
}

function ruszanie()
{
    silnik()
    $(document).on("keypress", (a) =>
    {
        if(ende == 1)
        {
            return;
        }
        if(a.which == 97 && $(".siatka").hasClass("dostepne_lewo"))
        {
            if(col >= 0 && row < 14)
            {
                $(".spadanie").parent().empty()
                $(".dostepne_lewo").append(segment_spadanie)
                usun_klasy()
                kierunki()
                silnik()
                stop_spadanie()
            }
        }
        if(a.which == 100 && $(".siatka").hasClass("dostepne_prawo"))
        {
            if(col <= 8 && row < 14)
            {
                $(".spadanie").parent().empty()
                $(".dostepne_prawo").append(segment_spadanie)
                usun_klasy()
                kierunki()
                silnik()
                stop_spadanie()
            }
        }
        if(a.which == 119)
        {
            rotacja()
            usun_klasy()
            kierunki()
            silnik()
            stop_spadanie()
        }
        if(a.which == 115)
        {
            if(row < 14 && $(".segment").hasClass("spadanie"))
            {
                wynik += 1;
                $(".spadanie").parent().empty()
                $(".dostepne_dol").append(segment_spadanie)
                stop_spadanie()
                usun_klasy()
                kierunki()
                silnik()
            }
        }
        if(a.which == 32)
        {
            let ll = los_swap
            los_swap = los_next
            los_next = ll
            $(".sw").empty()
            $(".ne").empty()
            next_next()
            next_swap()
        }
    })
}

function spadanie()
{
    $("#start").remove()
    ende = 0;
    int1 = setInterval(() =>
    {
        if(row < 14 && $(".segment").hasClass("spadanie"))
        {
            $(".spadanie").parent().empty()
            row++;
            $(".dostepne_dol").append(segment_spadanie)
            usun_klasy()
            kierunki()
            stop_spadanie()
        }
    }, 1000)
}

function stop_spadanie()
{
    let segmenty = $(".spadanie").parent()
    for(let i = 0; i <= segmenty.length; i++)
    {
        znajdz_w_siatce($(segmenty[i]).attr("id"))
        dst_dol = Number(siatka[col][row + 1])
        if(row == 14 || $("#" + dst_dol).children().length > 0 && !$("#" + dst_dol).children().hasClass("spadanie"))
        {
            $(".spadanie").addClass("blok")
            $(".spadanie").removeClass("spadanie")
            linia()
            punktacja()
            prze == "1"
            mnoznik = 0;
            kierunki()
            usun_klasy()
            wyniki()
            nowy_kloc()
            break;
        }
    }
    if($(".end").children().hasClass("blok"))
    {
        clearInterval(int1)
        ende = 1;
        $("body").append("<div id='wynik'>WYNIK:  " + wynik + "</div>")
    }
}

function wyniki()
{
    $("#wynik_live").html(wynik)
}

function linia()
{
    for(let a = 14; a >= 0; a--)
    {
        for(let b = 0; b <= 9; b++)
        {
            if($("#" + siatka[b][a]).children().length == 0)
            {
                break;
            }
            if(b == 9)
            {
                mnoznik += 1;
                if(prze == "1")
                {
                    prze = "0"
                }
                for(let c = 0; c <= 9; c++)
                {
                    $("#" + siatka[c][a]).empty()
                }
                for(let d = a; d >= 0; d--)
                {
                    for(let e = 9; e >= 0; e--)
                    {
                        if($("#" + siatka[e][d]).children().length > 0)
                        {
                            let str = $("#" + siatka[e][d]).children()
                            $("#" + siatka[e][d]).empty()
                            $("#" + siatka[e][d + 1]).append(str)
                        }
                    }
                }
                linia()
            }
        }
    }
}

function punktacja()
{
    if(prze == "1")
    {
        return;
    }
    if(mnoznik == 1)
    {
        wynik += 100
    }
    if(mnoznik == 2)
    {
        wynik += 220
    }
    if(mnoznik == 3)
    {
        wynik += 360
    }
    if(mnoznik == 4)
    {
        wynik += 520
    }
}

function rotacja()
{
    let segmenty = $(".spadanie").parent()
    if(ksztalt == "k2")
    {
        if(wariant == "1")
        {
            znajdz_w_siatce($(segmenty[2]).attr("id"))
            if(row >= 1 && row <= 13)
            {
                if($("#" + siatka[col - 1][row - 1]).children().length == 0 && $("#" + siatka[col][row - 1]).children().length == 0
                && $("#" + siatka[col][row + 1]).children().length == 0)
                {
                    $("#" + siatka[col - 1][row - 1]).append(segment_spadanie)
                    $("#" + siatka[col][row - 1]).append(segment_spadanie)
                    $("#" + siatka[col][row + 1]).append(segment_spadanie)
                    $("#" + siatka[col - 1][row]).empty()
                    $("#" + siatka[col - 1][row + 1]).empty()
                    $("#" + siatka[col + 1][row]).empty()
                    wariant = "2"
                    return;
                }
            }
        }
        if(wariant == "2")
        {
            znajdz_w_siatce($(segmenty[2]).attr("id"))
            if(row >= 1 && row <= 13 && col <= 8)
            {
                if($("#" + siatka[col + 1][row - 1]).children().length == 0 && $("#" + siatka[col + 1][row]).children().length == 0
                && $("#" + siatka[col - 1][row]).children().length == 0)
                {
                    $("#" + siatka[col + 1][row - 1]).append(segment_spadanie)
                    $("#" + siatka[col + 1][row]).append(segment_spadanie)
                    $("#" + siatka[col - 1][row]).append(segment_spadanie)
                    $("#" + siatka[col - 1][row - 1]).empty()
                    $("#" + siatka[col][row - 1]).empty()
                    $("#" + siatka[col][row + 1]).empty()
                    wariant = "3"
                    return;
                }
            }
        }
        if(wariant == "3")
        {
            znajdz_w_siatce($(segmenty[1]).attr("id"))
            if(row >= 1 && row <= 13)
            {
                if($("#" + siatka[col][row - 1]).children().length == 0 && $("#" + siatka[col][row + 1]).children().length == 0
                && $("#" + siatka[col + 1][row + 1]).children().length == 0)
                {
                    $("#" + siatka[col][row - 1]).append(segment_spadanie)
                    $("#" + siatka[col][row + 1]).append(segment_spadanie)
                    $("#" + siatka[col + 1][row + 1]).append(segment_spadanie)
                    $("#" + siatka[col - 1][row]).empty()
                    $("#" + siatka[col + 1][row]).empty()
                    $("#" + siatka[col + 1][row - 1]).empty()
                    wariant = "4"
                    return;
                }
            }
        }
        if(wariant == "4")
        {
            znajdz_w_siatce($(segmenty[1]).attr("id"))
            if(row >= 1 && row <= 13 && col >= 1)
            {
                if($("#" + siatka[col - 1][row]).children().length == 0 && $("#" + siatka[col + 1][row]).children().length == 0
                && $("#" + siatka[col - 1][row + 1]).children().length == 0)
                {
                    $("#" + siatka[col - 1][row]).append(segment_spadanie)
                    $("#" + siatka[col + 1][row]).append(segment_spadanie)
                    $("#" + siatka[col - 1][row + 1]).append(segment_spadanie)
                    $("#" + siatka[col][row - 1]).empty()
                    $("#" + siatka[col + 1][row + 1]).empty()
                    $("#" + siatka[col][row + 1]).empty()
                    wariant = "1"
                    return;
                }
            }
        }
    }
    if(ksztalt == "k3")
    {
        znajdz_w_siatce($(segmenty[1]).attr("id"))
        if(wariant == "1")
        {
            if(row >= 1)
            {
                if($("#" + siatka[col][row - 1]).children().length == 0)
                {
                    $("#" + siatka[col][row - 1]).append(segment_spadanie)
                    $("#" + siatka[col + 1][row]).empty()
                    wariant = "2"
                    return;
                }
            }
        }
        if(wariant == "2")
        {
            znajdz_w_siatce($(segmenty[2]).attr("id"))
            if(col <= 8)
            {
                if($("#" + siatka[col + 1][row]).children().length == 0)
                {
                    $("#" + siatka[col + 1][row]).append(segment_spadanie)
                    $("#" + siatka[col][row + 1]).empty()
                    wariant = "3"
                    return;
                }
            }
        }
        if(wariant == "3")
        {
            znajdz_w_siatce($(segmenty[2]).attr("id"))
            if(row <= 13)
            {
                if($("#" + siatka[col][row + 1]).children().length == 0)
                {
                    $("#" + siatka[col][row + 1]).append(segment_spadanie)
                    $("#" + siatka[col - 1][row]).empty()
                    wariant = "4"
                    return;
                }
            }
        }
        if(wariant == "4")
        {
            znajdz_w_siatce($(segmenty[1]).attr("id"))
            if(col >= 1)
            {
                if($("#" + siatka[col - 1][row]).children().length == 0)
                {
                    $("#" + siatka[col - 1][row]).append(segment_spadanie)
                    $("#" + siatka[col][row - 1]).empty()
                    wariant = "1"
                    return;
                }
            }
        }
    }
    if(ksztalt == "k4")
    {
        if(wariant == "1")
        {
            znajdz_w_siatce($(segmenty[1]).attr("id"))
            if(row >= 1 && row <= 12)
            {
                if($("#" + siatka[col][row - 1]).children().length == 0 && $("#" + siatka[col][row + 1]).children().length == 0
                && $("#" + siatka[col][row + 2]).children().length == 0 && $("#" + siatka[col][row + 1]).children().length == 0)
                {
                    $("#" + siatka[col][row - 1]).append(segment_spadanie)
                    $("#" + siatka[col][row + 1]).append(segment_spadanie)
                    $("#" + siatka[col][row + 2]).append(segment_spadanie)
                    $("#" + siatka[col - 1][row]).empty()
                    $("#" + siatka[col + 1][row]).empty()
                    $("#" + siatka[col + 2][row]).empty()
                    wariant = "2"
                    return;
                }
            }
        }
        if(wariant == "2")
        {
            znajdz_w_siatce($(segmenty[1]).attr("id"))
            if(col >= 1 && col <= 7)
            {
                if($("#" + siatka[col - 1][row]).children().length == 0 && $("#" + siatka[col + 1][row]).children().length == 0
                && $("#" + siatka[col + 2][row]).children().length == 0)
                {
                    $("#" + siatka[col - 1][row]).append(segment_spadanie)
                    $("#" + siatka[col + 1][row]).append(segment_spadanie)
                    $("#" + siatka[col + 2][row]).append(segment_spadanie)
                    $("#" + siatka[col][row - 1]).empty()
                    $("#" + siatka[col][row + 1]).empty()
                    $("#" + siatka[col][row + 2]).empty()
                    wariant = "1"
                    return;
                }
            }
        }
    }
    if(ksztalt == "k5")
    {
        if(wariant == "1")
        {
            znajdz_w_siatce($(segmenty[1]).attr("id"))
            if(row >= 1)
            {
                if($("#" + siatka[col + 1][row - 1]).children().length == 0 && $("#" + siatka[col + 1][row]).children().length == 0)
                {
                    $("#" + siatka[col + 1][row - 1]).append(segment_spadanie)
                    $("#" + siatka[col + 1][row]).append(segment_spadanie)
                    $("#" + siatka[col - 1][row]).empty()
                    $("#" + siatka[col + 1][row + 1]).empty()
                    wariant = "2"
                    return;
                }
            }
        }
        if(wariant == "2")
        {
            znajdz_w_siatce($(segmenty[0]).attr("id"))
            if(col >= 1)
            {
                if($("#" + siatka[col - 1][row]).children().length == 0 && $("#" + siatka[col + 1][row + 1]).children().length == 0)
                {
                    $("#" + siatka[col + 1][row + 1]).append(segment_spadanie)
                    $("#" + siatka[col - 1][row]).append(segment_spadanie)
                    $("#" + siatka[col + 1][row - 1]).empty()
                    $("#" + siatka[col + 1][row]).empty()
                    wariant = "1"
                    return;
                }
            }
        }
    }
    if(ksztalt == "k6")
    {
        if(wariant == "1")
        {
            znajdz_w_siatce($(segmenty[2]).attr("id"))
            if(row <= 13)
            {
                if($("#" + siatka[col - 1][row - 1]).children().length == 0 && $("#" + siatka[col][row + 1]).children().length == 0)
                {
                    $("#" + siatka[col - 1][row - 1]).append(segment_spadanie)
                    $("#" + siatka[col][row + 1]).append(segment_spadanie)
                    $("#" + siatka[col + 1][row - 1]).empty()
                    $("#" + siatka[col][row - 1]).empty()
                    wariant = "2"
                    return;
                }
            }
        }
        if(wariant == "2")
        {
            znajdz_w_siatce($(segmenty[2]).attr("id"))
            if(col <= 8)
            {
                if($("#" + siatka[col][row - 1]).children().length == 0 && $("#" + siatka[col + 1][row - 1]).children().length == 0)
                {
                    $("#" + siatka[col + 1][row - 1]).append(segment_spadanie)
                    $("#" + siatka[col][row - 1]).append(segment_spadanie)
                    $("#" + siatka[col - 1][row - 1]).empty()
                    $("#" + siatka[col][row + 1]).empty()
                    wariant = "1"
                    return;
                }
            }
        }
    }
    if(ksztalt == "k7")
    {
        if(wariant == "1")
        {
            znajdz_w_siatce($(segmenty[1]).attr("id"))
            if(row >= 1)
            {
                if($("#" + siatka[col - 1][row + 1]).children().length == 0 && $("#" + siatka[col][row - 1]).children().length == 0
                && $("#" + siatka[col][row + 1]).children().length == 0)
                {
                    $("#" + siatka[col - 1][row + 1]).append(segment_spadanie)
                    $("#" + siatka[col][row - 1]).append(segment_spadanie)
                    $("#" + siatka[col][row + 1]).append(segment_spadanie)
                    $("#" + siatka[col - 1][row]).empty()
                    $("#" + siatka[col + 1][row + 1]).empty()
                    $("#" + siatka[col + 1][row]).empty()
                    wariant = "2"
                    return;
                }
            }
        }
        if(wariant == "2")
        {
            znajdz_w_siatce($(segmenty[2]).attr("id"))
            if(col <= 8)
            {
                if($("#" + siatka[col - 1][row - 1]).children().length == 0 && $("#" + siatka[col + 1][row]).children().length == 0
                && $("#" + siatka[col - 1][row]).children().length == 0)
                {
                    $("#" + siatka[col - 1][row - 1]).append(segment_spadanie)
                    $("#" + siatka[col + 1][row]).append(segment_spadanie)
                    $("#" + siatka[col - 1][row]).append(segment_spadanie)
                    $("#" + siatka[col - 1][row + 1]).empty()
                    $("#" + siatka[col][row - 1]).empty()
                    $("#" + siatka[col][row + 1]).empty()
                    wariant = "3"
                    return;
                }
            }
        }
        if(wariant == "3")
        {
            znajdz_w_siatce($(segmenty[2]).attr("id"))
            if(row >= 1 && row <= 13)
            {
                if($("#" + siatka[col][row - 1]).children().length == 0 && $("#" + siatka[col][row + 1]).children().length == 0
                && $("#" + siatka[col + 1][row - 1]).children().length == 0)
                {
                    $("#" + siatka[col][row - 1]).append(segment_spadanie)
                    $("#" + siatka[col][row + 1]).append(segment_spadanie)
                    $("#" + siatka[col + 1][row - 1]).append(segment_spadanie)
                    $("#" + siatka[col - 1][row]).empty()
                    $("#" + siatka[col + 1][row]).empty()
                    $("#" + siatka[col - 1][row - 1]).empty()
                    wariant = "4"
                    return;
                }
            }
        }
        if(wariant == "4")
        {
            znajdz_w_siatce($(segmenty[1]).attr("id"))
            if(row >= 1 && row <= 13 && col >= 1)
            {
                if($("#" + siatka[col - 1][row]).children().length == 0 && $("#" + siatka[col + 1][row]).children().length == 0
                && $("#" + siatka[col + 1][row + 1]).children().length == 0)
                {
                    $("#" + siatka[col - 1][row]).append(segment_spadanie)
                    $("#" + siatka[col + 1][row]).append(segment_spadanie)
                    $("#" + siatka[col + 1][row + 1]).append(segment_spadanie)
                    $("#" + siatka[col][row - 1]).empty()
                    $("#" + siatka[col + 1][row - 1]).empty()
                    $("#" + siatka[col][row + 1]).empty()
                    wariant = "1"
                    return;
                }
            }
        }
    }
}

function next_swap()
{
    if(los_swap == 1)
    {
        $("#swap_12").append("<div class='segment ziel mniejsza_siatka_segment'></div>")
        $("#swap_13").append("<div class='segment ziel mniejsza_siatka_segment'></div>")
        $("#swap_17").append("<div class='segment ziel mniejsza_siatka_segment'></div>")
        $("#swap_18").append("<div class='segment ziel mniejsza_siatka_segment'></div>")
    }
    if(los_swap == 2)
    {
        $("#swap_7").append("<div class='segment czer mniejsza_siatka_segment'></div>")
        $("#swap_8").append("<div class='segment czer mniejsza_siatka_segment'></div>")
        $("#swap_12").append("<div class='segment czer mniejsza_siatka_segment'></div>")
        $("#swap_17").append("<div class='segment czer mniejsza_siatka_segment'></div>")
    }
    if(los_swap == 3)
    {
        $("#swap_7").append("<div class='segment nieb mniejsza_siatka_segment'></div>")
        $("#swap_13").append("<div class='segment nieb mniejsza_siatka_segment'></div>")
        $("#swap_12").append("<div class='segment nieb mniejsza_siatka_segment'></div>")
        $("#swap_17").append("<div class='segment nieb mniejsza_siatka_segment'></div>")
    }
    if(los_swap == 4)
    {
        $("#swap_8").append("<div class='segment zolt mniejsza_siatka_segment'></div>")
        $("#swap_13").append("<div class='segment zolt mniejsza_siatka_segment'></div>")
        $("#swap_18").append("<div class='segment zolt mniejsza_siatka_segment'></div>")
        $("#swap_23").append("<div class='segment zolt mniejsza_siatka_segment'></div>")
    }
    if(los_swap == 5)
    {
        $("#swap_7").append("<div class='segment poma mniejsza_siatka_segment'></div>")
        $("#swap_12").append("<div class='segment poma mniejsza_siatka_segment'></div>")
        $("#swap_18").append("<div class='segment poma mniejsza_siatka_segment'></div>")
        $("#swap_13").append("<div class='segment poma mniejsza_siatka_segment'></div>")
    }
    if(los_swap == 6)
    {
        $("#swap_17").append("<div class='segment turk mniejsza_siatka_segment'></div>")
        $("#swap_12").append("<div class='segment turk mniejsza_siatka_segment'></div>")
        $("#swap_8").append("<div class='segment turk mniejsza_siatka_segment'></div>")
        $("#swap_13").append("<div class='segment turk mniejsza_siatka_segment'></div>")
    }
    if(los_swap == 7)
    {
        $("#swap_7").append("<div class='segment fiol mniejsza_siatka_segment'></div>")
        $("#swap_18").append("<div class='segment fiol mniejsza_siatka_segment'></div>")
        $("#swap_12").append("<div class='segment fiol mniejsza_siatka_segment'></div>")
        $("#swap_17").append("<div class='segment fiol mniejsza_siatka_segment'></div>")
    }
}

function next_next()
{
    if(los_next == 1)
    {
        $("#next_12").append("<div class='segment ziel'></div>")
        $("#next_13").append("<div class='segment ziel'></div>")
        $("#next_17").append("<div class='segment ziel'></div>")
        $("#next_18").append("<div class='segment ziel'></div>")
    }
    if(los_next == 2)
    {
        $("#next_7").append("<div class='segment czer'></div>")
        $("#next_8").append("<div class='segment czer'></div>")
        $("#next_12").append("<div class='segment czer'></div>")
        $("#next_17").append("<div class='segment czer'></div>")
    }
    if(los_next == 3)
    {
        $("#next_7").append("<div class='segment nieb'></div>")
        $("#next_13").append("<div class='segment nieb'></div>")
        $("#next_12").append("<div class='segment nieb'></div>")
        $("#next_17").append("<div class='segment nieb'></div>")
    }
    if(los_next == 4)
    {
        $("#next_8").append("<div class='segment zolt'></div>")
        $("#next_13").append("<div class='segment zolt'></div>")
        $("#next_18").append("<div class='segment zolt'></div>")
        $("#next_23").append("<div class='segment zolt'></div>")
    }
    if(los_next == 5)
    {
        $("#next_7").append("<div class='segment poma'></div>")
        $("#next_12").append("<div class='segment poma'></div>")
        $("#next_18").append("<div class='segment poma'></div>")
        $("#next_13").append("<div class='segment poma'></div>")
    }
    if(los_next == 6)
    {
        $("#next_17").append("<div class='segment turk'></div>")
        $("#next_12").append("<div class='segment turk'></div>")
        $("#next_8").append("<div class='segment turk'></div>")
        $("#next_13").append("<div class='segment turk'></div>")
    }
    if(los_next == 7)
    {
        $("#next_7").append("<div class='segment fiol'></div>")
        $("#next_18").append("<div class='segment fiol'></div>")
        $("#next_12").append("<div class='segment fiol'></div>")
        $("#next_17").append("<div class='segment fiol'></div>")
    }
}

function nowy_kloc()
{
    eval("b" + los_next + "()")
    wariant = "1";
    los_next = los_swap;
    los_swap = Math.round(Math.random() * 6) + 1;
    $(".sw").empty()
    $(".ne").empty()
    next_next()
    next_swap()
    kierunki()
    silnik()
}

function b1()
{
    let ziel = "<div class='segment spadanie ziel'></div>"
    segment_spadanie = "<div class='segment spadanie ziel'></div>"
    ksztalt = "k1";
    $("#61").append(ziel)
    $("#62").append(ziel)
    $("#76").append(ziel)
    $("#77").append(ziel)
}

function b2()
{
    let czer = "<div class='segment spadanie czer'></div>"
    segment_spadanie = "<div class='segment spadanie czer'></div>"
    ksztalt = "k2";
    $("#61").append(czer)
    $("#62").append(czer)
    $("#76").append(czer)
    $("#91").append(czer)
}

function b3()
{
    let nieb = "<div class='segment spadanie nieb'></div>"
    segment_spadanie = "<div class='segment spadanie nieb'></div>"
    ksztalt = "k3";
    $("#61").append(nieb)
    $("#76").append(nieb)
    $("#77").append(nieb)
    $("#91").append(nieb)
}

function b4()
{
    let zolt = "<div class='segment spadanie zolt'></div>"
    segment_spadanie = "<div class='segment spadanie zolt'></div>"
    ksztalt = "k4";
    $("#46").append(zolt)
    $("#61").append(zolt)
    $("#76").append(zolt)
    $("#91").append(zolt)
}

function b5()
{
    let poma = "<div class='segment spadanie poma'></div>"
    segment_spadanie = "<div class='segment spadanie poma'></div>"
    ksztalt = "k5";
    $("#61").append(poma)
    $("#76").append(poma)
    $("#77").append(poma)
    $("#92").append(poma)
}

function b6()
{
    let turk = "<div class='segment spadanie turk'></div>"
    segment_spadanie = "<div class='segment spadanie turk'></div>"
    ksztalt = "k6";
    $("#62").append(turk)
    $("#76").append(turk)
    $("#77").append(turk)
    $("#91").append(turk)
}

function b7()
{
    let fiol = "<div class='segment spadanie fiol'></div>"
    segment_spadanie = "<div class='segment spadanie fiol'></div>"
    ksztalt = "k7";
    $("#61").append(fiol)
    $("#76").append(fiol)
    $("#91").append(fiol)
    $("#92").append(fiol)
}