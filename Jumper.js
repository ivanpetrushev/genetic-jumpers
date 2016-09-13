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
    this.ramp_jump_score = 0;
    
    this.applyForce = function(force){
        this.acc.add(force);
    }
    
    this.update = function(){
        if (! this.in_jump){
            if (this.genes.length > 0){
                impulse = this.genes[this.jump_counter];
            }
            else {
                var impulse = createVector(random(-width/2, width/2), -random(this.pos.y, height));
                impulse.setMag(17);
                this.next_genes.push(impulse); // save for further generations
            }
            this.applyForce(impulse);
            this.in_jump = true;
            this.jump_counter++;
        }
        
        var hit_ramp = false;
        
        for (var i = 0; i < ramps.length; i++){
            if (this.hits(ramps[i])){ 
                hit_ramp = true;
                if (this.acc.y < 0){ // kill all positive vertical velocity
                    this.acc.y = 0;
                    this.pos.y = ramps[i].h + 20;
//                    this.ramp_jump_score -= 50;
                }
                else {
                    this.pos.y = ramps[i].h - 20;
                    this.acc = createVector(0, 0);
                    this.in_jump = false;
                    this.ramp_jump_score += (i+1) * 10;
                }
            }
        }
        
//        if (! this.in_jump && ! hit_ramp){
//            this.ramp_jump_score --;
//        }
        
        if (this.in_jump){
            this.applyForce(createVector(0, 1)); // gravity
        }
        this.pos.add(this.acc);
        
        this.constrain_to_screen();
        
        // keep track how high we got
//        if (this.pos.y < this.min_y){
//            this.min_y = this.pos.y;
//            this.fitness = map(this.min_y, 0, height, 100, 0);
//            this.fitness = round(this.fitness);
//            this.fitness += this.ramp_jump_score * 10;
            this.fitness = this.ramp_jump_score;
            
            if (this.fitness > current_record) current_record = this.fitness;
//        }
    }
    
    this.constrain_to_screen = function(){
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
    }
    
    this.show = function(){
        fill(this.color);
//        console.log('show at', this.pos)
        ellipse(this.pos.x, this.pos.y, 30, 30);
    }
    
    this.hits = function(ramp){
        if (this.pos.x >= ramp.left.x && this.pos.x <= ramp.right.x &&
                (this.pos.y > ramp.h - 15 & this.pos.y < ramp.h + 15)){
            return true;
        }
        else {
            return false;
        }
    }
}
