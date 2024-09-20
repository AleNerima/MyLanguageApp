                                                     ---------------------------------------
                                                                 MyLanguageApp
                                                       -----------------------------------

MyLanguage App è un'applicazione che permette di migliorare le competenze linguistiche attraverso lo studio di vocaboli, la creazione di deck e flashcard, e la partecipazione a una community di studenti di lingue.

--------------------------
Tecnologie Utilizzate
-------------------------

Backend: .NET Core con Entity Framework
Frontend: Angular
Database: SQL Express

-------------------------------
Funzionalità Principali
-------------------------------

Creazione di Deck e Flashcard: Organizza i tuoi vocaboli con deck e flashcard.
Studio dei Vocaboli: Ripetizione dei vocaboli in base alla difficoltà di memorizzazione dello studente.
Community: Interagisci con altri studenti attraverso post, commenti, amicizie e chat.

-----------------------------
Installazione
-----------------------------

Prerequisiti
.NET SDK
Angular CLI
SQL Server Express

------------------------------
Avvio dell'Applicazione
------------------------------

1-Clona il repository.

2-Esegui le migrazioni di Entity Framework per configurare il database:

     Da Console Gestione Pacchetti lancia i comandi:
          -Add-Migration [NomeMigrazione]
          -Update-Database
     
     

3-Avvia il backend per rendere raggiungibili gli endpoints dell'API:


4-Avvia il frontend:

          -Nella cartella del progetto frontend, esegui il comando:
           [ng serve -o]



L'app sarà disponibile all'indirizzo http://localhost:4200.