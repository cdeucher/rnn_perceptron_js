var number_one;

class oGenome{
   betters = [] 
   constructor(){  
   }
   get_betters(list){            
        //get betters
        console.log('listPlayers',list.length)
        var list_betters = {sum:90000};
        var newList = []
        var returnList = []
        var count = 0
        for (var i in list) {                       
            list[i].sum = parseInt((list[i].y).toFixed(5));            
            // choose better
            if(list[i].sum < list_betters.sum){
                list_betters = list[i]
            }
            if(list[i].sum != undefined)
                newList.push(list[i])                
            count++   
        }
        // choose better        
        returnList[0] = list_betters.rnn.myNetwork
        console.log(' choose better:',list_betters.rnn.myNetwork.name)        

        //copy 3 better positions
        var tmp = newList.sort((v1, v2) => v1.sum - v2.sum).map((v) => v);
        //console.log('sort',tmp)
        for (let i=1; i<4 ; i++) {
           if(tmp[i] != undefined){ 
                returnList[i] = tmp[i].rnn.myNetwork
                //console.log(' sort copy:',tmp[i].sum, tmp[i].index, tmp[i].rnn.myNetwork.name)
           }
        }
        // replay 10 with better
        var mut = list_betters.rnn.myNetwork 
        for (let i=4; i<=14 ; i++) {
            if(tmp[i] != undefined){   
                //console.log('mutate',mut)                                              
                returnList[i] = mut //this.mutate(mut)                                               
                //this.compare(mut,returnList[i]) 
            }
        }              
        //console.log(' choose better:',list_betters.rnn.myNetwork.name) 
        //this.compare(list_betters.rnn.myNetwork,returnList[0]) 
        return returnList
   }
   update(){     
   
   } 
   mutate = function (net){
        //console.log('a',net) 
        // Mutate
        net.layers.hidden[0].list = this.mutateDataKeys(net.layers.hidden[0].list, 'bias', 0.5, 1);      
        net.layers.input.list = this.mutateDataKeys(net.layers.input.list, 'bias', 0.5, 1);      
        net.layers.output.list = this.mutateDataKeys(net.layers.output.list, 'bias', 0.5, 1);      

     return net;
   } 
   mutateDataKeys = function (a, key, mutationRate, range){        
        for(let k in a){
            // Should mutate?
            if (Math.random() > mutationRate) {
            continue;
            } 
            if(a[k][key] != undefined){
                var newdata = a[k][key] * (Math.random() - 0.5) * 3 + (Math.random() - 0.5);
                //console.log('mutateDataKeys',a[k][key], ' ->',newdata) 
                a[k][key] += newdata
               // segundo nível 
               if(range == 1)
                a[k].connections.inputs = this.mutateDataKeys(a[k].connections.inputs, 'weight', 0.3, 2);
            }
        }
      return a  
   }   
   compare(netA,netB){    
        console.log('compare:', netA.name ,' -> ', netB.name)             
        this.compareDataKeys(netA.layers.hidden[0].list, netB.layers.hidden[0].list, 'bias');      
        this.compareDataKeys(netA.layers.input.list, netB.layers.input.list, 'bias');      
        this.compareDataKeys(netA.layers.output.list, netB.layers.output.list, 'bias');  
   }
   compareDataKeys = function (a, b, key){        
        for(let k in a){
            if(a[k][key] != undefined){
               //console.log(a[k], b[k]) 
               if(a[k][key] != b[k][key] ){
                    console.log('   ',key,' ::',a[k][key] ,' -> ', b[k][key]) 
               }            
            }    
        }
      return a  
    }   
    sync(netA,netB){    
        //console.log('compare:', netA.name ,' -> ', netB.name)             
        this.syncDataKeys(netA.layers.hidden[0].list, netB.layers.hidden[0].list, 'bias', 1);      
        this.syncDataKeys(netA.layers.input.list, netB.layers.input.list, 'bias', 1);      
        this.syncDataKeys(netA.layers.output.list, netB.layers.output.list, 'bias', 1);  
    }
    syncDataKeys = function (a, b, key, range){        
        for(let k in a){
            if(a[k][key] != undefined)
                a[k][key] = b[k][key] 
            if(range == 1)
                a[k].connections.inputs = b[k].connections.inputs
        }
      return a  
    }     
 }
 var genome = new oGenome()