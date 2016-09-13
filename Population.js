function Population(cnt){
    this.cnt = cnt;
    this.lifespan = 200;
    
    this.members = [];
    this.mating_pool = [];
    
    for (var i = 0; i < this.cnt; i++){
        this.members.push(new Jumper());
    }
    
    this.update = function(){
        for (var i = 0; i < this.members.length; i++){
            this.members[i].update();
        }
    }
    
    this.show = function(){
        for (var i = 0; i < this.members.length; i++){
            this.members[i].show();
        }
    }
    
    this.evaluate = function(){
        for (var i = 0; i < this.members.length; i++){
            for (var j = 0; j < this.members[i].fitness; j++){
                this.mating_pool.push(this.members[i].next_genes);
            }
        }
    }
    
    this.crossover = function(){
        this.members = [];
        for (i = 0; i < this.cnt; i++){
            var next_genes = [];
            var parentA = random(this.mating_pool);
            var parentB = random(this.mating_pool);
            var longer_parent, shorter_parent;
            if (parentA.length > parentB.length){
                longer_parent = parentA;
                shorter_parent = parentB;
            }
            else {
                longer_parent = parentB;
                shorter_parent = parentA;
            }
//            var genes_diff_cnt = longer_parent.length - shorter_parent.length;
            
            var split_mid = random(shorter_parent);
            for (var j = 0; j < split_mid; j++){
                next_genes[j] = parentA[j];
            }
            for (var j = split_mid; j < shorter_parent.length; j++){
                next_genes[j] = parentB[j];
            }
            
            this.members.push(new Jumper(next_genes));
        }
    }
    
    this.ressurect = function(){
        this.lifespan = 200;
    }
}
