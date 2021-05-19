const audioPlayer = document.querySelector('audio');

//avec la WEB AUDIO API de js
audioPlayer.addEventListener('play', () => {

    //constructeur js. methodes et props liées au son
    const contexteAudio = new AudioContext();
    //metode crée une source pour manipuler les fréquences
    const src = contexteAudio.createMediaElementSource(audioPlayer);
    //va permettre de faire des representations de données
    const analyseur = contexteAudio.createAnalyser();

    const canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    //contexte d'utilisation en 2 dimensions
    const ctx = canvas.getContext('2d');

    //connexion de la source avec l'analyseur
    src.connect(analyseur);
    //connexion de l'analyseur . la destination c'est la sortie audio
    analyseur.connect(contexteAudio.destination);
    //traite un signal numérique pour nous fournir une fréquence
    analyseur.fftSize = 1024;
    //frequence = 512
    const frequenceAudio = analyseur.frequencyBinCount;
    console.log(frequenceAudio);

    //tableau qui contient toutes les frequences du morceau quand il est joué
    const tabFrequences = new Uint8Array(frequenceAudio);

    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;

    const largeurBarre = (WIDTH / tabFrequences.length) + 2 ;
    let hauteurBarre;
    let x;

    function drawBarres(){

        //s appelle 60 fois par secondes. permet de dessiner les barres
        requestAnimationFrame(drawBarres);
        x = 0;
        //valeur entre 0 et 255
        analyseur.getByteFrequencyData(tabFrequences);

        //fond du canvas
        ctx.fillStyle = "#000";
        //dessine le fond en noir
        ctx.fillRect(0,0,WIDTH,HEIGHT);
        //pour chaque frequence on dessiine un petit rectangle
        for (let i = 0; i < frequenceAudio; i++) {

            hauteurBarre = tabFrequences[i];
            let r = 250;
            let g = 50;
            let b = i;

            ctx.fillStyle = `rgb(${r},${g},${b})`;
            ctx.fillRect(x,HEIGHT,largeurBarre,-hauteurBarre);
            //a chaque créeation de rectangle, elles se creent les unes a coté des autres
            x += largeurBarre + 1;
        }
    }
    drawBarres();
})