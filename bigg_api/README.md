# Escher Interactive BiGG API scraper
This api serves the purpose of scraping the BiGG database webpage, and a few others (kegg, PDB) because I don't have direct access to the BiGG Postgres database.  With direct access, this API could be a lot more robust and correct.


# Getting started
Install dependencies:

Make sure you have mysql installed (Ubuntu: `sudo apt-get install mysql-server-5.6`)

```bash
sudo apt-get install libmysqlclient-dev
virtualenv venv
source venv/bin/activate
pip install -r requirements.txt
```

Set up MySQL data for PDB mappings:
```msql
sudo service mysql start
mysql -u[username] -p[password] < data/data-model.sql
```

Depending on your mysql username and password, you will need to specify your database credentials in `configuration/config.py`:

```
config = {
	'baseUrl' : 'http://localhost',
	'port' : 8001,
	"database":{
		'username': '[username]',
		'password':'[password]',
		'database': 'PdbMapping',
		'host': 'localhost'
	}
}

```

Then load the data into the mysql database:
```
python load_data.py
```

Lastly, start the server:
```
python server.py
```

## Testing
The code contains 2 integration tests written in py.test in an attempt to glorify half-a$$ed testing.  Therefore, the server must be run when testing:

```bash
python server
```
and in a different terminal, run
```
py.test test/reactions.py -s -v
```
