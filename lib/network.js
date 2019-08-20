/* var inputLayer = new Layer(2);
var hiddenLayer = new Layer(3);
var outputLayer = new Layer(1);

inputLayer.project(hiddenLayer);
hiddenLayer.project(outputLayer);
var myNetwork = new Network({
  input: inputLayer,
  hidden: [hiddenLayer],
  output: outputLayer
});


// train the network - learn XOR
var learningRate = .3;
for (var i = 0; i < 200; i++) {
  // 0,0 => 0
  myNetwork.activate([0,0]);
  myNetwork.propagate(learningRate, [0]);
// 0,1 => 1
  myNetwork.activate([0,1]);
  myNetwork.propagate(learningRate, [1]);
// 1,0 => 1
  myNetwork.activate([1,0]);
  myNetwork.propagate(learningRate, [1]);
// 1,1 => 0
  myNetwork.activate([1,1]);
  myNetwork.propagate(learningRate, [0]);

  console.log('epocks',i)
}
console.log(myNetwork.activate([0,0])); 
console.log(myNetwork.activate([0,1]));
console.log(myNetwork.activate([1,0]));
console.log(myNetwork.activate([1,1]));
*/

var Architect = synaptic.Architect;
var Network   = synaptic.Network;

class network{
   myNetwork;
   player;

  constructor(player, rnn=undefined){  
     this.player    = player     
     if(rnn == undefined){
        this.myNetwork = new Architect.Perceptron(3, 3, 3); 
        //console.log('this.myNetwork',this.myNetwork)
        this.myNetwork.setOptimize(false);        
        this.myNetwork.index = this.player.index
     }else{
        //console.log('rnn',rnn.index,rnn)
        this.myNetwork = rnn;      
        this.myNetwork.index = this.player.index
     }   
  }
  restart(player){
     this.player = player 
  }
  update(){     
     let plataforma = 220; 
     if(this.player.y >= 219 && this.player.y <= 399)
        plataforma = 250
     if(this.player.y > 400) 
        plataforma = 400  

     let result = this.myNetwork.activate([this.player.x, this.player.y, plataforma])

     var max = result.reduce(function(a, b) {
         return Math.max(a, b);
     });

     //console.log(result,result.indexOf(max))
     return result.indexOf(max);
  } 

}
//var rnn = new network()