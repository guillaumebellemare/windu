<?php

class CartOrderItem extends App {
	
	public function __construct() {
		$this->table = 'cartorder_products';
		$this->table_code = 'cartorder_product';
		parent::__construct($this->table, $this->table_code);
	}

}
