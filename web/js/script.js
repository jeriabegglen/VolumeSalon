/**************************************************************************
 * One page template main javascript file
 * @version: 1.1 (19.05.2015)
 * @author Olegnax
 * @website http://olegnax.com
 **************************************************************************/
(function ($) {
	"use strict";
//Global variables
	var $window, root, 
			touch = Modernizr.touch,
			responsive = 993,
			loaderCounter = 0,
//	Array of javascrripts plugins, support external URLs also
			loadScriptsDefault = [
				'imagesloaded.pkgd.min.js',
				'bootstrap.min.js',
				'isotope.min.js',
				'jquery.cycle2.min.js',
				'jquery.cycle2.swipe.min.js',
				'jquery.flexslider-min.js',
				'jquery.themepunch.tools.min.js',
				'jquery.themepunch.revolution.min.js',
				'jquery.validate.min.js',
				'jquery.velocity.min.js',
				'jquery.magnific-popup.min.js',
				'parallax.min.js',
				'smoothScroll.min.js',
				'superfish.min.js',
				'tweets.min.js',
				'waypoints.min.js',
				'jquery.countTo.min.js'
			],
			loadScripts = (typeof loadPageScripts === "undefined") ? loadScriptsDefault : loadPageScripts,
			loaderMaxCounter = loadScripts.length + jQuery("body img").length,
			sitePath = window.location.protocol.replace(/\:/g, '') + "://" + window.location.host + window.location.pathname,
			hash = window.location.hash.replace("#", ""),
			flexslides = {},
			ajaxportfolios = {},
			intervals = {},
			started = 0,
			viewportH,
			fileprotocol = (window.location.protocol == 'file:') ? true : false;

	sitePath = sitePath.split('/');
	sitePath.pop();
	sitePath = sitePath.join('/');
	if (fileprotocol) {
		sitePath = 'http://family.olegnax.com'; //if somebody load html via file protocol
	}


//Easing function
	jQuery.extend(jQuery.easing, {
		easeOutExpo: function (x, t, b, c, d) {
			return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
		}
	});

//Old IE animation fix
	jQuery(document).on("skipAnimation", ".animated", function (e) {
		if (!Modernizr.cssanimations) {

			jQuery(this).trigger('notAnimated');
		}
	});


// Core
	var Core = {
		init: function () {

			$window = $(window);
			root = $('html, body');
		
			$window.on('ready scroll', function () {
				//			init ToTop function
				SmoothScrollTo.totop();
			});

		}
	};


// Loader
	var Loader = {
		el: jQuery('.loader'),
		bar: jQuery('.loader').find('.bar'),
		//	Site preloader animation
		init: function (callback) {
			if (!touch) {
				jQuery('[data-animation]').css({
					'opacity': 0
				});
			}
			viewportH = jQuery(window).height();
			var margin = (viewportH / 2 - Loader.bar.height() / 2);
			if (Loader.el.length) {
				Loader.bar.css({
					'margin-top': margin + 'px',
					'visibility': 'visible'
				}).addClass('animated fadeInDown fast').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend notAnimated', function () {
					
					jQuery(this).find('.progress').css({
						'visibility': 'visible'
					}).addClass('animated fadeIn faster').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend notAnimated', function () {
						
						Loader.resize();
						$(window).on('load ready resize', function () {
							Loader.resize();
						});
						callback();
					}).trigger('skipAnimation');
				}).trigger('skipAnimation');
			} else {
				callback();
			}
		},
		resize: function () {
			viewportH = jQuery(window).height();
			var margin = (viewportH / 2 - Loader.bar.height() / 2);
			Loader.bar.css('margin-top', margin + 'px');
		},
		progressEl: jQuery('.loader .progress span'),
		updateProgress: function (value) {
			this.progressEl.css({
				width: value + '%'
			});
			if (value === 100) {
				setTimeout(function () {
					Loader.hide();
				}, 800);
			}
			
		},
		hide: function () {
			SmoothScrollTo.init();
			if (Loader.el.length) {
				Loader.bar.find('.progress').addClass('fadeOut faster').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend notAnimated', function () {
					Loader.bar.addClass('fadeOutDown fast').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend notAnimated', function () {
						setTimeout(function () {
							Loader.el.addClass('animated fadeOut faster').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend notAnimated', function () {
								jQuery(this).remove();
								if (typeof (jQuery.fn.waypoint) !== 'undefined') {
									Waypoints.animation();
								}
							}).trigger('skipAnimation');

						}, 500);
					}).trigger('skipAnimation');
				}).trigger('skipAnimation');
			} else {
				if (typeof (jQuery.fn.waypoint) !== 'undefined') {
					Waypoints.animation();
				}
			}
		},
		//	Inline preloader
		inlineLoader: {
			loader: '<div class="inline-loader"><svg height="40" width="40" ><circle cx="20" cy="20" r="19" stroke="rgba(190,190,190,.5)" stroke-width="2" fill="none" /></svg><svg height="40" width="40" class="top"><circle cx="20" cy="20" r="19" stroke="#d5ba9c" stroke-width="2" fill="none" stroke-dasharray="25 160" stroke-dashoffset="-8"/></svg><div>',
			init: function (idName) {
				jQuery(idName).each(function () {
					jQuery(this).append(Loader.inlineLoader.loader);
					Loader.inlineLoader.animate(idName);
				});
			},
			animate: function (idName) {
				var angle = 360;
				if (typeof (jQuery.fn.velocity) !== 'undefined') {
					jQuery(idName + ' .top').velocity({
						rotateZ: angle
					}, {
						duration: 900,
						easing: 'linear'
					});
				}
				intervals[idName] = setInterval(function () {
					angle = angle + 360;
					if (typeof (jQuery.fn.velocity) !== 'undefined') {
						jQuery(idName + ' .top').velocity({
							rotateZ: angle
						}, {
							duration: 900,
							easing: 'linear'
						});
					}

				}, 800);
			},
			hide: function (idName) {
				jQuery(idName).find('.inline-loader').remove();
				clearInterval(intervals[idName]);

			}
		}
	};

