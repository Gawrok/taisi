// tablica z wartościami żarówek
var liczby = [128, 64, 32, 16, 8, 4, 2, 1];

// tablica przechowuje, które żarówki świecą
// 0 = wyłączona, 1 = włączona
var bity = [0, 0, 0, 0, 0, 0, 0, 0];

// tutaj będzie zapisana wylosowana liczba
var cel = 0;

// pobranie panelu z HTML, do którego będą dodawane karty
var panel = document.getElementById('panel');

// pobranie miejsca, gdzie pokazuje się liczba do ułożenia
var targetNumber = document.getElementById('targetNumber');

// pobranie miejsca, gdzie pokazuje się zapis binarny
var binaryText = document.getElementById('binaryText');

// pobranie miejsca na komunikat Dobrze / Źle
var message = document.getElementById('message');

// pobranie przycisku Sprawdź
var checkButton = document.getElementById('checkButton');

// pobranie przycisku Wyłącz korki
var resetButton = document.getElementById('resetButton');

// pobranie przycisku Losuj liczbę
var newButton = document.getElementById('newButton');

// funkcja rysuje wszystkie karty od nowa
function narysujKarty() {
  // wyczyszczenie panelu, żeby nie dublować kart
  panel.innerHTML = '';

  // pętla przechodzi po wszystkich liczbach z tablicy
  for (var i = 0; i < liczby.length; i++) {
    // tworzenie nowego div-a dla karty
    var karta = document.createElement('div');

    // ustawienie klasy card
    karta.className = 'card';

    // jeśli dany bit ma wartość 1, karta dostaje klasę on
    if (bity[i] === 1) {
      karta.classList.add('on');
    }

    // zapisanie numeru karty w atrybucie data-id
    karta.setAttribute('data-id', i);

    // tworzenie elementu statusu ON / OFF
    var status = document.createElement('div');

    // ustawienie klasy status
    status.className = 'status';

    // jeśli bit ma wartość 1, pokazujemy ON
    if (bity[i] === 1) {
      status.textContent = 'ON';
    } else {
      // w przeciwnym razie pokazujemy OFF
      status.textContent = 'OFF';
    }

    // tworzenie elementu żarówki
    var zarowka = document.createElement('div');

    // ustawienie klasy lamp
    zarowka.className = 'lamp';

    // tworzenie elementu z liczbą na karcie
    var liczba = document.createElement('div');

    // ustawienie klasy value
    liczba.className = 'value';

    // wpisanie odpowiedniej wartości, np. 128 albo 64
    liczba.textContent = liczby[i];

    // tworzenie elementu z podpisem pod liczbą
    var opis = document.createElement('div');

    // ustawienie klasy label
    opis.className = 'label';

    // wpisanie tekstu moduł mocy
    opis.textContent = 'moduł mocy';

    // dodanie statusu do karty
    karta.appendChild(status);

    // dodanie żarówki do karty
    karta.appendChild(zarowka);

    // dodanie liczby do karty
    karta.appendChild(liczba);

    // dodanie opisu do karty
    karta.appendChild(opis);

    // ustawienie, co ma się stać po kliknięciu karty
    karta.onclick = function () {
      // odczytanie numeru klikniętej karty
      var id = Number(this.getAttribute('data-id'));

      // klik i cyk
      // jeśli bit jest 0, zmieniamy go na 1
      if (bity[id] === 0) {
        bity[id] = 1;
      } else {
        // jeśli był 1, zmieniamy go na 0
        bity[id] = 0;
      }

      // po zmianie trzeba narysować karty jeszcze raz
      narysujKarty();

      // i odświeżyć napis binarny
      pokazBity();
    };

    // dodanie całej karty do panelu
    panel.appendChild(karta);
  }
}

// funkcja pokazuje aktualny zapis binarny
function pokazBity() {
  // pusty napis, do którego będą dopisywane 0 i 1
  var napis = '';

  // pętla przechodzi po wszystkich bitach
  for (var i = 0; i < bity.length; i++) {
    // dopisanie kolejnego bitu do napisu
    napis = napis + bity[i];
  }

  // wstawienie gotowego napisu do HTML
  binaryText.textContent = napis;
}

// funkcja wyłącza wszystkie żarówki
function wylaczKorki() {
  // pętla przechodzi po wszystkich bitach
  for (var i = 0; i < bity.length; i++) {
    // ustawienie każdego bitu na 0
    bity[i] = 0;
  }

  // czyszczenie komunikatu
  message.textContent = '';

  // ponowne narysowanie kart
  narysujKarty();

  // ponowne pokazanie bitów
  pokazBity();
}

// funkcja losuje nową liczbę
function losujLiczbe() {
  // losowanie liczby od 0 do 255
  cel = Math.floor(Math.random() * 256);

  // pokazanie tej liczby na stronie
  targetNumber.textContent = cel;

  // wyzerowanie wszystkich żarówek po losowaniu
  wylaczKorki();
}

// funkcja sprawdza, czy odpowiedź użytkownika jest dobra
function sprawdz() {
  // zmienna do liczenia sumy zaznaczonych kart
  var suma = 0;

  // pętla przechodzi po wszystkich bitach
  for (var i = 0; i < bity.length; i++) {
    // jeśli dany bit jest włączony
    if (bity[i] === 1) {
      // dodajemy jego wartość do sumy
      suma = suma + liczby[i];
    }
  }

  // jeśli suma zgadza się z liczbą wylosowaną
  if (suma === cel) {
    // pokaż komunikat Dobrze
    message.textContent = 'Dobrze!';
  } else {
    // w przeciwnym razie pokaż komunikat Źle
    message.textContent = 'Źle.';
  }
}

// po kliknięciu przycisku Sprawdź uruchamia się funkcja sprawdz
checkButton.onclick = sprawdz;

// po kliknięciu przycisku Wyłącz korki uruchamia się funkcja wylaczKorki
resetButton.onclick = wylaczKorki;

// po kliknięciu przycisku Losuj liczbę uruchamia się funkcja losujLiczbe
newButton.onclick = losujLiczbe;

// na start strony losujemy pierwszą liczbę
losujLiczbe();