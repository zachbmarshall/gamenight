var newPlayer = {
    "name": "N/A",
    "score": 0,
    "hist": ""
}

var aoPlayers = [];
var pointSpread = [];
var lowScore = false;

function getNumPlayers() {
    var numPlayers = parseInt(document.getElementById("numPlayers").value);
    document.getElementById("winnerName").innerHTML = "";
    document.getElementById("winnerName").style.removeProperty("color");

    if (numPlayers < 1 || numPlayers > 12 || isNaN(parseInt(document.getElementById("numPlayers").value))) {
        document.getElementById("winnerName").innerHTML = "Please enter a number between 1-12";
        document.getElementById("winnerName").style = "color: red;";
        document.getElementById("numPlayers").value = "";

    }
    else {
        document.getElementById("numPlayers").style.display = "none";
        document.getElementById("btnGetNumPlayers").style.display = "none";

        let display = "";

        document.getElementById("heading").innerHTML = "Choose the point spread";

        for (var iCount = 0; iCount < numPlayers; iCount++) {
            //Displays all of the divs for the same number of players
            display += "<div id=\"player" + (iCount + 1) + "Div\">"
            display += "<div><label id=\"player" + (iCount + 1) + "Label\" class=\"text-respond\">Points for being #" + (iCount + 1) + "</label></div>";
            display += "<div><input type=\"number\" pattern=\"[0-9]*\" id=\"player" + (iCount + 1) + "Points\" class=\"text-respond\"></input></div>";
            display += "</div>"
            display += "<br>";
        }
        display += "<div class=\"centerBtn\"><div id=\"getNames\" style=\"display: none\"><input type=\"button\" class=\"text-respond\" value=\"Select Names\" onclick=\"getPointSpread();\"></div>";
        document.getElementById("playerInfo").innerHTML = display;
        //Displays the Start Game button
        document.getElementById("getNames").style.display = "block";
    }
}

function getPointSpread() {
    var numPlayers = parseInt(document.getElementById("numPlayers").value);

    for (var i = 0; i < numPlayers; i++) {
        pointSpread.push(parseInt(document.getElementById("player" + (i + 1) + "Points").value));
    }

    document.getElementById("numPlayers").style.display = "none";
    document.getElementById("btnGetNumPlayers").style.display = "none";

    let display = "";

    document.getElementById("heading").innerHTML = "Enter the players names";

    for (var iCount = 0; iCount < numPlayers; iCount++) {
        //Displays all of the divs for the same number of players
        display += "<div id=\"player" + (iCount + 1) + "Div\">"
        display += "<div><label id=\"player" + (iCount + 1) + "Name\" class=\"text-respond\">Enter Player " + (iCount + 1) + "'s Name</label></div>";
        display += "<div><label id=\"player" + (iCount + 1) + "Total\" class=\"text-respond\" style=\"display: none\"></label></div>";
        display += "<div><label id=\"player" + (iCount + 1) + "Label\" class=\"text-respond\" style=\"display: none\">What place did they get?</label></div>";
        display += "<div><input type=\"text\" id=\"player" + (iCount + 1) + "Score\" class=\"text-respond\"></input></div>";
        display += "</div>"
        display += "<br>";
    }
    display += "<div class=\"centerBtn\"><div id=\"btnStartGame\" style=\"display: none\"><input type=\"checkbox\" id=\"lowScore\" name=\"lowScore\" value=\"lowScore\" style=\"display: none\"><input type=\"button\" class=\"text-respond\" value=\"Start Game\" onclick=\"getScore();\"><br><br></div><div id=\"btnAddScore\" style=\"display: none\"><input type=\"button\" class=\"text-respond\" value=\"Add Points\" onclick=\"addScore();\" href=\"#heading\"><br><br></div><div id=\"btnEndGame\" style=\"display: none\"><input type=\"button\" class=\"text-respond\" value=\"End Game\" onclick=\"endGame();\" href=\"#heading\"><br><h4 id=\"standings\" class=\"text-respond\"></h4><br><div id=\"copyScore\" style=\"display: none\"><input type=\"button\" class=\"text-respond\" value=\"Copy Score\" onclick=\"copyToClipboard();\" href=\"#heading\"></div></div></div>";
    document.getElementById("playerInfo").innerHTML = display;
    //Displays the Start Game button
    document.getElementById("btnStartGame").style.display = "block";

}

function getScore() {

    document.getElementById("btnStartGame").style.display = "none";
    var iNumPlayers = parseInt(document.getElementById("numPlayers").value);
    var sName = "";

    for (var i = 0; i < iNumPlayers; i++) {
        document.getElementById("player" + (i + 1) + "Label").style.display = "block";
    }

    for (var iCount = 0; iCount < iNumPlayers; iCount++) {
        sName = document.getElementById("player" + (iCount + 1) + "Score").value;
        newPlayer = {
            "name": sName,
            "score": 0,
            "hist": ""
        }
        aoPlayers.push(newPlayer);

        document.getElementById("player" + (iCount + 1) + "Name").innerHTML = aoPlayers[iCount]["name"];
        document.getElementById("player" + (iCount + 1) + "Total").innerHTML = aoPlayers[iCount]["score"];
        document.getElementById("player" + (iCount + 1) + "Total").style.display = "block";
    }

    document.getElementById("btnAddScore").style.display = "block";
    document.getElementById("btnEndGame").style.display = "block";
    document.getElementById("copyScore").style.display = "block";
    for (var i = 0; i < iNumPlayers; i++) {
        document.getElementById("player" + (i + 1) + "Score").type = "number";
        document.getElementById("player" + (i + 1) + "Score").pattern = "[0-9]*";
        document.getElementById("player" + (i + 1) + "Score").placeholder = i + 1;
    }

    displayScore();
}