//Count loading progress for site loader
	var UpdateLoaderCounter = function (url) {
		loaderCounter++;
		var percentage = parseInt(loaderCounter / loaderMaxCounter * 100);

		if (percentage.toString().length == 1) {
			percentage = '  ' + percentage;
		} else if (percentage.toString().length == 2) {
			percentage = ' ' + percentage;
		}

		Loader.updateProgress(percentage);

		if (loaderCounter === loadScripts.length) {
			InitJS();
		}

	};

// AJAX loading of javascripts plugins
	var LoadJS = function () {

		var url = [];

		jQuery.each(loadScripts, function (i)
		{

			if (/(^http:\/\/)|(^https:\/\/)|(^\/\/)|(^www.)/.test(loadScripts[i])) {
				url[i] = loadScripts[i];
			} else {
				url[i] = sitePath + '/js/' + loadScripts[i]
			}

			jQuery.ajax({
				url: url[i],
				dataType: "script",
				cache: true,
				success: function () {
					UpdateLoaderCounter(url[i]);
				}
			});




		});

	}

// Smooth anchor scrolling
	var SmoothScrollTo = {
		init: function () {
			jQuery("body").attr('id', 'pagetop').append('<a href="#pagetop" id="toTop" style="display: none;"><span id="toTopHover" style="opacity: 0;"></span><small>To Top<small></a>');
			SmoothScrollTo.hash();
			SmoothScrollTo.links();

		},
		scroll: function ($target) {
			if (typeof (jQuery.fn.waypoint) !== 'undefined') {
				jQuery('.waypoint').waypoint('destroy');
			}

			var offset;

			if ($target.offset().top > jQuery('body>header').height() - 27 && window.innerWidth >= responsive) {
				offset = $target.offset().top - jQuery('body>header').height() - 27;
			} else {
				offset = $target.offset().top;
			}

			root.stop().animate({
				'scrollTop': offset
			}, 500, 'easeOutExpo', function () {
				setTimeout(function () {
					if (typeof (jQuery.fn.waypoint) !== 'undefined') {
						Waypoints.init();
					}
				}, 500);

			});
		},
		hash: function () {
			if (jQuery('*[data-hash="' + hash + '"]').length) {
				SmoothScrollTo.scroll(jQuery('*[data-hash="' + hash + '"]'));
			} else {
				if (typeof (jQuery.fn.waypoint) !== 'undefined') {
					Waypoints.init();
				}
			}
		},
		links: function () {
			jQuery("a[href^='#']").on({
				click: function (e) {
					e.preventDefault();
					if (this.hash.length && (jQuery(this.hash).length || jQuery('*[data-hash="' + this.hash.replace("#", "") + '"]').length)) {

						var $target = (jQuery(this.hash).length) ? jQuery(this.hash) : jQuery('*[data-hash="' + this.hash.replace("#", "") + '"]');

						if (jQuery('nav.main-menu').css('display') === 'block') {
							jQuery('nav.main-menu>div').addClass('collapsed');
							jQuery('.navbar-collapse').removeClass('in');
							jQuery('.navbar-header').toggleClass('selected');
						}

						SmoothScrollTo.scroll($target);

					}
				},
			});
		},
		//ToTop link show/hide
		totop: function () {
			if (jQuery(window).scrollTop() > 100) {
				jQuery('a#toTop').show();
			} else {
				jQuery('a#toTop').hide();
			}
		}
	}



//Full screen section
	var FullScreenSection = {
		init: function () {
			$window.on('ready resize', function () {
				var contentH;
				jQuery('section.fullscreen').each(function () {

					contentH = jQuery(this).outerHeight();

					if (typeof (jQuery(this).data('heightO')) == 'undefined') {
						jQuery(this).data('heightO', contentH);
					} else {
						contentH = jQuery(this).data('heightO');
					}

					if (contentH < viewportH) {
						jQuery(this).height(viewportH);
						jQuery(this).find('.container').css('margin-top', (viewportH - contentH) / 2 + 'px');
					}
				});
			});
		}
	}


