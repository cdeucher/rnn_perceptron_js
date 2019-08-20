class oGenome{
   betters = [] 
   constructor(){  
   }
   jsonCopy(src) {
      //console.log(src)      
      //console.log(jQuery.extend(true, {}, src))
      //return jQuery.extend(true, {}, src)
      return src
   }
   get_betters(list){            
        //get betters
        console.log('listPlayers',list.length)
        var list_betters = {sum:90000};
        var newList = []
        var count = 0
        for (var i in list) {                       
            list[i].sum = parseInt((list[i].y).toFixed(5));            

            if(list[i].sum < list_betters.sum){
                list_betters = list[i]
                console.log('sum',list[i].sum, 'xy',list[i].x , list[i].y) 
            }

            count++
        }
                
        newList[0] = this.jsonCopy(list_betters.rnn.myNetwork)
        console.log('  copy:',list_betters.sum, list_betters.rnn.myNetwork.index)

        return newList
   }
   update(){     
   
   } 
 
 }
 var genome = new oGenome()