let toAnimate = document.querySelectorAll('.animSection');
console.log(toAnimate);
window.onscroll = ()=>{
    toAnimate.forEach(sec =>{
        let top = window.scrollY;
        let offset = sec.offsetTop;
        let height = sec.offsetHeight;

        if(top >= offset-400 && top < offset+height){
            sec.classList.add('show-animation');
        }else{
            sec.classList.remove('show-animation');
        }
    });
}