// Isotope gallery
	var IsotopeGallery = {
		init: function () {
			IsotopeGallery.isotope('.portfolioContainer');
		},
		isotope: function (idName) {
			jQuery(idName).each(function () {
				var $container = jQuery(this);

				$container.isotope({
					transformsEnabled: true,
					masonry: {
						columnWidth: $container.find('article')[0]
					}
				});

				IsotopeGallery.isotopeFilters($container);
				IsotopeGallery.isotopeResize($container);
				IsotopeGallery.isotopeLoadMore($container);

				$window.on('load ready resize', function () {
					setTimeout(function () {
						IsotopeGallery.isotopeResize($container);
					}, 150);
				});
			});
		},
		isotopeFilters: function (container) {
			var filterContainer = container.closest('div.portfolio').find('.filters');
			if (filterContainer.length) {
				filterContainer.find('ul').remove();
				var filters = [];
				container.find('article').each(function () {
					var cat = jQuery(this).data('category');
					cat = cat.replace(/\s*,\s*/g, ',');
					cat = cat.replace(/,{2,}/g, ',');
					cat = cat.replace(/,+$/g, '');
					cat = cat.replace(/^,+/g, '');
					cat = cat.split(',');
					filters = jQuery.unique(jQuery.merge(filters, cat).sort());
				});

				var list = '<ul><li><a  data-filter="" href="#" class="current">All</a></li>';
				jQuery.each(filters, function (index, value) {
					list = list + '<li><a  data-filter="' + value + '" href="#">' + value + '</a></li>';
				});
				list = list + '</ul>';
				if (typeof (jQuery.fn.velocity) !== 'undefined') {
					filterContainer.append(list).velocity({
						opacity: 1
					}, 1000);
				} else {
					filterContainer.append(list).css('opacity', 1);
				}


				filterContainer.find('li a').on("click", function (e) {
					e.preventDefault();

					jQuery(this).closest('ul').find('.current').removeClass('current');
					jQuery(this).addClass('current');

					var selector = jQuery(this).attr('data-filter');

					container.isotope({
						filter: function () {
							var itemcat = jQuery(this).data('category');
							return itemcat.match(selector);
						}
					});


					SmoothScrollTo.scroll(jQuery('#ajaxed_content'));
					setTimeout(function () {
						jQuery("#ajaxed_content #ajax-content").slideUp(500);
						jQuery("#ajaxed_content").html('');
						$window.trigger('resize');
					}, 500);


				});
			}
		},
		isotopeResize: function (container) {

			var $colW = container.width() / (100 / parseInt(container.find('article').css('max-width')));

			container.find('article').each(function () {
				jQuery(this).width($colW).find('img').width(parseFloat($colW));
			});

			container.isotope('layout');

			container.isotope('on', 'layoutComplete', function () {

				General.bodyresize();
				jQuery.waypoints('refresh');
			});

		},
		isotopeLoadMore: function (container) {
			container.closest('div.portfolio').find('.portfolio_load_more').click(function () {

				var url = jQuery(this).attr('href');

				var $button = jQuery(this);
				jQuery.ajax({
					url: url,
					dataType: "html",
					beforeSend: function () {
						$button.html('');
						Loader.inlineLoader.init('.portfolio_load_more');
					},
					success: function (response) {
						setTimeout(function () {
							Loader.inlineLoader.hide(('.portfolio_load_more'));

							$button.remove();
							var elems = jQuery(response).find('.portfolioContainer article');
							container.append(elems).isotope('appended', elems);
							container.isotope({
								filter: ''
							});
							IsotopeGallery.isotopeFilters(container);
							$window.trigger('resize');
							setTimeout(function () {
								$window.trigger('resize');
							}, 1000);
						}, 2500);
					}

				});
				return false;
			});
		}
	}

//Main menu
	var MainMenu = {
		init: function () {
			jQuery('ul.sf-menu').superfish({
				hoverClass: 'sfHover',
				delay: 300,
				animation: {
					opacity: 'show',
					height: 'auto'
				},
				speed: '1',
				autoArrows: false,
				dropShadows: false,
				disableHI: true
			}).supposition();

			jQuery('ul.sf-menu li.dropdown > a').append('<em>+</em>');
			jQuery('ul.sf-menu li.dropdown > a em').click(function () {
				if (jQuery(this).text() == '+') {
					jQuery(this).parent().parent().addClass('opened');
					jQuery(this).parent().next().show();
					jQuery(this).text('-');
				} else {
					jQuery(this).parent().parent().removeClass('opened');
					jQuery(this).parent().next().hide();
					jQuery(this).text('+');
				}
				return false;
			});

			jQuery(".navbar-header").click(function () {
				jQuery(this).toggleClass('selected');
			});
			$window.on('ready resize', function () {
				MainMenu.absolute();
			});


		},
//	adjustments for section under menu if menu with absolute position
		absolute: function () {

			var headerH = jQuery('header:not(".without-absolute")').height(),
					content = jQuery('header:not(".without-absolute")').next().find('.container');

			setTimeout(function () {
				if (content.length) {
					var contentMT = (content.outerHeight(true) - content.height()) / 2;

					if (headerH > contentMT) {
						content.css('padding-top', headerH - contentMT + 'px');
					}
				}
			}, 200);
		}
	}



