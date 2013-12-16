<?php
	$valid = 'true';
	if ($_REQUEST['email'] == 'nicolas-zhao@hotmail.com') {
		$valid = 'false';
	}
	echo $valid;
?>