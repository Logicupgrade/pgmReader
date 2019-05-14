var reader = new FileReader();
	
function myFunction()
{
    var file = document.getElementById("file_in").files[0];

    reader.readAsText(file,"Windows-1252");

    console.log("readystate: " + reader.readyState);

    statUpdate();
}

function statUpdate()
{

    var imgArray =reader.result.split("");

    var headerSize = reader.result.split("\n");

    headerSize = headerSize[2].split(" ");

    //console.log(headerSize);

    var imgSize = headerSize[0] * headerSize[1];

    var properArr =[];
    
    console.log(imgArray);				


    for(var i = 58;i<imgArray.length;i++)
        {
            properArr.push(imgArray[i].charCodeAt(0));
        }

    console.log("properArr:"+ properArr.length);

    console.log("properArr:"+ properArr.length);
        

    var bigString = [];

    for(var k = 0;k<properArr.length;k++)
        {
            for(var m=0;m<4;m++)
                {
                    bigString.push(properArr[k]);
                }
        }
    

    console.log("big: " + bigString.length );

    var imgData = [];

    var canvas = document.getElementById('canvas');
     var ctx = canvas.getContext('2d');

    var formattedArray = new Uint8ClampedArray(bigString);
    var myImageData = new ImageData(formattedArray,headerSize[0],headerSize[1]);
    
    ctx.putImageData(myImageData, 0, 0);
}