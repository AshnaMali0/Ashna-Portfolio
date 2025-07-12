//changes background color once the opening logo is done moving

//temporarily disables scrolling until opening animation ends
$("body").css("overflow-y", "hidden");

var whiteBG = document.querySelector(".white-bg");
whiteBG.addEventListener("animationend", () => {
    whiteBG.style.animation = "none";
    $("body").css("overflow-y", "auto");
    // document.body.style.backgroundImage = "linear-gradient(rgb(72, 11, 11), rgb(0, 0, 0))";
    // document.body.style.backgroundColor = "black";
  });



//controls accordian movement by watching an invisible grid behind it

//put all accordian children and invisible grid children (scroll-children) into an array
var scrollArray = $(".scroll-child").toArray();
var accArray = $(".acc-child").toArray();
var accWrapper = $(".acc-wrapper"); //can move this up??
var animLogo = $(".child0");
var accVisible = $(".acc-child>img").toArray();
var accVisibleText = $(".acc-child>h1").toArray();

//here, I add an attribute called "data-index" inline the html and assign each scroll child a number (0,1,2,3...)

//the entries are the scroll-children (see observer.observe(XXX) below)
//the function adds and removes CSS classes to change the appearance of the accordian children 
function callbackFunction(entries){
    entries.forEach(entry => {
        const index = entry.target.getAttribute("data-index");
        if(entry.isIntersecting) {
            accArray[index].classList.add("acc-focus-0");
            //textGrid.classList.add(`scroll-grid-${index}`);
        } else {
            accArray[index].classList.remove("acc-focus-0");
            //textGrid.classList.remove(`scroll-grid-${index}`);
        }
    })
}

//in the root, enter the scrollable body you want to read. Here, it's just the main window ("null")
const options = {
    root: null,
    threshold: 0.6
}

const observer = new IntersectionObserver(
    callbackFunction,
    options
)

observer.observe(scrollArray[0]);
observer.observe(scrollArray[1]);
observer.observe(scrollArray[2]);
observer.observe(scrollArray[3]);


//index-overlay hover with event listener

var indexOver = $(".index-overlay").toArray();

for(i=0;i<(indexOver.length);i++){
    const thisIndex = i;
    // var thisIndex = indexOver[i].getAttribute("data-index");
    indexOver[i].addEventListener("mouseover", function(){
        myHover(thisIndex)
    });
    indexOver[i].addEventListener("mouseout", function(){
        myReturn(thisIndex)
    });
    indexOver[i].addEventListener("click", function(){
        myClick(thisIndex)
    });
}

function myHover(index) {
    indexOver[index].classList.add("index-overlay-hovered");
}

function myReturn(index) {
    indexOver[index].classList.remove("index-overlay-hovered");
    // indexOver[index].style.backgroundImage = "linear-gradient(to right, black, rgba(0, 0, 0, 0) 75%)";
}

function myClick(index) {
    if(index==0) {
        window.location.href = (`newwork.html`);
    } else if (index==1){
        window.location.href = (`newwork.html#text0`);
    } else { //index is 2
        window.location.href = (`newwork.html#text5`);
    }
    
}