//Sticky header
	var StickyHeader = {
		head_top: jQuery('body>header').height(),
		head_height: jQuery('body>header').outerHeight(true),
		init: function () {
			$window.on('ready load resize scroll', function () {
				if (jQuery('body>header').hasClass('without-absolute') && !touch) {
					jQuery('body>header').removeClass('without-absolute').css('position', 'fixed').before('<section class="header_push"></section>');
					jQuery('section.header_push').height(StickyHeader.head_height);

				}
				setTimeout(function () {
					if ((jQuery('body>header').hasClass('sticky') && $window.scrollTop() <= StickyHeader.head_top)) {
						jQuery('body>header').removeClass('sticky');
					} else if (!jQuery('body>header').hasClass('sticky') && $window.scrollTop() > StickyHeader.head_top) {
						jQuery('body>header').addClass('sticky');
					}
				}, 100);
				jQuery('header.alt.sticky .navbar-collapse').css('max-height', viewportH - 34);
			});
		}
	}


//Twitter feed
	var TwitterFeed = {
		el: {
			widget: jQuery('.twitterWidget'),
			twitterList: jQuery('.twitterWidget').find(".twitterList")
		},
		utils: {
			username: jQuery('.twitterWidget').data("user"),
			currentIndex: 0,
			callback: function () {
				jQuery(window).resize();
			},
			isReady: false,
			height: 0,
			text_specify: "'You need to specify a username",
			text_error: "There was an error connecting to your Twitter account",
			text_follow: "",
			text_on_twitter: ""
		},
		init: function () {
			getTweets(this.el, this.utils);
		}

	}


//Google MAP
	var GMap = {
		geocoder: function (idName) {
			var geocoder = new google.maps.Geocoder(),
					m_location,
					address = jQuery(idName).data('address');
			if (jQuery(idName).length) {
				geocoder.geocode({
					'address': address
				}, function (results, status) {
					if (status == google.maps.GeocoderStatus.OK) {
						m_location = results[0].geometry.location;
					} else {
						m_location = new google.maps.LatLng(-33.86938, 151.204834);
					}
					GMap.map(m_location, address);
				});
			}
		},
		map: function (m_location, address) {
			var myOptions = {
				zoom: 14,
				center: m_location,
				scrollwheel: false,
				scaleControl: false,
				disableDefaultUI: false,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				styles: [{
						"featureType": "landscape",
						"stylers": [{
								"saturation": -100
							}, {
								"lightness": 60
							}]
					}, {
						"featureType": "road.local",
						"stylers": [{
								"saturation": -100
							}, {
								"lightness": 40
							}, {
								"visibility": "on"
							}]
					}, {
						"featureType": "transit",
						"stylers": [{
								"saturation": -100
							}, {
								"visibility": "simplified"
							}]
					}, {
						"featureType": "administrative.province",
						"stylers": [{
								"visibility": "off"
							}]
					}, {
						"featureType": "water",
						"stylers": [{
								"visibility": "on"
							}, {
								"lightness": 30
							}]
					}, {
						"featureType": "road.highway",
						"elementType": "geometry.fill",
						"stylers": [{
								"color": "#ef8c25"
							}, {
								"lightness": 40
							}]
					}, {
						"featureType": "road.highway",
						"elementType": "geometry.stroke",
						"stylers": [{
								"visibility": "off"
							}]
					}, {
						"featureType": "poi.park",
						"elementType": "geometry.fill",
						"stylers": [{
								"color": "#b6c54c"
							}, {
								"lightness": 40
							}, {
								"saturation": -40
							}]
					}, {}]
			};
			var map = new google.maps.Map(document.getElementById("mapheader"), myOptions);

			var image = "http://placehold.it/70x78";
			var marker = new google.maps.Marker({
				map: map,
				icon: image,
				position: map.getCenter()
			});

			var contentString = address;
			var infowindow = new google.maps.InfoWindow({
				content: contentString
			});

			if (touch) {
				map.setOptions({
					draggable: false
				});
			} else {
				map.setOptions({
					draggable: true
				});
			}

			google.maps.event.addListener(marker, "click", function () {
				infowindow.open(map, marker);
			});
			google.maps.event.addDomListener(window, "resize", function () {
				var center = map.getCenter();
				google.maps.event.trigger(map, "resize");
				map.setCenter(center);

				if (touch) {
					map.setOptions({
						draggable: false
					});
				} else {
					map.setOptions({
						draggable: true
					});
				}
			});
		},
		load: function () {
			var script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = '//maps.googleapis.com/maps/api/js?v=3.exp&' +
					'callback=gmap';
			if (fileprotocol) {
				script.src = 'http://maps.googleapis.com/maps/api/js?v=3.exp&' +
						'callback=gmap';
			}
			document.body.appendChild(script);
		},
		init: function () {
			GMap.geocoder('#mapheader');
		}
	}

	window.gmap = function gmap() {
		GMap.init();
	}


