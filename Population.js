function Population(cnt){
    this.cnt = cnt;
    this.lifespan = 200;
    
    this.members = [];
    this.mating_pool = [];
    
    for (var i = 0; i < this.cnt; i++){
        this.members.push(new Jumper());
    }
    
    this.update = function(){
        cnt_dead = 0;
        for (var i = 0; i < this.members.length; i++){
            this.members[i].update();
            if (this.members[i].is_dead) cnt_dead++;
        }

        if (this.members.length == cnt_dead){
            this.lifespan = 0;
        }
    }
    
    this.show = function(){
        for (var i = 0; i < this.members.length; i++){
            this.members[i].show();
        }
    }
    
    this.evaluate = function(){
        console.log('evaluate population')
        $('#fitnesses').empty();
        $('#fitnesses').append('<tr><th>Jumper</th><th>Fitness</th><th>Ramp jump score</th></tr>');

        var median_fitness = 0;
        for (var i = 0; i < this.members.length; i++){
            this.members[i].evaluate();
            median_fitness += this.members[i].fitness;
        }
        median_fitness /= this.members.length;
        median_fitness = int(median_fitness);
        $('.median_fitness').html(median_fitness);
        
        for (var i = 0; i < this.members.length; i++){
//            console.log(this.members[i].hit_map)
            $('#fitnesses').append('<tr><td>#'+i+': </td><td>'+this.members[i].fitness+'</td><td>'+this.members[i].ramp_jump_score+'</td></tr>');
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
            
            if (random(100) < iMutationRate){
                var idx = random(0, next_genes.length);
                next_genes[idx] = createVector(random(width), -random(height));
            }
            
            this.members.push(new Jumper(next_genes));
        }
    }
    
    this.ressurect = function(){
        this.lifespan = 200;
    }
}
