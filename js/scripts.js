//Element Referansları 
var cells = document.getElementsByClassName("cell");
var xscore = document.getElementById("x_score")
var oscore = document.getElementById("o_score")
var newgamebtn = document.getElementById("newgamebtn")

// Sabitleri tanımla
const local_xscore_key = "x_score_value"
const local_oscore_key = "o_score_value"

// Güncel skorları yaz
xscore.textContent = localStorage.getItem(local_xscore_key) ?? "0"
oscore.textContent = localStorage.getItem(local_oscore_key) ?? "0"

// Sıradaki oyuncu sembolü
var currentSymbol = "X"

// Şuanki hücreler tıklanabilirmi
var AreCellsClickable = false;

// Hücrelere "click" dinlemesi ekle
makeCellsClickable();

// Yeni oyun başlat butonu
newgamebtn.addEventListener("click", newGame)

//Skoru Sıfırlama butonu
var resetbtn = document.getElementById("resetbtn")
resetbtn.addEventListener("click", scorereset)
function scorereset() {
    localStorage.setItem(local_oscore_key, 0)
    localStorage.setItem(local_xscore_key, 0)
    oscore.textContent = 0
    xscore.textContent = 0
}
//hücreleri tıklanabilir yap
function makeCellsClickable() {
    //tıklama komutunu dinle 
    for (var index = 1; index <= 9; index = index + 1) {
        var cell = cells[index - 1]
        cell.addEventListener("click", cellClicked)
    }

    AreCellsClickable = true;
}

// Yeni oyun başlat
function newGame() {
    // hücreleri temizle
    clearCells();

    if (!AreCellsClickable) {
        makeCellsClickable()
    }
    currentSymbol = "X"
}

// Hücreleri temizle
function clearCells() {
    for (var index = 1; index <= 9; index = index + 1) {
        var cell = cells[index - 1]
        cell.textContent = ""
    }
}

// Hücreye tıklanması
function cellClicked() {
    if (this.textContent) return

    var span = document.createElement("span")
    span.textContent = currentSymbol;
    this.append(span)
    this.style.color = "lightblue"
    if (currentSymbol == "X")
        currentSymbol = "O"
    else
        currentSymbol = "X"

    stateControl()
}

/**
 * Oyun bitirme fonksiyonu
 * @param {string} winner kazanan sembol
 */
function endGame(winner) {
    if (winner == "X") {
        incrementScore(local_xscore_key, xscore)
    }
    else if (winner == "O") {
        incrementScore(local_oscore_key, oscore)
    }
    else {

    }
    //oyun sonu eylemleri
    alert("Kazanan: " + winner)

    var wantsToStartNewGame = confirm("Yeni oyun baslatilsin mi?")

    if (wantsToStartNewGame) {
        newGame()
    }
    else {   //oyun sonu kutulara tıklanılmasın  
        for (var index = 1; index <= 9; index = index + 1) {
            var cell = cells[index - 1]
            cell.removeEventListener("click", cellClicked)
        }
        AreCellsClickable = false
    }
}
/**
 * Skoru arttır
 * @param {string} key localstorage anahtarı
 * @param {HTMLElement} row skor satırı
 */
function incrementScore(key, row) {
    var current = localStorage.getItem(key) ?? "0";
    var score_numeric = parseInt(current) + 1

    localStorage.setItem(key, score_numeric)
    row.textContent = score_numeric
}

// Hamle sonrası kontrol
function stateControl() {
    // Kazanma koşullarını kontrol et
    for (var index = 0; index < 9; index = index + 3) {
        // Yatayları kontrol et
        if (cells[index].textContent && cells[index].textContent == cells[index + 1].textContent && cells[index].textContent == cells[index + 2].textContent)
            return endGame(cells[index].textContent)
    }

    for (var index = 0; index < 3; index = index + 1) {
        // Dikeyleri kontrol et
        if (cells[index].textContent && cells[index].textContent == cells[index + 3].textContent && cells[index].textContent == cells[index + 6].textContent)
            return endGame(cells[index].textContent)
    }

    //Çarprazları kontrol et 
    if (cells[0].textContent && cells[0].textContent == cells[4].textContent && cells[0].textContent == cells[8].textContent)
        return endGame(cells[0].textContent)

    if (cells[2].textContent && cells[2].textContent == cells[4].textContent && cells[2].textContent == cells[6].textContent)
        return endGame(cells[2].textContent)

    //Beraberlik Durumu 
    if (cells[0].textContent
        && cells[1].textContent
        && cells[2].textContent
        && cells[3].textContent
        && cells[4].textContent
        && cells[5].textContent
        && cells[6].textContent
        && cells[7].textContent
        && cells[8].textContent)
        alert("Beraberlik!")
}