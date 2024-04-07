---
tags: publication
layout: articlelayout.liquid
title: Connect to a DB2 instance with Node.js
date: "2022-11-20"
---

And you can use SQL, too.

## Install ODBC

Yes, this happens with ODBC. First, make sure ODBC is installed on your local computer. Execute `sudo apt install unixodbc unixodbc-dev`, or a variant of it depending on your package manager.

_node-odbc_ is a package that enables you to use ODBC in Node. Should you choose this one, add it to your project: `npm i odbc`. Documentation here: [https://www.npmjs.com/package/odbc](https://www.npmjs.com/package/odbc)

## Install the ODBC driver

IBM provides plenty of drivers for their databases. They are extremely expensive, that is, if you manage to unearth them from their website in the first place. The good news is, CData also has drivers for a plethora of stuff, DB2 being one of them. At the time of writing, the drivers are in beta; however they work just fine, and CData provides them free of charge.

Find the Unix ODBC driver for DB2 here: [https://www.cdata.com/drivers/db2/download/odbc/#unix](https://www.cdata.com/drivers/db2/download/odbc/#unix)

Save it anywhere locally, for example in _/tmp_. Then install it; on a Debian-based distribution, you may use the following command: `sudo dpkg -i IBMDB2ODBCDriverforUnix.deb`

Disclaimer: although the driver is perfectly functional in everyday situations, it is a beta version. Think twice before using it in production. This means do not use it in production. Moreover, the driver has an expiration date, after which it will stop working. When the time comes, you will need to download the new version and install it again.


## Build your connection string

Now you have to tell node-odbc where the data is. The following information is required:
- driver name
- host
- port
- database
- username
- password

Obtain the name of the driver, as referenced in your local computer, by looking inside _/etc/odbcinst.ini_. The default is most likely _CData ODBC Driver for DB2_.

The connection string follows this pattern: `DRIVER=driver_name;SERVER=host;UID=username;PWD=password;DATABASE=database;PORT=port`

An example connection string would be: `DRIVER=CData ODBC Driver for DB2;SERVER=192.168.0.8;UID=bobby;PWD=aDkqakUi6K2ulkOv;DATABASE=7TGOQ1O9;PORT=446`

## Connect to the database

Here is a sample script with node-odbc and some basic queries:

```js
import { connect } from "odbc";

const connectionString = `DRIVER=CData ODBC Driver for DB2;SERVER=192.168.0.8;UID=bobby;PWD=aDkqakUi6K2ulkOv;DATABASE=7TGOQ1O9;PORT=446`;
const db2 = await connect(connectionString);

const result0 = await db2.query(`SELECT PRODUCTID, PRODUCTNAME FROM SCHEMA.PRODUCT FETCH FIRST 6 ROWS ONLY`);
const result1 = await db2.query(`SELECT PRODUCTID AS PRODUCTID, PRODUCTNAME AS PRODUCTNAME FROM SCHEMA.PRODUCT LIMIT 1000 OFFSET 4000`);
const result2 = await db2.query(`UPDATE PRODUCT SET PRICE = 7 WHERE PRODUCTID = 160`);
```

The queries return JSON results.

Use the DB2 dialect of SQL to query your database. DB2 instructions may differ from MariaDB/MySQL or Postgres. An example found above is `FETCH FIRST 6 ROWS ONLY`, although `LIMIT` and `OFFSET` can be used for the same result. More on this here: [https://www.db2tutorial.com/](https://www.db2tutorial.com/)

Notice the above use of `SELECT PRODUCTID AS PRODUCTID`. Depending on your database specifications, there may be different possible names for a column, and as a consequence the returned column name may not be the one you specified in the query. While it seems tautological, _columnname_ AS _columnname_ ensures the name returned is the name queried.

This script is an example, suit it to your needs. Do not hardcode your connection string. Store it in an environment variable, or a .gitignored config file, or any other solution; just make sure it never gets uploaded to your repository.

## More than Node.js

CData has other DB2 drivers. Should you interact with your database by means other than Node, say, Python or Microsoft Excel, find them here: [https://www.cdata.com/drivers/db2/download/](https://www.cdata.com/drivers/db2/download/)
