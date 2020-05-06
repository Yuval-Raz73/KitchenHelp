
export default{
   //compare 2 arrays of object by key
       compareByKey: function(arr1,arr2,key){
        let size1=arr1.length;
        let size2=arr2.length;
        if (size1!==size2)
          return false;
        for (let i=0; i<size1; i++){
          if (arr1[i][key]!==arr2[i][key])
            return false;
        }
        return true;
    }
}

