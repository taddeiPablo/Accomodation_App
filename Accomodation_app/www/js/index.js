/**
*	===================================================
*	
*
*	===================================================
**/
$(function(){

	//
	$('#Main').on('change', "input[id='file1']", function() {
		loadImgs(this, $('#img1'));
	});

	// 
	function loadImgs(input, imgs){
		$(imgs).attr('src','');
		if(input.files && input.files[0]){
			var reader = new FileReader();
			reader.onload = function(e){
				$(imgs).attr('src', e.target.result);
			};
			reader.readAsDataURL(input.files[0]);
		}
	}
});