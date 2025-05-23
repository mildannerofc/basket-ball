﻿(function()
{

var isAndroid = window[ "eso_platform_type_" ] == "android";
var isIOS = window[ "eso_platform_type_" ] == "ios";

var a = document.createElement( 'a' );

if( isAndroid )
	a.href =  'https://goo.gl/lRHYMo';
else
if( isIOS )
	a.href = 'https://goo.gl/FVfEoT';
else
	a.href = 'https://chrome.google.com/webstore/detail/hex-blocks-puzzle/piciibgoglhpmagdjmklbmimhjllfkcj'; /*'https://goo.gl/So6S79';*/

a.style.position = 'absolute';
a.style.padding = 0;
a.style.margin = 0;
a.style.display = 'inline-block';
a.style.overflow = 'hidden';
a.target = '_blank';

var im = new Image();
im.src = 'banners/hex-blocks-puzzle-640x100.jpg';
im.style['border-style'] = 'none';
im.style.padding = 0;
im.style.margin = 0;
im.style.display = 'inline-block';
im.style.float = 'left';
im.style.height = 'auto';

a.appendChild(im);

var aniTop = 14;
var aniWi = 192;

var anim = new Image();

if( isIOS )
	anim.src = 'banners/download-on-the-app-store.png';
else
if( isAndroid )
	anim.src = 'banners/get-on-google-play.png';
else
	anim.src = 'banners/play-on-chrome-web-store.png';

anim.style.width = aniWi + 'px';
anim.style.height = 'auto';
anim.style['border-style'] = 'none';
anim.style.position = 'absolute';
anim.style.top = aniTop + 'px';
anim.style.padding = 0;
anim.style.margin = 0;
anim.style.display = 'inline-block';
anim.style.float = 'left';

a.appendChild(anim);

var totalTime = 0;

function update_F( scale, dt )
{
	scale *= 0.75;

	im.style.width = 640 * scale + 'px';
	anim.style.top = aniTop * scale +'px';
	anim.style.width = aniWi * scale + 'px';
	
	totalTime += dt * 4;

	var state = Math.floor( totalTime % 10 );

	switch( state )
	{
	case 0:
	case 2:
	case 5:
	case 7:
		anim.style.visibility = 'visible';
		anim.style.left = 438 * scale + "px";
		break;
	case 1:
	case 3:
	case 4:
	case 6:
	case 8:
	case 9:
		anim.style.visibility = 'visible';
		anim.style.left = 438 * scale + "px";
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

window['eso_banner_objects_'].push( 
{
	elem : a,
	width : 480,
	height : 75,
	platform : 'any',
	update : update_F,
	isLoaded : isLoaded_F
})

})();
