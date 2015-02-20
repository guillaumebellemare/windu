<?php

if($_SESSION['errors']) { $errors[] = $_SESSION['errors']; unset($_SESSION['errors']); }
if($_SESSION['messages']) { $messages[] = $_SESSION['messages']; unset($_SESSION['messages']); }

if($errors)
{
	echo '<div class="msg is-failure">';
		foreach ($errors as $error) {
			echo '<p><span class="msg-icon"></span>'.$error.'</p>';
		}
	echo '</div>';
}

if($messages)
{
	echo '<div class="msg is-success">';
		foreach ($messages as $message) {
			echo '<span class="msg-icon"></span>'.$message;
		}
	echo '</div>';
}