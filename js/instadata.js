/*
 * Created with Sublime Text 2.
 * User: Harsh Kothari
 * Date: 2013-12-07
 * Time: 18:40:41
 * Contact: harshkothari410@gmail.com
 */

$(function() {
	
	$('.searchclick').click(function(event) {

		/* Act on the event */
		$this = $(this);
		var tag = $this.siblings('.searchtag').val();
		//alert(tag);
		$('#insertdata').remove();
		instacall( tag );
	});

	$('.3u > a').on('click', 'img', function(event) {
		event.preventDefault();
		/* Act on the event */
		var link = $('#first > a').attr('href');
		//$('img').attr('src', link);
		console.log("success clicked");
	});

	// $('.3u > a').click(function(event) {
	// 	/* Act on the event */
	// 	var link = $('#first > a').attr('href');
	// 	console.log(link);
	// });
	
})

function instacall(tag) {
	$.ajax({
		url: 'https://api.instagram.com/v1/tags/' + tag + '/media/recent?access_token=398242128.1fb234f.3a29f29a4cf942478b047c94f99e91f6 ',
		type: 'GET',
		dataType: 'jsonp'
	})
	.done(function(data) {
		console.log(data);
		
		
	})
	.fail(function() {
		console.log("error");
	})
	.always(function(data) {
		console.log("complete");
		datafill(data);
	});
	
}


function datafill( data ) {

	// $('#header').fadeOut(300,function(){
	// 	$('#maindiv').fadeIn(300);
	// })

	//$('.maindiv').append('<div class="inner gallery"><div class="row flush insertdata" id="insertdata"></div></div>');

	for (var j = 0; j < 5; j++) {
		var html = '<div class="inner gallery"><div class="row flush" id="insertdata">';
		// k = j + 4;
		for (var i = j * 4; i < (j+1)*4; i++) {
 			var url = data.data[i].images.standard_resolution.url;
 			var title = "No Title";
 			console.log(data.data[i].caption === null);
 			if (data.data[i].caption !== null) {
 				title = data.data[i].caption.text;
 			}
 			html += '<div class="3u"><a href="'+ url + '" class="image full"><img src="'+ url + '" alt="" title="'+ title +'" /></a></div>';
 			console.log(html);
 		};
 		html += '</div></div>';
		$('.maindiv').append(html);		
	};
 	


		var _settings = {

		// Full screen header
			useFullScreenHeader: true,

		// Parallax Background
			useParallax: true,
			parallaxFactor: 10,	// Lower = more intense. Higher = less intense.
			parallaxLimit: 1680,	// Performance tweak: turns off parallax if the viewport width exceeds this value

		// skelJS
			skelJS: {
				prefix: 'css/style',
				resetCSS: true,
				boxModel: 'border',
				useOrientation: true,
				containers: 1140,
				grid: {
					gutters: 40
				},
				breakpoints: {
					'widest': { range: '*', containers: 1140, hasStyleSheet: false },
					'wide': { range: '-1680', containers: 960 },
					'normal': { range: '-1080', containers: '95%' },
					'narrow': { range: '-840', containers: '95%', grid: { gutters: 30 } },
					'mobile': { range: '-640', lockViewport: true, containers: '95%', grid: { collapse: true } }
				}
			},

		// poptrox
			poptrox: {
				useBodyOverflow: false,
				usePopupEasyClose: false,
				overlayColor: '#0a1919',
				overlayOpacity: 0.75,
				usePopupDefaultStyling: false,
				usePopupCaption: true,
				popupLoaderText: '',
				windowMargin: 10,
				usePopupNav: true
			}

	};

	$('.gallery').poptrox(_settings.poptrox);
} 


