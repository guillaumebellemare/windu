# Lando
<p>Lando Calrissian. C’est un petit magouilleur, un combinard... un vaurien, il va vous plaire.<br>http://guillaumebellemare.github.io/lando/<br>https://www.youtube.com/watch?v=WrvHMW4rviE</p>
=====
# Documentation
## Controllers
```php
class IndexController extends AppController {

	function index() {
		
		# Model declaration
		$foo = new Foo();
		
		# Slug creation
		$foo->create_slug_field("name_$this->lang3");
		
		# Data
		$foos = foo->getAllBar();
		$current_foo = current($foo->currentFoo());
		
		return array("foos" => $foos, "current_foo" => $current_foo);
	}
	
}
```
## Queries
### Select
```php
$this->select($this->table)->all()
```
### Join
```php
public function foo() {
  $this->select($this->table)->left_join("table_name")->all()
}

public function bar() {
  return $this->oneToMany("$this->table.id", "bar.foo_id");
}
```
### Where
```php
$this->select($this->table)->where("$this->table.id = 1")->all()
```
### Order By
```php
$this->select($this->table)->order_by("$this->table.id ASC")->all()
```
### Group By
```php
$this->select($this->table)->group_by("$this->table.id")->all()
```
### Append
Always put special_ in the AS (ex.: AS special_date_end)
```php
$this->select($this->table)->append(array("(DATE(SUBSTRING_INDEX($this->table.date_activation, ',', -1)) - INTERVAL 1 MONTH) AS special_date_renew", "DATE(SUBSTRING_INDEX($this->table.date_activation, ',', -1)) AS special_date_end"))->all()
```
### Get
```php
$this->get($id)
```
### Limit
If the limit is set to 1, you will automatically receive the current array
```php
$this->select($this->table)->limit(1)
```
### Raw Query
```php
$this->raw_query($q)
```
### Insert
```php
$this->insert($record)
```
### Update
```php
$this->update($record, $id)
```
### Delete
```php
$this->delete($this->table, "id = $id")
```
### Complex Query
```php
$rs = $this->select($this->table)->all();
$bar = new Bar();

foreach($rs as &$record)
{
	$record["bars"] = $bar->select($bar->table)->where("{$bar->table}.id = {$record['{$this->table}.id']}")->all();
}

return $rs;
```
=====
## Functions
### Create Slug Field
You can omit the second and third arguments witch are: name of the slug and name of the label of the slug
```php
$foo->createSlugField("name_$this->lang3");
$foo->createSlugField("name_$this->lang3", "slug_$this->lang3", "URL Slug - $this->lang2");
```
### Redirect
```php
$this->redirect("route_to_redirect");
```
### Slug Translation
If you have a slug, you can make sure it translates well in your Controller

You have to call the function translateSlug() in your Controller once

- Also note that your model query method ($model->getCurrentData($_GET["param2"])) must finish by ->limit(1) in order to work.

The arguments are the slugs found in your query.

```php
$data = $model->getCurrentData($_GET["param2"]);

if(!$data) $this->redirect("route_to_redirect");
$this->translateSlug($data["tables.slug_$this->lang3"]);
```
When you search for the slug, make sure you check for both languages. If you more than one, hardcode them (slug_fre, slug_eng, slug_esp):
```php
public function getCurrentData($slug) {
	$this->select($this->table)->where("$this->table.slug_$lang3 = '$slug'  OR $this->table.slug_$this->lang3_trans = '$slug'")->all()
}

public function getCurrentData($slug) {
	$this->select($this->table)->where("$this->table.slug_fre = '$slug' OR $this->table.slug_eng = '$slug' OR $this->table.slug_esp = '$slug'")->all()
}
```
### Ajax
Return true if the request is made in ajax
```php
$this->is_ajax();
```
=====
## View Functions
### Read returned array
```php
<?php foreach($foo as $bar) : ?>
	<?=$bar["bars.name_$lang3"]?>
<?php endforeach; ?>
```
### Read complex returned array
```php
<?php foreach($foo as $bar) : ?>
	<?=$bar["bars.name_$lang3"]?>
	<?php foreach($bar["baz"] as $baz) : ?>
		<?=$baz["bazs.name_$lang3"]>
	<?php endforeach; ?>
<?php endforeach; ?>
```
### Read secure file
#### Download file
To block direct access to a folder, create an .htaccess in that folder:
```php
Order deny,allow
Deny from all
```
Then, to call the file, call readSecuredFile(folder/file.pdf)
```php
<a href="<?=$app->readSecuredFile("$path")?>" target="_blank">Link</a>
```
### Write Pretty Date
```php
$app->writePrettyDate("$date")
```
### Write Pretty Month
```php
$app->writePrettyMonth("$month")
```
### Limit String Size
```php
$app->limitStringSize($month, 200)
```
### Format Money
```php
$app->formatMoney($price)
```
### Get picture path
```php
$app->getPicturePath($picture_path)
```
### Get picture infos
```php
$app->getPictureInfo($picture_path)
```
### New line to paragraph
```php
$app->nl2p(string)
```
=====
## Routes
<p>You have to set your routes in two differents files:</p>
### public/lang/routes.php
```php
$routes = array(
	"index" => "index",
);
```
### app/core/app_routes.php
```php
$app_routes = array(
	"index" => "IndexController@index",
);
```
#### Password Protected
```php
$app_routes = array(
	"index" => "IndexController@index::protected",
);
```
=====
## Metas
<p>Set these in a show() function of a Controller</p>
```php
$this->setTitle("Title");
$this->setDescription("Description");
$this->setKeywords("key, words");
$this->setPageType("article"); // Default : website
$this->setImage("picture.jpg");
```
