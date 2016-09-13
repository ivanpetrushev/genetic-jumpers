function Jumper(genes){
    this.pos = createVector(width/2, height);
    this.acc = createVector(0, 0);
    this.in_jump = false;
    this.color = color(random(255), random(255), random(255));
    this.min_y = height;
    this.fitness = 0; // max height inverted
    
    this.genes = genes || [];
    this.next_genes = [];
    this.jump_counter = 0;
    
    this.applyForce = function(force){
        this.acc.add(force);
    }
    
    this.update = function(){
        if (! this.in_jump){
            if (this.genes.length > 0){
                impulse = this.genes[this.jump_counter];
            }
            else {
                var impulse = createVector(random(-width/2, width/2), -random(height));
                impulse.setMag(20);
                this.next_genes.push(impulse); // save for further generations
            }
            this.applyForce(impulse);
            this.in_jump = true;
            this.jump_counter++;
        }
        
        this.applyForce(createVector(0, 1)); // gravity
        
        this.pos.add(this.acc);
        
        // don't get outside the screen
        if (this.pos.y > height){ // on floor
            this.in_jump = false;
            this.acc = createVector(0, 0);
            this.pos.y = height;
        }
        if (this.pos.x > width){ // on left
            this.pos.x = width;
        }
        if (this.pos.x < 0){ // on right
            this.pos.x = 0;
        }
        // do we care about shooting above top? probably not
        
        // keep track how high we got
        if (this.pos.y < this.min_y){
            this.min_y = this.pos.y;
            this.fitness = map(this.min_y, 0, height, 100, 0);
            this.fitness = round(this.fitness);
        }
    }
    
    this.show = function(){
        fill(this.color);
//        console.log('show at', this.pos)
        ellipse(this.pos.x, this.pos.y, 30, 30);
    }
}
