<html>
<head>
<?php

  // Define the file path
	$file_path = "wpl.txt";

  // Delete the file
	if (unlink($file_path)) {
		echo "File deleted successfully.<br><br>";
	} else {
		echo "Error deleting file.<br><br>";
	}


	
?>




