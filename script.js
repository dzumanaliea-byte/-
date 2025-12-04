let matches = JSON.parse(localStorage.getItem("matches") || "[]");

function login() {
    const pin = document.getElementById("pin").value;
    if (pin === "0000") {
        document.getElementById("login").style.display = "none";
        document.getElementById("panel").style.display = "block";
        render();
    } else {
        alert("Неверный PIN");
    }
}

function addMatch() {
    const m = {
        t1: team1.value,
        t2: team2.value,
        s1: score1.value,
        s2: score2.value
    };
    matches.push(m);
    localStorage.setItem("matches", JSON.stringify(matches));
    render();
}

function render() {
    const list = document.getElementById("matches");
    list.innerHTML = "";
    matches.forEach((m, i) => {
        const li = document.createElement("li");
        li.innerHTML = `${m.t1} ${m.s1} : ${m.s2} ${m.t2} 
            <button onclick="removeMatch(${i})">X</button>`;
        list.appendChild(li);
    });
}

function removeMatch(i) {
    matches.splice(i, 1);
    localStorage.setItem("matches", JSON.stringify(matches));
    render();
}

function exportCSV() {
    let csv = "Команда 1,Гол 1,Гол 2,Команда 2\n";
    matches.forEach(m => {
        csv += `${m.t1},${m.s1},${m.s2},${m.t2}\n`;
    });
    const blob = new Blob([csv], {type: "text/csv"});
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "matches.csv";
    a.click();
}
