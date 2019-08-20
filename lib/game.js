var MAX_P = 0
var listPlayers = [];
var Interval;
var platforms;
var stars;
var betters;

function start_genome(self){
    console.log('start_genome')
    //game.scene.pause("default")
    //clearTimeout(Interval);

    betters = genome.get_betters(listPlayers)  

    for (let i=0; i <  listPlayers.length; i++){
            //console.log('destroy', i)
            listPlayers[i].destroy();
    }        
    for (let i=0; i <  listPlayers.length; i++){
        //console.log('destroy', i)
        listPlayers[i].destroy();
    }        
    listPlayers = []        

    console.log('end  ',listPlayers)          

    for (let i=0; i < 30; i++){
        if(i < 1)
            listPlayers[i] = create_player(self, MAX_P, platforms, stars , betters[0]); 
        else
            listPlayers[i] = create_player(self, MAX_P, platforms, stars);             
    }
    //setTimeout(() => { start_genome(self) }, 15000)    
    //game.scene.start("default")
    //game.scene.pause("default")
    MAX_P++      
}
function create_player(self,i,platforms,stars, rnn=undefined){
    let player = self.physics.add.sprite(100, 450, 'dude');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    self.physics.add.collider(player, platforms);
    self.physics.add.overlap(player, stars, self.collectStar, null, this);
    player.oldx  = player.x
    player.oldy  = player.y
    player.index = i
    if(rnn != undefined){
        console.log(' create rnn',rnn)        
        player.rnn   = new network(player, rnn);        
    }else   
        player.rnn   = new network(player);        
    player.count_update = 0
    player.count = 0

    return player;
}

function preload (){
    this.load.image('sky', 'lib/assets/sky.png');
    this.load.image('ground', 'lib/assets/platform.png');
    this.load.image('star', 'lib/assets/star.png');
    this.load.spritesheet('dude', 'lib/assets/dude.png', { frameWidth: 32, frameHeight: 48 });
}
function create (){
    this.add.image(400, 300, 'sky');
    platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    stars = this.physics.add.group({key: 'star',repeat: 11,setXY: { x: 12, y: 0, stepX: 70 }});
    stars.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    this.physics.add.collider(stars, platforms);

    for (let i=0; i < 30; i++){
            listPlayers[i] = create_player(this, i, platforms, stars);     
    }
    //Interval = setInterval(() => { start_genome(game.scene.scenes[0]) }, 30000)    
    //setTimeout(() => { start_genome(this) }, 15000)    
}
function update(){
    listPlayers.forEach( (item, index)=> {  
        var player = item;  
        player.count_update++  
        player.setVelocityX(0);
        player.setVelocityY(0); 
        //console.log(player.count_update)           
        if(player.count_update == 10){  
            player.count++
            player.count_update = 0      
            var action = player.rnn.update()
            switch(action) {
                case 0:
                    player.setVelocityX(-400);//left
                break;
                case 1:
                    player.setVelocityX(400);//right
                break;
                case 2:
                    player.setVelocityY(-400);//up
                break;                  
                default:
                // code block
            }            
        }                
    })
}
function render(){
}
function collectStar (player, star){
    star.disableBody(true, true);
    score += 10;
    scoreText.setText('Score: ' + score);
    if (stars.countActive(true) === 0){
        stars.children.iterate(function (child) {
            child.enableBody(true, child.x, 0, true, true);
        });
    }
}
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
        render: render
    }
};
var game = new Phaser.Game(config);
Interval = setInterval(function(){ start_genome(game.scene.scenes[0]) }, 30000)    