//Waypoints for menu and hashtags
	var Waypoints = {
		init: function () {
			jQuery('.waypoint').waypoint(function (direction) {
				var $active = jQuery(this);

				if (direction === "up") {
					$active = $active.waypoint('prev');
				}

				window.location.hash = $active.data('hash');
				jQuery('.waypoint').removeClass('active-hash');
				$active.addClass('active-hash');

				if (jQuery('#top-main-menu a[href="#' + $active.data('hash') + '"]').length) {
					jQuery('#top-main-menu li').each(function () {
						jQuery(this).removeClass('current-menu-item');
					});
					jQuery('#top-main-menu a[href="#' + $active.data('hash') + '"]').each(function () {
						jQuery(this).closest('li').addClass('current-menu-item');
					});
				}

			}, {
				offset: function () {
					return jQuery('body>header').outerHeight();
				}
			});



		},
		//Content on appear animation. Added animate.css classes to each element with data "animation"
		animation: function () {
			jQuery('[data-animation]').waypoint({
				triggerOnce: true,
				offset: '95%',
				handler: function () {

					var ele = jQuery(this);

					if (ele.hasClass('bars')) {
						General.progressbars.init();
					}

					if (ele.hasClass('milestone-counter')) {
						if (typeof (jQuery.fn.countTo) !== 'undefined') {
							ele.find('.counter').countTo();
						}
					}

					if (ele.hasClass('google-map')) {
						GMap.load();
					}


					if (!touch) {
						var fx = ele.attr('data-animation');
						var delay = ele.attr('data-delay');


						if (typeof delay === "undefined") {
							delay = 0;
						} else {
							delay = parseFloat(delay.replace(",", "."));
						}



						setTimeout(function () {
						ele.addClass('animated ' + fx).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend notAnimated', function () {
								ele.css({
									'opacity': 1
								}).removeClass('animated ' + fx);
						}).trigger('skipAnimation');

						}, delay * 1000);
					}
				}
			});
		}

	}


// Flexslider carousels
	var Flexsliders = {
		init: function () {
			Flexsliders.flexcarousel('awards', 140, 60);
		},
		flexcarousel: function (idName, iWidthOrigin, iMargin) {
			if (jQuery('#' + idName).length) {
				var cWidth = jQuery('#' + idName).width();
				var iCount = Math.ceil(cWidth / (iWidthOrigin + iMargin));
				var iWidth = parseFloat((cWidth - iMargin * (iCount - 1)) / iCount);

				jQuery('#' + idName).flexslider({
					animation: "slide",
					animationLoop: true,
					itemWidth: iWidth,
					itemMargin: iMargin,
					minItems: iCount,
					maxItems: iCount,
					prevText: "&larr",
					nextText: "&rarr",
					controlNav: false,
					directionNav: false,
					slideshowSpeed: 7000,
					start: function (slider) {
						flexslides[idName] = slider;
						$window.on('load ready resize', function () {
							Flexsliders.flexcarouselResize(idName, iWidthOrigin, iMargin);
						});
						jQuery(window).resize();
					}
				});
			}
		},
		flexcarouselResize: function (idName, iWidthOrigin, iMargin) {
			if (jQuery('#' + idName).length) {
				var cWidth = jQuery('#' + idName).width();
				var iCount = Math.ceil(cWidth / (iWidthOrigin + iMargin));
				var iWidth = parseFloat((cWidth - iMargin * (iCount - 1)) / iCount);
				jQuery('#' + idName + ' .slides > li').width(iWidth);

				flexslides[idName].vars.maxItems = iCount;
				flexslides[idName].vars.minItems = iCount;
				flexslides[idName].flexAnimate(0);
				flexslides[idName].update(flexslides[idName].pagingCount);
				flexslides[idName].setProps();
			}
		}
	}


// Revolution slider
	var RevolutionSliders = {
		init: function () {
			RevolutionSliders.revslider('.tp-banner-fullwidth-fullscreen');
			RevolutionSliders.revslider('.tp-banner-fullwidth', {
				delay: 7000,
				startwidth: 1170,
				startheight: 790,
				hideThumbs: 10,
				forceFullWidth: "on",
				soloArrowLeftHOffset: 0,
				soloArrowRightHOffset: 0,
				soloArrowLeftValign: "center",
				soloArrowRightValign: "center",
				navigationType: "none",
				onHoverStop: "on"
			});
		},
		defaultOpt: {
			delay: 7000,
			startwidth: 1170,
			startheight: 790,
			hideThumbs: 10,
			fullScreen: "on",
			soloArrowLeftHOffset: 0,
			soloArrowRightHOffset: 0,
			soloArrowLeftValign: "center",
			soloArrowRightValign: "center",
			navigationType: "none",
			onHoverStop: "off"
		},
		revslider: function (idName, opt) {
			opt = (typeof opt === "undefined") ? RevolutionSliders.defaultOpt : opt;
			jQuery(idName).revolution(opt);
		}
	}


