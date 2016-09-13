iMutationRate = 1; //%
iPopulationSize = 10;
bFinished = false;
pop = null;
population_number = 0;
ramps = [];
cnt_ramps = 3;
current_record = 0;

function setup() {
    iMaxFitness = 0;
    aSpawningPool = [];
    iPopulationNumber = 0;
    bFinished = false;
    pop = null;
    
    createCanvas(640, 480);
    background(0);
    
    ramps = [];
    for (var i = 0; i < cnt_ramps; i++){
        ramps.push(new Ramp(i));
    }
}

function draw() {
    fill(0);
    background(0);
    noStroke();
    
    if (! pop){
        pop = new Population(iPopulationSize);
    }
    
    pop.update();
    pop.show();
    
    for (var i = 0; i < ramps.length; i++){
        ramps[i].show();
    }
    
    pop.lifespan--;
    if (pop.lifespan <= 0){
        pop.evaluate();
        pop.crossover();
        pop.ressurect();
        
        $('.population_number').html(population_number++);
        $('.record').html(current_record);
    }
}



$('.do').click(function(e){
    e.preventDefault();
    iMutationRate = parseInt($('input[name="mutation"]').val());
    if (isNaN(iMutationRate)){
        iMutationRate = 1;
    }
    
    iPopulationSize = parseInt($('input[name="population"]').val());
    if (isNaN(iPopulationSize)){
        iPopulationSize = 10;
    }
    
    setup();
})

$('.pause').click(function(){
    console.log('PAUSED');
    noLoop();
})
$('.resume').click(function(){
    console.log('RESUMED');
    loop();
})