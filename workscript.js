//Observer for work window

//put all discipline divs into an array
var workParent = $(".work-parent").toArray();
//put all texts into an array
var texts = $("#text-grid > div").toArray();
//select div with the scroll bars
var scrollGrid = document.getElementsByClassName("scroll-grid")[1];

//We are watching the work parent divs, which each have an attribute called "data-index"

function callbackFunction(entries){
    entries.forEach(entry => {
        const index = entry.target.getAttribute("data-index");

        //check if media query or screen size is mobile, add a mobile if/else here
            
            // Create a MediaQueryList object
           var x = window.matchMedia("(max-width: 700px)")

            if (x.matches) { // If media query matches
                //mobile mode

              if((entry.intersectionRatio > 0.3)) {
                //changes proportions of scroll bars
                scrollGrid.classList.add(`scroll-grid-${index}`);
                //pops out text
                texts[parseInt(index)].classList.add("pop-out-text");
             }else {
                scrollGrid.classList.remove(`scroll-grid-${index}`);
                texts[index].classList.remove("pop-out-text");
            }


            } else {
                //desktop mode

                //if the div has scrolled past the top OR if more than 70% is on-screen (for the smaller divs)
                if((entry.boundingClientRect.top) < 0 || entry.intersectionRatio > 0.7) {
                    //changes proportions of scroll bars
                    scrollGrid.classList.add(`scroll-grid-${index}`);
                    //pops out text
                    texts[parseInt(index)].classList.add("pop-out-text");
                } else {
                    scrollGrid.classList.remove(`scroll-grid-${index}`);
                    texts[index].classList.remove("pop-out-text");
                }
                
                //handles cases of divs that are past the screen but have moved to be less visible
                if(entry.intersectionRatio<0.7) {
                    scrollGrid.classList.remove(`scroll-grid-${index}`);
                    texts[index].classList.remove("pop-out-text");
                };
            }
  
    })
}
const options = {
    root: null,
    // rootMargin:"100px",
    threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
    // threshold: 0.95
}

const observer = new IntersectionObserver(
    callbackFunction,
    options
)

observer.observe(workParent[0]);
observer.observe(workParent[1]);
observer.observe(workParent[2]);
observer.observe(workParent[3]);
observer.observe(workParent[4]);
observer.observe(workParent[5]);




//for the fly-out menu

var textGrid = document.getElementsByClassName("scroll-grid")[0];

textGrid.addEventListener("mouseover", expandMenu);
textGrid.addEventListener("mouseout", shrinkMenu);

function expandMenu() {
    //this styles the panel
    textGrid.classList.add("fly-menu");
    //sets scroll bars to neutral
    // scrollGrid.style.gridTemplateRows = "1fr 1fr 1fr 1fr 1fr 1fr";
    scrollGrid.classList.add("neutral-scroll");
    for(i=0;i<texts.length;i++){
        texts[i].classList.add("pop-out-text");
    }
}

function shrinkMenu() {
    textGrid.classList.remove("fly-menu");
    // scrollGrid.style.gridTemplateRows = "null";
    scrollGrid.classList.remove("neutral-scroll");
    for(i=0;i<texts.length;i++){
        texts[i].classList.remove("pop-out-text");
    }
}


//for jumping to a section

for(i=0;i<texts.length;i++){
    //temporary variable stores the number from 0-5
    let thisAttribute = texts[i].getAttribute("data-index");
    //this empty function workaround allows "thisAttribute" to be passed as a variable to jumpSection
    texts[i].addEventListener("click", function() {
        jumpSection(thisAttribute);
    })
}

//the actual jumpSection function
function jumpSection(dataIndex){
    workParent[dataIndex].scrollIntoView({ behavior: "smooth", block: "start" });
}


//for portfolio image overlays on hover

//get all image-overlays and put it into an array
var imageOverlay = $(".image-overlay").toArray();
// var imageOverlay = $(".image-overlay").toArray();
var workText = $(".work-text").toArray();
//get my-url attribute
var workChild = $(".work-parent>*").toArray();




for(i=0;i<imageOverlay.length;i++){
    const thisIndex = i;
    imageOverlay[i].addEventListener("mouseover", function(){
         myHover(thisIndex);
    });

    imageOverlay[i].addEventListener("mouseout", function(){
        myReturn(thisIndex);
    });

    imageOverlay[i].addEventListener("click", function(){
        myClick(thisIndex);
    });
}

function myHover(index) {
    imageOverlay[index].classList.add("image-overlay-hovered");
    workText[index].classList.add("work-text-hovered");
    
}

function myReturn(index) {
    imageOverlay[index].classList.remove("image-overlay-hovered");
    workText[index].classList.remove("work-text-hovered");
}

function myClick(index) {
    window.open(workChild[index].getAttribute("my-url"), "_self");

}

//assigns each workChild a data-index attribute (I'm too lazy to manually put them in, plus will handle new works)
for(i=0;i<workChild.length;i++){
    workChild[i].setAttribute("data-index", i);
}


//new intersection observer for portfolio clickables

function mobileCallbackFunction(entries){
    entries.forEach(entry => {
        const index = entry.target.getAttribute("data-index");

        var x = window.matchMedia("(max-width: 700px)")

            if (x.matches) { //check if window is small enough
                if(entry.intersectionRatio > 0.99) {
                    imageOverlay[index].classList.add("image-overlay-hovered");
                    workText[index].classList.add("work-text-hovered");
                } else {
                    imageOverlay[index].classList.remove("image-overlay-hovered");
                    workText[index].classList.remove("work-text-hovered");
                }
            } //if on desktop mode, do nothing
    })
}

const mobileObserver = new IntersectionObserver(
    mobileCallbackFunction,
    options
)

for(i=0;i<workChild.length;i++){
    mobileObserver.observe(workChild[i]);
}




