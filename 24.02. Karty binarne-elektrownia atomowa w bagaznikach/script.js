var liczby = [128, 64, 32, 16, 8, 4, 2, 1];
var bity = [0, 0, 0, 0, 0, 0, 0, 0];
var cel = 0;

var panel = document.getElementById('panel');
var targetNumber = document.getElementById('targetNumber');
var binaryText = document.getElementById('binaryText');
var message = document.getElementById('message');
var checkButton = document.getElementById('checkButton');
var resetButton = document.getElementById('resetButton');
var newButton = document.getElementById('newButton');

function narysujKarty() {
  panel.innerHTML = '';

  for (var i = 0; i < liczby.length; i++) {
    var karta = document.createElement('div');
    karta.className = 'card';

    if (bity[i] === 1) {
      karta.classList.add('on');
    }

    karta.setAttribute('data-id', i);

    var status = document.createElement('div');
    status.className = 'status';

    if (bity[i] === 1) {
      status.textContent = 'ON';
    } else {
      status.textContent = 'OFF';
    }

    var zarowka = document.createElement('div');
    zarowka.className = 'lamp';

    var liczba = document.createElement('div');
    liczba.className = 'value';
    liczba.textContent = liczby[i];

    var opis = document.createElement('div');
    opis.className = 'label';
    opis.textContent = 'moduł mocy';

    karta.appendChild(status);
    karta.appendChild(zarowka);
    karta.appendChild(liczba);
    karta.appendChild(opis);

    karta.onclick = function () {
      var id = Number(this.getAttribute('data-id'));

      // klik i cyk
      if (bity[id] === 0) {
        bity[id] = 1;
      } else {
        bity[id] = 0;
      }

      narysujKarty();
      pokazBity();
    };

    panel.appendChild(karta);
  }
}

function pokazBity() {
  var napis = '';

  for (var i = 0; i < bity.length; i++) {
    napis = napis + bity[i];
  }

  binaryText.textContent = napis;
}

function wylaczKorki() {
  for (var i = 0; i < bity.length; i++) {
    bity[i] = 0;
  }

  // czemu nie dziala
  // bo trzeba odswiezyc widok
  message.textContent = '';
  narysujKarty();
  pokazBity();
}

function losujLiczbe() {
  cel = Math.floor(Math.random() * 256);
  targetNumber.textContent = cel;
  wylaczKorki();
}

function sprawdz() {
  var suma = 0;

  for (var i = 0; i < bity.length; i++) {
    if (bity[i] === 1) {
      suma = suma + liczby[i];
    }
  }

  if (suma === cel) {
    message.textContent = 'Dobrze!';
  } else {
    message.textContent = 'Źle.';
  }
}

checkButton.onclick = sprawdz;
resetButton.onclick = wylaczKorki;
newButton.onclick = losujLiczbe;

losujLiczbe();
