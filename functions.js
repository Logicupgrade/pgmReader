var reader = new FileReader();
	
function myFunction()
{
    var file = document.getElementById("file_in").files[0];

    reader.readAsArrayBuffer/*readAsText*/(file,"Windows-1252");

    //console.log("readystate: " + reader.readyState);

    reader.onloadend=statUpdate;

    
}

function statUpdate()
{
    console.log(reader.result);
    //use Uint8Array!!

    //parsing file to get image size
    var tempArray = reader.result;

    var headerArray = new Uint8Array(tempArray);
    
    headerArray = headerArray.slice(0,100);

    var image_width =""; //=320;
    var image_height =""; //=240;
    
    var count = 0;

    for(var m =0;m<headerArray.length;m++)
    {
        //check for "P"
        if(m==0 && headerArray[m] != 80)
        {
            throw("Not a PGM - not P");
        }
        //check for "5"
        if(m==1 && headerArray[m] != 53)
        {
            throw("Not a PGM - not P5");
        }

        if(headerArray[m] == 10)
        {
            count++;

            if(count ==2)
            {
                var i =1;
                while(headerArray[m+i] != 32)
                {
                    if(i>10)
                    {
                        break;
                    }
                    
                    image_width += String.fromCharCode(headerArray[m+i]);
                    i++;
                }
            
                while(headerArray[m+i] != 10 )
                {
                    if(i>10)
                    {
                        break;
                    }
                    
                    i++;
                    image_height += String.fromCharCode(headerArray[m+i]);
                }
                
                count++;
            }
        }

        
        // console.log("headerArray: "+m+": "+String.fromCharCode(headerArray[m])+"-"+headerArray[m]);
    }
    
    
    image_width = parseInt(image_width);
    image_height = parseInt(image_height);
    console.log("image width: "+image_width);
    console.log("image height: "+image_height);

    var fileArray = new Uint8Array(tempArray);

    var pxlArr =[];

    tempArray = fileArray; 
    
    //start index is 58 for dimes.pgm
    for(var k=58;k<tempArray.length;k++)
    {
        pxlArr[k-58] = tempArray[k];
    }

    console.log("pxlArr Length: "+pxlArr.length);

    var bigString = [];

    for(var k = 0;k<pxlArr.length;k++)
        {
            for(var m=0;m<4;m++)
                {
                    if(m<1)
                    {
                        bigString.push(pxlArr[k]);
                    }
                    else if(m==1)
                    {
                        bigString.push(pxlArr[k]);
                    }
                    else if(m==2)
                    {
                        bigString.push(pxlArr[k]);
                    }
                    else
                    {
                        bigString.push(255);
                    }
                    
                }
        }

    console.log("bigString Length: "+bigString.length);

    var imgData = [];
    
    var idCheck = document.getElementById("canvas");

    if(idCheck)
    {
        idCheck.remove();
    }

    console.log("idcheck:"+idCheck);

    //creates canvas element
    var theCanvas = document.createElement("canvas");
    
    document.body.appendChild(theCanvas);

    //canvas attributes
    theCanvas.setAttribute("id","canvas");
    theCanvas.setAttribute("width",image_width);
    theCanvas.setAttribute("height",image_height);
    theCanvas.setAttribute("style","border:1px solid black");

    //draw to canvas
    var canvas = document.getElementById('canvas');    

    var ctx = canvas.getContext('2d');

    var formattedArray = new Uint8ClampedArray(bigString);

    var myImageData = new ImageData(formattedArray,image_width,image_height);
    
    ctx.putImageData(myImageData,0,0);

}

//think theres an issue here with charCodeAt too high of values
function charToValue(inputArray,startIndex)
{
    var tempArray = []
    
    for(var i = startIndex;i<inputArray.length;i++)
    {
        tempArray.push(inputArray)//.charCodeAt(i) );
    }

    return tempArray;
}

function maxMin(inputArray)
{
    var tempArray = [];
    var max =0;
    var min =255;
    var maxV=[];
    var maxI=[];

    for(var i=0;i<inputArray.length;i++)
    {
        if(inputArray[i]>255)
        {
            maxV.push(inputArray[i]);
            maxI.push(i);
        }
        if(max<inputArray[i])
        {
            max = inputArray[i];
        }

        if(min>inputArray[i])
        {
            min = inputArray[i];
            
        }
    }

    tempArray.min = min;
    tempArray.max = max;
    console.log("min: "+min);
    console.log("max: "+max);

    return tempArray;
}

// Normalization

function normalize(inputArray, min, max)
{
    var tempArray = [];
    for(var j=0; j<inputArray.length;j++)
    {
        tempArray[j] = 255*((inputArray[j]-min)/(max-min));
    }

    return tempArray;
}