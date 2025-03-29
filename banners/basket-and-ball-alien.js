(function()
{

var isAndroid = window[ "eso_platform_type_" ] == "android";
var isIOS = window[ "eso_platform_type_" ] == "ios";

var a = document.createElement( 'a' );

a.href = 'https://goo.gl/VGD12d';

a.style.position = 'absolute';
a.style.padding = 0;
a.style.margin = 0;
a.style.display = 'inline-block';
a.style.overflow = 'hidden';
a.target = '_blank';

var backs = [];

for( var i = 0; i < 3; i ++ )
{
	var im = new Image();
	
	im.src = 'banners/' + ['basket-alien-happy.jpg', 'basket-alien-shooting.jpg', 'basket-alien-suction.jpg'][ i ];
	
	im.style['border-style'] = 'none';
	im.style.padding = 0;
	im.style.margin = 0;
	im.style.display = 'inline-block';
	im.style.float = 'left';
	im.style.height = 'auto';
	
	backs[ i ] = im;	
	a.appendChild(im);
}

function addImage(src)
{	
	var im = new Image();
	
	im.onload = function()
	{		
		im["oriWid_"] = im.width;
	};
	
	im.src = 'banners/' + src;
	
	im.style['border-style'] = 'none';
	im.style.padding = 0;
	im.style.margin = 0;
	im.style.display = 'inline-block';
	im.style.float = 'left';
	im.style.height = 'auto';
	im.style.position = 'absolute';	
		
	a.appendChild(im);
	
	return im;
}

var levSign = addImage('bakset-new-levels-sign.png');
var withSign = addImage('basket-with-sign.png');
var alienSign = addImage('basket-aliens-sign.png');
var findOutMore = addImage('basket-find-out-more.png');
var hand = addImage('basket-ad-hand.png');

function backsOff()
{
	for( var i = 0; i < 3; i ++ )	
	{
		backs[ i ]['style']['display'] = 'none';
	}
}


var totalTime = 0;

function getBounceOnceCoord( start, end, t, amp )
{
	t *= amp;

	return start + (end - start) * ( 1.0 - ( t - 1 ) * ( t - 1 ) ) / ( 1 - ( amp - 1 ) * ( amp - 1 ) );
}

function updateSign(im, y, s, t, back, p )
{
	var bs = back ? t : getBounceOnceCoord( 0, 0.75, t, p ) * s;
	var wid = im["oriWid_"] * bs;

	im['style']['width'] = wid + 'px';	
	im.style.top = y * s + "px";
	im.style.left = (512 * s - wid)/2 + "px";
}

function clamp(a,left,right)
{
	return Math.min( Math.max( a, left ), right );
}

function clamp01(a)
{
	return clamp(a,0,1);
}


function update_F( scale, dt )
{
	for( var i = 0; i < 3; i ++ )
	{
		backs[ i ]['style']['width'] = 512 * scale + 'px';
	}
	
	totalTime += dt;
	
	var cycleTime = totalTime % 10;
	
	var back = 1 - clamp01( (cycleTime - 3.8) * 4 );
	var isBack = cycleTime >= 3.8;
	
	updateSign( levSign, 30, scale, clamp01( ( cycleTime - 1.0 ) * 2 ) * back, isBack, 1.5 );
	updateSign( withSign, 130, scale, clamp01( ( cycleTime - 1.33 ) * 2 ) * back, isBack, 1.5 );
	updateSign( alienSign, 230, scale, clamp01( ( cycleTime - 1.67 ) * 1.75 ) * back, isBack, 1.57 );
	updateSign( findOutMore, 283, scale, clamp01( ( cycleTime - 4.5 ) * 2 ), 0, 1.5 );
	
	var handTBaz = Math.max( cycleTime - 4.5, 0 );
	var handT = 1 - Math.abs( Math.sin( handTBaz * 3 ) );
	
	hand.style.top = (150 + handT * 92)*scale + "px";
	hand.style.left = (90 + handT * 100)*scale + "px";
	
	hand['style']['width'] = hand["oriWid_"] * ( -handT * 0.33 + 1.0 ) * scale * clamp01( handTBaz * 2 ) + "px";	
	
	backsOff();
	
	var back = backs[ Math.floor((totalTime * 0.5) % 3) ];
	
	back.style.display = 'inline-block';	
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
	for( var i = 0; i < backs.length; i ++ )
	{
		if( !IsImageOk( backs[ i ] ) )
			return false;
	}
	
	return true;
}

window['eso_interstitial_objects_'].push( 
{
	elem : a,
	width : 512,
	height : 384,
	platform : 'any',
	update : update_F,
	isLoaded : isLoaded_F
})

})();
