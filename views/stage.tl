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
                        <div class="message is-link">
                            <div class="message-header">
                                ${d.title}
                            </div>
                            <div class="message-body">
                                <p>${d.text}</p>
                            </div>
                        </div>
                    </p>

                    <div class="message is-primary">
                        <div class="message-header">
                            Lösungswort
                        </div>
                        <div class="message-body">
                            Das Lösungswort lautet...
                            <div class="field has-addons mt-5">
                                <p class="control">
                                    <input id="code" type="password" class="input is-medium">
                                </p>
                                <p class="control">
                                    <a id="btn" class="button is-warning is-medium">Lösen</a>
                                </p>
                            </div>
                        </div>
                    </div>
                                        
                </div>
            </div>

            <div id="success" class="modal">
                <div class="modal-background"></div>
                <div class="modal-content">
                    <div class="message is-success">
                        <div class="message-header">
                            Lösung
                        </div>

                        <div class="message-body">
                            <p>
                            Richtig! <a href="/${d.stage + 1}">Hier</a> geht's zur nächsten Herausforderung.
                            </p>
                        </div>
                        <button class="modal-close is-large" aria-label="close"></button>
                    </div>
                </div> 
            </div>

            <div id="failure" class="modal">
                <div class="modal-background"></div>
                <div class="modal-content">
                    <div class="message is-danger">
                        <div class="message-header">
                            Lösung
                        </div>

                        <div class="message-body">
                            <p>
                            Leider nein...
                            </p>
                        </div>
                        <button class="modal-close is-large" aria-label="close"></button>
                    </div>
                </div> 
            </div>
        </div>

    <script>
       (() => {
            document.querySelector("#btn").addEventListener("click", () => {
                let code = document.querySelector("#code").value;
                let url = "http://localhost:2030/check/${d.stage}?code=" + code;

                fetch(url).then(res => {
                    res.json().then(data => {
                        if (data.success) {
                            document.querySelector("#success").classList.add("is-active");
                        } else {
                            document.querySelector("#failure").classList.add("is-active");
                        }
                    }).catch(e => {
                        console.log(e);
                    });
                }).catch(e => {
                    console.log("error");
                })
            });

            document.querySelectorAll(".modal-close, .modal-background").forEach(el => {
                el.addEventListener("click", e => { 
                    el.closest(".modal").classList.remove("is-active");
                });
            });

       })();
    </script>
    </body>
</html>