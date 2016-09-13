function Population(cnt){
    this.cnt = cnt;
    this.lifespan = 500;
    
    this.members = [];
    this.mating_pool = [];
    this.last_mating_pool = [];
    
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
        console.log('evaluate')
        $('#fitnesses').empty();
        $('#fitnesses').append('<tr><th>Jumper</th><th>Fitness</th><th>Ramp jump score</th></tr>');

        var sum_fitness = 0;
        for (var i = 0; i < this.members.length; i++){
            this.members[i].evaluate();
            sum_fitness += this.members[i].fitness;
        }
        $('.sum_fitness').html(sum_fitness);
        
        if (sum_fitness > current_record) current_record = sum_fitness;
        
        this.mating_pool = [];
        for (var i = 0; i < this.members.length; i++){
            $('#fitnesses').append('<tr><td>#'+i+': </td><td>'+this.members[i].fitness+'</td></tr>');
            if (this.members[i].fitness > 0){
                for (var j = 0; j < this.members[i].fitness; j++){
                    this.mating_pool.push(this.members[i].next_genes);
                }
            }
        }
        
//        console.log(this.mating_pool.length, 'vs last', this.last_mating_pool.length)
//        if (this.mating_pool.length > this.last_mating_pool.length){
//            this.last_mating_pool = this.mating_pool; 
//        }
//        else {
//            this.mating_pool = this.last_mating_pool; 
//        }
        console.log('current pool size', this.mating_pool.length)
        
        if (this.mating_pool.length <= 0){
            console.log('PAUSED');
            noLoop()
        }
        
//        console.log('pool size is', this.mating_pool.length, ' last size is', this.last_mating_pool.length)
//        if (this.mating_pool.length > 0){
//            this.last_mating_pool = this.mating_pool; 
//        }
//        else {
//            this.mating_pool = this.last_mating_pool; 
//        }
    }
    
    this.crossover = function(){
        console.log('crossover')
        this.members = [];
        console.log('pool is', this.mating_pool)
        for (i = 0; i < this.cnt; i++){
            var next_genes = [];
            var parentA = random(this.mating_pool);
            var parentB = random(this.mating_pool);
            
            console.log('parent a', parentA, 'parent b', parentB)
            
            var longer_parent, shorter_parent;
            if (parentA.length > parentB.length){
                longer_parent = parentA;
                shorter_parent = parentB;
            }
            else {
                longer_parent = parentB;
                shorter_parent = parentA;
            }
            
            var split_mid = int(random(0, shorter_parent.length));
            for (var j = 0; j < split_mid; j++){
                next_genes[j] = parentA[j];
                if (random(100) < iMutationRate){
                    var angle = radians(random(-5, 5));
                    console.log('mutation! angle ', angle)
                    next_genes[j].rotate(angle);
                }
            }
            for (var j = split_mid; j < longer_parent.length; j++){
                if (typeof parentB[j] != 'undefined'){
                    next_genes[j] = parentB[j];
                }
                else {
                    next_genes[j] = longer_parent[j];
                }
                
                if (random(100) < iMutationRate){
                    var angle = radians(random(-5, 5));
                    console.log('mutation! angle ', angle)
                    next_genes[j].rotate(angle);
                }
            }
//            console.log('elected genes', next_genes)
            
            this.members.push(new Jumper(next_genes));
        }
    }
    
    this.ressurect = function(){
        this.lifespan = 500;
    }
}
