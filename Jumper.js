function Jumper(genes){
    this.pos = createVector(width/2, height);
    this.acc = createVector(0, 0);
    this.in_jump = false;
    this.color = color(random(255), random(255), random(255));
    this.fitness = 1; 
    this.is_dead = false;
    
    this.genes = genes || [];
    this.next_genes = [];
    this.jump_counter = 0;
    this.hit_map = [];
    
    this.applyForce = function(force){
        this.acc.add(force);
    }
    
    this.update = function(){
        if (this.is_dead) return;
        
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
                if (this.acc.y < 0){ // kill all positive vertical velocity
                    this.acc.y = 0;
                    this.pos.y = ramps[i].h + 20;
                }
                else {
                    this.pos.y = ramps[i].h - 20;
                    this.acc = createVector(0, 0);
                    this.in_jump = false;
                    
                    hit_ramp = true;
                }
            }
        }
        this.hit_map[this.jump_counter] = hit_ramp;
        
        if (this.in_jump){
            this.applyForce(createVector(0, 1)); // gravity
        }
        this.pos.add(this.acc);
        
        this.constrain_to_screen();
    }
    
    this.evaluate = function(){
        var stop_detected = false;
        this.fitness = 0;
        for (var i = 1; i < this.hit_map.length; i++){
            if (this.hit_map[i] == false) {
                stop_detected = true;
                break;
            }
            if (! stop_detected){
                this.fitness++;
            }
        }
    }
    
    this.constrain_to_screen = function(){
        // don't get outside the screen
        if (this.pos.y > height){ // on floor
            this.is_dead = true;
        }
        if (this.pos.x > width){ // on left
            this.is_dead = true;
        }
        if (this.pos.x < 0){ // on right
            this.is_dead = true;
        }
        // do we care about shooting above top? probably not
    }
    
    this.show = function(){
        fill(this.color);
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
