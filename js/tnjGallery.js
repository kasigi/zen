

jQuery(document).ready(function() {


	// modified Isotope methods for gutters in masonry
	  jQuery.Isotope.prototype._getMasonryGutterColumns = function() {
	    var gutter = this.options.masonry && this.options.masonry.gutterWidth || 0;
		containerWidth = this.element.width();
	  
	    this.masonry.columnWidth = this.options.masonry && this.options.masonry.columnWidth ||
		          // or use the size of the first item
		          this.$filteredAtoms.outerWidth(true) ||
		          // if there's no items, use size of container
		          containerWidth;

	    this.masonry.columnWidth += gutter;

	    this.masonry.cols = Math.floor( ( containerWidth + gutter ) / this.masonry.columnWidth );
	    this.masonry.cols = Math.max( this.masonry.cols, 1 );
	  };


	 jQuery.Isotope.prototype._masonryReset = function() {
	    // layout-specific props
	    this.masonry = {};
	    // FIXME shouldn't have to call this again
	    this._getMasonryGutterColumns();
	    var i = this.masonry.cols;
	    this.masonry.colYs = [];
	    while (i--) {
	      this.masonry.colYs.push( 0 );
	    }
	  };

	  jQuery.Isotope.prototype._masonryResizeChanged = function() {
	    var prevSegments = this.masonry.cols;
	    // update cols/rows
	    this._getMasonryGutterColumns();
	    // return if updated cols/rows is not equal to previous
	    return ( this.masonry.cols !== prevSegments );
	  };



	imagesLoaded( jQuery.find('.tnj-Gallery img'), function( instance ) {
	      initGallery();
	});

	imagesLoaded( jQuery.find('.tnj-archive-gallery img'), function( instance ) {
	      initArchiveGallery();
	});

});

function initArchiveGallery(){

	jQuery('.tnj-archive-gallery').each(function () {
		jQuery(this).isotope({
			// options
			
			  // set columnWidth to a percentage of container width
			masonry: { columnWidth: 260, gutterWidth: 20}
			
		    });
    	});

	jQuery('.tnj-archive-categories li a').click(function(){
			jQuery(this).parent('li').siblings().removeClass('active');
			jQuery(this).parent('li').addClass('active');
			if(jQuery(this).attr("data-catID")!="cfAll"){
				jQuery('.tnj-archive-gallery').isotope({filter: "."+jQuery(this).attr("data-catID")});
	console.log("."+jQuery(this).attr("data-catID"));
			}else{
				jQuery('.tnj-archive-gallery').isotope({filter: "*"});
			}
			return false;
		});

	jQuery(window).resize(function() {
		jQuery('.tnj-archive-gallery').each(function () {
				jQuery(this).isotope({
				  resizable: true,
				  masonry: { columnWidth: 260, gutterWidth: 20 }
				  
				});
		    	});
 

		});


} // end initArchiveGallery


function initGallery(){

	// Run Isotope Init

	jQuery('.tnj-Gallery').each(function () {
		var wWidth = jQuery(window).width();
		var cWidth = 4;
		if(wWidth>=768){cWidth = cWidth /2;}
		jQuery(this).isotope({
			// options
			resizable: true, // disable normal resizing
			  // set columnWidth to a percentage of container width
			masonry: { columnWidth: cWidth / 2, gutterWidth: 20 }
			
		    });
    	});


	jQuery(window).resize(function() {
		jQuery('.tnj-Gallery').each(function () {
			var wWidth = jQuery(window).width();
			var cWidth = 4;

			if(wWidth>=768){cWidth = cWidth /2;}
				jQuery(this).isotope({
				  // options...
				  resizable: true,
				  // set columnWidth to a percentage of container width
				  masonry: { columnWidth: cWidth / 2, gutterWidth: 20 }
				  
				});
		    	});
 		});


	jQuery('.tnj-Gallery .tnj-GalleryElement').click(function(){
		if(jQuery(this).hasClass('tnj-GalleryImage')==false){
		jQuery(this).parent('.tnj-Gallery').find('.tnj-GalleryElement').removeClass('tnj-GalleryImage');
		jQuery(this).parent('.tnj-Gallery').find('.tnj-GalleryElement').addClass('tnj-GalleryThumb');
		jQuery(this).removeClass('tnj-GalleryThumb');
		jQuery(this).addClass('tnj-GalleryImage');
		jQuery(this).parent('.tnj-Gallery').isotope('reLayout');

		}

	});

	


}// initGallery()




