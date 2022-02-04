<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
        <link rel="stylesheet" href="css/bulma.min.css">
        <title>Schnitzeljagd</title>
    </head>

    <body>
        <div class="container">
            <div class="box mt-5">
                <h1 class="title">Hennings Private Schnitzeljagd</h1>
                <h2 class="subtitle">Einfach damit er was zutun hat...</h2>

                <div class="content">
                    <p>
                        <div class="columns">
                            <div class="column is-three-quarters">
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                            </div>
                            <div class="column">
                                <figure>
                                    <img style="max-width: 50%" src="images/question.jpg">
                                </figure>
                            </div>
                        </div>
                    </p>

                    <p>
                        <ol>
                            <li>Die erste Zahl hast du bereits erhalten.</li>
                            <li>Buchstabe unterm Glas</li>
                            <li>binary encode -> ascii</li>
                            <li>Zwischen Kinder u. Jugendfarm ev. (erster Hausbau) und du das letzte mal die Stollenschuhe geschnürrt hast und erstem Auto (Autohaus Brandt) und Riede</li>
                            <li>Programm eval</li>
                            <li>telegram bot schreiben - cat api</li>
                            <li>Quelltext gucken</li>
                            <li>Schablone</li>
                            <li>Leute nach Sachen fragen</li>
                            <li>optional: streichhölzer mit verschieben-witz</li>
                            <li>Mitten Marktplatzrätsel, gegenüber von chrisseys bruder....</li>
                            <li>Irgendwas mit netflix szene, spotify, .....</li>
                        </ol> 
                    </p>

                    <p style="text-align: center"> 
                        <a class="button is-info" href="/1">Start</a> 
                    </p>

                    <div class="message is-primary">
                        <div class="message-header">
                            Bisherige Rätsel
                        </div>
                        <div class="message-body">
                           <ol>
                                ${d.puzzleList}
                           </ol>  
                        </div>
                    </div>
                                        
                </div>
            </div>
        </div>

    </body>
</html>