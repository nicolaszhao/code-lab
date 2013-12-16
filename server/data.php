<?php
	$input = array("AAA", "", "", "", "Nicolas", "", "", "", "bbb", "", "", "", "bbb", "", "", "", "ccc", "", "", "", "", "CCC", "", "", "", 'Sundan', "", "", "", "", "", "", "", "", "", "", "", "", 'zhaoxiaodong', "", "", "", "", "afdsf", "", "", "", "", "fsdafs", "", "");
	
	while (true) {
		$rand_keys = array_rand($input);
		
		if (empty($input[$rand_keys])) {
			sleep(1);
		} else {
			echo $input[$rand_keys];
			break;
		}
	}
?>