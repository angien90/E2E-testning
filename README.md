# Inlämning 2 i kursen Testning - E2E

Uppgiften examinerar följande moment från kursplanen:

* Tekniker för att kvalitetssäkra kod
* Hur testverktyg kan användas
* Genomföra End-to-end-tester för att upptäcka och åtgärda buggar

## Uppgiftsbeskrivning
* Din uppgift är att skapa en enkel to do-app i valfritt ramverk, och E2E-testa den.
* Det går bra att använda färdig kod från tidigare projekt/internet/AI, ta t.ex. hjälp av TodoMVC - ni hittar källkodslänkar till vänster när ni har valt ramverk. Du behöver inte skriva To Do-appen från scratch; fokus är på testning.
* To do-appen ska innehålla följande funktioner:
    * Kunna lägga till en todo
    * Kunna ta bort en todo, men endast om den är klar (inte en användarvänlig funktion, men för att kunna skriva ett test som verifierar att detta fungerar)
    * Kunna markera en todo som klar
    * Kunna avmarkera en todo som klar
    *  Ha 2 exempeltodos i listan från början, där en är färdig och den andra ofärdig
* Skriv tester med hjälp av Cypress för att verifiera att flödet fungerar:
    * Applikationen startar/visar något (mount)
    * Det finns 2 uppgifter där en är klar och den andra inte är det
    * Det går att lägga till en todo
    * Det går att ta bort en todo
    * Det går att "toggla state" för todon
* Göra en (utförlig) README till ditt repo som demonstrerar dina resultat, inkl. skärmdumpar på samtliga tester (att de har gått igenom).

#### Syfte med uppgiften
* Förstå hela flödet för testning, från start till mål
* Kunna använda ett E2E-testverktyg
* Förstå och fatta beslut kring tekniker för att kvalitetssäkra kod
* Åtgärda buggar

## Bedömning
#### För G
* Du har utfört uppgiften enligt specifikationen ovan

<br>
<br>
<br>

# Applikationen 
![Desktop & Tablet](public/Applikationen_desktop_tablet.png)

Hur applikationen ser ut på desktop och tablet

![Mobile](public/Applikationen_mobil.png)

Hur applikationen ser ut på mobilen


# Dokumentation av tester
Detta projekt är en enkel habit tracker byggd med Vue.js. Appen visar hur man kan lägga till, ta bort och markera vanor som klara/icke-klara. Fokus ligger på att skriva och köra E2E-tester med Cypress för att verifiera att alla flöden fungerar som de ska.

## Funktioner
* Lägg till en vana
* Ändra en vana
* Ta bort en vana 
* Markera/avmarkera en vana som klar
* Sortera på vana, datum och status

## Skärmdumpar från Cypress

![App.cy.js](public/App.png)
App.cy.js - Säkerställa att App.vue renderas korrekt

![HabitForm.cy.js](public/HabitForm.png)
HabitForm.cy.js - Säkerställer att man kan skriva in en ny vana och att formuläret fungerar som det ska.

![HabitItem.cy.js](public/HabitItem.png)
HabitItem.cy.js - Testar att det går att ändra vanor, toggla status och ta bort en vana.

![HabitList.cy.js](public/HabitList.png)
HabitList.cy.js - Renderar alla vanor och hanterar events från HabitItem.

![HabitTracker.cy.js](public/HabitTracker.png)
HabitTracker.cy.js - Testar hela habit-flödet (UI, interaktion och event-hantering).


## Installation och körning   
#### Initiera projektet
1. npm init
2. npm create vite@latest .  
(Valde Vue och Javascript i detta projekt)

#### Routing
npm install vue-router

#### Cypress
1. npm add --save-dev cypress
2. Lade till "cypress": "cypress open" i package.json under script.
3. npx cypress open

#### Starta projektet
1. npm install
2. npm run dev