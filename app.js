const dayAndNightBtn = document.querySelector("header img");

let count = 0;
const firstBody = document.querySelector("#body-1");
const secondBody = document.querySelector("#body-2");
const todoBody = document.querySelector("#substitute");
function checkCondition(imagePath) {
    if (window.innerWidth <= 596) {
        firstBody.style.background = imagePath;
        firstBody.style.backgroundSize = "cover";
        firstBody.style.backgroundRepeat = "no-repeat"
    }
}

function props(src,firstBodyBackgroundColor,secondBodyBackgroundColor,todoBodyBackgroundColor,secondBodyColor,checkConditionImage){
    dayAndNightBtn.setAttribute("src", src);
    firstBody.style.background = firstBodyBackgroundColor
    secondBody.style.background = secondBodyBackgroundColor;
    todoBody.style.background = todoBodyBackgroundColor
    secondBody.style.color = secondBodyColor;
    checkCondition(checkConditionImage)
}
const loadPage = ()=>{
   if(JSON.parse(localStorage.getItem("lightMode"))){
    const {src,firstBodyBackgroundColor,secondBodyBackgroundColor,todoBodyBackgroundColor,secondBodyColor,checkConditionImage} = JSON.parse(localStorage.getItem("lightMode"))[0];
    props(src,firstBodyBackgroundColor,secondBodyBackgroundColor,todoBodyBackgroundColor,secondBodyColor,checkConditionImage);
   }
}
loadPage()
dayAndNightBtn.onclick = () => {
    count++;
    if (count === 3) count = 1;
    if (count === 1) {
        const props = {
            src: "icon-sun.svg",
            firstBodyBackgroundColor: "url(bg-desktop-dark.jpg)",
            secondBodyBackgroundColor: `hsl(235, 21%, 11%)`,
            todoBodyBackgroundColor: `rgb(85 87 105)`,
            secondBodyColor: "#fff",
            checkConditionImage: "url(bg-mobile-dark.jpg)"
        }
        localStorage.setItem("lightMode", JSON.stringify([props]));
        const {src, firstBodyBackgroundColor, secondBodyBackgroundColor, todoBodyBackgroundColor, secondBodyColor, checkConditionImage} = props;
        dayAndNightBtn.setAttribute("src", src);
        firstBody.style.background = firstBodyBackgroundColor
        secondBody.style.background = secondBodyBackgroundColor;
        todoBody.style.background = todoBodyBackgroundColor
        ///This is the dark version 
        secondBody.style.color = secondBodyColor;
        checkCondition(checkConditionImage)

    } else {
        const props = {
            src: "icon-moon.svg",
            firstBodyBackgroundColor: "url(bg-desktop-light.jpg)",
            secondBodyBackgroundColor: `#fff`,
            secondBodyColor: "#000",
            todoBodyBackgroundColor: `white`,
            checkConditionImage: "url(bg-mobile-light.jpg)"
        }
        
        localStorage.setItem("lightMode", JSON.stringify([props]));
        const {src, firstBodyBackgroundColor, secondBodyBackgroundColor, todoBodyBackgroundColor, secondBodyColor, checkConditionImage} = props;
   

      dayAndNightBtn.setAttribute("src", src);
        firstBody.style.background = firstBodyBackgroundColor
        secondBody.style.background = secondBodyBackgroundColor;
        secondBody.style.color = secondBodyColor
        todoBody.style.background = todoBodyBackgroundColor
        checkCondition(checkConditionImage);
    }

}



const overAllContainer = document.querySelector("#con");
const completedContainer = document.querySelector("#active-container");
let overAllArray = [];
const input = document.querySelector("#input-type");
const btn = document.querySelector("button");
const completedBtn = document.querySelector(".completed");
const allTodosBtn = document.querySelector(".all");

if(localStorage.getItem("array")){
    overAllArray = JSON.parse(localStorage.getItem("array"));
    displayAllOverAllArray()
    console.log(localStorage.getItem("array"));
    console.log(overAllArray)
}
/* What this function does is to check if the todo item is active, if it does,
    img is shown, and vice versa
    Modify the function
*/

function checkLength() {
    let overAllArrayLength = overAllArray.length;

}

function displayAllOverAllArray() {
    overAllContainer.innerHTML = overAllArray.map((item) => {
        return `
        <div id=a${item.id} class="just-use-this" style="display: flex; align-items: center; padding: 0.7em 15px; border-bottom: 1px solid grey; border-box: border-box; border-radius: 5px;">
        <p class="elem" id=a${item.id}>${item.value}</p>
        <img id=a${item.id} class="edit-btn" src="pencil.svg" style="cursor:pointer; margin-left:auto;"/>
        <img id=a${item.id} class="del-btn" src="trash.svg" style="cursor:pointer; margin-left: 15px;"/>
        </div>
        `
    }).join("")
   
    deleteIndividualArrayElement()
    editTodo()
    
}

function deleteIndividualArrayElement() {
    let deletedElement = [];
    let deleteIndividualArrayElementButton = document.querySelectorAll(".del-btn");
    deleteIndividualArrayElementButton.forEach(item => {
        item.onclick = (e) => {
            let targetElementId = e.target.parentElement.id;

            deletedElement = overAllArray.filter(item => `a${item.id}` !== targetElementId)
            overAllArray = deletedElement;
            deletedElement = [];
            overAllArray.forEach((item, index) =>{
                item.id = index;
            })
            localStorage.setItem("array", JSON.stringify(overAllArray))
            return displayAllOverAllArray();

        }
    })
}

function editTodo (){
    const buttons = document.querySelectorAll(".edit-btn");
    buttons.forEach(btn =>{
        btn.onclick =  (e)=>{
            const modal = document.querySelector(".modal");
            function changeText(){
                
                const input = document.querySelector("#input-text");
                const saveBtn = document.querySelector("#save");
                const exitBtn = document.querySelector("#exit");
                let needed = "";
                const targetElementId = e.target.parentElement.id;
                const target = e.target.parentElement.innerHTML;
                const pElement = document.querySelector(`.just-use-this p#${targetElementId}`);
                saveBtn.onclick = ()=>{
                    if(input.value.trimStart() === "") {
                        value = ""
                        return;
                    }else{
                        needed = input.value;
                        input.value = "";
                    }
                    modal.style.display = "none"
                    const pElementT = needed;
                    console.log(pElementT)
                    overAllArray.find(item =>{
                        return `a${item.id}` === targetElementId ? item.value = pElementT : null; 
                    })
                    localStorage.setItem("array", JSON.stringify(overAllArray))
                    displayAllOverAllArray()
                }
                exitBtn.onclick = ()=>{
                    input.value = "";
                    modal.style.display = "none"
                }
            }
            changeText()
                   
            
            modal.style.display = "block"

        }
    })

}

function deleteAll(){
    const button = document.querySelector("#clear-Completed");
    button.onclick = ()=>{
        overAllArray = [];
        localStorage.setItem("array", []);
        displayAllOverAllArray()
    }
}

deleteAll()

btn.onclick = () => {
    if (input.value.trimStart() === ""){
      input.value = "";
      return;
    }
    else {

        overAllArray.push({
            value: input.value,
            id: overAllArray.length
        });
        input.value = "";
    }
    localStorage.setItem("array", JSON.stringify(overAllArray))
    console.log(document.querySelector("#substitute").clientHeight)
    
    displayAllOverAllArray()
}

