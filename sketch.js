function preload(){
RunImg = loadImage("./assets/girlRun.png");
bookImg = loadImage("./assets/book1.png");
securityImg = loadImage("./assets/security.png");
background2 =loadImage("./assets/bg2.jpg");
background1=loadImage("./assets/bg1.png");
}




var molly, gaurd,ground,bg,gamestate="start";
var puzzle, submitbtn;
var check=1;


function setup(){
createCanvas(windowWidth,windowHeight);

text("Hello molly you are trapped in a castle ,to escape from the castle you have solve puzzles and  you must hurry before the ghost catches you",width/2-200,height/2-300)

//creating the PC  and NPC characters//
bg= createSprite(width/2,height/2,width,height);
bg.addImage(background1);
bg.scale=2.5

ground = createSprite(width/2,height-40,width,60);
molly = createSprite(width/2+200,height-160,20,90);
molly.addImage(RunImg);
molly.scale = 0.5;

gaurd = createSprite(width/2-100,height-170,20,100);
gaurd.addImage(securityImg)
gaurd.scale=0.5;

ghost = createSprite(width/2-150,height-100,20,100);
ghost.visible = false;
puzzleG=new Group();


    input1 = createInput("");
    input1.position(width/2+100,height/8+90);

    input2 = createInput("");
    input2.position(width/2-150,height/8+90);
    input2.hide();
     
    submitbtn= createButton("Submit");
    submitbtn.position(width/2+40,height/8+90);



}

function draw(){
  background("white");

 //The instructions that will be displayed for the game// 
text("Hello molly you are trapped in a castle ,to escape from the castle you have solve puzzles and  you must hurry before the ghost catches you",width/2-200,height/2-300)



 
// code for when the gamestate is start//
if(gamestate=="start"){
  if(keyDown("space")){
   check=1;
   
    gaurd.visible=false;
    ghost.visible = true;
    }
    if(bg.x<width/3){
      bg.x=width/2;
    }
    portal();
    enableStart();
    console.log(check);
    
    //code for when the gamestate is puzzle1//
    if(molly.isTouching(puzzleG) && check===1){
     gamestate="puzzle1";
    }
    if(molly.isTouching(puzzleG) && check===2){
      gamestate="puzzle2";
    }
 }
 drawSprites();
 
//disable the puzzle group//
  if(gamestate==="puzzle1"){
    disableStart();
    bg.addImage(background2);
    bg.scale =2;
    
    input1.show();
    submitbtn.show();
    fill("black");
    textSize(22);
    text("Unscramble the given words below",width/2-200,height/8);

    textSize(14);
    text("RDOIASUANS",width/2,height/8+100);
  
    var ans= "DINOSAURS";
    submitbtn.mousePressed(()=>{
     var Userans=input1.value();
     Userans=Userans.toUpperCase();
     if(ans==Userans){
       gamestate="start";
       check=2;
     }
   });
  }

  


  if(gamestate=="puzzle2"){
    disableStart();
    bg.shapeColor="magenta";
    bg.addImage(background2);
    bg.scale =2;
    input2.show();
    submitbtn.show();
    fill("black");
    textSize(22);
    text("Solve the riddles given  below",width/2-250,height/8);
    fill("black");
    textSize(15);
    text("The more there is the less you see.What is it?",width/2-460,height/8+100); 
    var ans= "DARKNESS";
    submitbtn.mousePressed(()=>{
     var Userans=input2.value();
     Userans=Userans.toUpperCase();
     if(ans===Userans){
       gamestate="end";
       check=3;
     }
   });

    
     


  }
if(gamestate=="end"){
bg.shapeColor="orange";
disableStart();
input1.hide();
submitbtn.hide();
text("Congrajulations!!! You won the game",width/3,height/2);
input2.hide();
}



}
// code for spawning puzzles//
function portal(){
  if(frameCount%80===0){
     puzzle = createSprite(width+100,height-100,10,10);
    puzzle.velocityX=-3;
    puzzle.addImage(bookImg);
    puzzle.scale=0.02;
    puzzleG.add(puzzle);
  }
}
function enableStart(){
  input1.hide();
  bg.velocityX=-2;
 submitbtn.hide();
}
function disableStart(){
  bg.velocityX=0;
  gaurd.visible=false;
  puzzleG.destroyEach();
  ground.visible=false;
  molly.visible=false;
  
}