let papan;
let context;
let blok = 20;
let cols = 30;
let rows = 20;

let ularX = 0;
let ularY = 0;
let ekor = [];

let makX;
let makY;

let skor = 0;

let kecX = 1;
let kecY = 0;

let ded = false;

window.onload = () => {
    papan = document.getElementById("papan");
    context = papan.getContext("2d")

    papan.width = cols * blok;
    papan.height = rows * blok;

    document.addEventListener('keyup', changeDirection)

    papan.addEventListener('click', () => {
        ded = false;
        skor = 0;
    });

    makTem();

    setInterval(update, 1000 / 10)
}

function update() {
    createRect(0, 0, papan.width, papan.height)

    if (ded) {
        createText(`u r ded`, papan.width / 2, papan.height / 2 - 25, 'center', 50);
        createText(`SEKOR: ${skor}`, papan.width / 2, papan.height / 2 + 25, 'center');
        createText(`Lagi???`, (cols * blok) / 2, papan.height - 50, 'center');

        return
    }


    createText(`SEKOR: ${skor}`, 30, 40);
    createRect(makX, makY, blok, blok, 'lime');
    if (ularX == makX && ularY == makY) {
        ekor.push([makX, makY]);
        skor += 10;
        makTem()
    }

    for (let i = ekor.length - 1; i > 0; i--) {
        ekor[i] = ekor[i - 1];
    }

    if (ekor.length) {
        ekor[0] = [ularX, ularY];
    }

    ularX += kecX * blok;
    ularY += kecY * blok;

    createRect(ularX, ularY, blok, blok, 'red');

    for (let i = 0; i < ekor.length; i++) {
        createRect(ekor[i][0], ekor[i][1], blok, blok, 'red');
    }

    if (ularX < 0 || ularX > cols * blok || ularY < 0 || ularY > rows * blok) {
        dedEvent()
    }

    for (let i = 0; i < ekor.length; i++) {
        if (ularX == ekor[i][0] && ularY == ekor[i][1]) {
            dedEvent()
        }
    }
}

function makTem() {
    makX = Math.floor(Math.random() * cols) * blok;
    makY = Math.floor(Math.random() * rows) * blok;
}

function changeDirection(e) {
    if (e.code == "ArrowUp") {
        kecX = 0;
        kecY = -1;
    } else if (e.code == "ArrowDown") {
        kecX = 0;
        kecY = 1;
    } else if (e.code == "ArrowLeft") {
        kecX = -1;
        kecY = 0;
    } else if (e.code == "ArrowRight") {
        kecX = 1;
        kecY = 0;
    } 

    var x = event.key;
    if (x == "w" || x == "W") {
        kecX = 0;
        kecY = -1;
    } else if (x == "s" || x == "S") {
        kecX = 0;
        kecY = 1;
    } else if (x == "a" || x == "A") {
        kecX = -1;
        kecY = 0;
    } else if (x == "d" || x == "D") {
        kecX = 1;
        kecY = 0;
    } 

}

function dedEvent() {
    ded = true;
    ekor = [];
    ularX = 0;
    ularY = 0;
    kecX = 1;
    kecY = 0;
}

function createRect(x, y, width, height, color = "black") {
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
}

function createText(text, x, y, textAlign = "start", fontSize = 20 ) {
    context.fillStyle = "white";
    context.font = `${fontSize}px Roboto Mono`;
    context.textAlign = textAlign;
    context.fillText(text, x, y)
}
