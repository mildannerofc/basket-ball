(function()
{

var isAndroid = window[ "eso_platform_type_" ] == "android";
var isIOS = window[ "eso_platform_type_" ] == "ios";

var a = document.createElement( 'a' );

if( isAndroid )
	a.href = 'https://goo.gl/Q5Orrf';
else
if( isIOS )
	a.href = 'https://goo.gl/0QiJqc';
else
	a.href = 'http://goo.gl/L1yAai';

a.style.position = 'absolute';
a.style.padding = 0;
a.style.margin = 0;
a.style.display = 'inline-block';
a.style.overflow = 'hidden';
a.target = '_blank';

var im = new Image();
im.src = 'banners/basket-and-ball-560x376-background.jpg';
im.style['border-style'] = 'none';
im.style.padding = 0;
im.style.margin = 0;
im.style.display = 'inline-block';
im.style.float = 'left';
im.style.height = 'auto';

a.appendChild(im);

var timLeft = 4;
var timTop = 80;

var tim = new Image();
tim.src = 'banners/basket-and-ball-sign.png';
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

var aniBott = 14;
var aniRight = 14;
var aniWi = 200;

var anim = new Image();

if( isIOS )
	anim.src = 'banners/download-on-the-app-store.png';
else
if( isAndroid )
	anim.src = 'banners/get-on-google-play.png';
else
	anim.src = 'banners/play-on-gamejolt.png';

anim.style.width = aniWi + 'px';
anim.style.height = 'auto';
anim.style['border-style'] = 'none';
anim.style.position = 'absolute';
anim.style.bottom = aniBott + 'px';
anim.style.padding = 0;
anim.style.margin = 0;
anim.style.display = 'inline-block';
anim.style.float = 'left';

a.appendChild(anim);

var totalTime = 0;

function update_F( scale, dt )
{
	im.style.width = 490 * scale + 'px';

	tim.style.top = ( timTop + 8 * Math.sin( totalTime * 1.25 ) ) * scale + "px";
	tim.style.left = timLeft * scale + "px";
	tim.style.width = 329 * scale + 'px';

	anim.style.bottom = aniBott * scale +'px';
	anim.style.right = aniRight * scale + 'px';
	anim.style.width = aniWi * scale + 'px';

	totalTime += dt * 3;

	var state = Math.floor( totalTime % 4 );

	switch( state )
	{
	case 0:
	case 2:
		anim.style.visibility = 'hidden';
		break;
	case 1:
	case 3:
		anim.style.visibility = 'visible';
		break;
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
	return IsImageOk( im ) && IsImageOk( anim );
}

window['eso_interstitial_objects_'].push( 
{
	elem : a,
	width : 490,
	height : 329,
	platform : 'any',
	update : update_F,
	isLoaded : isLoaded_F
})

})();
