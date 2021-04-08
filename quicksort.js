function quickSort(arr, low, high){
    if(low < high){
     var pi = partition(arr, low, high);
     quickSort(arr, low, pi-1);
     quickSort(arr, pi+1, high);
    }
}
function partition(arr, low, high){
    var pivot = arr[high];
    var i = low-1;
    for(var j = low; j< high; j++){
        if(arr[j] < pivot){
            i++;
            swap(arr, i, j);
        }
    }
    swap(arr, i+1, high);
    return i+1;
}
function swap (arr, i, j){
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j]= temp;
}
var arr = [2,4,1,9,5,2,0,4,3,1];
quickSort(arr, 0, arr.length-1);
console.log(arr);
