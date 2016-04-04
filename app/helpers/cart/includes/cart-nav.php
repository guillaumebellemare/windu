<?php if(SHOPPING_CART) : ?>
<nav class="shopping-cart-navigation">
    <ul>
        <li<?php if($routes['product']==$_GET['page']) echo " class='is-selected'"; ?>><a href="<?=URL_ROOT.$lang2.'/'.$routes['product']; ?>"><?=$cart["product"]?></a></li>
        <?php if(isset($_SESSION['customer']['logged_in'])) : ?>
            <li><a href="<?=URL_ROOT.$lang2."/".$routes["checkout_logout"]?>"><?=$cart["logout"]?></a></li>
            <li><a href="<?=URL_ROOT.$lang2."/".$routes["user_profile"]?>"><?=$cart["profile"]?></a></li>
        <?php else: ?>
            <li><a href="<?=URL_ROOT.$lang2."/".$routes["checkout_login"]?>"><?=$cart["login"]?></a></li>
        <?php endif; ?>
        <li<?php if($routes['cart']==$_GET['page']) echo " class='is-selected'"; ?>><?php if(@include(COMPLETE_URL_ROOT . 'app/helpers/cart/includes/cart-quickview.php')); ?></li>
    </ul>
</nav>
<?php endif; ?>