//Forms validation
	var FormValidation = {
		init: function () {
			FormValidation.validation("#contact_form");
		},
		validation: function (idName) {
			if (jQuery(idName).length) {
				jQuery(idName).validate({
					submitHandler: function (form) {
						jQuery(form).find('button.send').attr('disabled', 'disabled');
						FormValidation.AJAXprocess(form);
					},
					rules: {
						email: "required email",
						message: "required",
						name: "required",
						website: "url"
					},
					messages: {
						name: "Please specify your name.",
						message: "Please enter your message.",
						website: "Please enter full URL",
						email: {
							required: "We need your email address to contact you.",
							email: "Your email address must be in the format of name@domain.com"
						}
					}
				});
			}
		},
		AJAXprocess: function (theForm) {
			/* AJAX function for forms */
			var $ = jQuery;
			var formData = $(theForm).serialize();

			$.ajax({
				type: "POST",
				url: $(theForm).attr('action'),
				data: formData,
				success: function (response) {
					if (typeof (jQuery.fn.velocity) !== 'undefined') {
						$(theForm).velocity({
							opacity: 0
						}, 500, function () {
							if (response === 'success') {
								$(theForm).before('<p class="note">Your message has been successfully sent to us!</p>').slideDown('fast'); //success text
							} else {
								$(theForm).before('<p class="note">Something going wrong with sending mail...</p>').slideDown('fast'); // error text when php mail() function failed				
							}
						});
					}
					setTimeout(function () {
						$(theForm).prev('.note').html('').slideUp('fast');
						$(theForm).find("button").removeAttr('disabled');
						$(theForm).find("input, textarea").val('');
						if (typeof (jQuery.fn.velocity) !== 'undefined') {
							$(theForm).velocity({
								opacity: 1
							}, 500);
						} else {
							$(theForm).css('opacity', 1);
						}
					}, 3000);
				},
				error: function () {
					if (typeof (jQuery.fn.velocity) !== 'undefined') {
						$(theForm).velocity({
							opacity: 0
						}, 500, function () {
							$(theForm).before('<p class="note">Something going wrong with connection...</p>').fadeIn(500); //error text when ajax didn't send data to php processor				
						});
						setTimeout(function () {
							$(theForm).prev('.note').html('').slideUp('fast');
							$(theForm).find("button").removeAttr('disabled');
							$(theForm).find("input, textarea").val('');
							if (typeof (jQuery.fn.velocity) !== 'undefined') {
								$(theForm).velocity({
									opacity: 1
								}, 500);
							} else {
								$(theForm).css('opacity', 1);
							}
						}, 3000);
					}
				}
			});

			return false;
		}
	}


//General functions
	var General = {
		init: function () {
			General.flips('.flip-container');
			if (!touch)
				General.parallax('.parallax-section');
			General.jcycle2('.testimonials-slideshow');
			General.waypoints();
			$window.on('load ready resize', function () {
				General.bodyresize();
			});
		},
		flips: function (idName) {

			if (touch) {
				jQuery(idName).on('click', function (e) {
					if (jQuery(e.target).prop("tagName") !== 'A') {
						jQuery(this).toggleClass('hover');
					}
				});
			} else {
				jQuery(idName).on('mouseenter mouseleave', function (e) {
					if (jQuery(e.target).prop("tagName") !== 'A') {
						jQuery(this).toggleClass('hover');
					}
				});
				jQuery(document).on({
					mouseenter: function () {
						if (!jQuery(this).hasClass('hover'))
							jQuery(this).addClass('hover');
					},
					mouseleave: function () {
						jQuery(this).removeClass('hover');
					}
				}, idName);
			}

		},
		parallax: function (idName) {
			jQuery(idName).each(function () {
				if (typeof (jQuery.fn.parallax) !== 'undefined') {
					jQuery(this).parallax();
				}
			});
		},
		jcycle2: function (idName) {
			if (typeof (jQuery.fn.cycle) !== 'undefined') {
				jQuery(idName).on('cycle-initialized', function (e, opts) {
					if (opts.slideCount > 1) {
						jQuery(idName).addClass('jcycled');
					}
				});
				jQuery(idName).cycle();
			}
		},
		progressbars: {
			init: function () {
				General.progressbars.progress('.progressbar');
			},
			progress: function (idName) {
				if (jQuery(idName).length) {
					jQuery(idName).each(function (i) {
						var $progress = jQuery(this).find('.progress');

						$progress.find('.progressbar-title').css('width', $progress.data('percent') + '%');


						if ($progress.length && $progress.hasClass('animate_progress')) {
							General.progressbars.animate($progress.data('percent'), jQuery(this), (i + 1) * 200);
						} else {
							$progress.find('.bar').css('width', $progress.data('percent') + '%')
						}
					});
				}
			},
			animate: function (percent, $element, timeout) {
				setTimeout(function () {
					$element.find('.bar').stop().animate({
						width: percent + '%'
					}, 1000, 'swing');
				}, timeout);
			}

		},
		waypoints: function () {
			var waypoints = 1;
			waypoints += jQuery('body>.waypoint').length;
			jQuery('body>.waypoint').each(function () {
				jQuery(this).css({
					'z-index': waypoints,
					'position': 'relative'
				});
				waypoints--;
			});
		},
		bodyresize: function () {
			var bodyH = 0;
			setTimeout(function () {
				jQuery('body>section').each(function () {
					bodyH += jQuery(this).outerHeight();
				});
				jQuery('body').height(bodyH - 1);
			}, 150);
		}
	}


