let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["sztylet"];


const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");

const text = document.querySelector("#text");

const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");

const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");


const weapons = [
  {
    name: "sztylet",
    power: 5
  },

  {
    name: "miecz treningowy",
    power: 15
  },

  {
    name: "topór bojowy",
    power: 30
  },

  {
    name: "krótki miecz",
    power: 50
  }
];


const monsters = [
  {
    name: "Bandyta",
    level: 2,
    health: 40
},

{
    name: "Dwóch Bandytów",
    level: 2,
    health: 70
},

{
    name: "dragon",
    level: 20,
    health: 300
}
];

const locations = [
  {
    name: "0 town square",
    "button text": ["Idź do sklepu", "Zbadaj sprawę bandytów", "Udaj sie na patrol"],
    "button functions": [goStore, goCave, fightDragon],
    text: "Jesteś na placu zamkowym"
  },

  {
    name: "1 store",
    "button text": ["Kup 10 Health (10 gold)", "Kup broń (30 gold)", "Wróć na plac zamkowy"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "Wszedłeś do sklepu"
  },

  {
    name: "2 bandit camp",
    "button text": ["Zaatakuj strażnika", "Zakradnij się", "Wróć na plac zamkowy"],
    "button functions": [fightGuard, difrentWay, goTown],
    text: "Zdecydowałeś udać się do bazy bandytów. Musiałeś dostać się do północnej bramy Venore, stamtąd już było widać stary młyn. Sięgasz wspomnieniami 10 lat wcześniej, pamiętasz, że jako nastolatek chodziłeś do starego Bardula własciciela młynu. Po śmierci starego młyniarza jego syn opuścił miasto. Miejsce to zostało bez właściciela. Po kwadransie marszu dotarłeś pod budowle, schowałeś się w lini drzew idących pare mil za miasto. Przed młynem stał jeden strażnik, musisz go pokonać lub znaleźć inne wejście."
  },

  {
    name: "3 fight",
    "button text": ["Atak", "Blokuj", "Rzuć kamieniem"],
    "button functions": [attack, dodge, throwRock],
    text: "Zatakowałeś przeciwnika, Broń się! albo zgiń!."
  },

  {
    name: "4 killMonster",
    "button text": ["Wróć na plac zamkowy", "Wróć na plac zamkowy", "Wróć na plac zamkowy"],
    "button functions": [goTown, goTown, goTown],
    text: "Pokonałeś przeciwnika i otrzymałeś gold i doświadczenie."
  },

  {
    name: "5 lose",
    "button text": ["Restart", "Restart", "Restart"],
    "button functions": [restart, restart, restart],
    text: 'Straciłeś całe życie i zginąłeś. Wciśnij "Restart" aby zacząć przygode od nowa.'
  },

  {
    name: "6 searchDifWay",
    "button text": ["Wchodzę przez okno", "Zakradam się na front młynu (atakuje strażnika)", "Zbadaj ściany młynu"],
    "button functions": [fightTwo, fightGuard, checkWall],
    text: "Okrążyłeś młyn od zachodniej strony, strażnik bandytów nawet nie zwrócił na Ciebie uwagi. Podszedłeś pod samą granice budowali, przez okno usłyszałeś co najmniej dwie osoby. Walka z nimi w pojedynkę może być ryzykowne.",
  },

  {
    name: "7 after front door fight",
    "button text": ["Przejdź przez lewe drzwi", "Wejdź na magazyn", "Przeszukaj pomieszczenie"],
    "button functions": [fightTwo, goMag, searching],
    text: 'Pokonałeś bandytę zebrałeś z niego trochę złotych monet. Wydaje się, że nikt nie usłyszał dźwięków walki. Przechodzisz przez główne wejście do młynu, w powietrzu unosi się zapach prochu strzelniczego. Prawdopodobnie jest to kradziony towar który ma zostać przetransportowany do portu a potem przemycony daleko za granicę Eberonu. Rozglądasz się po pomieszczeniu przed sobą widzisz parę drzwi. Z jednych można usłyszeć czyjś głos lecz nie wiesz czyj i ile jest tam osób. Za to z dużych magazynowych drzwi nie słychać nic.'
  },

  {
    name: "8 fight Two Bandits",
    "button text": ["Atak", "Blokuj", "Rzuć kamieniem"],
    "button functions": [attackTwo, dodge, throwRock],
    text: "Zatakowałeś dwóch przeciwników, Broń się! albo zgiń!."
  },

  {
    name: "9 afterTwo Bandits",
    "button text": ["Przeszukaj pomieszczenie", "Wyjdź z pomieszczenia", "Rozsyp proch po pokoju"],
    "button functions": [searchRoom, leaveRoom , powder],
    text: "Z trudem uszedłeś z życiem, lecz pokonałeś swoich przeciwników. Przeszukując ich ciała znalazłeś parę złotych monet. Rozglądasz się po pomieszczeniu, jest to gabinet, nie duży. W środkowej częsci pokoju znajduję się drewniane biurko. Z obu stron stoją krzesła i pod zachodnią ścianą umieszczona została szafka na książki lecz była pusta. Przed nią położony został rozcięty worek z prochem strzelniczym. *wdech* Tak! to zpewnością proch strzelniczy."
  },

  {
    name: "10 searchRoom",
    "button text": ["Wyciągnij bandaż", "Wyjdź z pomieszczenia", "Rozsyp proch po pomieszczeniu"],
    "button functions": [takeBandage, leaveRoom, powder],
    text: "Podszedłeś do biurka zobaczyłeś na nim paczkę cygar.  Otworzyłeś szufladę w której znalazłeś ksiegę. Był to spis towaru, cały asortyment znajdujący się tu w młynie. Były też tam zapisane kolejne dostawy i co najważniejsze miejsce odbioru w mieście Thais. Thais jest stolicą krain Eberonu trafiłeś na cenną ksiegę. Wkładając ksiegę do plecaka zobaczyłeś plamy krwi na okładce. To była Twoja krew, podczas walki zostałeś ranny."
  },

  {
    name: "11 backToHaul",
    "button text": ["Wejdź na magazyn", "Wysadź stary młyn", "Rozsyp proch po pomieszczeniu"],
    "button functions": [goMag, boom, powder],
    text: "Podszedłeś do biurka zobaczyłeś na nim paczkę"
  },

  {
    name: "12 goMag",
    "button text": ["Zgłoś raport", "Sfałszuj spis i zgłoś raport", "Wysadź stary młyn"],
    "button functions": [raport, moneyRaport, boom],
    text: "Tylko po otwarciu drzwi do magazynu, przytłoczył Cię siarkowy zapach prochu strzelniczego. Znajdywało się tu tuzin beczek gotowych do transportu, wiele znich dalej stało puste. A po drugiej stronie leżała kupa worków z prochem. Jako oddany służbie żołnierz powinieneś jak najszybciej zgłosić to Generałowi Faltanowi, żeby zabezpieczyli towar i nie zwłocznie sprawdzili bandyckie dziuple w Thais. Hmmm a może by tak zanim zgłoszę to do Generała, sfałszować spis towaru i sprzedać na boku beczkę lub dwie. Przecież tylko ja wiem ile ich było nikt sie nie dopatrzy. Zostaje jeszcze opcja wysadzenia wszystkiego w powietrze."
  }
];

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
  monsterStats.style.display = "none";

  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];

  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];

  text.innerText = location.text;
}

