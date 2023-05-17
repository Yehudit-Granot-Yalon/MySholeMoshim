$(document).ready( newGame)//Sends to the function that initializes the game board
//Boot global variables
var wedth=9;
var length=9;
var level=1;
var FLAG = "&#9873;";
var MINE = "&#9881;";
var countOfMokshim=10;
var timer = 0;
var timeout;
var hasWin=0;
var hasFailed=0;
var arr=[];
var SIZE=wedth*length;
var highscorel1;
var highscorel2;
var highscorel3;
// for disabling right click use this as it is 
document.addEventListener('contextmenu', event => event.preventDefault());
   //The function initializes the game board according to the level selected by the player
 function  newGame() {
    displayWindow("dropDown1", "off");//close open things
    displayWindow("dropDown2", "off");
    displayWindow("dropDown3", "off");
    hasWin=0;
 hasFailed=0;
 //For level number 1
    if(level==1){
        wedth=9;
        length=9;
        countOfMokshim=10;
        SIZE=wedth*length;
        }
    //For level number 2
    if(level==2){
    wedth=15;
    length=15;
    countOfMokshim=30;
    SIZE=wedth*length;
    }
    //For level number 3
    if(level==3){
        wedth=27;
        length=16;
        countOfMokshim=85;
        SIZE=wedth*length;
        }
        intilization();//Send to a function that initializes the array 
        fixmokshim();//Sending to a function that randomly disperses mines in an array
        fixNumbers();//Send to a function that arranges numbers according to the location of the mines in the array
        //Presenting a game board formally
    var html = '<table id="table_id" class="board">';
     for(var i=0;i<SIZE;i++) {
            html += '<td class="cell" id="'+i+'"></td>';
            if(i%wedth==wedth-1){
                html += '<tr>';
               }
        }
         html += '</table>';
         document.getElementById("canvas").innerHTML = html;
         var boardSize = $('.board');
         var cellSize = $('.cell');
         //For level number 1
    if(level==1){
        cellSize.css('width', '60px');
        cellSize.css('height', '60px');
        boardSize.css('width', '630px');
    }
    //For level number 2
  if(level==2){
     cellSize.css('width', '40px');
    cellSize.css('height', '40px');
    boardSize.css('width', '714px');
}
//For level number 3
if(level==3){
   cellSize.css('width', '30px');
    cellSize.css('height', '30px');
    boardSize.css('width', '972px');
}
     var cells = document.getElementsByClassName("cell");
     //Add a listener to each slot on the game board
   for (i = 0; i < cells.length; i++)
   cells[i].addEventListener("mousedown", onMousedown);
   timeFunc();//function initializes the clock
 $('#mines-remaining').text("Mines: "+countOfMokshim);
   }