//Lightbox
	var MPopup = {
		init: function () {
			MPopup.video('a.play.video');
			MPopup.self_hosted_video('a.play.video.self-hosted');
			MPopup.image('.portfolioContainer');
		},
		video: function (idName) {
			jQuery(idName).magnificPopup({
				mainClass: 'mfp-fade',
				items: {
					src: jQuery(idName).attr('href')
				},
				iframe: {
					markup: '<div class="mfp-iframe-scaler">' +
							'<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
							'<div class="mfp-close"></div>' +
							'</div>', // HTML markup of popup, `mfp-close` will be replaced by the close button
				},
				type: 'iframe'
			});
		},
		self_hosted_video: function (idName) {
			jQuery(idName).magnificPopup({
				mainClass: 'mfp-fade',
				type: 'inline'
			});
		},
		image: function (idName) {
			jQuery(idName).magnificPopup({
				mainClass: 'mfp-fade',
				delegate: 'article:not(".ajaxed") a:visible',
				gallery: {
					enabled: true,
					navigateByImgClick: true,
					preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
				},
				callbacks: {
					buildControls: function () {
						if (jQuery.magnificPopup.instance.items.length > 1)
							this.contentContainer.append(this.arrowLeft.add(this.arrowRight));
					},
					open: function () {
						jQuery('.mfp-description').append(this.currItem.el.data('title'));
					},
					change: function () {
						var mfp = jQuery.magnificPopup.instance;
						var container = jQuery(mfp.container);

						if (mfp.index >= mfp.items.length - 1)
							container.addClass('mfp-last');
						else
							container.removeClass('mfp-last');
						if (mfp.index == 0)
							container.addClass('mfp-first');
						else
							container.removeClass('mfp-first');
					},
					afterChange: function () {
						jQuery('.mfp-description').empty().append(this.currItem.el.data('title'));
					}
				},
				image: {
					verticalFit: true,
					markup: '<div class="mfp-figure   mfp-with-anim">' +
							'<div class="mfp-img"></div>' +
							'<div class="mfp-bottom-bar">' +
							'<div class="mfp-description"></div>' +
							'<div class="mfp-close"></div>' +
							'</div>' +
							'</div>'
				},
				type: 'image',
				closeOnContentClick: false,
				midClick: true,
			});

		}
	}

//Background responsive video
	var BackgroundVideo = {
		init: function () {
			$window.on('load ready resize', function () {
				setTimeout(function () {
					BackgroundVideo.resize('.background-video');
				}, 150);
			});
		},
		resize: function (idName) {
			jQuery(idName).each(function () {
				var $video = jQuery(this),
						contW = $video.parent().width(),
						contH = $video.parent().outerHeight(),
						videoW = $video.width(),
						videoH = $video.height(),
						videoRatio = videoW / videoH,
						contRatio = contW / contH,
						videoTop, videoLeft;

				if (touch) {
					videoRatio = 1.778504672897196;
					var src = $video.attr('poster');
					if (src) {
						$video.after("<img src='" + src + "' class='" + idName.replace(/\./gi, "") + "' />").remove();
					}
				}

				if ((contRatio > videoRatio)) {
					videoW = parseInt(contW);
					videoH = parseInt(videoW / videoRatio);
					videoTop = parseInt((contH - videoH) / 2);
					videoLeft = 0;
				} else {
					videoH = contH;
					videoW = parseInt(videoH * videoRatio);
					videoTop = 0;
					videoLeft = parseInt((contW - videoW) / 2);
				}

				$video.css({
					'top': videoTop + 'px',
					'left': videoLeft + 'px',
					'width': videoW + 'px',
					'height': videoH + 'px'
				});
			});
		}
	}


