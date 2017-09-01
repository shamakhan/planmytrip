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
};

export default setScrollReveal;