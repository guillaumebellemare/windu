<script src="http://maps.googleapis.com/maps/api/js?sensor=true&amp;language=fr" type="text/javascript"></script> 
<script src="http://google-maps-utility-library-v3.googlecode.com/svn/trunk/markerclusterer/src/markerclusterer.js" type="text/javascript"></script> 
<?php echo $compressor->load('js', array('?base='.URL_ROOT => 'scripts/jquery.google.map.js'), null, false); ?> 
<script type="text/javascript">
	var locations = new Array();
	locations[0] = ["-1","", "Propaganda Design", "1433 4e avenue, Québec","","","G1L 2L1", "Québec", "Québec", "CA", false];
</script> 
<script>initializeMap();</script>