//AJAX portfolio item load
	var AJAXportfolio = {
		init: function () {
			AJAXportfolio.build('article.portfolios_listing.ajaxed:visible');
		},
		build: function (idName) {
			ajaxportfolios[idName] = [];
			jQuery(idName).each(function (i) {
				ajaxportfolios[idName][i] = (jQuery(this).find('a'));
			});

			jQuery.each(ajaxportfolios[idName], function (key, valueObj) {
				jQuery(valueObj).unbind('click');
				jQuery(valueObj).on('click', function (e) {
					e.preventDefault();
					AJAXportfolio.init();
					AJAXportfolio.prepare(valueObj, ajaxportfolios[idName], key);
				});
			});
		},
		prepare: function (valueObj, idName, key) {

			jQuery("#ajaxed_content #ajax-content").slideUp(500);
			SmoothScrollTo.scroll(jQuery('#ajaxed_content'));
			setTimeout(function () {
				jQuery('#ajaxed_content').html('');
				AJAXportfolio.load(valueObj, idName, key);
			}, 500);

		},
		load: function (idName, portfolioObj, key) {
			var portfoliosLength = portfolioObj.length,
					prev, next;
			jQuery.ajax({
				url: jQuery(idName).attr('href'),
				dataType: "html",
				beforeSend: function () {
					jQuery('#ajaxed_content').velocity({height: '140px'}, {duration: 600}).velocity("stop").css({'padding-bottom': '140px', 'height': ''});
					Loader.inlineLoader.init('#ajaxed_content');
					jQuery('#ajaxed_content .inline-loader').velocity({opacity: 1}, {duration: 600, display: 'block'});
				},
				success: function (response) {

					setTimeout(function () {
						Loader.inlineLoader.hide('#ajaxed_content');

						var content = jQuery(response);
						jQuery("#ajaxed_content").html(content.find('section'));

						jQuery("#ajaxed_content #ajax-content").slideDown(500);
						jQuery("#ajaxed_content").delay(500).css({'padding-bottom': 0});

						//
						jQuery('#ajaxed_content #ajax-content [data-animation]').css({
							'opacity': 0
						});

						jQuery("#ajaxed_content #ajax-content [data-animation]").each(function () {

							var ele = jQuery(this);
							var fx = ele.attr('data-animation');
							var delay = ele.attr('data-delay');


							if (typeof delay === "undefined") {
								delay = 0;
							} else {
								delay = parseFloat(delay.replace(",", "."));
							}

							setTimeout(function () {
								ele.addClass('animated ' + fx).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend notAnimated', function () {
									ele.css({
										'opacity': 1
									}).removeClass('animated ' + fx);

								}).trigger('skipAnimation');

							}, delay * 1000);
						});
						//


						prev = portfolioObj[key - 1];
						next = portfolioObj[key + 1];

						if (key == 0 && key == portfoliosLength - 1) {
							prev = false;
							next = false;
						} else if (key == portfoliosLength - 1) {
							next = false;
						} else if (key == 0) {
							prev = false;
						}


						if (prev) {
							AJAXportfolio.prev(prev, portfolioObj, key - 1);
						} else {
							jQuery('#ajaxed_content .prev.page-number').css('visibility', 'hidden');
						}

						if (next) {
							AJAXportfolio.next(next, portfolioObj, key + 1);
						} else {
							jQuery('#ajaxed_content .next.page-number').css('visibility', 'hidden');
						}
						AJAXportfolio.close();
						setTimeout(function () {
							$window.trigger('resize');
						}, 1000);

					}, 2500);
				}


			});
		},
		next: function (idName, portfolioObj, key) {
			jQuery('#ajaxed_content .next.page-number').on('click', function (e) {
				e.preventDefault();



				AJAXportfolio.prepare(idName, portfolioObj, key);


			});
		},
		prev: function (idName, portfolioObj, key) {
			jQuery('#ajaxed_content .prev.page-number').on('click', function (e) {
				e.preventDefault();

				AJAXportfolio.prepare(idName, portfolioObj, key);

			});
		},
		close: function () {
			jQuery('#ajaxed_content .close-ajax').on('click', function (e) {
				e.preventDefault();
				jQuery("#ajaxed_content #ajax-content").slideUp(500);
				SmoothScrollTo.scroll(jQuery('#ajaxed_content'));
				setTimeout(function () {
					jQuery("#ajaxed_content").html('');
					$window.trigger('resize');
				}, 500);

			});
		}
	}


// Init all functions
	var InitJS = function (callback) {


		// check if imagesloaded.pkgd.min.js loaded
			if (typeof (jQuery.fn.imagesLoaded) !== 'undefined') {
				jQuery('body').imagesLoaded().progress(function (instance, image ) {
					UpdateLoaderCounter(image.img.src);
				});
			} else {
				Loader.updateProgress('100');
			}


		Core.init();
		
		

		General.init();
		// check if waypoints.min.js loaded
		if (typeof (jQuery.fn.waypoint) !== 'undefined') {
			Waypoints.init();
		}
		// check if superfish.min.js loaded
		if (typeof (jQuery.fn.superfish) !== 'undefined') {
			MainMenu.init();
		}

		StickyHeader.init();

		FullScreenSection.init();


		// check if isotope.min.js loaded
		if (typeof (jQuery.fn.isotope) !== 'undefined') {
			IsotopeGallery.init();
		}

		// check if jquery.flexslider-min.js loaded
		if (typeof (jQuery.fn.flexslider) !== 'undefined') {
			Flexsliders.init();
		}

		// check if tweets.min.js loaded
		if (typeof (getTweets) == 'function') {
			TwitterFeed.init();
		}

		// check if jquery.validate.min.js loaded
		if (typeof (jQuery.fn.validate) !== 'undefined') {
			FormValidation.init();
		}

		// check if jquery.themepunch.revolution.min.js and jquery.themepunch.tools.min.js loaded
		if (typeof (jQuery.fn.revolution) !== 'undefined' && typeof (punchgs) == 'object') {
			RevolutionSliders.init();
		}

		// check if jquery.magnific-popup.min.js loaded
		if (typeof (jQuery.fn.magnificPopup) !== 'undefined') {
			MPopup.init();
		}

		BackgroundVideo.init();

		AJAXportfolio.init();

		$window.trigger('resize');
	};



// START
	jQuery(function () {
		Loader.init(function () {

		if (started !== 1)
			LoadJS();
			started = 1;
		});
	});
})(jQuery);