function addScore() {
    var badNum = false;
    for (var iCount = 0; iCount < aoPlayers.length; iCount++) {
        if (isNaN(parseInt(document.getElementById("player" + (iCount + 1) + "Score").value)) || parseInt(document.getElementById("player" + (iCount + 1) + "Score").value) > aoPlayers.length) {
            badNum = true;
        }
    }
    if (badNum) {
        for (var i = 0; i < aoPlayers.length; i++) {
            aoPlayers[i]["score"] += 0;
            document.getElementById("player" + (i + 1) + "Score").value = "";
        }
    }
    else {
        for (var i = 0; i < aoPlayers.length; i++) {
            aoPlayers["hist"] = "";
            aoPlayers[i]["hist"] += aoPlayers[i]["name"] + ": " + aoPlayers[i]["score"] + " + " + pointSpread[parseInt(document.getElementById("player" + (i + 1) + "Score").value) - 1];
            aoPlayers[i]["score"] += pointSpread[parseInt(document.getElementById("player" + (i + 1) + "Score").value) - 1];
            aoPlayers[i]["hist"] += " = " + aoPlayers[i]["score"];
            document.getElementById("player" + (i + 1) + "Score").value = "";
        }
    }

    displayScore();
}

function displayScore() {
    document.getElementById("heading").innerHTML = "Current Score";
    var aoTempArray = [];
    var displayScore = "";

    if (lowScore) {
        //bubble sorts the winners by score in ascending order
        for (var i = 0; i < aoPlayers.length - 1; i++) {
            for (var j = i + 1; j < aoPlayers.length; j++) {
                if (aoPlayers[i]["score"] > aoPlayers[j]["score"]) {
                    aoTempArray[i] = aoPlayers[i];
                    aoPlayers[i] = aoPlayers[j];
                    aoPlayers[j] = aoTempArray[i];
                }
            }
        }
    }
    else {
        //bubble sorts the winners by score in descending order
        for (var i = 0; i < aoPlayers.length - 1; i++) {
            for (var j = i + 1; j < aoPlayers.length; j++) {
                if (aoPlayers[i]["score"] < aoPlayers[j]["score"]) {
                    aoTempArray[i] = aoPlayers[i];
                    aoPlayers[i] = aoPlayers[j];
                    aoPlayers[j] = aoTempArray[i];
                }
            }
        }
    }

    for (var i = 0; i < aoPlayers.length; i++) {
        document.getElementById("player" + (i + 1) + "Name").innerHTML = aoPlayers[i]["name"];
        document.getElementById("player" + (i + 1) + "Total").innerHTML = aoPlayers[i]["score"];
        displayScore += aoPlayers[i]["hist"] + "<br>";
        aoPlayers[i]["hist"] = "";
    }
    document.getElementById("standings").innerHTML = "<br>" + displayScore + "<br>";
}

function endGame() {
    //changes title heading and hides add score and end game buttons
    document.getElementById("heading").innerHTML = "Game Over";
    document.getElementById("btnAddScore").style.display = "none";
    document.getElementById("btnEndGame").style.display = "none";
    document.getElementById("copyScore").style.display = "none";

    //hide the player score input fields
    for (var iCount = 0; iCount < aoPlayers.length; iCount++) {
        document.getElementById("player" + (iCount + 1) + "Score").style.display = "none";
    }

    //show the play again button
    //document.getElementById("btnPlayAgain").style.display = "block";
    document.getElementById("btnResetGame").style.display = "block";
    //declare winner of the game
    document.getElementById("winnerName").innerHTML = "<br>" + aoPlayers[0].name + " wins with a score of " + aoPlayers[0].score + "!<br>";

}

//plays the game again with the same players
function playAgain() {
    //set all players scores to 0
    for (var iCount = 0; iCount < aoPlayers.length; iCount++) {
        aoPlayers[iCount].resetScore();
    }
    //displays both the add score and end game buttons
    document.getElementById("btnAddScore").style.display = "block";
    document.getElementById("btnEndGame").style.display = "block";
    document.getElementById("copyScore").style.display = "block";
    //displays the input fields for each of the players again
    for (var iCount = 0; iCount < aoPlayers.length; iCount++) {
        document.getElementById("player" + (iCount + 1) + "Score").style.display = "block";
    }
    //hides the play again and reset button
    document.getElementById("btnPlayAgain").style.display = "none";
    document.getElementById("btnResetGame").style.display = "none";
    displayScore();
    document.getElementById("winnerName").innerHTML = "";
    getPlayerNames();
}

function copyToClipboard() {
    var textToCopy = document.getElementById("standings").innerText;
    console.log(textToCopy);
    var textArea;

    function isOS() {
        //can use a better detection logic here
        return navigator.userAgent.match(/ipad|iphone/i);
    }

    function createTextArea(text) {
        textArea = document.createElement('textArea');
        textArea.readOnly = true;
        textArea.contentEditable = true;
        textArea.value = text;
        document.body.appendChild(textArea);
    }

    function selectText() {
        var range, selection;

        if (isOS()) {
            range = document.createRange();
            range.selectNodeContents(textArea);
            selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            textArea.setSelectionRange(0, 999999);
        } else {
            textArea.select();
        }
    }

    function copyTo() {
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }

    createTextArea(textToCopy);
    selectText();
    copyTo();
}