function Jumper(){
    this.pos = createVector(width/2, height);
    this.acc = null;
    this.in_jump = false;
    
    this.applyForce = function(force){
        this.acc.add(force);
    }
    
    this.update = function(){
        if (this.pos.y == height){ // on floor
            this.in_jump = false;
            this.acc = null;
        }
        if (! this.in_jump){
            var impulse = createVector(random(width), random(height));
            this.applyForce(impulse);
            this.in_jump = true;
        }
        
        this.applyForce(createVector(0, 1)); // gravity
        
        this.pos.add(this.acc);
    }
    
    this.show = function(){
        fill(255, 0, 0);
        ellipse(this.pos.x, this.pos.y, 5, 5);
    }
}
