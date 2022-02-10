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

                <nav class="breadcrumb is-small" aria-label="breadcrumbs">
                    <ul>
                        <li><a href="/">Main</a></li>
                        <li class="is-active"><a href="#" aria-current="page">Ende</a></li>
                    </ul>
                </nav>


                <div class="content">
                    <p>
                       Herzlichen Glückwunsch Du hast alle unsere Rätsel gelöst! Das hat vor Dir noch keiner geschafft! (Dass es vor Dir keiner Versucht hat lassen wir mal außen vor...)  Der Weg war in diesem Fall das Ziel. Wir hoffen, dass Dir dieser Weg etwas Freude bereitet hat. 
                    </p>

                    <p>
                        <div style="text-align: center;" class="figure">
                            <img src="images/win.jpg"> 
                        </div>
                    </p>

                </div>
            </div>
        </div>

        <script src="https://cdn.jsdelivr.net/npm/party-js@latest/bundle/party.min.js"></script>
        <audio preload="true" src="sounds/trumpet.mp3"></audio>
        <script>
                setInterval(() => {
                    party.confetti(document.querySelector("body"), {
                        count: party.variation.range(30,50),
                        spread: party.variation.range(30,50)
                    });
                }, 1300);

                setInterval(() => {
                    party.sparkles(document.querySelector(".title"))
                }, 3000);

                setInterval(() => {
                    party.sparkles(document.querySelector("img"))
                }, 1200);

                let audio = document.querySelector("audio"); //new Audio("sounds/trumpet.mp3");
                audio.addEventListener("canplaythrough", e => {
                    setInterval(() => {
                        audio.play();
                    }, 8000);
                });
        </script>
    </body>
</html>