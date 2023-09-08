# Smart Delivery Backend

## Description

The server part of the application, which is responsible for the game logic and works with the database.

## Install dependencies

The server part is downloaded automatically when the repository is cloned.

However, to run it, you need to install some libraries.

The dependency manager for this project is pypoetry.
To install dependencies, you need to [install pypoetry](https://python-poetry.org/docs#installation).

Then, you can configure pypoetry following [the official guide](https://python-poetry.org/docs/basic-usage/):

```shell
poetry config virtualenvs.in-project true
poetry install --without dev
```

## Run

The backend is written using the FastAPI framework. The application is launched using uvicorn.

Use this command to start the server side of the application:

```shell
poetry run python start.py
```

***

## Documentation

### Code documentation

The project code is covered by documentation, which can be viewed by running:

```shell
python -m pydoc {name}
```

Where `name` is the name of a module, package, function, class, etc.

### API documentation

Also, using the capabilities built into FastAPI, the API documentation was generated, available at the link:

* **Swagger OpenAPI:** `http://{host}:8080/docs`;

* **ReDoc:** `http://{host}:8080/redoc`.