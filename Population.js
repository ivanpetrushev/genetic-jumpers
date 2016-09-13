function Population(cnt){
    this.cnt = cnt;
    this.lifespan = 200;
    
    this.members = [];
    
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
}
