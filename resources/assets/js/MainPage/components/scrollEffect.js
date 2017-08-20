import ScrollReveal from 'scrollreveal';

function setScrollReveal() {
    window.sr = ScrollReveal();
    sr.reveal('.mid-section-middle',{
        origin:'top',
        duration:2000,
        distance:'50px'
    });

    sr.reveal('.sideImage',{
        origin:'left',
        duration:2000,
        distance:'100px'
    });
    sr.reveal('.infoRight',{
        origin:'right',
        duration:2000,
        distance:'100px'
    });
    sr.reveal('.place1',{
        origin:'bottom',
        distance:'100px',
        duration:1500
    });
    sr.reveal('.place2',{
        origin:'bottom',
        distance:'100px',
        duration:1500,
        delay:500
    });
    sr.reveal('.place3',{
        origin:'bottom',
        distance:'100px',
        duration:1500,
        delay:1000
    });
};

export default setScrollReveal;