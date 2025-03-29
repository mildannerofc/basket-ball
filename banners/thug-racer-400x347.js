(function()
{

var isAndroid = window[ "eso_platform_type_" ] == "android";
var isIOS = window[ "eso_platform_type_" ] == "ios";

var a = document.createElement( 'a' );

a.href = 'https://supagamez.com/games/thug-racer/';

a.style.position = 'absolute';
a.style.padding = 0;
a.style.margin = 0;
a.style.display = 'inline-block';
a.style.overflow = 'hidden';
a.target = '_blank';

var im = new Image();
im.src = 'banners/thug-racer-back-400x347.jpg';
im.style['border-style'] = 'none';
im.style.padding = 0;
im.style.margin = 0;
im.style.display = 'inline-block';
im.style.float = 'left';
im.style.height = 'auto';

a.appendChild(im);

var timLeft = 26;
var timTop = 218;

var tim = new Image();
tim.src = 'banners/play-now.wepb';
tim.style['border-style'] = 'none';
tim.style.padding = 0;
tim.style.margin = 0;
tim.style.position = 'absolute';
tim.style.top = timTop + "px";
tim.style.left = timLeft + "px";
tim.style.display = 'inline-block';
tim.style.float = 'left';
tim.style.height = 'auto';

a.appendChild(tim);

var totalTime = 0;

function update_F( scale, dt )
{
	im.style.width = 400 * scale + 'px';

	tim.style.top = timTop * scale + "px";
	tim.style.left = timLeft * scale +  "px";
	tim.style.width = 347 * scale + 'px';
	
	var yOff = -32 * Math.abs(Math.sin( totalTime * Math.PI * 0.5 )) * scale;
	var xOff = 0;
	var ang = -2 * Math.sin( totalTime * Math.PI * 2.0 );
	
	tim.style.transform = 'rotate(' + ang + 'deg) translate(' + xOff + 'px,' + yOff + 'px) scale(0.75, 0.75)';

	totalTime += dt * 3;

	if(0)
	{
		var state = Math.floor( totalTime * 3 % 6 );

		switch( state )
		{
		case 0:
			tim.style.visibility = 'hidden';
			break;
		case 1:
		case 2:
		case 3:
		case 4:
		case 5:	
			tim.style.visibility = 'visible';
			break;
		}
	}
}

function IsImageOk(img) {
    // During the onload event, IE correctly identifies any images that
    // weren’t downloaded as not complete. Others should too. Gecko-based
    // browsers act like NS4 in that they report this incorrectly.
    if (!img.complete) {
        return false;
    }

    // However, they do have two very useful properties: naturalWidth and
    // naturalHeight. These give the true size of the image. If it failed
    // to load, either of these should be zero.

    if (typeof img.naturalWidth !== "undefined" && img.naturalWidth === 0) {
        return false;
    }

    // No other way of checking: assume it’s ok.
    return true;
}

function isLoaded_F()
{
	return IsImageOk( im ) && IsImageOk( tim );
}

window['eso_interstitial_objects_'].push( 
{
	elem : a,
	width : 400,
	height : 347,
	platform : 'any',
	update : update_F,
	isLoaded : isLoaded_F
})

})();
