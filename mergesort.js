var arr = [3,2,4,1,5,6,7,3];
console.log(arr);
mergeSort(arr, 0, arr.length-1);
console.log(arr);

function mergeSort(arr, l, r){
    if(l<r){
        var m = Math.floor(l + (r-l)/2);
        mergeSort(arr, l ,m );
        mergeSort(arr, m+1, r);
        merge(arr, l ,m ,r);
    }
}
function merge(arr, l ,m ,r){
    var n1= m-l+1;
    var n2= r -m ;
    var i =0;
    var j =0;
    var k =l;
    var L =[];
    var M = [];
    for (i=0 ; i<n1; i++){
        L[i] = arr[l+i];
    }
    for (j=0 ; j<n2; j++){
        M[j] = arr[m+1+j];
    }
    i=0;
    j=0;
    while(i < n1 && j < n2){
        if(L[i]< M[j]){
            arr[k] = L[i];
            i++;
        }
        else{
            arr[k] = M[j];
            j++;
        }
        k++;
    }
    while(i< n1){
        arr[k] = L[i];
        i++;
        k++;
    }
    while(j< n2){
        arr[k] = M[j];
        j++;
        k++;
    }
}
