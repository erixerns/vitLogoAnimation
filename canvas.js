


var ball;
//var queue = [];


var logoPoints =[
  [100,300,255],
  [50,100,255],
  [100, 300,255],
  [150,100,255],
  [100,300,255],

  [250,300,255],
  [250,100,255],
  [250,300,255],

  [400,300,255],
  [400,100,255],
  [350,100,255],
  [450,100,255],
  [400,100,255],
  [400,300,255]

];

var box1Points = [
  [40,320],
  [460,320],
  [460,80],
  [40,80]
];

var box2Points = [
  [40,80],
  [40,320],
  [460,320],
  [460,80]
];

var box3Points=[
  [460,80],
  [40,80],
  [40,320],
  [460,320]
];

var box4Points=[
  [460,320],
  [460,80],
  [40,80],
  [40,320]
];

var boxSpeed=0.05;


var currentPoint = 0;

function setup(){
  createCanvas(500, 400);
  logo= new Shape(100,300,logoPoints,0.7);
  box1=new Shape(40,320,box1Points,boxSpeed);
  box2=new Shape(40,80,box2Points,boxSpeed);
  box3=new Shape(box3Points[0][0],box3Points[0][1],box3Points,boxSpeed);
  box4=new Shape(box4Points[0][0],box4Points[0][1],box4Points,boxSpeed);
  console.log(height);
  background(0);
}


function draw(){
  background(0,5);
  noStroke();
  logo.render();
  box1.render();
  box2.render();
  box3.render();
  box4.render();
}


Shape = function(x,y,point,speed){
  this.x=x;
  this.y=y;
  this.points=point;
  this.color = 0;
  this.speed=speed;
  this.currentPoint=0;
  /*this.q.pop = q.shift;*/
  //this.hasMoved=false;
  this.prevX=this.x;
  this.shiftOnce=true;
  this.queue=[];
  this.render = function(){
    push();
    this.update();
    colorMode(HSB, 100, 100, 100);
    fill(255,this.color,this.color);
    beginShape(LINES);
    strokeWeight(5);
    stroke((frameCount*0.2)%100,100,100);
    for(var i=0; i<this.queue.length; i++)
      vertex(this.queue[i][0],this.queue[i][1]);

    endShape();
    this.color = 0;
    pop();
    // /this.update();
  };
  this.update = function(){
    //For x
    this.queue.push([this.x, this.y]);
    if(this.x!==this.points[this.currentPoint][0]){
      this.x+=(this.points[this.currentPoint][0]-this.x)*this.speed;
    }
    // for y
    if(this.y!==this.points[this.currentPoint][1])
    this.y+=(this.points[this.currentPoint][1]-this.y)*this.speed;

    if(abs(this.points[this.currentPoint][0]-this.x)<1 && abs(this.points[this.currentPoint][1]-this.y)<1){
      this.prevX=this.x;
      this.x=this.points[this.currentPoint][0];
      this.y=this.points[this.currentPoint][1];
      this.hasMoved=false;
      this.currentPoint++;
      //console.log(currentPoint);
      if(this.currentPoint>this.points.length-1)
        this.currentPoint=0;
    }
    /*
    // for y
    if(this.y!=points[currentPoint][1])
      this.y+=(points[currentPoint][1]-this.y)*this.speed;
    */
      

    if(this.queue.length>5){
      this.shiftOnce=false;
      this.queue.shift();
    }
  };
};