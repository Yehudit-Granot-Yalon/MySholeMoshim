
 //adding listeners to the navigation bar buttons
 var navBar = $(".navigationBar")[0].firstElementChild;
 while(navBar) {
     navBar.addEventListener("click", switchContent, false);
     navBar = navBar.nextElementSibling;
 }
//setting up the slide down menu
    var slideMenuButton = $(".slideMenu");
    slideMenuButton.text("levels");
    slideMenuButton.click(function() {
        displayWindow("dropDown2", "on");
    });
 //adding listeners to the drop down menu buttons
    var menuBar = $(".dropDown2")[0].firstElementChild;
    while(menuBar) {
         menuBar.addEventListener("click", switchContent, false);
        menuBar = menuBar.nextElementSibling;
    }
     //setting up the some more text
     var navBarButtons = $(".navigationButton");
     navBarButtons[0].innerText = "Scroll back";// close open windows
     navBarButtons[1].innerText = "Instructions";
     navBarButtons[2].innerText = "High score";
     navBarButtons[3].innerText = "New game";
    var menuBarButtons = $(".slideMenuButton");
    menuBarButtons[0].innerText = "level 1";
    menuBarButtons[1].innerText = "level 2";
    menuBarButtons[2].innerText = "level 3";
    var instructions = $(".instructions");
function switchContent(e) {
   
    //get the name of the button that was clicked
    var buttonClicked = e.target.innerText;
    
   //activate a function according to the button clicked
   
    switch (buttonClicked) {
        
        case "level 1":
        {
            level=1;
           newGame();
            break;
        }
        case "level 2":
            {
                level=2;
               newGame();
                break;
            }
            case "level 3":
                {
                    level=3;
                   newGame();
                    break;
                }
                       case "Scroll back":
                            {
                              
                                displayWindow("dropDown1", "off");
                                displayWindow("dropDown2", "off");
                                displayWindow("dropDown3", "off");
                                break;
                            }
                            case "Instructions":
                            {
                                displayWindow("dropDown1", "on");
                               break;
                            }
                            case "High score":
                                {
                                   scoreFunc();
                                    displayWindow("dropDown3", "on");
                               break;
                                }
                                case "New game":
                                    {
                                       newGame();
                                       break;
                                    }
}
}
//display the pop up window
function displayWindow(section, status) {
    var popUpWindow = $("." + section);
    if(status == "on")
        popUpWindow.stop(true, true).slideToggle();
    else
        popUpWindow.slideUp("slow");
}