// The function initializes the clock
 var timeFunc= function(){
    $('#time').text("0");  
    timer = 0;
    clearInterval(timeout);
    timeout = setInterval(function () {
    // This will be executed after 1,000 milliseconds
    timer++;
    if( timer >= 999 )
    {
        timer = 999;
    }
    $('#time').text("Time: "+timer);
    }, 1000);
 }
  function winner(){//The function displays a win and puts the game time in localStorage
 clearInterval(timeout);
 //For level number 1
 if(level==1)  {
    var l1highscore = localStorage.getItem("highscorel1");
    if(l1highscore !== null){
        if (timer< l1highscore) {
            localStorage.setItem("highscorel1", timer);      
        }
    }
    else{
       localStorage.setItem("highscorel1", timer);
    }
     }
     //For level number 2
     if(level==2)  {
        var l2highscore = localStorage.getItem("highscorel2");
        if(l2highscore !== null){
            if (timer< l2highscore) {
                localStorage.setItem("highscorel2", timer);      
            }
        }
        else{
           localStorage.setItem("highscorel2", timer);
        }
         }
         //For level number 3
         if(level==3)  {
            var l3highscore = localStorage.getItem("highscorel3");
            if(l3highscore !== null){
                if (timer< l3highscore) {
                    localStorage.setItem("highscorel3", timer);      
                }
            }
            else{
               localStorage.setItem("highscorel3", timer);
            }
             }
    
}
  var scoreFunc= function(){//The function displays the fastest moderate victory in localStorage
 var l1= localStorage.getItem("highscorel1")
 //In case this is the first game
 if(l1==null)
 l1="noWin";
 var l2= localStorage.getItem("highscorel2")
 if(l2==null)
 l2="noWin";
 var l3= localStorage.getItem("highscorel3")
 if(l3==null)
 l3="noWin";
    var str= "The Fast Game\n Level 1: "+ l1+"\nLevel 2: "+l2+"\nLevel 3: "+l3;
    document.getElementById("score").innerHTML = str;
   }
 function fixmokshim()//The function arranges mines in the array at random
      {
         var i=countOfMokshim;
    var index;
    while(i!=0) {
 index=(Math.random()*((SIZE-1)+1));    
        index= parseInt(index,10);
      if(arr[index]!=-1) {
          arr[index]=-1;
            i--;
             }
    }
   }
   function fixNumbers(){//A function that arranges numbers in an array according to the location of the mines
    var i;
    var count =0;
    //In this case and place in the array was not chosen to be a mine
    if(arr[0]!=-1) {
        if(arr[1]==-1)
            count++;
        if(arr[this.wedth]==-1)
            count++;
        if(arr[this.wedth+1]==-1) 
            count++;
        arr[0]=count;// The first limb in the array
        count=0;
    }

    if(arr[this.wedth-1]!=-1) {
        if(arr[this.wedth-2]==-1)
            count++;
        if(arr[(this.wedth*2)-2]==-1)
            count++;
        if(arr[(this.wedth*2)-1]==-1)
            count++;
        arr[wedth-1]=count;// The last limb in the first row 
        count=0;
    }

    if(arr[this.wedth*(this.length-1)]!=-1) {
        if(arr[this.wedth*(this.length-2)]==-1)
            count++;
        if(arr[(this.wedth*(this.length-2))+1]==-1)
            count++;
        if(arr[(this.wedth*(this.length-1))+1]==-1)
            count++;
        arr[this.wedth*(this.length-1)]=count;// The first limb in the last row
        count=0;
    }
    if(arr[(SIZE)-1]!=-1 ){
        if(arr[(SIZE)-2]==-1)
            count++;
        if(arr[(this.wedth*(this.length-1))-1]==-1)
            count++;
        if(arr[(this.wedth*(this.length-1))-2]==-1)
            count++;
        arr[(SIZE)-1]=count;// The last limb in the last row
        count=0;
    }
    for( i=1;i<this.wedth-1;i++) {
        if(arr[i] !=-1) {
            if(arr[i+1]==-1)
                count++;
            if(arr[i-1]==-1)
                count++;
            if(arr[i+this.wedth]==-1)
                count++;
            if(arr[i+this.wedth-1]==-1)
                count++;
            if(arr[i+this.wedth+1]==-1)
                count++;
            arr[i]=count;// The limbs in the first row 
            count=0;
        }
    }

    for( i=this.wedth*(this.length-1)+1;i<(this.SIZE)-1;i++) {
        if(arr[i]!=-1) {
            if(arr[i-1]==-1)
                count++;
            if(arr[i+1]==-1)
                count++;
            if(arr[i-this.wedth]==-1)
                count++;
            if(arr[i-this.wedth-1]==-1)
                count++;
            if(arr[i-this.wedth+1]==-1)
                count++;
            arr[i]=count;// The limbs in the last row
            count=0;

        }
    }
    for(i=wedth;i<this.wedth*(this.length-1);i+=wedth) {
        if(arr[i]!=-1) {
            if(arr[i+1]==-1)
                count++;
            if(arr[i-wedth]==-1)
                count++;
            if(arr[i+wedth]==-1)
                count++;
            if(arr[i+1+wedth]==-1)
                count++;
            if(arr[i+1-wedth]==-1)
                count++;

            arr[i]=count;// The members in the first column 
            count=0;
        }
    }
    for(i=(2*wedth)-1;i<this.wedth*(this.length-1);i+=wedth) {
        if(arr[i]!=-1) {
            if(arr[i-1]==-1)
                count++;
            if(arr[i-wedth]==-1)
                count++;
            if(arr[i+wedth]==-1)
                count++;
            if(arr[i-1+wedth]==-1)
                count++;
            if(arr[i-1-wedth]==-1)
                count++;
            arr[i]=count;// The members in the first column
            count=0;
        }
    }
    for( i=wedth+1;i<this.wedth*(this.length-1)-1;i++) {
        if(arr[i]!=-1&&i%this.wedth!=0&&i%this.wedth!=wedth-1) {
            if(arr[i+1]==-1)
                count++;
            if(arr[i-1]==-1)
                count++;
            if(arr[i+wedth]==-1)
                count++;
            if(arr[i+wedth+1]==-1)
                count++;
            if(arr[i+wedth-1]==-1)
                count++;
            if(arr[i-wedth]==-1)
                count++;
            if(arr[i-wedth-1]==-1)
                count++;
            if(arr[i-wedth+1]==-1)
                count++;
            arr[i]=count;// The rest of the organs in the array 
            count=0;
        }}

}
var onMousedown = function (e) {  // Function that handles the click of a mouse
    e.preventDefault();  
    if(hasFailed==1||hasWin==1){
     return;// no let to prress if user was failed  or win
    }
    if (e.which === 1) {//Left-click the mouse 
        var id= $(this).attr("id");
      if(document.getElementById(id).innerHTML!=""){//jast if no flag and no number in place its open
          return;
         }
    var $cell = $( '#' + id );
     if(arr[id]==-1){// Step on a mine
        clearInterval(timeout);
        var mySound = new sound("bomb.mp3");
        mySound.play();//Function of audio during failure
        $cell.html( MINE ).css( 'color', 'red');
        //For level number 2
        if(level==2){
            $cell.html( MINE).css( 'font-size', '40px');
            $cell.html( MINE).css( 'line-height', '40px');
           }
            //For level number 3
        if(level==3){ 
            $cell.html( MINE).css( 'font-size', '30px');
            $cell.html( MINE).css( 'line-height', '30px');
           }
           //A loop that goes through all the cells and defines their size according to the selected level
        for(var i=0;i<SIZE;i++) {
            if(arr[i]==-1&&i!=id){
                 $cell = $( '#' + i );
                $cell.html( MINE ).css( 'color', 'black');
                if(level==2){
                    $cell.html( MINE).css( 'font-size', '40px');
                    $cell.html( MINE).css( 'line-height', '40px');
                   }
                if(level==3){ 
                    $cell.html( MINE).css( 'font-size', '30px');
                    $cell.html( MINE).css( 'line-height', '30px');
                   }
            
              }  
        }
        hasFailed=1;
        return;
      }
     
 var index=arr[id];
 $cell.css('background-image', 'radial-gradient(#fff,#e6e6e6)');
 //In case the selected cell contains a number greater than 0
 if(index>0) {
    setColorText(id);
  } 
if(index==0) {//In case the selected cell contains 0
 open(id);//Sending to a function that opens all the required cells around zero
 }
 checkWin();//Sending to a function that checks victory
    if(hasWin==1){//In case of victory
        mySound = new sound("win.mp3");
        mySound.play();//Function of audio during win
        winner();
    alert("Congratulations - you win\n"+"time:"+timer);
return;
}
}     
     if (e.which === 3)//Right-click the mouse
     {//In the case of right-clicking the mouse
    var id= $(this).attr("id");
        var $cell = $( '#' + id );
        var element=document.getElementById(id).innerHTML;
     //Cancel flag
       if(element!=""&&element!=" "&&element!="1"&&element!="2"&&element!="3"&&element!="4"&&element!=5&&element!=6&&element!=7&&element!=8){
            document.getElementById(id).innerHTML="";
       countOfMokshim++;
        }
        if(element==""){//put flag
            countOfMokshim--;
        $cell.html( FLAG ).css( 'color', 'red');//Display the flag in the appropriate place
        if(level==2){
            $cell.html( FLAG).css( 'font-size', '40px');
            $cell.html( FLAG).css( 'line-height', '40px');
 
        }
        if(level==3){ 
            $cell.html(  FLAG).css( 'font-size', '30px');
            $cell.html( FLAG).css( 'line-height', '30px');
           }
                }  
       $('#mines-remaining').text("Mines: "+countOfMokshim);
    }
     }
    function open(position) {//Recursive function that opens all the required cells around the cell that had 0 in it
    position=parseInt(position,10)//Conversion to number
     if(position>=0&&position<SIZE) {//The cell within the array boundaries
        var t=document.getElementById(position).innerHTML;
        var $cell = $('#'+position );
     if(t!="")//Stop conditions
            return;
            if(arr[position]>0) {//There is a large number from zero in this cell
              $cell.css('background-image', 'radial-gradient(#fff,#e6e6e6)');
         setColorText(position);
         return;
            }
            if(arr[position]==0) { //There is a  zero in this cell
               var s=" ";
               $cell.html(s);
                $cell.css('background-image', 'radial-gradient(#fff,#e6e6e6)');
            if(( position+1)%wedth!=0)
                open(position+1);//Recursive call
            if((position)%wedth!=0) 
                    open(position-1);//Recursive call
               open(position+wedth);//Recursive call
               open(position-wedth);//Recursive call
                if((position+1)%wedth!=0) 
                    open(position+wedth+1);//Recursive call
                if((position)%wedth!=0) 
                    open(position+wedth-1);//Recursive call
                if((position+1)%wedth!=0)
                    open(position-wedth+1);//Recursive call
                if((position)%wedth!=0)
                    open(position-wedth-1);//Recursive call
            }
        }
    }
    function  checkWin(){//A function that checks whether a victory has been made
        var t;
        for (var i = 0; i < SIZE; i++) {
            t=document.getElementById(i).innerHTML;
            if((arr[i]>0&&(t==""))||(t==FLAG))  
                  return ;
}
        hasWin=1;
    }
    function setColorText(id) {//The function determines the color of the number opened
        var $cell = $('#'+id );
        if(level==2){
            $cell.html( index ).css( 'font-size', '40px');
            $cell.html( index).css( 'line-height', '40px');
           }
        if(level==3){ 
            $cell.html( index ).css( 'font-size', '30px');
            $cell.html( index).css( 'line-height', '30px');
           }
        var index=arr[id]
        if(index==1)
        $cell.html( index ).css( 'color', 'blue');
        if(index==2)
        $cell.html( index ).css( 'color', 'red');
        if(index==3)
        $cell.html( index ).css( 'color', 'green');
        if(index==4)
        $cell.html( index ).css( 'color', 'yellow');
        if(index==5)
        $cell.html( index ).css( 'color', 'pink');
        if(index==6)
        $cell.html( index ).css( 'color', 'orange');
        if(index==7)
        $cell.html( index ).css( 'color', 'gray');
        if(index==8)
        $cell.html( index ).css( 'color', 'cyan');
}
function sound(src) {//Function of audio during failure
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
  }
  function intilization(){//Initial boot of the arr
    for (let i = 0; i < SIZE; i++) 
    arr[i]=-2;
 }