function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}


function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "Nie masz wystarczająco golda.";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
  if (gold >= 30) {
    gold -= 30;
    currentWeapon++;
    goldText.innerText = gold;
    let newWeapon = weapons[currentWeapon].name;
    text.innerText = "Kupiłeś nową broń" + " " + newWeapon + ".";
    inventory.push(newWeapon);
    text.innerText += "W Twoim ekwipunku znajduję się: " + inventory;
  } else {
    text.innerText = "Nie masz wystarczająco golda.";
  }
} else {
  text.innerText = "Masz już najmocniejszą broń!";
  button2.innerText = "Sprzedaj broń za 15 gold";
  button2.onclick = sellWeapon;
}
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "Sprzedałeś " + currentWeapon + ".";
    text.innerText += "W Twoim ekwipunku znajduję się: " + inventory;
  } else {
    text.innerText = "Nie sprzedawaj swojej jedynej broni!"
  }
}

function getMonsterAttackValue(level) {
  let hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function lose() {
  update(locations[5]);
}

function dodge() {
  text.innerText = "Obroniłeś się przed atakiem " + monsters[fighting].name + ".";
}

function throwRock() {
  text.innerText = "Rzucasz kamieniem w przeciwnika ale nie przyniosło to żadnego efektu."
}

function searching() {
  text.innerText = "Rozejrzałeś sie po holu, przypominał duży przedpokuj a zarazem kuchnię. Gdyż w kącie znajdował się mały stół z krzesłami, na którym znajdywały się talerze, dwa kufle z piwem i rozsypane karty. Nic ciekawego."
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["sztylet"]
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}

function attack() {
  text.innerText = monsters[fighting].name + " Atakuje.";
  text.innerText += " Atakujesz swoim " + weapons[currentWeapon].name + ".";
  
  if (isMonsterHit()) {
    health -= getMonsterAttackValue(monsters[fighting].level);
  } else {
    text.innerText += " Przeciwnik nie spodziewał się tego ataku i pudłuje."
  }
  monsterHealth -= weapons[currentWeapon].power;
  monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    defeatMonster()
  }
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[7]);
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterNameText.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function fightGuard() {
  fighting = 0;
  goFight();
}

function difrentWay() {
  update(locations[6]);
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function goMag() {
  update(locations[12]);
}

function checkWall() {
  text.innerText = 'Patrzysz na ścianę i widzisz napis "Husag to frajer...."'
}

function fightTwo() {
  fighting = 1;
  goFightTwo();
}
function goFightTwo() {
  update(locations[8]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterNameText.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}
function attackTwo() {
  text.innerText = monsters[fighting].name + " Atakuje.";
  text.innerText += " Atakujesz swoim " + weapons[currentWeapon].name + ".";
  
  if (isMonsterHit()) {
    health -= getMonsterAttackValue(monsters[fighting].level);
  } else {
    text.innerText += " Przeciwnik nie spodziewał się tego ataku i pudłuje."
  }
  monsterHealth -= weapons[currentWeapon].power;
  monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    defeatMonsterTwo()
  }
}
function defeatMonsterTwo() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[9]);
}

function searchRoom() {
  update(locations[10]);
}

function leaveRoom() {
  update(locations[11]);
}

function powder() {
  text.innerText = "Rozsypałeś proch po pomieszczeniu wcelu wysadzenia całego młynu w powietrze."
}

let oneTime = false;
function takeBandage() {
  if (oneTime) {
    return;
  }
  health += 30
  healthText.innerText = health;
  oneTime = true;
  text.innerText = "Wyciągnąłeś bandaż i po uprzednim odkarzeniu rany ramienia związałeś ją po całej powierzchni. Rana jest płytka i nie groźna."
}

function raport() {

}

function boom() {

}

function moneyRaport() {

}