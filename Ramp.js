function Ramp(i){
    this.h = height - (i+1) * 70;
    this.left = createVector(150 * (i+1), this.h);
    this.right = createVector(this.left.x + 100, this.h);
    
    this.show = function(){
        stroke(255);
        line(this.left.x, this.left.y, this.right.x, this.right.y);
    }
}
